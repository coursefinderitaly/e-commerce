import { motion } from 'framer-motion';
import Hero from '../components/home/Hero';
import CategoryShowcase from '../components/home/CategoryShowcase';
import Trending from '../components/home/Trending';
import Newsletter from '../components/home/Newsletter';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useCountUp } from '../hooks/useCountUp';

function Stats() {
  const { ref, isVisible } = useScrollReveal();
  const { ref: count1, count: c1 } = useCountUp(50000);
  const { ref: count2, count: c2 } = useCountUp(4.8);
  const { ref: count4, count: c4 } = useCountUp(99);

  return (
    <section ref={ref} className="py-16 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
          {[
            { ref: count1, count: c1, label: 'Happy Customers', suffix: '+' },
            { ref: count2, count: c2, label: 'Average Rating', suffix: ' ★' },
            { ref: count4, count: c4, label: 'Satisfaction Rate', suffix: '%' },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1 }}
              ref={stat.ref}
            >
              <p className="font-display text-4xl md:text-5xl text-bone">
                {typeof stat.count === 'number' ? stat.count.toLocaleString() : '0'}
                {stat.suffix}
              </p>
              <p className="font-body text-sm text-bone/60 mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function BrandStory() {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section ref={ref} className="py-24 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <img
              src="https://images.unsplash.com/photo-1617897903246-719242758050?w=800"
              alt="Glam AURA Cosmetics"
              className="rounded-2xl w-full h-[400px] object-cover shadow-2xl"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="font-body text-rust text-sm tracking-[0.2em] uppercase mb-3">Our Story</p>
            <h2 className="font-display text-4xl md:text-5xl text-paper mb-6">Where Style Meets Substance</h2>
            <p className="font-body text-paper/70 leading-relaxed mb-4">
              Glam AURA was born from a simple belief: your skincare and makeup should empower you, not mask you. We believe in beauty that feels like a natural extension of who you are — pure, effective, and beautifully formulated.
            </p>
            <p className="font-body text-paper/60 leading-relaxed">
              We travel the globe to bring together clean ingredients, scientific innovation, and luxurious textures. From the botanical gardens of Grasse to the advanced skincare labs of Seoul, every product in our collection is meticulously curated to nourish your skin and elevate your daily ritual.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Hero />
      <CategoryShowcase />
      <Trending />
      <Stats />
      <BrandStory />
      <Newsletter />
    </motion.div>
  );
}
