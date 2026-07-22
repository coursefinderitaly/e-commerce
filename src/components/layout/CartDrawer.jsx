import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { formatCurrency } from '../../utils/formatCurrency';
import { categoryConfig } from '../../utils/categoryConfig';

import OptimizedImage from '../ui/OptimizedImage';

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, subtotal, clearCart } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50"
            onClick={closeCart}
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-ink/95 backdrop-blur-xl shadow-2xl z-50 flex flex-col border-l border-paper/10"
          >
            <div className="flex items-center justify-between p-4 border-b border-paper/10">
              <h2 className="font-display text-lg">Your Bag ({items.length})</h2>
              <button onClick={closeCart} className="p-1 hover:bg-paper/10 rounded-full transition-colors">
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center gap-4">
                  <ShoppingBag size={48} className="text-paper/20" />
                  <div>
                    <p className="font-display text-xl mb-1">Your bag is empty</p>
                    <p className="text-paper/60 text-sm font-body">Time to find something you love.</p>
                  </div>
                  <Link
                    to="/shop"
                    onClick={closeCart}
                    className="bg-paper text-ink px-6 py-2.5 rounded-lg font-body font-semibold text-sm hover:bg-paper/90 transition-colors"
                  >
                    Start Shopping
                  </Link>
                </div>
              ) : (
                items.map((item) => {
                  const cfg = categoryConfig[item.category] || { text: 'text-bone/50' };
                  return (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex gap-3 bg-transparent rounded-lg p-3 border border-paper/5"
                    >
                      <OptimizedImage
                        src={item.image}
                        alt={item.name}
                        width={160}
                        containerClassName="w-20 h-24 rounded-md"
                        className="w-full h-full object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <p className="font-body text-sm font-semibold truncate">{item.name}</p>
                            <span className={`text-xs font-medium ${cfg.text}`}>{item.category}</span>
                          </div>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-paper/30 hover:text-red-500 transition-colors flex-shrink-0"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center border border-paper/20 rounded-lg">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="p-1.5 hover:bg-paper/10 transition-colors"
                            >
                              <Minus size={14} />
                            </button>
                            <span className="px-3 font-mono text-sm min-w-[2rem] text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="p-1.5 hover:bg-paper/10 transition-colors"
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                          <p className="font-body font-semibold text-sm">{formatCurrency(item.price * item.quantity)}</p>
                        </div>
                      </div>
                    </motion.div>
                  );
                })
              )}
            </div>

            {items.length > 0 && (
              <div className="border-t border-paper/10 p-4 space-y-3">
                <div className="flex items-center justify-between font-body">
                  <span className="text-paper/60 text-sm">Subtotal</span>
                  <span className="font-semibold">{formatCurrency(subtotal)}</span>
                </div>
                <p className="text-xs text-paper/40">Shipping & taxes calculated at checkout</p>
                <Link
                  to="/checkout"
                  onClick={closeCart}
                  className="block w-full bg-paper text-ink text-center py-3 rounded-lg font-body font-semibold text-sm hover:bg-paper/90 transition-colors"
                >
                  Checkout
                </Link>
                <button
                  onClick={clearCart}
                  className="w-full text-center text-xs text-paper/40 hover:text-paper transition-colors font-body"
                >
                  Clear bag
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
