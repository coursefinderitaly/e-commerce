import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { products as staticProducts } from '../../data/products';
import ProductCard from '../shop/ProductCard';
import { useScrollReveal } from '../../hooks/useScrollReveal';

export default function Trending() {
  const scrollRef = useRef(null);
  const { ref, isVisible } = useScrollReveal();
  const [trending, setTrending] = useState([]);

  useEffect(() => {
    let sourceProducts = staticProducts;
    try {
      const saved = localStorage.getItem('glam_aura_products');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          sourceProducts = parsed;
        }
      }
    } catch (e) {
      console.error("Error loading products:", e);
    }
    setTrending(sourceProducts.filter(p => p.featured));
  }, []);

  const scroll = (direction) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: direction * 320, behavior: 'smooth' });
    }
  };

  return (
    <section ref={ref} className="py-24 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-between mb-10"
        >
          <div>
            <p className="font-body text-paper/40 text-sm tracking-[0.2em] uppercase mb-2">Trending Now</p>
            <h2 className="font-display text-3xl md:text-4xl text-paper">Bestsellers</h2>
          </div>
          <div className="hidden sm:flex gap-2">
            <button onClick={() => scroll(-1)} className="p-2 border border-paper/20 rounded-lg hover:bg-paper/10 transition-colors">
              <ChevronLeft size={20} />
            </button>
            <button onClick={() => scroll(1)} className="p-2 border border-paper/20 rounded-lg hover:bg-paper/10 transition-colors">
              <ChevronRight size={20} />
            </button>
          </div>
        </motion.div>

        <div ref={scrollRef} className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory -mx-4 px-4">
          {trending.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="snap-start flex-shrink-0 w-[280px] sm:w-[300px]"
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
