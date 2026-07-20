import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../ui/Button';

function PigmentBloom({ color, delay, x, y, size }) {
  return (
    <motion.div
      className="absolute rounded-full blur-[100px] pointer-events-none mix-blend-screen"
      style={{ backgroundColor: color }}
      initial={{ x: 0, y: 0, opacity: 0.1, width: size, height: size }}
      animate={{
        x: [0, x, -x * 0.5, 0],
        y: [0, y, -y * 0.3, 0],
        opacity: [0.1, 0.3, 0.2, 0.1],
      }}
      transition={{ duration: 15 + delay, repeat: Infinity, ease: 'easeInOut' }}
    />
  );
}

export default function Hero() {
  const heroRef = useRef(null);

  return (
    <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-transparent">
      <div className="relative z-10 max-w-7xl mx-auto px-4 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mt-12">
        
        {/* Left Column: Text */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left order-last lg:order-first">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="font-body text-white font-bold text-xs md:text-sm tracking-[0.4em] uppercase mb-4 [text-shadow:_0_2px_10px_rgba(0,0,0,0.8)]"
          >
            Welcome to the New Era of Beauty
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white leading-tight mb-6 [text-shadow:_0_4px_30px_rgba(0,0,0,0.8)]"
          >
            Radiate Your
            <br />
            <span className="text-white italic font-light">
              True Inner Beauty.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="font-body text-white/95 font-medium text-lg md:text-xl max-w-xl mb-10 leading-relaxed [text-shadow:_0_2px_15px_rgba(0,0,0,0.8)]"
          >
            Discover premium skincare, vibrant makeup, and signature fragrances — crafted to celebrate your unique beauty. Experience pure, minimalist cosmetics.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
          >
            <Link to="/shop" className="w-full sm:w-auto">
              <Button variant="primary" size="xl" className="w-full sm:w-auto bg-paper text-ink hover:bg-paper/90 rounded-full px-10 shadow-[0_0_20px_rgba(243,241,236,0.15)] transition-all duration-300 hover:shadow-[0_0_30px_rgba(243,241,236,0.25)] hover:-translate-y-1">
                Shop New Arrivals
                <ArrowRight size={20} className="ml-2" />
              </Button>
            </Link>
            <Link to="/shop" className="w-full sm:w-auto">
              <Button variant="secondary" size="xl" className="w-full sm:w-auto border-paper/30 text-paper hover:bg-paper hover:text-ink rounded-full px-10 transition-all duration-300 hover:-translate-y-1">
                Explore Collections
              </Button>
            </Link>
          </motion.div>
        </div>

        {/* Right Column: Exact company logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, x: 20 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative hidden md:flex justify-center lg:justify-end order-first lg:order-last mb-12 lg:mb-0"
        >
          {/* A subtle glow behind the logo to make it pop on dark background */}
          <div className="absolute inset-0 bg-paper/5 blur-3xl rounded-full scale-150"></div>
          <img 
            src="/logo1.png" 
            alt="Glam AURA Logo" 
            className="relative w-full max-w-sm md:max-w-md lg:max-w-lg h-auto object-contain drop-shadow-2xl"
          />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-paper/40 cursor-pointer hover:text-paper transition-colors"
          onClick={() => window.scrollBy({ top: window.innerHeight, behavior: 'smooth' })}
        >
          <ChevronDown size={28} />
        </motion.div>
      </motion.div>
    </section>
  );
}
