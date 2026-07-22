import { products as staticProducts } from '../data/products';

export function getProducts() {
  let sourceProducts = staticProducts;

  try {
    const saved = localStorage.getItem('glam_aura_products');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        sourceProducts = parsed;
      }
    }
  } catch (err) {
    console.error('Failed to load local saved products.', err);
  }

  return sourceProducts;
}
