export default function Badge({ children, variant = 'default', className = '' }) {
  const styles = {
    default: 'bg-gray-100 text-gray-800',
    rust: 'bg-orange-100 text-orange-800 border-orange-200',
    indigo: 'bg-indigo-100 text-indigo-800 border-indigo-200',
    berry: 'bg-pink-100 text-pink-800 border-pink-200',
    sage: 'bg-green-100 text-green-800 border-green-200',
    sale: 'bg-red-600 text-white border-transparent shadow-sm',
    dark: 'bg-gray-900 text-white border-transparent shadow-sm',
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] uppercase tracking-wider font-bold border ${styles[variant]} ${className}`}>
      {children}
    </span>
  );
}
