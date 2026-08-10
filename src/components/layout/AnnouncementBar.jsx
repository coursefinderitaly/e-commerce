import { useState } from 'react';
import { Sparkles, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AnnouncementBar() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: 'auto', opacity: 1 }}
        exit={{ height: 0, opacity: 0 }}
        className="bg-black text-white text-xs font-medium py-2 px-4 relative z-50 overflow-hidden"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex-1 text-center flex items-center justify-center gap-2">
            <Sparkles size={14} className="text-yellow-400 animate-pulse hidden sm:inline" />
            <span>
              <strong className="font-bold text-yellow-300">GLOW FESTIVAL:</strong> Flat 20% OFF on all orders over $49 | Use Code <span className="underline font-mono font-bold">GLAMAURA20</span>
            </span>
          </div>
          <button
            onClick={() => setVisible(false)}
            className="text-white/60 hover:text-white transition-colors p-1"
            aria-label="Close announcement"
          >
            <X size={14} />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
