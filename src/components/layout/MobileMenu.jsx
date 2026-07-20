import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const links = [
  { name: 'Home', path: '/' },
  { name: 'All Cosmetics', path: '/shop' },
  { name: 'Skincare', path: '/shop/Skincare' },
  { name: 'Makeup', path: '/shop/Makeup' },
  { name: 'Fragrance', path: '/shop/Fragrance' },
  { name: 'Fashion', path: '#', comingSoon: true },
  { name: 'Clothing', path: '#', comingSoon: true },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' },
];

export default function MobileMenu({ isOpen, onClose }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 lg:hidden"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 w-80 bg-transparent z-50 lg:hidden"
          >
            <div className="p-6">
              <button onClick={onClose} className="text-bone/70 hover:text-bone mb-8">
                <X size={24} />
              </button>
              <nav className="space-y-1">
                {links.map((link, i) => (
                  <motion.div
                    key={link.path}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link
                      to={link.comingSoon ? '#' : link.path}
                      onClick={(e) => {
                        if (link.comingSoon) e.preventDefault();
                        else onClose();
                      }}
                      className={`flex justify-between items-center py-3 px-4 rounded-lg font-body text-lg transition-colors ${
                        link.comingSoon
                          ? 'text-bone/40 cursor-not-allowed'
                          : 'text-bone/80 hover:text-bone hover:bg-bone/5'
                      }`}
                    >
                      {link.name}
                      {link.comingSoon && (
                        <span className="text-xs uppercase tracking-wider bg-bone/10 text-bone/60 px-2 py-1 rounded-full">
                          Coming Soon
                        </span>
                      )}
                    </Link>
                  </motion.div>
                ))}
              </nav>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
