import { Link, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, Package, ArrowLeft } from 'lucide-react';
import Button from '../components/ui/Button';

export default function OrderConfirmation() {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get('orderId') || 'GA-UNKNOWN';

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-transparent pt-24 pb-16 flex items-center justify-center"
    >
      <div className="max-w-md mx-auto px-4 text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', damping: 15, stiffness: 200 }}
        >
          <CheckCircle size={64} className="mx-auto text-sage mb-6" />
        </motion.div>
        <h1 className="font-display text-3xl md:text-4xl text-paper mb-3">Order Confirmed!</h1>
        <p className="font-body text-paper/60 mb-2">
          Thank you for your order. You&apos;ll receive a confirmation email shortly.
        </p>
        <div className="bg-transparent rounded-xl p-4 border border-paper/5 mb-8 inline-block">
          <p className="font-body text-xs text-paper/40 uppercase tracking-wider mb-1">Order ID</p>
          <p className="font-mono text-lg font-semibold text-paper">{orderId}</p>
        </div>
        <div className="flex items-center justify-center gap-3 mb-8">
          <Package size={20} className="text-paper/40" />
          <p className="font-body text-sm text-paper/50">Estimated delivery: 5–8 business days</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/shop">
            <Button variant="primary" size="lg">
              Continue Shopping
            </Button>
          </Link>
          <Link to="/">
            <Button variant="outline" size="lg">
              <ArrowLeft size={18} /> Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
