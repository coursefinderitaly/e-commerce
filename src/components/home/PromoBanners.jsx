import { Link } from 'react-router-dom';
import { ArrowRight, Gift, Sparkles } from 'lucide-react';

export default function PromoBanners() {
  return (
    <section className="py-6 md:py-10 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Promo Card 1 */}
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-amber-100 via-orange-50 to-amber-200/50 border border-amber-200 p-6 sm:p-10 flex flex-col justify-between shadow-sm min-h-[260px] group">
            <div className="relative z-10 max-w-xs">
              <div className="inline-flex items-center gap-1.5 bg-black text-amber-300 text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-full mb-3 shadow-sm">
                <Sparkles size={13} className="text-amber-400" />
                <span>Combo Special</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-display font-black text-gray-900 leading-tight mb-2">
                Buy 2 Serums, Get 1 Free
              </h3>
              <p className="text-xs sm:text-sm text-gray-700 font-medium mb-6 leading-relaxed">
                Mix & match our potent Vitamin C and Peptide serums for the ultimate radiance.
              </p>
              <Link
                to="/shop/Skin"
                className="inline-flex items-center gap-2 bg-black text-white text-xs font-black uppercase tracking-wider px-6 py-3.5 rounded-full hover:bg-gray-800 transition-all shadow-md group-hover:scale-105"
              >
                <span>Claim Offer</span>
                <ArrowRight size={15} />
              </Link>
            </div>
            
            {/* Background Aesthetic Product Photo */}
            <div className="absolute right-0 bottom-0 w-1/2 h-full opacity-40 md:opacity-85 pointer-events-none overflow-hidden flex items-end justify-end">
              <img
                src="https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=400&q=80"
                alt="Serum Offer"
                className="w-44 h-44 sm:w-52 sm:h-52 object-cover rounded-2xl shadow-xl transform translate-x-4 translate-y-4 group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>

          {/* Promo Card 2 */}
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-rose-100 via-pink-50 to-purple-100 border border-rose-200 p-6 sm:p-10 flex flex-col justify-between shadow-sm min-h-[260px] group">
            <div className="relative z-10 max-w-xs">
              <div className="inline-flex items-center gap-1.5 bg-black text-rose-300 text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-full mb-3 shadow-sm">
                <Gift size={13} className="text-rose-400" />
                <span>Complimentary Gift</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-display font-black text-gray-900 leading-tight mb-2">
                Free Silk Hair Wrap
              </h3>
              <p className="text-xs sm:text-sm text-gray-700 font-medium mb-6 leading-relaxed">
                Receive our signature mulberry silk wrap with every Hair Care order above $60.
              </p>
              <Link
                to="/shop/Hair"
                className="inline-flex items-center gap-2 bg-black text-white text-xs font-black uppercase tracking-wider px-6 py-3.5 rounded-full hover:bg-gray-800 transition-all shadow-md group-hover:scale-105"
              >
                <span>Shop Hair Revival</span>
                <ArrowRight size={15} />
              </Link>
            </div>

            {/* Background Aesthetic Product Photo */}
            <div className="absolute right-0 bottom-0 w-1/2 h-full opacity-40 md:opacity-85 pointer-events-none overflow-hidden flex items-end justify-end">
              <img
                src="https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&w=400&q=80"
                alt="Hair Offer"
                className="w-44 h-44 sm:w-52 sm:h-52 object-cover rounded-2xl shadow-xl transform translate-x-4 translate-y-4 group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
