import { Link } from 'react-router-dom';
import { categoryConfig } from '../../utils/categoryConfig';

const categories = ['All', 'Skincare', 'Makeup', 'Fragrance'];

export default function FilterSidebar({ activeCategory, onCategoryChange }) {
  return (
    <aside className="space-y-6">
      <div>
        <h3 className="font-body text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Categories</h3>
        <div className="space-y-1">
          {categories.map((cat) => {
            const isActive = cat === 'All' ? !activeCategory : activeCategory === cat;
            const cfg = categoryConfig[cat];
            return (
              <Link
                key={cat}
                to={cat === 'All' ? '/shop' : `/shop/${cat}`}
                onClick={() => onCategoryChange(cat === 'All' ? '' : cat)}
                className={`flex items-center gap-2 w-full px-3 py-2 rounded-lg text-sm font-body transition-colors ${
                  isActive
                    ? 'bg-gray-900 text-white font-semibold'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                {cfg && (
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: cfg.fill }} />
                )}
                {cat}
              </Link>
            );
          })}
        </div>
      </div>
    </aside>
  );
}
