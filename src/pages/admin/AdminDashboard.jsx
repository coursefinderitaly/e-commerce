import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Package, ShoppingBag, IndianRupee, TrendingUp, Plus } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useProducts } from '../../context/ProductsContext';
import { categories } from '../../data/products';
import { formatCurrency } from '../../utils/formatCurrency';
import Sidebar from '../../components/admin/Sidebar';
import StatCard from '../../components/admin/StatCard';
import ProductTable from '../../components/admin/ProductTable';
import ProductForm from '../../components/admin/ProductForm';
import Button from '../../components/ui/Button';
import Modal from '../../components/ui/Modal';

export default function AdminDashboard() {
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const { products, fetchProducts, loading: isLoading } = useProducts();
  const [editingProduct, setEditingProduct] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const statsData = [
    { label: 'Total Products', value: (products?.length || 0).toString(), icon: Package, color: '#3E4C6D' },
    { label: 'Total Orders', value: '0', icon: ShoppingBag, color: '#B2502B' },
    { label: 'Revenue', value: '₹0', icon: IndianRupee, color: '#79876B' },
    { label: 'Growth', value: '0.0%', icon: TrendingUp, color: '#8A3F56' },
  ];

  useEffect(() => {
    if (!isAdmin) {
      navigate('/admin/login', { replace: true });
    }
  }, [isAdmin, navigate]);

  useEffect(() => {
    if (isAdmin) {
      fetchProducts();
    }
  }, [isAdmin]);

  if (!isAdmin) {
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const handleSaveProduct = async (productData) => {
    try {
      const baseUrl = import.meta.env.VITE_API_URL || '';
      const url = editingProduct ? `${baseUrl}/api/products/${productData.id}` : `${baseUrl}/api/products`;
      const method = editingProduct ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData)
      });
      
      if (!response.ok) throw new Error('Failed to save product');
      
      await fetchProducts(); // Refresh the list from backend
      setShowForm(false);
      setEditingProduct(null);
    } catch (error) {
      console.error("API error:", error);
      alert("Failed to save product. Please try again.");
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleDelete = (product) => {
    setDeleteConfirm(product);
  };

  const confirmDelete = async () => {
    try {
      const baseUrl = import.meta.env.VITE_API_URL || '';
      const response = await fetch(`${baseUrl}/api/products/${deleteConfirm.id}`, {
        method: 'DELETE'
      });
      
      if (!response.ok) throw new Error('Failed to delete product');
      
      await fetchProducts();
      setDeleteConfirm(null);
    } catch (error) {
      console.error("API error:", error);
      alert("Failed to delete product. Please try again.");
    }
  };

  const handleAddNew = () => {
    setEditingProduct(null);
    setShowForm(true);
  };

  return (
    <div className="min-h-screen bg-transparent flex">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} onLogout={handleLogout} />

      <div className="flex-1 overflow-y-auto">
        <div className="p-6 lg:p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="font-display text-2xl md:text-3xl text-paper capitalize">{activeTab}</h1>
              <p className="font-body text-sm text-paper/50">Welcome back, {user?.email}</p>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {activeTab === 'dashboard' && (
              <motion.div
                key="dashboard"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                  {statsData.map((stat, i) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <StatCard {...stat} />
                    </motion.div>
                  ))}
                </div>

                <div className="bg-transparent rounded-xl border border-paper/5 p-6">
                  <h2 className="font-display text-lg mb-4">Recent Orders</h2>
                  <div className="text-center py-12 font-body text-paper/30">
                    <p>Orders will appear here once customers start purchasing.</p>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'products' && (
              <motion.div
                key="products"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <div className="flex items-center justify-between mb-6">
                  <p className="font-body text-sm text-paper/50">
                    {isLoading ? 'Loading products...' : `${products.length} products`}
                  </p>
                  <Button variant="primary" size="sm" onClick={handleAddNew}>
                    <Plus size={16} /> Add Product
                  </Button>
                </div>
                {!isLoading && (
                  <ProductTable
                    products={products}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    categories={categories}
                  />
                )}
              </motion.div>
            )}

            {activeTab === 'orders' && (
              <motion.div
                key="orders"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="bg-transparent rounded-xl border border-paper/5 p-6 text-center py-16"
              >
                <ShoppingBag size={48} className="mx-auto text-paper/10 mb-4" />
                <h3 className="font-display text-xl text-paper/40 mb-2">No Orders Yet</h3>
                <p className="font-body text-sm text-paper/30">Orders will show up here once customers start purchasing.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {showForm && (
        <ProductForm
          product={editingProduct}
          onSubmit={handleSaveProduct}
          onClose={() => { setShowForm(false); setEditingProduct(null); }}
        />
      )}

      <Modal
        isOpen={!!deleteConfirm}
        onClose={() => setDeleteConfirm(null)}
        title="Delete Product"
      >
        <p className="font-body text-paper/70 mb-6">
          Are you sure you want to delete <strong>{deleteConfirm?.name}</strong>? This action cannot be undone.
        </p>
        <div className="flex gap-3">
          <Button variant="outline" className="flex-1" onClick={() => setDeleteConfirm(null)}>
            Cancel
          </Button>
          <Button variant="primary" className="flex-1 bg-red-500 hover:bg-red-600" onClick={confirmDelete}>
            Delete
          </Button>
        </div>
      </Modal>
    </div>
  );
}
