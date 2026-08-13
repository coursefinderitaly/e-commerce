import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Flame, Clock, ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { useProducts } from '../../context/ProductsContext';
import ProductCard from '../shop/ProductCard';

export default function FlashDeals() {
  const { products } = useProducts();
  const scrollRef = useRef(null);

  // Live countdown timer state (ends in 8 hours from render)
  const [timeLeft, setTimeLeft] = useState({
    hours: 8,
    minutes: 42,
    seconds: 19,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 8, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const scroll = (direction) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: direction * 300, behavior: 'smooth' });
    }
  };

  const dealProducts = products.filter((p) => p.originalPrice && p.originalPrice > p.price);

  if (dealProducts.length === 0) return null;

  return (
    <section className="py-8 md:py-12 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="bg-gradient-to-r from-rose-50 via-amber-50 to-orange-50 rounded-2xl p-4 sm:p-6 border border-rose-100 mb-6 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            
            {/* Title & Live Countdown */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-6">
              <div className="flex items-center gap-2">
                <span className="p-2 bg-rose-600 text-white rounded-xl shadow-sm">
                  <Flame size={20} className="fill-white animate-bounce" />
                </span>
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-rose-600">Limited Time Only</span>
                  <h2 className="text-xl sm:text-2xl font-display font-black text-gray-900 leading-tight">
                    Deals of the Day
                  </h2>
                </div>
              </div>

              {/* Ticking Timer */}
              <div className="flex items-center gap-1.5 bg-transparent px-3 py-1.5 rounded-xl border border-rose-200 text-xs font-bold text-gray-800 shadow-sm">
                <Clock size={14} className="text-rose-600" />
                <span>Ends in:</span>
                <span className="font-mono bg-rose-600 text-white px-1.5 py-0.5 rounded text-xs font-black">
                  {String(timeLeft.hours).padStart(2, '0')}h
                </span>
                <span>:</span>
                <span className="font-mono bg-rose-600 text-white px-1.5 py-0.5 rounded text-xs font-black">
                  {String(timeLeft.minutes).padStart(2, '0')}m
                </span>
                <span>:</span>
                <span className="font-mono bg-rose-600 text-white px-1.5 py-0.5 rounded text-xs font-black">
                  {String(timeLeft.seconds).padStart(2, '0')}s
                </span>
              </div>
            </div>

            {/* Navigation & View All */}
            <div className="flex items-center gap-3 self-end md:self-auto">
              <Link
                to="/shop"
                className="text-xs sm:text-sm font-bold text-rose-700 hover:text-black flex items-center gap-1 uppercase tracking-wider transition-colors"
              >
                View All Deals <ArrowRight size={14} />
              </Link>
              <div className="flex gap-1.5">
                <button
                  onClick={() => scroll(-1)}
                  aria-label="Scroll left"
                  className="p-2 rounded-full border border-gray-200 bg-transparent hover:bg-black hover:text-white transition-colors shadow-sm text-gray-700"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  onClick={() => scroll(1)}
                  aria-label="Scroll right"
                  className="p-2 rounded-full border border-gray-200 bg-transparent hover:bg-black hover:text-white transition-colors shadow-sm text-gray-700"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* Horizontal Scrolling Products Row */}
        <div
          ref={scrollRef}
          className="flex gap-4 sm:gap-6 overflow-x-auto pb-4 pt-1 snap-x snap-mandatory no-scrollbar"
        >
          {dealProducts.map((product) => (
            <div
              key={product.id}
              className="snap-start flex-shrink-0 w-[220px] sm:w-[260px] md:w-[280px]"
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
