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

export function matchCategory(productCat = '', targetCat = '') {
  if (!targetCat || targetCat === 'All' || targetCat === 'all' || targetCat === '') return true;
  if (!productCat) return false;

  const p = productCat.toLowerCase().trim();
  const t = targetCat.toLowerCase().trim();

  if (p === t) return true;

  // Hair matching
  if ((t.includes('hair') || t === 'haircare') && (p.includes('hair') || p === 'haircare')) return true;

  // Skin matching
  if ((t.includes('skin') || t === 'skincare') && (p.includes('skin') || p === 'skincare')) return true;

  // Body matching
  if ((t.includes('body') || t === 'bodycare') && (p.includes('body') || p === 'bodycare')) return true;

  // Face / Glow / Makeup matching
  if ((t.includes('face') || t.includes('glow')) && (p.includes('face') || p.includes('glow') || p.includes('makeup'))) return true;
  if (t === 'makeup' && (p.includes('makeup') || p.includes('face') || p.includes('lips'))) return true;
  if (t === 'fragrance' && (p.includes('fragrance') || p.includes('perfume') || p.includes('scent'))) return true;

  return p.includes(t) || t.includes(p);
}
