import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatCurrency } from '../utils/formatCurrency';
import { categoryConfig } from '../utils/categoryConfig';
import Button from '../components/ui/Button';
import OptimizedImage from '../components/ui/OptimizedImage';

export default function Cart() {
  const { items, removeItem, updateQuantity, subtotal, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen bg-transparent pt-24 pb-16 flex items-center justify-center"
      >
        <div className="text-center max-w-md mx-auto px-4">
          <ShoppingBag size={64} className="mx-auto text-gray-900 mb-6" />
          <h1 className="font-display text-3xl text-gray-900 mb-2">Your bag is empty</h1>
          <p className="font-body text-gray-500 mb-8">Time to find something you love.</p>
          <Link to="/shop">
            <Button variant="primary" size="lg">
              <ArrowLeft size={18} /> Start Shopping
            </Button>
          </Link>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-transparent pt-24 pb-16"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="font-display text-3xl md:text-4xl text-gray-900">Your Bag ({items.length})</h1>
          <button onClick={clearCart} className="text-sm font-body text-gray-500 hover:text-red-500 transition-colors">
            Clear all
          </button>
        </div>

        <div className="space-y-4">
          {items.map((item) => {
            const cfg = categoryConfig[item.category];
            return (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-transparent rounded-xl p-4 border border-gray-100 flex gap-4"
              >
                <OptimizedImage src={item.image} alt={item.name} width={200} containerClassName="w-24 h-28 rounded-lg flex-shrink-0" className="w-full h-full object-cover" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-body font-semibold text-gray-900">{item.name}</h3>
                      <p className="text-xs font-medium" style={{ color: cfg.fill }}>{item.category}</p>
                    </div>
                    <p className="font-body font-semibold text-gray-900">{formatCurrency(item.price * item.quantity)}</p>
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center border border-gray-200 rounded-lg">
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-2 hover:bg-gray-100">
                        <Minus size={14} />
                      </button>
                      <span className="px-4 font-mono text-sm">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-2 hover:bg-gray-100">
                        <Plus size={14} />
                      </button>
                    </div>
                    <button onClick={() => removeItem(item.id)} className="text-gray-900 hover:text-red-500 transition-colors p-1">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-8 bg-transparent rounded-xl p-6 border border-gray-100">
          <div className="space-y-2 mb-4">
            <div className="flex justify-between font-body text-sm text-gray-600">
              <span>Subtotal</span>
              <span>{formatCurrency(subtotal)}</span>
            </div>
            <div className="flex justify-between font-body text-sm text-gray-600">
              <span>Shipping</span>
              <span>Calculated at checkout</span>
            </div>
            <div className="border-t border-gray-100 pt-2 flex justify-between font-body font-semibold text-gray-900">
              <span>Estimated Total</span>
              <span>{formatCurrency(subtotal)}</span>
            </div>
          </div>
          <Link to="/checkout">
            <Button variant="primary" size="lg" className="w-full">
              Proceed to Checkout
            </Button>
          </Link>
          <Link to="/shop" className="block text-center text-sm font-body text-gray-500 hover:text-gray-900 mt-3 transition-colors">
            Continue Shopping
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
