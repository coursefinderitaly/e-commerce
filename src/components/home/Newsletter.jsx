import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Check } from 'lucide-react';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { validateEmail } from '../../utils/validators';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const { ref, isVisible } = useScrollReveal();

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
    <section ref={ref} className="py-24 bg-transparent relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-rust rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-xl mx-auto text-center"
        >
          <p className="font-body text-bone/40 text-sm tracking-[0.2em] uppercase mb-3">Stay Connected</p>
          <h2 className="font-display text-4xl md:text-5xl text-bone mb-4">Join the AURA</h2>
          <p className="font-body text-bone/60 mb-8">
            Be the first to know about new collections, exclusive drops, and only perks.
          </p>

          {submitted ? (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="flex items-center justify-center gap-2 text-sage font-body font-semibold"
            >
              <Check size={20} />
              <span>You&apos;re in! Welcome to the AURA.</span>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <div className="flex-1">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setError(''); }}
                  placeholder="Your email address"
                  className="w-full px-4 py-3 bg-paper/10 border border-bone/20 rounded-lg text-bone placeholder:text-bone/30 font-body text-sm focus:outline-none focus:border-bone/50 transition-colors"
                />
                {error && <p className="text-red-400 text-xs mt-1 text-left">{error}</p>}
              </div>
              <button
                type="submit"
                className="bg-transparent text-paper px-6 py-3 rounded-lg font-body font-semibold text-sm hover:bg-bone/90 transition-colors flex items-center justify-center gap-2"
              >
                Subscribe <Send size={16} />
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
