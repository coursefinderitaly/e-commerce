import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, Minus, Plus, ShoppingBag, Star, Check } from 'lucide-react';
import { useProducts } from '../context/ProductsContext';
import { useCart } from '../context/CartContext';
import { formatCurrency } from '../utils/formatCurrency';
import { categoryConfig } from '../utils/categoryConfig';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import ProductCard from '../components/shop/ProductCard';
import OptimizedImage from '../components/ui/OptimizedImage';

export default function ProductDetail() {
  const { id } = useParams();
  const { products } = useProducts();
  const product = products.find(p => String(p.id) === String(id));
  const { addItem } = useCart();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-transparent pt-20">
        <div className="text-center">
          <p className="font-display text-3xl text-gray-500 mb-4">Product not found</p>
          <Link to="/shop" className="text-gray-900 underline font-body">Back to shop</Link>
        </div>
      </div>
    );
  }

  const cfg = categoryConfig[product.category];
  const hasDiscount = product.originalPrice && product.originalPrice > product.price;
  const related = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  const handleAdd = () => {
    for (let i = 0; i < quantity; i++) {
      addItem({ id: product.id, name: product.name, price: product.price, image: product.images?.[0] || 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=600&q=80', category: product.category, stock: product.stock });
    }
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-transparent pt-24 pb-16"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/shop" className="inline-flex items-center gap-1 text-sm font-body text-gray-500 hover:text-gray-900 mb-8 transition-colors">
          <ChevronLeft size={16} /> Back to Shop
        </Link>

        <div className="grid md:grid-cols-2 gap-10 mb-16">
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="aspect-[4/5] rounded-2xl overflow-hidden bg-transparent"
            >
              <OptimizedImage
                src={product.images?.[selectedImage] || 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=600&q=80'}
                alt={product.name}
                width={800}
                quality={80}
                priority={true}
                containerClassName="w-full h-full"
                className="w-full h-full object-cover"
              />
            </motion.div>
            {(product.images || []).length > 1 && (
              <div className="flex gap-3">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`w-20 h-24 rounded-lg overflow-hidden border-2 transition-colors ${
                      i === selectedImage ? 'border-gray-200' : 'border-transparent hover:border-gray-200'
                    }`}
                  >
                    <OptimizedImage src={img || 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=600&q=80'} alt="" width={160} containerClassName="w-full h-full" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="sticky top-28">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: cfg.fill }} />
                <span className="text-sm font-body font-medium" style={{ color: cfg.fill }}>{product.category}</span>
              </div>

              <h1 className="font-display text-3xl md:text-4xl text-gray-900 mb-4">{product.name}</h1>

              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center gap-1">
                  <Star size={16} className="text-amber-400 fill-amber-400" />
                  <span className="font-body font-semibold text-sm">{product.rating}</span>
                </div>
                <span className="text-gray-900">·</span>
                <span className="font-body text-sm text-gray-500">{product.reviews} reviews</span>
              </div>

              <div className="flex items-center gap-3 mb-6">
                <span className="font-display text-3xl text-gray-900">{formatCurrency(product.price)}</span>
                {hasDiscount && (
                  <>
                    <span className="font-body text-lg text-gray-500 line-through">{formatCurrency(product.originalPrice)}</span>
                    <Badge variant="sale">Save {Math.round((1 - product.price / product.originalPrice) * 100)}%</Badge>
                  </>
                )}
              </div>

              <p className="font-body text-gray-600 leading-relaxed mb-8">{product.description}</p>

              <div className="mb-8">
                <p className="font-body text-sm font-semibold text-gray-900 mb-3">Quantity</p>
                <div className="flex items-center border border-gray-200 rounded-lg w-fit">
                  <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="p-3 hover:bg-gray-100"><Minus size={16} /></button>
                  <span className="px-6 font-mono text-lg min-w-[3rem] text-center">{quantity}</span>
                  <button onClick={() => setQuantity(q => Math.min(product.stock || 1, q + 1))} className="p-3 hover:bg-gray-100"><Plus size={16} /></button>
                </div>
              </div>

              <div className="flex items-center gap-3 mb-4">
                <Button
                  variant="primary"
                  size="lg"
                  className={`flex-1 ${added ? 'bg-green-500 hover:bg-green-500' : ''}`}
                  onClick={handleAdd}
                >
                  {added ? (
                    <><Check size={20} /> Added to Bag</>
                  ) : (
                    <><ShoppingBag size={20} /> Add to Bag</>
                  )}
                </Button>
              </div>

              <div className="flex items-center gap-2 text-sm font-body text-gray-500">
                <span className="w-2 h-2 rounded-full bg-green-500" />
                {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
              </div>
            </div>
          </motion.div>
        </div>

        {related.length > 0 && (
          <div>
            <h2 className="font-display text-2xl md:text-3xl text-gray-900 mb-6">Complete the Look</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {related.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
