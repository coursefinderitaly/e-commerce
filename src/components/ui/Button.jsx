import { motion } from 'framer-motion';

const variants = {
  primary: 'bg-gray-900 text-white hover:bg-gray-900',
  secondary: 'bg-transparent border-2 border-gray-200 text-gray-900 hover:bg-gray-100 hover:text-white',
  outline: 'bg-transparent border border-gray-200 text-gray-900 hover:border-gray-200',
  ghost: 'bg-transparent text-gray-900 hover:bg-gray-100',
  sage: 'bg-green-500 text-white hover:bg-green-500/90',
};

const sizes = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-8 py-3 text-base',
  xl: 'px-10 py-4 text-lg',
};

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  onClick,
  type = 'button',
  ...props
}) {
  return (
    <motion.button
      whileHover={!disabled ? { scale: 1.02 } : {}}
      whileTap={!disabled ? { scale: 0.98 } : {}}
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`font-body font-semibold rounded-lg transition-colors duration-200 inline-flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
}
