import { Link } from 'react-router-dom';
import { categoryConfig, matchCategory } from '../../utils/categoryConfig';

const categories = [
  { name: 'All Products', slug: 'All' },
  { name: 'Hair Care', slug: 'Hair' },
  { name: 'Skin Care', slug: 'Skin' },
  { name: 'Body Care', slug: 'Body' },
  { name: 'Face & Glow', slug: 'Face' },
  { name: 'Makeup', slug: 'Makeup' },
  { name: 'Fragrance', slug: 'Fragrance' },
];

export default function FilterSidebar({ activeCategory, onCategoryChange }) {
  return (
    <aside className="space-y-6">
      <div>
        <h3 className="font-body text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Categories</h3>
        <div className="space-y-1">
          {categories.map((cat) => {
            const isActive = cat.slug === 'All' ? !activeCategory : matchCategory(activeCategory, cat.slug);
            const cfg = categoryConfig[cat.slug];
            return (
              <Link
                key={cat.slug}
                to={cat.slug === 'All' ? '/shop' : `/shop/${cat.slug}`}
                onClick={() => onCategoryChange(cat.slug === 'All' ? '' : cat.slug)}
                className={`flex items-center gap-2 w-full px-3 py-2 rounded-lg text-sm font-body transition-colors ${
                  isActive
                    ? 'bg-gray-900 text-white font-semibold'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                {cfg && (
                  <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: cfg.fill }} />
                )}
                {cat.name}
              </Link>
            );
          })}
        </div>
      </div>
    </aside>
  );
}
