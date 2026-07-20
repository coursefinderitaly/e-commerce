import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home } from 'lucide-react';
import Button from '../components/ui/Button';

export default function NotFound() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-transparent flex items-center justify-center pt-20"
    >
      <div className="text-center px-4">
        <p className="font-display text-[8rem] sm:text-[10rem] text-paper/5 font-bold leading-none">404</p>
        <h1 className="font-display text-3xl md:text-4xl text-paper mt-[-1rem] mb-3">Page Not Found</h1>
        <p className="font-body text-paper/50 mb-8 max-w-sm mx-auto">
          Looks like this page wandered off. Let&apos;s get you back on track.
        </p>
        <Link to="/">
          <Button variant="primary" size="lg">
            <Home size={18} /> Back to Home
          </Button>
        </Link>
      </div>
    </motion.div>
  );
}
