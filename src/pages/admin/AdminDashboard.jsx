import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Package, ShoppingBag, DollarSign, TrendingUp, Plus } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { categories, products as initialProducts } from '../../data/products';
import { db } from '../../config/firebase';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
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
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const statsData = [
    { label: 'Total Products', value: products.length.toString(), icon: Package, color: '#3E4C6D' },
    { label: 'Total Orders', value: '0', icon: ShoppingBag, color: '#B2502B' },
    { label: 'Revenue', value: '$0.00', icon: DollarSign, color: '#79876B' },
    { label: 'Growth', value: '0.0%', icon: TrendingUp, color: '#8A3F56' },
  ];

  useEffect(() => {
    if (!isAdmin) {
      navigate('/admin/login', { replace: true });
    }
  }, [isAdmin, navigate]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        if (!db) return setIsLoading(false);
        const querySnapshot = await getDocs(collection(db, 'products'));
        let productsList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        // Auto-seed database if completely empty
        if (productsList.length === 0) {
          console.log("Database empty, seeding initial products...");
          for (const p of initialProducts) {
             const { id, ...data } = p; // Remove static ID so Firebase generates a real one
             await addDoc(collection(db, 'products'), data);
          }
          // Fetch the newly seeded products
          const newSnapshot = await getDocs(collection(db, 'products'));
          productsList = newSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        }

        setProducts(productsList);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
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
      if (editingProduct) {
        // Update existing product
        const { id, ...updateData } = productData;
        if (db) await updateDoc(doc(db, 'products', id), updateData);
        setProducts(products.map(p => p.id === productData.id ? productData : p));
      } else {
        // Add new product
        const { id, ...newData } = productData;
        if (db) {
          const docRef = await addDoc(collection(db, 'products'), newData);
          setProducts([...products, { ...newData, id: docRef.id }]);
        } else {
          setProducts([...products, productData]); // fallback if no DB
        }
      }
      setShowForm(false);
      setEditingProduct(null);
    } catch (error) {
      console.error("Error saving product:", error);
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
      if (deleteConfirm && db) {
        await deleteDoc(doc(db, 'products', deleteConfirm.id));
      }
      setProducts(products.filter(p => p.id !== deleteConfirm.id));
      setDeleteConfirm(null);
    } catch (error) {
      console.error("Error deleting product:", error);
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
