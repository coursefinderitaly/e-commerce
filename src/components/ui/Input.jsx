import { forwardRef } from 'react';

const Input = forwardRef(({ label, error, className = '', ...props }, ref) => (
  <div className="space-y-1">
    {label && (
      <label className="block text-sm font-medium text-gray-900 font-body">
        {label}
      </label>
    )}
    <input
      ref={ref}
      className={`w-full px-4 py-2.5 bg-transparent border rounded-lg font-body text-sm transition-colors duration-200 placeholder:text-gray-900 focus:outline-none focus:ring-2 focus:ring-paper/20 focus:border-gray-200 ${error ? 'border-red-400' : 'border-gray-200'} ${className}`}
      {...props}
    />
    {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
  </div>
));

Input.displayName = 'Input';

export default Input;
