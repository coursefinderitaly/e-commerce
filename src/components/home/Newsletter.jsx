import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Check, Sparkles, Gift } from 'lucide-react';
import { validateEmail } from '../../utils/validators';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }
    setError('');
    setSubmitted(true);
  };

  return (
    <section className="py-12 md:py-16 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-gray-900 via-stone-900 to-black text-white p-8 sm:p-12 md:p-16 text-center shadow-xl">
          
          <div className="relative z-10 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-1.5 bg-yellow-400 text-black text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-full mb-4">
              <Gift size={13} />
              Exclusive Welcome Offer
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-white mb-3">
              Get 15% Off Your First Order
            </h2>
            <p className="text-xs sm:text-sm text-gray-300 mb-8 max-w-lg mx-auto">
              Subscribe to the Glam VIP Club for early access to drops, secret weekend flash sales, and complimentary beauty routines.
            </p>

            {submitted ? (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-transparent/10 backdrop-blur-md border border-white/20 p-6 rounded-2xl max-w-md mx-auto"
              >
                <div className="flex items-center justify-center gap-2 text-yellow-300 font-bold mb-2">
                  <Check size={20} />
                  <span>Welcome to Glam VIP!</span>
                </div>
                <p className="text-xs text-gray-200">
                  Use coupon code <strong className="font-mono bg-yellow-400 text-black px-2 py-0.5 rounded ml-1 font-black">FIRST15</strong> at checkout for 15% off!
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <div className="flex-1 text-left">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setError('');
                    }}
                    placeholder="Enter your email address..."
                    className="w-full px-5 py-3.5 bg-transparent/10 border border-white/20 rounded-full text-white placeholder:text-gray-400 text-sm focus:outline-none focus:bg-transparent focus:text-gray-900 focus:placeholder:text-gray-400 transition-all"
                  />
                  {error && <p className="text-rose-400 text-xs mt-1.5 ml-3 font-semibold">{error}</p>}
                </div>
                <button
                  type="submit"
                  className="bg-yellow-400 text-black font-bold uppercase tracking-wider text-xs px-8 py-3.5 rounded-full hover:bg-transparent transition-all shadow-md flex items-center justify-center gap-2 flex-shrink-0"
                >
                  Join & Save <Send size={14} />
                </button>
              </form>
            )}

            <p className="text-[11px] text-gray-400 mt-4">
              🔒 We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
