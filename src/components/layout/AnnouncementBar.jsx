import { useState } from 'react';
import { Sparkles, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AnnouncementBar() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 50, opacity: 0 }}
        className="fixed bottom-16 md:bottom-0 left-0 w-full bg-black text-white text-xs font-medium py-3 px-4 z-[60] shadow-[0_-4px_20px_rgba(0,0,0,0.15)]"
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
