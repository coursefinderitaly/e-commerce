import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Search, User, Heart } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import AnnouncementBar from './AnnouncementBar';
import BrandLogo from '../common/BrandLogo';

const navCategories = [
  { name: 'Hair Care', path: '/shop/Hair' },
  { name: 'Skin Care', path: '/shop/Skin' },
  { name: 'Body Care', path: '/shop/Body' },
  { name: 'Face & Glow', path: '/shop/Face' },
];

export default function Navbar() {
  const [searchQuery, setSearchQuery] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const { itemCount, toggleCart } = useCart();
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-transparent transition-all shadow-sm">
      <AnnouncementBar />

      {/* Main Header Bar */}
      <div className="border-b border-gray-100 bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20 gap-3 sm:gap-6">
            
            {/* Brand Logo with Paint Brush background and modern text title */}
            <BrandLogo variant="default" size="md" linkTo="/" />

            {/* Flipkart-Style Search Bar (Desktop) */}
            <form
              onSubmit={handleSearch}
              className="flex-1 max-w-xl hidden md:flex items-center relative"
            >
              <div className="w-full relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for Serums, Creams, Hair Oil, Lipsticks..."
                  className="w-full bg-milky-100 hover:bg-gray-100/80 focus:bg-transparent text-gray-900 placeholder-gray-400 text-sm pl-11 pr-24 py-2.5 rounded-full border border-gray-200 focus:border-black focus:outline-none focus:ring-1 focus:ring-black transition-all"
                />
                <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <button
                  type="submit"
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 bg-black text-white text-xs font-bold px-4 py-1.5 rounded-full hover:bg-gray-800 transition-colors"
                >
                  Search
                </button>
              </div>
            </form>

            {/* Actions: Account, Wishlist, Cart */}
            <div className="flex items-center gap-1.5 sm:gap-3">
              
              {/* Account / Login button */}
              <Link
                to={user && user.role !== 'admin' ? '/profile' : '/auth'}
                className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-xl text-gray-800 hover:text-black bg-milky-100 hover:bg-gray-100/80 border border-gray-200/60 transition-colors text-xs sm:text-sm font-bold"
              >
                {user && user.role !== 'admin' ? (
                  <div className="flex items-center gap-1.5">
                    <div className="w-6 h-6 sm:w-7 sm:h-7 bg-black text-white rounded-full flex items-center justify-center text-[10px] sm:text-xs font-bold uppercase">
                      {user.name?.[0] || 'U'}
                    </div>
                    <span className="hidden sm:inline text-xs font-bold truncate max-w-[90px]">{user.name}</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-1">
                    <User size={18} strokeWidth={2.2} />
                    <span className="text-xs font-bold uppercase tracking-wider">Login</span>
                  </div>
                )}
              </Link>

              {/* Wishlist Link (Desktop) */}
              <Link
                to={user ? '/profile' : '/auth'}
                className="p-2 text-gray-700 hover:text-black hover:bg-milky-100 rounded-xl transition-colors hidden sm:flex items-center"
                title="Wishlist"
              >
                <Heart size={20} strokeWidth={1.8} />
              </Link>

              {/* Cart Button */}
              <button
                onClick={toggleCart}
                className="flex items-center gap-1.5 sm:gap-2 bg-black text-white px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs font-bold uppercase tracking-wider hover:bg-gray-800 transition-all shadow-sm flex-shrink-0"
              >
                <ShoppingBag size={17} strokeWidth={2} />
                <span className="hidden sm:inline">Bag</span>
                <span className="bg-transparent text-black px-1.5 py-0.2 rounded-full text-[10px] sm:text-[11px] font-black">
                  {itemCount}
                </span>
              </button>
            </div>

          </div>

          {/* Mobile Search Bar Row */}
          <div className="pb-2.5 md:hidden">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products, categories..."
                className="w-full bg-milky-100 text-gray-900 placeholder-gray-400 text-xs pl-10 pr-20 py-2.5 rounded-full border border-gray-200 focus:outline-none focus:border-black"
              />
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <button
                type="submit"
                className="absolute right-1.5 top-1/2 -translate-y-1/2 bg-black text-white text-[11px] font-bold px-3 py-1 rounded-full"
              >
                Search
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Secondary Category Navigation Strip (Desktop) */}
      <div className="hidden md:block bg-milky-100 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-2 text-xs font-bold uppercase tracking-wider">
            <div className="flex items-center gap-8">
              <Link
                to="/"
                className={`py-1 transition-colors ${
                  location.pathname === '/' ? 'text-black border-b-2 border-black font-extrabold' : 'text-gray-600 hover:text-black'
                }`}
              >
                Home
              </Link>
              <Link
                to="/shop"
                className={`py-1 transition-colors ${
                  location.pathname === '/shop' ? 'text-black border-b-2 border-black font-extrabold' : 'text-gray-600 hover:text-black'
                }`}
              >
                All Cosmetics
              </Link>
              {navCategories.map((cat) => (
                <Link
                  key={cat.name}
                  to={cat.path}
                  className={`py-1 transition-colors ${
                    location.pathname === cat.path ? 'text-black border-b-2 border-black font-extrabold' : 'text-gray-600 hover:text-black'
                  }`}
                >
                  {cat.name}
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-6 text-gray-500 font-medium">
              <Link to="/about" className="hover:text-black transition-colors">Our Story</Link>
              <Link to="/contact" className="hover:text-black transition-colors">Customer Help</Link>
              <span className="text-emerald-700 font-bold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                100% Authentic Products
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
