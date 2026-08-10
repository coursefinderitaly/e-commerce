import { Truck, ShieldCheck, RefreshCw, Award } from 'lucide-react';

const badges = [
  {
    icon: Truck,
    title: 'Free Express Shipping',
    desc: 'On all orders above $49',
  },
  {
    icon: ShieldCheck,
    title: '100% Clean & Certified',
    desc: 'Toxin-free, vegan & cruelty-free',
  },
  {
    icon: RefreshCw,
    title: 'Easy 30-Day Returns',
    desc: 'Hassle-free doorstep pickup',
  },
  {
    icon: Award,
    title: 'Dermatologist Approved',
    desc: 'Clinically tested for all skin types',
  },
];

export default function TrustBadges() {
  return (
    <section className="bg-gray-50 border-y border-gray-100 py-6 my-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {badges.map((item, idx) => (
            <div key={idx} className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-full bg-white shadow-sm border border-gray-100 flex items-center justify-center flex-shrink-0 text-black">
                <item.icon size={20} strokeWidth={2} />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-gray-900 leading-snug">{item.title}</h4>
                <p className="text-[11px] text-gray-500">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
