import { Link } from 'react-router-dom';
import { categoryConfig } from '../../utils/categoryConfig';

const categories = ['All', 'Skincare', 'Makeup', 'Fragrance'];

export default function FilterSidebar({ activeCategory, onCategoryChange }) {
  return (
    <aside className="space-y-6">
      <div>
        <h3 className="font-body text-xs font-semibold text-paper/40 uppercase tracking-wider mb-3">Categories</h3>
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
                    ? 'bg-paper text-ink font-semibold'
                    : 'text-paper/70 hover:text-paper hover:bg-paper/10'
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
