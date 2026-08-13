import { Star, CheckCircle, Heart, Award, Sparkles } from 'lucide-react';

const reviews = [
  {
    id: 1,
    name: 'Ananya Sharma',
    role: 'Verified Buyer',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    product: 'Vitamin C Radiance Glow Serum',
    text: 'Literally in love with this serum! Within just 10 days, my dark spots faded and my skin has this glass-skin glow. Best skincare purchase of the year.',
    rating: 5,
    date: '3 days ago',
  },
  {
    id: 2,
    name: 'Rohan Mehta',
    role: 'Verified Buyer',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    product: 'Botanical Hair Repair Oil',
    text: 'My hair was extremely frizzy from constant heat styling. Two drops of this oil after washing makes it feel like I just stepped out of a luxury salon.',
    rating: 5,
    date: '1 week ago',
  },
  {
    id: 3,
    name: 'Pooja Iyer',
    role: 'Verified Buyer',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80',
    product: 'Whipped Vanilla Body Soufflé',
    text: 'The smell is heavenly! It melts right into the skin without being greasy at all. Everyone asks me what perfume I am wearing. Highly recommended!',
    rating: 5,
    date: '2 weeks ago',
  },
];

const stats = [
  { value: '50K+', label: 'Happy Customers' },
  { value: '4.9/5', label: 'Average Product Rating' },
  { value: '98%', label: 'Repeat Customer Rate' },
  { value: '100%', label: 'Toxin-Free & Vegan' },
];

export default function Testimonials() {
  return (
    <section className="py-12 md:py-16 bg-milky-100 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">
            <Sparkles size={14} className="text-yellow-500" />
            Social Proof
          </div>
          <h2 className="text-2xl sm:text-4xl font-display font-black text-gray-900 mb-3">
            Loved by Over 50,000+ Beauty Lovers
          </h2>
          <p className="text-sm text-gray-600">
            Real reviews from real people who transformed their hair and skin with Glam Aura.
          </p>
        </div>

        {/* 3 Review Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-transparent rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100 flex flex-col justify-between hover:shadow-md transition-shadow"
            >
              <div>
                {/* Stars & Date */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex gap-1 text-amber-400">
                    {Array.from({ length: rev.rating }).map((_, i) => (
                      <Star key={i} size={16} className="fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-[11px] text-gray-400 font-medium">{rev.date}</span>
                </div>

                {/* Review Text */}
                <p className="text-xs sm:text-sm text-gray-700 leading-relaxed mb-6 italic">
                  &ldquo;{rev.text}&rdquo;
                </p>
              </div>

              {/* User Info & Product Tag */}
              <div className="pt-4 border-t border-gray-100">
                <div className="flex items-center gap-3 mb-2">
                  <img
                    src={rev.avatar}
                    alt={rev.name}
                    className="w-10 h-10 rounded-full object-cover border border-gray-200"
                  />
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-gray-900 flex items-center gap-1">
                      {rev.name}
                      <CheckCircle size={14} className="text-emerald-600 fill-emerald-100" />
                    </h4>
                    <span className="text-[11px] text-emerald-700 font-semibold">{rev.role}</span>
                  </div>
                </div>

                <div className="bg-milky-100 rounded-lg px-2.5 py-1.5 text-[11px] text-gray-600 font-medium flex items-center gap-1.5">
                  <Award size={12} className="text-gray-400" />
                  <span className="truncate">Bought: {rev.product}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Grid */}
        <div className="bg-black text-white rounded-3xl p-6 sm:p-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center shadow-lg">
          {stats.map((stat, i) => (
            <div key={i} className="flex flex-col items-center justify-center">
              <span className="text-2xl sm:text-4xl font-display font-black text-yellow-400 mb-1">
                {stat.value}
              </span>
              <span className="text-xs text-gray-300 font-medium tracking-wide">
                {stat.label}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
