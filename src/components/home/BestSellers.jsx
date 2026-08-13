import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight } from 'lucide-react';
import { useProducts } from '../../context/ProductsContext';
import ProductCard from '../shop/ProductCard';

const tabs = ['All', 'Hair', 'Skin', 'Body', 'Face'];

export default function BestSellers() {
  const [activeTab, setActiveTab] = useState('All');
  const { products } = useProducts();

  const filteredProducts = activeTab === 'All'
    ? products
    : products.filter((p) => p.category.toLowerCase() === activeTab.toLowerCase());

  return (
    <section className="py-8 md:py-12 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header & Tabs */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-gray-500 mb-1">
              <Sparkles size={14} className="text-yellow-500" />
              Customer Favorites
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-black text-gray-900">
              Most Loved Products
            </h2>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap ${
                  activeTab === tab
                    ? 'bg-black text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <motion.div
          layout
          className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6"
        >
          {filteredProducts.length === 0 ? (
            <div className="col-span-full py-12 text-center text-gray-500 bg-milky-100/80 rounded-2xl border border-dashed border-gray-200">
              <p className="text-sm font-bold text-gray-700">No products available yet</p>
              <p className="text-xs text-gray-400 mt-1">Products added from the Admin Panel will appear here live.</p>
            </div>
          ) : (
            <AnimatePresence>
              {filteredProducts.slice(0, 8).map((product) => (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </AnimatePresence>
          )}
        </motion.div>

        {/* Bottom CTA */}
        <div className="text-center mt-10">
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 border-2 border-black text-black font-bold uppercase tracking-wider text-xs sm:text-sm px-8 py-3.5 rounded-full hover:bg-black hover:text-white transition-all shadow-sm"
          >
            Explore Entire Store ({products.length} Products)
            <ArrowRight size={16} />
          </Link>
        </div>

      </div>
    </section>
  );
}
