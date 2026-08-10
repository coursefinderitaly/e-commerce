import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, Flame, Percent } from 'lucide-react';

const categoryItems = [
  {
    name: 'Hair Care',
    path: '/shop/Hair',
    image: 'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=300&q=80',
    fallback: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=300&q=80',
    tag: 'Trending',
  },
  {
    name: 'Skin Care',
    path: '/shop/Skin',
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=300&q=80',
    fallback: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=300&q=80',
    tag: 'Bestseller',
  },
  {
    name: 'Body Care',
    path: '/shop/Body',
    image: 'https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?auto=format&fit=crop&w=300&q=80',
    fallback: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=300&q=80',
    tag: 'New',
  },
  {
    name: 'Face & Glow',
    path: '/shop/Face',
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=300&q=80',
    fallback: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=300&q=80',
    tag: 'Hot',
  },
  {
    name: 'All Offers',
    path: '/shop',
    image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=300&q=80',
    fallback: 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&w=300&q=80',
    tag: 'Up to 40% Off',
  },
];

export default function CategoryShowcase() {
  return (
    <section className="bg-white py-4 md:py-6 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 sm:gap-8 overflow-x-auto no-scrollbar py-2">
          {categoryItems.map((cat) => (
            <Link
              key={cat.name}
              to={cat.path}
              className="flex flex-col items-center flex-shrink-0 group cursor-pointer text-center"
            >
              <div className="relative mb-2">
                <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full p-0.5 bg-gradient-to-tr from-amber-400 via-rose-400 to-indigo-500 group-hover:scale-105 transition-transform duration-300 shadow-sm">
                  <div className="w-full h-full rounded-full overflow-hidden bg-gray-100 p-0.5">
                    <img
                      src={cat.image}
                      alt={cat.name}
                      onError={(e) => {
                        if (e.target.src !== cat.fallback) {
                          e.target.src = cat.fallback;
                        }
                      }}
                      className="w-full h-full object-cover rounded-full group-hover:scale-110 transition-transform duration-500"
                      loading="eager"
                      decoding="async"
                    />
                  </div>
                </div>
                {cat.tag && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-black text-white text-[9px] sm:text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full whitespace-nowrap shadow-sm">
                    {cat.tag}
                  </span>
                )}
              </div>
              <span className="text-xs sm:text-sm font-bold text-gray-800 group-hover:text-black transition-colors whitespace-nowrap mt-1">
                {cat.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
