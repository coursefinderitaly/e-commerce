import { createContext, useContext, useState, useEffect } from 'react';
import { products as initialProducts } from '../data/products';

const ProductsContext = createContext();
const STORAGE_KEY = 'glamaura_products';
const DELETED_KEY = 'glamaura_deleted_products';

const getStoredDeletedIds = () => {
  try {
    const saved = localStorage.getItem(DELETED_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch (e) {
    return [];
  }
};

const filterDeleted = (list, deletedIds) => {
  const ids = deletedIds || getStoredDeletedIds();
  return (list || []).filter(p => p && p.id && !ids.includes(String(p.id)));
};

export function ProductsProvider({ children }) {
  const [deletedIds, setDeletedIds] = useState(getStoredDeletedIds);

  const [products, setProducts] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      const currentDeleted = getStoredDeletedIds();
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return filterDeleted(parsed, currentDeleted);
        }
      }
    } catch (e) {
      console.warn('Failed to parse products from localStorage:', e);
    }
    return filterDeleted(initialProducts, getStoredDeletedIds());
  });

  const [loading, setLoading] = useState(false);

  // Update React state & localStorage
  const updateProductsState = (newList) => {
    const currentDeleted = getStoredDeletedIds();
    const cleanList = filterDeleted(newList, currentDeleted);
    setProducts(cleanList);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cleanList));
    } catch (e) {
      console.warn('Failed to save products to localStorage:', e);
    }
  };

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const baseUrl = import.meta.env.VITE_API_URL || '';
      const response = await fetch(`${baseUrl}/api/products`);
      if (response.ok) {
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          const data = await response.json();
          if (Array.isArray(data)) {
            const currentDeleted = getStoredDeletedIds();
            const cleanData = filterDeleted(data, currentDeleted);
            setProducts(cleanData);
            try {
              localStorage.setItem(STORAGE_KEY, JSON.stringify(cleanData));
            } catch (e) {}
          }
        }
      }
    } catch (error) {
      console.warn('API unavailable, keeping current products from local storage:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveProduct = async (productData, isEdit = false) => {
    try {
      const baseUrl = import.meta.env.VITE_API_URL || '';
      const url = isEdit ? `${baseUrl}/api/products/${productData.id}` : `${baseUrl}/api/products`;
      const method = isEdit ? 'PUT' : 'POST';
      const response = await fetch(url, {
        method,
        headers: { 
          'Content-Type': 'application/json',
          'x-admin-token': 'glamaura-secure-admin'
        },
        body: JSON.stringify(productData)
      });

      if (!response.ok) {
        throw new Error(`Database rejected save: ${response.status}`);
      }
      
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
         throw new Error('API is not running correctly. Received HTML instead of JSON.');
      }

      // ONLY update local state AFTER successful database save
      let updatedList;
      if (isEdit) {
        updatedList = products.map(p => String(p.id) === String(productData.id) ? { ...p, ...productData } : p);
      } else {
        updatedList = [productData, ...products];
      }
      updateProductsState(updatedList);

    } catch (err) {
      console.error('Backend API sync failed:', err.message);
      throw err;
    }
  };

  const deleteProduct = async (productId) => {
    try {
      const stringId = String(productId);
      const baseUrl = import.meta.env.VITE_API_URL || '';
      const response = await fetch(`${baseUrl}/api/products/${stringId}`, {
        method: 'DELETE',
        headers: {
          'x-admin-token': 'glamaura-secure-admin'
        }
      });
      
      if (!response.ok) {
        throw new Error(`Database rejected delete: ${response.status}`);
      }

      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
         throw new Error('API is not running correctly. Received HTML instead of JSON.');
      }

      // ONLY update local state AFTER successful database delete
      const currentDeleted = getStoredDeletedIds();
      const newDeletedIds = Array.from(new Set([...currentDeleted, stringId]));
      
      setDeletedIds(newDeletedIds);
      try {
        localStorage.setItem(DELETED_KEY, JSON.stringify(newDeletedIds));
      } catch (e) {}

      const updatedList = products.filter(p => String(p.id) !== stringId);
      updateProductsState(updatedList);

    } catch (err) {
      console.error('Backend API delete failed:', err.message);
      throw err;
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <ProductsContext.Provider value={{ products, loading, fetchProducts, saveProduct, deleteProduct }}>
      {children}
    </ProductsContext.Provider>
  );
}

export function useProducts() {
  return useContext(ProductsContext);
}
