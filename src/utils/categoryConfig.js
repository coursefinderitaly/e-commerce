const baseConfig = {
  Hair: { color: 'gray', bg: 'bg-gray-100', border: 'border-gray-200', text: 'text-gray-800', fill: '#4B5563' },
  Haircare: { color: 'gray', bg: 'bg-gray-100', border: 'border-gray-200', text: 'text-gray-800', fill: '#4B5563' },
  Skin: { color: 'stone', bg: 'bg-stone-100', border: 'border-stone-200', text: 'text-stone-800', fill: '#57534E' },
  Skincare: { color: 'stone', bg: 'bg-stone-100', border: 'border-stone-200', text: 'text-stone-800', fill: '#57534E' },
  Body: { color: 'zinc', bg: 'bg-zinc-100', border: 'border-zinc-200', text: 'text-zinc-800', fill: '#52525B' },
  Bodycare: { color: 'zinc', bg: 'bg-zinc-100', border: 'border-zinc-200', text: 'text-zinc-800', fill: '#52525B' },
  Face: { color: 'slate', bg: 'bg-slate-100', border: 'border-slate-200', text: 'text-slate-800', fill: '#475569' },
  Makeup: { color: 'amber', bg: 'bg-amber-100', border: 'border-amber-200', text: 'text-amber-800', fill: '#B2502B' },
  Fragrance: { color: 'purple', bg: 'bg-purple-100', border: 'border-purple-200', text: 'text-purple-800', fill: '#7E22CE' },
};

const defaultConfig = {
  color: 'amber',
  bg: 'bg-amber-100',
  border: 'border-amber-200',
  text: 'text-amber-800',
  fill: '#D97706',
};

export const categoryConfig = new Proxy(baseConfig, {
  get: (target, prop) => {
    if (typeof prop === 'string' && prop in target) {
      return target[prop];
    }
    return defaultConfig;
  }
});
