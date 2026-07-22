import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, Upload } from 'lucide-react';
import Button from '../ui/Button';
import Input from '../ui/Input';

import { uploadToCloudinary } from '../../utils/cloudinary';

const categories = ['Skincare', 'Makeup', 'Fragrance'];

export default function ProductForm({ product, onSubmit, onClose }) {
  const [form, setForm] = useState({
    name: '', description: '', price: '', originalPrice: '',
    category: 'Skincare', stock: '', images: [''],
  });
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');

  useEffect(() => {
    if (product) {
      setForm({
        name: product.name,
        description: product.description,
        price: product.price.toString(),
        originalPrice: product.originalPrice ? product.originalPrice.toString() : '',
        category: product.category,
        stock: product.stock.toString(),
        images: product.images.length > 0 ? product.images : [''],
      });
    }
  }, [product]);

  const updateField = (field) => (e) => {
    setForm(f => ({ ...f, [field]: e.target.value }));
  };

  const updateImage = (index, value) => {
    setForm(f => {
      const images = [...f.images];
      images[index] = value;
      return { ...f, images };
    });
  };

  const addImage = () => setForm(f => ({ ...f, images: [...f.images, ''] }));
  const removeImage = (index) => {
    setForm(f => ({ ...f, images: f.images.filter((_, i) => i !== index) }));
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    setUploadError('');

    try {
      const imageUrl = await uploadToCloudinary(file);
      setForm(f => ({
        ...f,
        images: f.images[0] === '' && f.images.length === 1
          ? [imageUrl]
          : [...f.images.filter(img => img !== ''), imageUrl]
      }));
    } catch (err) {
      console.warn('Cloudinary upload fallback activated:', err.message);
      setUploadError('Cloudinary config missing or failed. Saved as local compressed image.');
      
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const MAX = 800;
          let w = img.width, h = img.height;
          if (w > h) { if (w > MAX) { h *= MAX / w; w = MAX; } }
          else { if (h > MAX) { w *= MAX / h; h = MAX; } }
          canvas.width = w; canvas.height = h;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, w, h);
          const dataUrl = canvas.toDataURL('image/jpeg', 0.75);
          setForm(f => ({
            ...f,
            images: f.images[0] === '' && f.images.length === 1 ? [dataUrl] : [...f.images.filter(i => i !== ''), dataUrl]
          }));
        };
        img.src = event.target.result;
      };
      reader.readAsDataURL(file);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      id: product?.id || Date.now().toString(),
      name: form.name,
      description: form.description,
      price: parseFloat(form.price),
      originalPrice: form.originalPrice ? parseFloat(form.originalPrice) : undefined,
      category: form.category,
      stock: parseInt(form.stock, 10),
      images: form.images.filter(Boolean),
      rating: product?.rating || 4.5,
      reviews: product?.reviews || 0,
      featured: product?.featured || false,
      tags: product?.tags || [],
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="bg-ink/95 backdrop-blur-2xl border border-paper/10 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-6 border-b border-paper/10">
          <h3 className="font-display text-xl">{product ? 'Edit Product' : 'Add Product'}</h3>
          <button onClick={onClose} className="p-1 hover:bg-paper/10 rounded-full">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <Input label="Product Name" value={form.name} onChange={updateField('name')} required />
          
          <div className="space-y-1">
            <label className="block text-sm font-medium text-paper/80 font-body">Description</label>
            <textarea
              value={form.description}
              onChange={updateField('description')}
              rows={3}
              className="w-full px-4 py-2.5 bg-transparent border border-paper/20 rounded-lg font-body text-sm focus:outline-none focus:ring-2 focus:ring-paper/20 focus:border-paper/20 resize-none"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input label="Price (₹)" type="number" step="0.01" min="0" value={form.price} onChange={updateField('price')} required />
            <Input label="Original Price (₹)" type="number" step="0.01" min="0" value={form.originalPrice} onChange={updateField('originalPrice')} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="block text-sm font-medium text-paper/80 font-body">Category</label>
              <select
                value={form.category}
                onChange={updateField('category')}
                className="w-full px-4 py-2.5 bg-transparent border border-paper/20 rounded-lg font-body text-sm focus:outline-none focus:ring-2 focus:ring-paper/20 focus:border-paper/20"
              >
                {categories.map(c => <option key={c} value={c} className="bg-ink text-paper">{c}</option>)}
              </select>
            </div>
            <Input label="Stock Quantity" type="number" min="0" value={form.stock} onChange={updateField('stock')} required />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-paper/80 font-body">Product Images</label>
            {form.images.map((url, i) => (
              <div key={i} className="flex gap-2 items-center">
                {url && (
                  <img src={url} alt="" className="w-10 h-10 object-cover rounded-md border border-paper/10 shrink-0" />
                )}
                <input
                  type="text"
                  value={url}
                  onChange={(e) => updateImage(i, e.target.value)}
                  placeholder="https://example.com/image.jpg OR Upload below"
                  className="flex-1 px-4 py-2.5 min-w-0 bg-transparent border border-paper/20 rounded-lg font-body text-sm focus:outline-none focus:ring-2 focus:ring-paper/20 focus:border-paper/20"
                />
                {form.images.length > 1 && (
                  <button type="button" onClick={() => removeImage(i)} className="p-2.5 text-paper/30 hover:text-red-500 shrink-0">
                    <X size={18} />
                  </button>
                )}
              </div>
            ))}
            <div className="flex items-center gap-6 pt-2">
              <button type="button" onClick={addImage} className="flex items-center gap-2 text-sm font-body text-paper/50 hover:text-paper transition-colors">
                <Upload size={16} /> Add URL Link
              </button>
              <label className={`flex items-center gap-2 text-sm font-body ${uploading ? 'text-amber-400 animate-pulse' : 'text-paper/50 hover:text-paper'} transition-colors cursor-pointer`}>
                <Upload size={16} /> {uploading ? 'Uploading to Cloudinary…' : 'Upload Image (Cloudinary)'}
                <input type="file" accept="image/*" className="hidden" onChange={handleFileUpload} disabled={uploading} />
              </label>
            </div>
            {uploadError && (
              <p className="text-xs font-body text-amber-400/80 mt-1">{uploadError}</p>
            )}
          </div>

          <div className="flex gap-3 pt-4 border-t border-paper/10">
            <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
            <Button type="submit" variant="primary" className="flex-1">
              {product ? 'Update Product' : 'Add Product'}
            </Button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}
