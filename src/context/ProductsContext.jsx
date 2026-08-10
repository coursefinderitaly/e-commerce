import { createContext, useContext, useState, useEffect } from 'react';
import { products as initialProducts } from '../data/products';

const ProductsContext = createContext();
const STORAGE_KEY = 'glamaura_products';

function mergeProducts(primaryList = [], fallbackList = []) {
  const map = new Map();
  // Load baseline initial products first
  (fallbackList || []).forEach(p => {
    if (p && p.id) map.set(String(p.id), p);
  });
  // Overlay custom / primary products
  (primaryList || []).forEach(p => {
    if (p && p.id) map.set(String(p.id), p);
  });
  return Array.from(map.values());
}

export function ProductsProvider({ children }) {
  const [products, setProducts] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return mergeProducts(parsed, initialProducts);
        }
      }
    } catch (e) {
      console.warn('Failed to parse products from localStorage:', e);
    }
    return initialProducts;
  });

  const [loading, setLoading] = useState(false);

  // Helper to sync state and localStorage
  const updateProductsState = (newList) => {
    const merged = mergeProducts(newList, initialProducts);
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
              const merged = mergeProducts(data, currentProducts);
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
    // 1. Update local state & localStorage immediately so UI never loses products
    let updatedList;
    if (isEdit) {
      updatedList = products.map(p => String(p.id) === String(productData.id) ? { ...p, ...productData } : p);
    } else {
      updatedList = [productData, ...products];
    }
    updateProductsState(updatedList);

    // 2. Attempt API sync if backend is active
    try {
      const baseUrl = import.meta.env.VITE_API_URL || '';
      const url = isEdit ? `${baseUrl}/api/products/${productData.id}` : `${baseUrl}/api/products`;
      const method = isEdit ? 'PUT' : 'POST';
      await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData)
      });
    } catch (err) {
      console.warn('Backend API sync notice:', err.message);
    }
  };

  const deleteProduct = async (productId) => {
    // 1. Update local state & localStorage immediately
    const updatedList = products.filter(p => String(p.id) !== String(productId));
    updateProductsState(updatedList);

    // 2. Attempt API delete if backend is active
    try {
      const baseUrl = import.meta.env.VITE_API_URL || '';
      await fetch(`${baseUrl}/api/products/${productId}`, {
        method: 'DELETE'
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
