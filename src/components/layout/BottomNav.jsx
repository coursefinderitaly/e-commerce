import { Link, useLocation } from 'react-router-dom';
import { Home, Grid, ShoppingBag, User } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { motion } from 'framer-motion';

export default function BottomNav() {
  const location = useLocation();
  const { itemCount } = useCart();

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  const navItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: Grid, label: 'Shop', path: '/shop' },
    { icon: ShoppingBag, label: 'Cart', path: '/cart', badge: itemCount },
    { icon: User, label: 'Profile', path: '/profile' }, // Or account, or just a dummy for now
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 z-50 pb-safe shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => (
          <Link
            key={item.label}
            to={item.path}
            className={`flex flex-col items-center justify-center w-full h-full space-y-1 ${
              isActive(item.path) ? 'text-black' : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            <div className="relative">
              <item.icon size={22} strokeWidth={isActive(item.path) ? 2.5 : 2} />
              {item.badge > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-2 bg-black text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center"
                >
                  {item.badge}
                </motion.span>
              )}
            </div>
            <span className="text-[10px] font-medium tracking-wide">{item.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
