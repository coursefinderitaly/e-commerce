import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Package, Heart, MapPin, CreditCard, LogOut, Settings, User } from 'lucide-react';
import Button from '../components/ui/Button';

const tabs = [
  { id: 'orders', label: 'My Orders', icon: Package },
  { id: 'wishlist', label: 'Wishlist', icon: Heart },
  { id: 'addresses', label: 'Saved Addresses', icon: MapPin },
  { id: 'payments', label: 'Payment Methods', icon: CreditCard },
  { id: 'settings', label: 'Account Settings', icon: Settings },
];

export default function MyProfile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('orders');

  if (!user || user.role === 'admin') {
    return <Navigate to="/auth" replace />;
  }

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen pt-24 pb-12 bg-milky-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Mobile Profile Header */}
        <div className="md:hidden flex items-center gap-4 mb-6 bg-milky-50 p-4 rounded-2xl shadow-sm border border-gray-100">
          <div className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center text-xl font-bold uppercase">
            {user.name?.[0] || 'U'}
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">{user.name}</h1>
            <p className="text-sm text-gray-500">{user.email}</p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          
          {/* Sidebar */}
          <div className="w-full md:w-64 flex-shrink-0">
            <div className="bg-milky-50 rounded-2xl shadow-sm border border-gray-100 p-2 overflow-hidden">
              <div className="hidden md:flex items-center gap-3 p-4 mb-2 border-b border-gray-100">
                <div className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center text-lg font-bold uppercase">
                  {user.name?.[0] || 'U'}
                </div>
                <div className="truncate">
                  <p className="font-bold text-gray-900 truncate">{user.name}</p>
                </div>
              </div>
              
              <nav className="flex md:flex-col overflow-x-auto md:overflow-visible no-scrollbar pb-2 md:pb-0 gap-1 md:gap-0">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl md:rounded-none md:first:rounded-t-none md:last:rounded-b-none transition-colors whitespace-nowrap md:whitespace-normal font-medium ${
                      activeTab === tab.id
                        ? 'bg-black text-white md:bg-milky-100 md:text-black md:border-r-4 md:border-black'
                        : 'text-gray-600 hover:bg-milky-100 hover:text-black'
                    }`}
                  >
                    <tab.icon size={18} />
                    {tab.label}
                  </button>
                ))}
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 transition-colors whitespace-nowrap md:whitespace-normal font-medium mt-2 border-t border-gray-100"
                >
                  <LogOut size={18} />
                  Log Out
                </button>
              </nav>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-milky-50 rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 min-h-[500px]"
            >
              {activeTab === 'orders' && (
                <div>
                  <h2 className="text-2xl font-display font-bold text-gray-900 mb-6">My Orders</h2>
                  <div className="flex flex-col items-center justify-center py-16 text-center">
                    <div className="w-20 h-20 bg-milky-100 rounded-full flex items-center justify-center mb-4">
                      <Package size={32} className="text-gray-400" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">No orders yet</h3>
                    <p className="text-gray-500 mb-6 max-w-sm">Looks like you haven't made your first purchase. Discover our premium collection today.</p>
                    <Button variant="primary" className="bg-black text-white hover:bg-gray-800 rounded-full px-8 py-3" onClick={() => navigate('/shop')}>
                      Start Shopping
                    </Button>
                  </div>
                </div>
              )}

              {activeTab === 'wishlist' && (
                <div>
                  <h2 className="text-2xl font-display font-bold text-gray-900 mb-6">Wishlist</h2>
                  <div className="flex flex-col items-center justify-center py-16 text-center">
                    <Heart size={48} className="text-gray-300 mb-4" />
                    <p className="text-gray-500">Your wishlist is empty.</p>
                  </div>
                </div>
              )}

              {activeTab === 'addresses' && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-display font-bold text-gray-900">Saved Addresses</h2>
                    <Button variant="secondary" className="border-gray-200 hover:border-black text-sm py-2">Add New</Button>
                  </div>
                  <div className="p-6 border border-gray-200 rounded-xl hover:border-black transition-colors cursor-pointer">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="bg-gray-100 text-gray-800 text-[10px] uppercase font-bold px-2 py-1 rounded">Default</span>
                      <h3 className="font-bold text-gray-900">{user.name}</h3>
                    </div>
                    <p className="text-gray-600 text-sm mb-1">123 Beauty Lane, Suite 100</p>
                    <p className="text-gray-600 text-sm mb-1">New York, NY 10001</p>
                    <p className="text-gray-600 text-sm mt-3">+1 (555) 123-4567</p>
                  </div>
                </div>
              )}

              {activeTab === 'payments' && (
                <div>
                  <h2 className="text-2xl font-display font-bold text-gray-900 mb-6">Payment Methods</h2>
                  <div className="p-6 border border-gray-200 rounded-xl flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-8 bg-gray-100 rounded flex items-center justify-center font-bold text-gray-400 text-xs border border-gray-200">VISA</div>
                      <div>
                        <p className="font-bold text-gray-900">•••• •••• •••• 4242</p>
                        <p className="text-xs text-gray-500">Expires 12/28</p>
                      </div>
                    </div>
                    <button className="text-sm font-semibold text-red-600 hover:text-red-700">Remove</button>
                  </div>
                </div>
              )}

              {activeTab === 'settings' && (
                <div>
                  <h2 className="text-2xl font-display font-bold text-gray-900 mb-6">Account Settings</h2>
                  <div className="max-w-md space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                      <input type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-black" defaultValue={user.name} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                      <input type="email" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-black" defaultValue={user.email} readOnly />
                    </div>
                    <Button variant="primary" className="bg-black text-white hover:bg-gray-800 rounded-xl w-full py-3 mt-4">Save Changes</Button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
