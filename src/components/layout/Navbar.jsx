import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Menu, X, ChevronDown } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import MobileMenu from './MobileMenu';
import ThemeSwitcher from './ThemeSwitcher';
import { categoryConfig } from '../../utils/categoryConfig';

const navLinks = [
  { name: 'Home', path: '/' },
  {
    name: 'Shop',
    path: '/shop',
    children: [
      { name: 'All Cosmetics', path: '/shop' },
      { name: 'Skincare', path: '/shop/Skincare' },
      { name: 'Makeup', path: '/shop/Makeup' },
      { name: 'Fragrance', path: '/shop/Fragrance' },
      { name: 'Fashion', path: '#', comingSoon: true },
      { name: 'Clothing', path: '#', comingSoon: true },
    ],
  },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const { itemCount, toggleCart } = useCart();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setMegaOpen(false);
    setScrolled(location.pathname !== '/');
  }, [location]);

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  const getCategoryColor = (path) => {
    const cat = path.split('/').pop();
    const cfg = categoryConfig[cat];
    return cfg ? cfg.color : 'ink';
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 100, damping: 20 }}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled ? 'bg-ink/80 backdrop-blur-md shadow-lg py-2' : 'bg-transparent py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <img src="/logo1.webp" alt="Glam AURA" className="h-16 w-auto" decoding="async" fetchPriority="high" />
            </Link>

            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) =>
                link.children ? (
                  <div
                    key={link.name}
                    className="relative"
                    onMouseEnter={() => setMegaOpen(true)}
                    onMouseLeave={() => setMegaOpen(false)}
                  >
                    <Link
                      to={link.path}
                      className={`font-body text-sm font-semibold tracking-wide transition-colors flex items-center gap-1 ${
                        isActive(link.path) ? 'text-bone' : 'text-bone/70 hover:text-bone'
                      }`}
                    >
                      {link.name}
                      <ChevronDown size={14} className={`transition-transform ${megaOpen ? 'rotate-180' : ''}`} />
                    </Link>
                    <AnimatePresence>
                      {megaOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-48 bg-transparent rounded-xl shadow-2xl p-2 border border-paper/10"
                        >
                          {link.children.map((child) => (
                            <Link
                              key={child.name}
                              to={child.comingSoon ? '#' : child.path}
                              onClick={(e) => {
                                if (child.comingSoon) e.preventDefault();
                                else setMegaOpen(false);
                              }}
                              className={`block px-4 py-2.5 rounded-lg font-body text-sm transition-colors ${
                                child.comingSoon
                                  ? 'text-paper/40 cursor-not-allowed flex justify-between items-center'
                                  : isActive(child.path)
                                  ? `bg-${getCategoryColor(child.path)}/10 ${getCategoryColor(child.path)} font-semibold`
                                  : 'text-paper/70 hover:text-paper hover:bg-paper/10'
                              }`}
                            >
                              {child.name}
                              {child.comingSoon && (
                                <span className="text-[10px] uppercase tracking-wider bg-paper/10 text-paper/60 px-2 py-0.5 rounded-full ml-2">
                                  Soon
                                </span>
                              )}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`font-body text-sm font-semibold tracking-wide transition-colors relative ${
                      isActive(link.path) ? 'text-bone' : 'text-bone/70 hover:text-bone'
                    }`}
                  >
                    {link.name}
                    {isActive(link.path) && (
                      <motion.div
                        layoutId="nav-underline"
                        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-bone rounded-full"
                      />
                    )}
                  </Link>
                )
              )}
            </div>

            <div className="flex items-center gap-2 sm:gap-4">
              <ThemeSwitcher variant="inline" className="sm:hidden mr-1" />
              <button
                onClick={toggleCart}
                className="relative p-2 text-bone/70 hover:text-bone transition-colors"
              >
                <ShoppingBag size={20} />
                {itemCount > 0 && (
                  <motion.span
                    key={itemCount}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-0.5 -right-0.5 bg-sage text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center"
                  >
                    {itemCount}
                  </motion.span>
                )}
              </button>
              <button
                className="lg:hidden p-2 text-bone/70 hover:text-bone transition-colors"
                onClick={() => setMobileOpen(true)}
              >
                <Menu size={22} />
              </button>
            </div>
          </div>
        </div>
      </motion.nav>
      <MobileMenu isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
