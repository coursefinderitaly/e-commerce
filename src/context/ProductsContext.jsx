import { createContext, useContext, useState, useEffect } from 'react';
import { products as initialProducts } from '../data/products';

const ProductsContext = createContext();
const STORAGE_KEY = 'glamaura_products';
const DELETED_KEY = 'glamaura_deleted_products';

function mergeProducts(primaryList = [], fallbackList = [], deletedIds = []) {
  const map = new Map();
  // Load baseline initial products first
  (fallbackList || []).forEach(p => {
    if (p && p.id && !deletedIds.includes(String(p.id))) map.set(String(p.id), p);
  });
  // Overlay custom / primary products
  (primaryList || []).forEach(p => {
    if (p && p.id && !deletedIds.includes(String(p.id))) map.set(String(p.id), p);
  });
  return Array.from(map.values());
}

export function ProductsProvider({ children }) {
  const [deletedIds, setDeletedIds] = useState(() => {
    try {
      const saved = localStorage.getItem(DELETED_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  const [products, setProducts] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Pass deletedIds initialized locally
          const localDeleted = (() => {
            try { return JSON.parse(localStorage.getItem(DELETED_KEY)) || []; } catch(e) { return []; }
          })();
          return mergeProducts(parsed, initialProducts, localDeleted);
        }
      }
    } catch (e) {
      console.warn('Failed to parse products from localStorage:', e);
    }
    return initialProducts;
  });

  const [loading, setLoading] = useState(false);

  // Helper to sync state and localStorage
  const updateProductsState = (newList, currentDeletedIds = deletedIds) => {
    const merged = mergeProducts(newList, initialProducts, currentDeletedIds);
    setProducts(merged);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
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
          if (Array.isArray(data) && data.length > 0) {
            // Merge API data with current local products to never lose un-synced products
            setProducts(currentProducts => {
              const merged = mergeProducts(data, currentProducts, deletedIds);
              try {
                localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
              } catch (e) {}
              return merged;
            });
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
    let updatedList;
    if (isEdit) {
      updatedList = products.map(p => String(p.id) === String(productData.id) ? { ...p, ...productData } : p);
    } else {
      updatedList = [productData, ...products];
    }
    updateProductsState(updatedList);

    try {
      const baseUrl = import.meta.env.VITE_API_URL || '';
      const url = isEdit ? `${baseUrl}/api/products/${productData.id}` : `${baseUrl}/api/products`;
      const method = isEdit ? 'PUT' : 'POST';
      await fetch(url, {
        method,
        headers: { 
          'Content-Type': 'application/json',
          'x-admin-token': 'glamaura-secure-admin'
        },
        body: JSON.stringify(productData)
      });
    } catch (err) {
      console.warn('Backend API sync notice:', err.message);
    }
  };

  const deleteProduct = async (productId) => {
    const newDeletedIds = [...deletedIds, String(productId)];
    setDeletedIds(newDeletedIds);
    try {
      localStorage.setItem(DELETED_KEY, JSON.stringify(newDeletedIds));
    } catch (e) {}

    const updatedList = products.filter(p => String(p.id) !== String(productId));
    updateProductsState(updatedList, newDeletedIds);

    try {
      const baseUrl = import.meta.env.VITE_API_URL || '';
      await fetch(`${baseUrl}/api/products/${productId}`, {
        method: 'DELETE',
        headers: {
          'x-admin-token': 'glamaura-secure-admin'
        }
      });
    } catch (err) {
      console.warn('Backend API delete notice:', err.message);
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
