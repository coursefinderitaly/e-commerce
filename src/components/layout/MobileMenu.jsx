import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const links = [
  { name: 'Home', path: '/' },
  { 
    name: 'All Cosmetics', 
    path: '/shop',
    children: [
      { name: 'Skincare', path: '/shop/Skincare' },
      { name: 'Makeup', path: '/shop/Makeup' },
      { name: 'Fragrance', path: '/shop/Fragrance' },
    ]
  },
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
            className="fixed top-0 right-0 bottom-0 w-80 bg-ink/95 backdrop-blur-xl border-l border-paper/10 z-50 lg:hidden overflow-y-auto"
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
                      to={link.path}
                      onClick={() => onClose()}
                      className="flex justify-between items-center py-3 px-4 rounded-lg font-body text-lg transition-colors text-bone/80 hover:text-bone hover:bg-bone/5"
                    >
                      {link.name}
                    </Link>
                    {link.children && (
                      <div className="pl-6 space-y-1 mt-1 border-l-2 border-bone/10 ml-6">
                        {link.children.map(child => (
                          <Link
                            key={child.path}
                            to={child.path}
                            onClick={() => onClose()}
                            className="block py-2 px-4 rounded-lg font-body text-base transition-colors text-bone/60 hover:text-bone hover:bg-bone/5"
                          >
                            {child.name}
                          </Link>
                        ))}
                      </div>
                    )}
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
