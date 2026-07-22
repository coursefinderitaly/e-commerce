import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingBag, Check, Star } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { formatCurrency } from '../../utils/formatCurrency';
import { categoryConfig } from '../../utils/categoryConfig';
import OptimizedImage from '../ui/OptimizedImage';
import Badge from '../ui/Badge';

export default function ProductCard({ product }) {
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();
  const cfg = categoryConfig[product.category];
  const hasDiscount = product.originalPrice && product.originalPrice > product.price;

  const handleAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({ id: product.id, name: product.name, price: product.price, image: product.images[0], category: product.category });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <Link to={`/product/${product.id}`} className="group block">
      <motion.div
        whileHover={{ y: -4 }}
        className="bg-transparent rounded-xl overflow-hidden border border-paper/5 shadow-sm hover:shadow-lg transition-shadow duration-300"
      >
        <div className="relative overflow-hidden aspect-[3/4]">
          <div className="absolute top-0 left-0 right-0 h-[3px] z-10" style={{ backgroundColor: cfg.fill }} />
          <OptimizedImage
            src={product.images[0]}
            alt={product.name}
            width={450}
            quality={75}
            containerClassName="w-full h-full"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            {hasDiscount && <Badge variant="sale">Sale</Badge>}
            {product.featured && <Badge variant="sage">Featured</Badge>}
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleAdd}
            className={`absolute bottom-3 right-3 p-2.5 rounded-full shadow-lg transition-colors ${
              added
                ? 'bg-sage text-white'
                : 'bg-transparent text-paper hover:bg-paper/10 hover:text-white'
            }`}
          >
            {added ? <Check size={18} /> : <ShoppingBag size={18} />}
          </motion.button>
        </div>
        <div className="p-4">
          <p className="text-xs font-medium font-body" style={{ color: cfg.fill }}>{product.category}</p>
          <h3 className="font-body font-semibold text-paper mt-1 mb-1 truncate">{product.name}</h3>
          <div className="flex items-center gap-1 mb-2">
            <Star size={12} className="text-amber-400 fill-amber-400" />
            <span className="text-xs text-paper/50 font-body">{product.rating} ({product.reviews})</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-body font-semibold text-paper">{formatCurrency(product.price)}</span>
            {hasDiscount && (
              <span className="font-body text-sm text-paper/40 line-through">{formatCurrency(product.originalPrice)}</span>
            )}
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
