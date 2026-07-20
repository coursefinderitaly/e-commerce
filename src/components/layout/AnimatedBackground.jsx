import { motion } from 'framer-motion';

export default function AnimatedBackground() {
  return (
    <div className="fixed inset-0 -z-50 overflow-hidden bg-gradient-to-br from-[var(--theme-bg1)] to-[var(--theme-bg2)] transition-colors duration-1000">
      <motion.div
        className="absolute rounded-full blur-[140px] mix-blend-screen opacity-60 w-[700px] h-[700px] top-[-10%] left-[-10%] transition-colors duration-1000"
        style={{ backgroundColor: 'var(--theme-blob1)' }}
        animate={{
          x: [0, 500, -200, 0],
          y: [0, -300, 300, 0],
          scale: [1, 1.3, 0.8, 1],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div
        className="absolute rounded-full blur-[140px] mix-blend-screen opacity-50 w-[600px] h-[600px] bottom-[-10%] right-[-10%] transition-colors duration-1000"
        style={{ backgroundColor: 'var(--theme-blob2)' }}
        animate={{
          x: [0, -400, 300, 0],
          y: [0, 400, -200, 0],
          scale: [1, 1.5, 0.9, 1],
        }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div
        className="absolute rounded-full blur-[140px] mix-blend-screen opacity-40 w-[800px] h-[800px] top-[40%] left-[30%] transition-colors duration-1000"
        style={{ backgroundColor: 'var(--theme-blob3)' }}
        animate={{
          x: [0, 300, -400, 0],
          y: [0, 200, -400, 0],
          scale: [1, 0.9, 1.4, 1],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
      />

      {/* Luxury noise texture overlay */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.04] mix-blend-overlay pointer-events-none"></div>
    </div>
  );
}
