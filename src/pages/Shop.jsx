import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Filter, SlidersHorizontal } from 'lucide-react';
import { useProducts } from '../context/ProductsContext';
import { categoryConfig } from '../utils/categoryConfig';
import ProductCard from '../components/shop/ProductCard';
import FilterSidebar from '../components/shop/FilterSidebar';
import { ProductCardSkeleton } from '../components/ui/Skeleton';

const sortOptions = [
  { label: 'Newest', value: 'newest' },
  { label: 'Price: Low to High', value: 'price-asc' },
  { label: 'Price: High to Low', value: 'price-desc' },
  { label: 'Top Rated', value: 'rating' },
];

export default function Shop() {
  const { category } = useParams();
  const [filtered, setFiltered] = useState([]);
  const [sort, setSort] = useState('newest');
  const [mobileFilter, setMobileFilter] = useState(false);
  const { products: sourceProducts, loading } = useProducts();

  useEffect(() => {
    const loadProducts = () => {
      if (loading) return;
      let result = [...sourceProducts];
      if (category) {
        result = result.filter(p => p.category === category);
      }
      switch (sort) {
        case 'price-asc':
          result.sort((a, b) => a.price - b.price);
          break;
        case 'price-desc':
          result.sort((a, b) => b.price - a.price);
          break;
        case 'rating':
          result.sort((a, b) => b.rating - a.rating);
          break;
        default:
          break;
      }
      setFiltered(result);
    };

    loadProducts();
  }, [category, sort, sourceProducts, loading]);

  const cfg = categoryConfig[category];
  const title = category || 'All Products';

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-24 pb-16 bg-transparent min-h-screen"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="font-display text-3xl md:text-4xl text-gray-900 flex items-center gap-3">
              {title}
              {cfg && (
                <span className="w-3 h-3 rounded-full" style={{ backgroundColor: cfg.fill }} />
              )}
            </h1>
            <p className="font-body text-gray-500 text-sm mt-1">{filtered.length} products</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              className="lg:hidden flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-lg text-sm font-body hover:bg-gray-100"
              onClick={() => setMobileFilter(!mobileFilter)}
            >
              <Filter size={16} /> Filters
            </button>
            <div className="flex items-center gap-2">
              <SlidersHorizontal size={16} className="text-gray-500" />
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="text-sm font-body bg-transparent border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-gray-200 text-gray-900"
              >
                {sortOptions.map(o => (
                  <option key={o.value} value={o.value} className="bg-white text-gray-900">{o.label}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="flex gap-8">
          <div className="hidden lg:block w-56 flex-shrink-0">
            <FilterSidebar activeCategory={category} onCategoryChange={() => {}} />
          </div>

          {mobileFilter && (
            <div className="lg:hidden fixed inset-0 z-40 bg-black/50" onClick={() => setMobileFilter(false)}>
              <div className="absolute left-0 top-0 bottom-0 w-72 bg-transparent p-6" onClick={e => e.stopPropagation()}>
                <FilterSidebar activeCategory={category} onCategoryChange={() => setMobileFilter(false)} />
              </div>
            </div>
          )}

          <div className="flex-1">
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, i) => (
                  <ProductCardSkeleton key={i} />
                ))}
              </div>
            ) : filtered.length === 0 ? (
              <div className="text-center py-20">
                <p className="font-display text-2xl text-gray-500 mb-2">No products found</p>
                <p className="font-body text-gray-900">Try adjusting your filters.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
