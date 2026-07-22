import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import OptimizedImage from '../ui/OptimizedImage';

const colorMap = {
  rust: '#B2502B',
  indigo: '#3E4C6D',
  berry: '#8A3F56',
};

const categories = [
  {
    name: 'Cosmetics',
    path: '/shop/Cosmetics',
    color: 'berry',
    description: 'Skincare & makeup for your daily ritual',
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348',
  },
  {
    name: 'Fashion',
    path: '#',
    color: 'rust',
    description: 'Statement pieces & timeless accessories',
    image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b',
    comingSoon: true,
  },
  {
    name: 'Clothing',
    path: '#',
    color: 'indigo',
    description: 'Everyday essentials with elevated design',
    image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b',
    comingSoon: true,
  },
];

export default function CategoryShowcase() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section ref={ref} className="py-24 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="font-body text-paper/40 text-sm tracking-[0.2em] uppercase mb-3">Shop by</p>
          <h2 className="font-display text-4xl md:text-5xl text-paper">Category</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 40 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.15, duration: 0.6 }}
            >
              {cat.comingSoon ? (
                <div className="group block relative h-80 md:h-96 overflow-hidden rounded-2xl cursor-not-allowed">
                  <OptimizedImage
                    src={cat.image}
                    alt={cat.name}
                    width={600}
                    quality={75}
                    containerClassName="absolute inset-0"
                    className="w-full h-full object-cover transition-transform duration-700 grayscale-[60%] opacity-70"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
                  <div className="absolute top-0 right-0 p-4 z-10">
                    <span className="bg-paper text-ink text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full shadow-lg">
                      Coming Soon
                    </span>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="font-display text-2xl text-white/50 mb-1">{cat.name}</h3>
                    <p className="font-body text-white/40 text-sm mb-3">{cat.description}</p>
                    <span className="inline-flex items-center gap-1 text-sm font-body font-semibold text-white/30">
                      Stay Tuned <ArrowRight size={14} />
                    </span>
                  </div>
                </div>
              ) : (
                <Link to={cat.path} className="group block relative h-80 md:h-96 overflow-hidden rounded-2xl">
                  <OptimizedImage
                    src={cat.image}
                    alt={cat.name}
                    width={600}
                    quality={75}
                    containerClassName="absolute inset-0"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div
                    className="absolute top-0 left-0 right-0 h-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
                    style={{ backgroundColor: colorMap[cat.color] }}
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                    <h3 className="font-display text-2xl text-white mb-1">{cat.name}</h3>
                    <p className="font-body text-white/70 text-sm mb-3">{cat.description}</p>
                    <span
                      className="inline-flex items-center gap-1 text-sm font-body font-semibold group-hover:gap-2 transition-all"
                      style={{ color: colorMap[cat.color] }}
                    >
                      Shop {cat.name} <ArrowRight size={14} />
                    </span>
                  </div>
                </Link>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
