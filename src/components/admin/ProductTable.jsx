import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Edit2, Trash2, ChevronDown } from 'lucide-react';
import { categoryConfig } from '../../utils/categoryConfig';
import { formatCurrency } from '../../utils/formatCurrency';

export default function ProductTable({ products, onEdit, onDelete, categories }) {
  const [search, setSearch] = useState('');
  const [filterCat, setFilterCat] = useState('');

  const filtered = products.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchCat = !filterCat || p.category === filterCat;
    return matchSearch && matchCat;
  });

  return (
    <div>
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-paper/30" />
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-transparent border border-paper/10 rounded-lg font-body text-sm focus:outline-none focus:border-paper/30"
          />
        </div>
        <div className="relative">
          <select
            value={filterCat}
            onChange={(e) => setFilterCat(e.target.value)}
            className="appearance-none bg-transparent border border-paper/10 rounded-lg px-4 py-2.5 pr-10 font-body text-sm focus:outline-none focus:border-paper/30"
          >
            <option value="">All Categories</option>
            {categories.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-paper/30 pointer-events-none" />
        </div>
      </div>

      <div className="bg-transparent rounded-xl border border-paper/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-paper/5 bg-paper/5">
                <th className="text-left px-4 py-3 font-mono text-xs text-paper/50 uppercase tracking-wider">Product</th>
                <th className="text-left px-4 py-3 font-mono text-xs text-paper/50 uppercase tracking-wider">Category</th>
                <th className="text-left px-4 py-3 font-mono text-xs text-paper/50 uppercase tracking-wider">Price</th>
                <th className="text-left px-4 py-3 font-mono text-xs text-paper/50 uppercase tracking-wider">Stock</th>
                <th className="text-right px-4 py-3 font-mono text-xs text-paper/50 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((product, i) => {
                const cfg = categoryConfig[product.category];
                return (
                  <motion.tr
                    key={product.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.03 }}
                    className="border-b border-paper/5 last:border-0 hover:bg-paper/10 transition-colors"
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <img src={product.images[0]} alt={product.name} className="w-10 h-12 object-cover rounded" />
                        <span className="font-body text-sm text-paper font-medium">{product.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className="inline-block px-2.5 py-1 rounded-full text-xs font-mono font-semibold"
                        style={{ backgroundColor: `${cfg.fill}15`, color: cfg.fill }}
                      >
                        {product.category}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-mono text-sm text-paper">{formatCurrency(product.price)}</td>
                    <td className="px-4 py-3 font-mono text-sm text-paper">{product.stock}</td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button onClick={() => onEdit(product)} className="p-1.5 text-paper/30 hover:text-indigo transition-colors rounded-lg hover:bg-indigo/5">
                          <Edit2 size={16} />
                        </button>
                        <button onClick={() => onDelete(product)} className="p-1.5 text-paper/30 hover:text-red-500 transition-colors rounded-lg hover:bg-red-50">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div className="text-center py-12">
            <p className="font-body text-paper/30">No products found</p>
          </div>
        )}
      </div>
    </div>
  );
}
