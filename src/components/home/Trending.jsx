import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useProducts } from '../../context/ProductsContext';
import ProductCard from '../shop/ProductCard';
import { useScrollReveal } from '../../hooks/useScrollReveal';

export default function Trending() {
  const scrollRef = useRef(null);
  const { ref, isVisible } = useScrollReveal();
  const [trending, setTrending] = useState([]);
  const { products } = useProducts();

  useEffect(() => {
    setTrending(products.filter(p => p.featured));
  }, [products]);

  const scroll = (direction) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: direction * 320, behavior: 'smooth' });
    }
  };

  return (
    <section ref={ref} className="py-12 md:py-20 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-end justify-between mb-8 md:mb-12"
        >
          <div>
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-gray-400 mb-2">Curated for you</p>
            <h2 className="font-display text-3xl md:text-4xl font-black text-gray-900">Trending Now</h2>
          </div>
          <div className="flex items-center gap-3 mb-1">
            <button className="text-sm font-semibold text-black hover:text-gray-600 hidden sm:block uppercase tracking-wider underline underline-offset-4">View All</button>
            <div className="flex gap-2">
              <button onClick={() => scroll(-1)} className="p-3 border border-gray-200 rounded-full hover:bg-black hover:text-white transition-colors text-black">
                <ChevronLeft size={20} strokeWidth={1.5} />
              </button>
              <button onClick={() => scroll(1)} className="p-3 border border-gray-200 rounded-full hover:bg-black hover:text-white transition-colors text-black">
                <ChevronRight size={20} strokeWidth={1.5} />
              </button>
            </div>
          </div>
        </motion.div>

        <div ref={scrollRef} className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory -mx-4 px-4 no-scrollbar">
          {trending.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="snap-start flex-shrink-0 w-[260px] sm:w-[300px]"
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
