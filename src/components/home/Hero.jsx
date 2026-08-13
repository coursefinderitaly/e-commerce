import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Sparkles, ArrowRight } from 'lucide-react';

const heroSlides = [
  {
    id: 1,
    badge: '★ SUMMER BEAUTY FESTIVAL',
    title: 'Unlock Your Natural Radiant Glow',
    description: 'Dermatologist formulated skincare & hair remedies with pure active botanicals.',
    discount: 'FLAT 30% OFF',
    buttonText: 'Shop Best-Sellers',
    link: '/shop/Skin',
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=1600&q=80',
  },
  {
    id: 2,
    badge: '★ NEW LAUNCH',
    title: 'Pure Hair Revival & Peptide Therapy',
    description: 'Transform dull, dry hair with salon-grade rosemary & argan restoration oils.',
    discount: 'BUY 1 GET 1 FREE',
    buttonText: 'Explore Hair Care',
    link: '/shop/Hair',
    image: 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&w=1600&q=80',
  },
  {
    id: 3,
    badge: '★ LUXURY SPA AT HOME',
    title: 'Indulgent Body Butter & Polishing Scrubs',
    description: '24-hour deep hydration infused with whipped Madagascar vanilla & shea butter.',
    discount: 'UP TO 40% OFF',
    buttonText: 'Discover Body Care',
    link: '/shop/Body',
    image: 'https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?auto=format&fit=crop&w=1600&q=80',
  },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev === heroSlides.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrent((prev) => (prev === heroSlides.length - 1 ? 0 : prev + 1));
  const prevSlide = () => setCurrent((prev) => (prev === 0 ? heroSlides.length - 1 : prev - 1));

  return (
    <section className="bg-transparent py-4 md:py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Banner Slider */}
        <div className="relative h-[440px] sm:h-[500px] md:h-[560px] lg:h-[640px] w-full rounded-2xl md:rounded-3xl overflow-hidden bg-gray-900 shadow-md group">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0"
            >
              {/* Background Image with Gradient Overlay */}
              <img
                src={heroSlides[current].image}
                alt={heroSlides[current].title}
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/20" />

              {/* Text & CTA Content */}
              <div className="absolute inset-0 flex items-center">
                <div className="max-w-xl px-6 sm:px-10 md:px-16 text-white">
                  
                  {/* Promo Badge */}
                  <motion.div
                    initial={{ y: 15, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="inline-flex items-center gap-1.5 bg-yellow-400 text-black text-[10px] sm:text-xs font-black px-3.5 py-1.5 rounded-full uppercase tracking-wider mb-4 shadow-sm"
                  >
                    <Sparkles size={13} className="fill-black" />
                    <span>{heroSlides[current].badge}</span>
                  </motion.div>

                  {/* Title (Clean font without noise artifacts) */}
                  <motion.h1
                    initial={{ y: 15, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-[1.15] mb-3 sm:mb-4 text-white tracking-tight"
                  >
                    {heroSlides[current].title}
                  </motion.h1>

                  {/* Description */}
                  <motion.p
                    initial={{ y: 15, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-xs sm:text-sm md:text-base text-gray-200 font-medium mb-6 line-clamp-2 max-w-md leading-relaxed"
                  >
                    {heroSlides[current].description}
                  </motion.p>

                  {/* CTA & Offer Tag */}
                  <motion.div
                    initial={{ y: 15, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="flex flex-wrap items-center gap-4"
                  >
                    <Link
                      to={heroSlides[current].link}
                      className="inline-flex items-center gap-2 bg-white text-black font-bold uppercase tracking-wider text-xs sm:text-sm px-6 sm:px-8 py-3.5 rounded-full hover:bg-yellow-400 hover:text-black transition-all transform hover:scale-105 shadow-lg"
                    >
                      <span>{heroSlides[current].buttonText}</span>
                      <ArrowRight size={16} />
                    </Link>

                    <div className="bg-transparent/15 backdrop-blur-md border border-white/30 text-white font-extrabold text-xs sm:text-sm px-4 py-2.5 rounded-full">
                      {heroSlides[current].discount}
                    </div>
                  </motion.div>

                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            aria-label="Previous Slide"
            className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-transparent/30 hover:bg-transparent text-black backdrop-blur-md flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 z-20 shadow-md"
          >
            <ChevronLeft size={22} strokeWidth={2.5} />
          </button>
          <button
            onClick={nextSlide}
            aria-label="Next Slide"
            className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-transparent/30 hover:bg-transparent text-black backdrop-blur-md flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 z-20 shadow-md"
          >
            <ChevronRight size={22} strokeWidth={2.5} />
          </button>

          {/* Slide Indicators */}
          <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
            {heroSlides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrent(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`transition-all duration-300 rounded-full ${
                  current === idx
                    ? 'w-8 h-2 bg-yellow-400'
                    : 'w-2 h-2 bg-white/50 hover:bg-white'
                }`}
              />
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
