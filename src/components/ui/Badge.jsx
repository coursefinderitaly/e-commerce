export default function Badge({ children, variant = 'default', className = '' }) {
  const styles = {
    default: 'bg-paper/10 text-paper',
    rust: 'bg-rust/10 text-rust border-rust/20',
    indigo: 'bg-indigo/10 text-indigo border-indigo/20',
    berry: 'bg-berry/10 text-berry border-berry/20',
    sage: 'bg-sage/10 text-sage border-sage/20',
    sale: 'bg-red-500/10 text-red-600 border-red-500/20',
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${styles[variant]} ${className}`}>
      {children}
    </span>
  );
}
