import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { useScrollReveal } from '../../hooks/useScrollReveal';

const testimonials = [
  {
    name: 'Sophia Chen',
    role: 'Verified Buyer',
    text: 'The quality of their cashmere is unmatched. I live in my turtleneck from the moment the temperature drops. Worth every penny.',
    rating: 5,
  },
  {
    name: 'Marcus Rivera',
    role: 'Verified Buyer',
    text: 'I was skeptical about ordering cosmetics online, but the Radiance Serum has genuinely transformed my skincare routine. Fast shipping too.',
    rating: 5,
  },
  {
    name: 'Aisha Patel',
    role: 'Beauty Influencer',
    text: 'Glam AURA has become my go-to for statement pieces. The Silk Evening Gown got me so many compliments at the gala. Absolutely stunning.',
    rating: 5,
  },
  {
    name: 'Emma Larsson',
    role: 'Verified Buyer',
    text: 'Finally, a cosmetics store where skincare and makeup all hit the same high standard. The packaging alone is a work of art.',
    rating: 4,
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const { ref, isVisible } = useScrollReveal();

  const next = () => setCurrent((c) => (c + 1) % testimonials.length);
  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);

  return (
    <section ref={ref} className="py-24 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="font-body text-paper/40 text-sm tracking-[0.2em] uppercase mb-3">Real Reviews</p>
          <h2 className="font-display text-4xl md:text-5xl text-paper">Loved by Thousands</h2>
        </motion.div>

        <div className="relative max-w-2xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="bg-transparent rounded-2xl p-8 md:p-10 shadow-sm border border-paper/5 text-center"
            >
              <div className="flex justify-center gap-1 mb-5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={18} className={i < testimonials[current].rating ? 'text-amber-400 fill-amber-400' : 'text-paper/10'} />
                ))}
              </div>
              <blockquote className="font-display text-xl md:text-2xl text-paper mb-6 leading-relaxed">
                &ldquo;{testimonials[current].text}&rdquo;
              </blockquote>
              <div>
                <p className="font-body font-semibold text-paper">{testimonials[current].name}</p>
                <p className="font-body text-sm text-paper/40">{testimonials[current].role}</p>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-center gap-3 mt-8">
            <button onClick={prev} className="p-2 border border-paper/20 rounded-lg hover:bg-paper/10 transition-colors">
              <ChevronLeft size={20} />
            </button>
            <div className="flex items-center gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`w-2 h-2 rounded-full transition-all ${i === current ? 'bg-transparent w-6' : 'bg-paper/20'}`}
                />
              ))}
            </div>
            <button onClick={next} className="p-2 border border-paper/20 rounded-lg hover:bg-paper/10 transition-colors">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
