import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';

const categorySpotlights = [
  {
    title: 'Hair Revival',
    tagline: 'Salon shine & split-end therapy',
    image: 'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=800&q=80',
    link: '/shop/Hair',
    color: 'from-amber-950/80 via-stone-900/70 to-stone-900/90',
    items: '12+ Products',
  },
  {
    title: 'Skin Radiance',
    tagline: 'Vitamin C, Peptides & Retinol',
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80',
    link: '/shop/Skin',
    color: 'from-rose-950/80 via-stone-900/70 to-stone-900/90',
    items: '24+ Products',
  },
  {
    title: 'Body Luxury',
    tagline: 'Whipped vanilla & salt scrubs',
    image: 'https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?auto=format&fit=crop&w=800&q=80',
    link: '/shop/Body',
    color: 'from-orange-950/80 via-stone-900/70 to-stone-900/90',
    items: '16+ Products',
  },
  {
    title: 'Face & Glam',
    tagline: 'Dewy tints & luminous foundation',
    image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=800&q=80',
    link: '/shop/Face',
    color: 'from-pink-950/80 via-stone-900/70 to-stone-900/90',
    items: '18+ Products',
  },
];

export default function CategorySpotlight() {
  return (
    <section className="py-8 md:py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="flex items-end justify-between mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-gray-500 mb-1">
              <Sparkles size={14} className="text-yellow-500" />
              Curated Collections
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-black text-gray-900">
              Shop by Category
            </h2>
          </div>
          <Link
            to="/shop"
            className="text-xs sm:text-sm font-bold uppercase tracking-wider text-black hover:text-gray-600 flex items-center gap-1"
          >
            All Categories <ArrowRight size={14} />
          </Link>
        </div>

        {/* 4-Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {categorySpotlights.map((cat, idx) => (
            <Link
              key={idx}
              to={cat.link}
              className="group relative h-72 sm:h-80 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 block bg-gray-900"
            >
              {/* Background Image */}
              <img
                src={cat.image}
                alt={cat.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-90"
                loading="lazy"
              />

              {/* Gradient Overlay */}
              <div className={`absolute inset-0 bg-gradient-to-t ${cat.color} opacity-80 group-hover:opacity-90 transition-opacity`} />

              {/* Content */}
              <div className="absolute inset-0 p-6 flex flex-col justify-between text-white">
                <span className="self-start text-[11px] font-bold uppercase tracking-widest bg-white/20 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/20">
                  {cat.items}
                </span>

                <div>
                  <h3 className="text-xl font-display font-black text-white mb-1 group-hover:translate-x-1 transition-transform">
                    {cat.title}
                  </h3>
                  <p className="text-xs text-white/80 font-medium mb-4">
                    {cat.tagline}
                  </p>
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-yellow-300 group-hover:text-white transition-colors">
                    Explore Collection <ArrowRight size={14} />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
