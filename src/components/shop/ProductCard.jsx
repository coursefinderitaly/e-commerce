import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingBag, Check, Star, Heart } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { formatCurrency } from '../../utils/formatCurrency';
import OptimizedImage from '../ui/OptimizedImage';

export default function ProductCard({ product }) {
  const [added, setAdded] = useState(false);
  const [wishlisted, setWishlisted] = useState(false);
  const { addItem } = useCart();
  const hasDiscount = product.originalPrice && product.originalPrice > product.price;
  const discountPercent = hasDiscount
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images?.[0] || 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=600&q=80',
      category: product.category,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setWishlisted(!wishlisted);
  };

  return (
    <Link to={`/product/${product.id}`} className="group block h-full">
      <div className="bg-milky-50 rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full relative">
        
        {/* Product Image Box */}
        <div className="relative overflow-hidden aspect-square bg-milky-100 flex-shrink-0">
          <OptimizedImage
            src={product.images?.[0] || 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=600&q=80'}
            alt={product.name}
            width={450}
            quality={80}
            containerClassName="w-full h-full"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />

          {/* Badges */}
          <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-10">
            {hasDiscount && (
              <span className="bg-rose-600 text-white text-[10px] font-black uppercase px-2 py-0.5 rounded-md shadow-sm">
                -{discountPercent}% OFF
              </span>
            )}
            {product.featured && (
              <span className="bg-black text-white text-[10px] font-bold uppercase px-2 py-0.5 rounded-md shadow-sm">
                Bestseller
              </span>
            )}
          </div>

          {/* Wishlist Button */}
          <button
            onClick={handleWishlist}
            aria-label="Wishlist"
            className="absolute top-2.5 right-2.5 p-2 rounded-full bg-milky-50/90 hover:bg-milky-50 text-gray-700 hover:text-rose-600 shadow-sm transition-all z-10"
          >
            <Heart
              size={16}
              className={wishlisted ? 'fill-rose-600 text-rose-600' : ''}
            />
          </button>

          {/* Quick Add To Bag overlay button on hover */}
          <div className="absolute bottom-2 inset-x-2 hidden sm:block opacity-0 group-hover:opacity-100 transition-all duration-200 z-10">
            <button
              onClick={handleAdd}
              className={`w-full py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-all ${
                added
                  ? 'bg-emerald-600 text-white'
                  : 'bg-black text-white hover:bg-gray-900'
              }`}
            >
              {added ? (
                <>
                  <Check size={16} /> Added
                </>
              ) : (
                <>
                  <ShoppingBag size={16} /> Add to Bag
                </>
              )}
            </button>
          </div>

          {/* Mobile quick add button */}
          <button
            onClick={handleAdd}
            aria-label="Add to cart"
            className={`sm:hidden absolute bottom-2.5 right-2.5 p-2.5 rounded-full shadow-md z-10 transition-colors ${
              added ? 'bg-emerald-600 text-white' : 'bg-black text-white'
            }`}
          >
            {added ? <Check size={16} /> : <ShoppingBag size={16} />}
          </button>
        </div>

        {/* Content */}
        <div className="p-3.5 sm:p-4 flex flex-col flex-1 justify-between">
          <div>
            <span className="text-[10px] sm:text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1">
              {product.category}
            </span>
            <h3 className="font-body font-bold text-gray-900 text-xs sm:text-sm line-clamp-2 mb-1.5 group-hover:text-rose-600 transition-colors leading-snug">
              {product.name}
            </h3>
          </div>

          <div>
            {/* Rating */}
            <div className="flex items-center gap-1.5 mb-2">
              <div className="flex items-center gap-0.5 bg-amber-50 text-amber-900 border border-amber-200/60 px-1.5 py-0.5 rounded text-[10px] font-black">
                <span>{product.rating}</span>
                <Star size={10} className="fill-amber-500 text-amber-500" />
              </div>
              <span className="text-[11px] text-gray-400 font-medium">({product.reviews})</span>
            </div>

            {/* Price Row */}
            <div className="flex items-baseline gap-2">
              <span className="font-display font-black text-black text-base sm:text-lg">
                {formatCurrency(product.price)}
              </span>
              {hasDiscount && (
                <span className="text-xs text-gray-400 line-through font-medium">
                  {formatCurrency(product.originalPrice)}
                </span>
              )}
            </div>
          </div>

        </div>

      </div>
    </Link>
  );
}
