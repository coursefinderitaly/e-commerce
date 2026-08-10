import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import { ProductsProvider } from './context/ProductsContext';
import Navbar from './components/layout/Navbar';
import BottomNav from './components/layout/BottomNav';
import Footer from './components/layout/Footer';
import CartDrawer from './components/layout/CartDrawer';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderConfirmation from './pages/OrderConfirmation';
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';
import Auth from './pages/Auth';
import MyProfile from './pages/MyProfile';
import NotFound from './pages/NotFound';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';

import ScrollToTop from './components/layout/ScrollToTop';

function AppLayout() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  return (
    <div className="pb-16 md:pb-0 min-h-screen bg-white text-gray-900 selection:bg-black selection:text-white">
      <ScrollToTop />
      {!isAdmin && <Navbar />}
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/shop/:category" element={<Shop />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order-confirmation" element={<OrderConfirmation />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/profile" element={<MyProfile />} />
          <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AnimatePresence>
      {!isAdmin && <Footer />}
      {!isAdmin && <CartDrawer />}
      {!isAdmin && <BottomNav />}
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ProductsProvider>
          <CartProvider>
            <AppLayout />
          </CartProvider>
        </ProductsProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
