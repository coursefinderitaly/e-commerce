import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const ADMIN_EMAIL = import.meta.env.VITE_ADMIN_EMAIL || 'admin@admin.com';
const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || 'admin123';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('glamaura_user');
    const storedAdmin = localStorage.getItem('glamaura_admin');
    if (storedAdmin) {
      setUser(JSON.parse(storedAdmin));
    } else if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const loginAdmin = (email, password) => {
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      const adminUser = { email, role: 'admin', name: 'Admin' };
      setUser(adminUser);
      localStorage.setItem('glamaura_admin', JSON.stringify(adminUser));
      return { success: true };
    }
    return { success: false, error: 'Invalid admin credentials' };
  };

  const login = (email, password) => {
    // Dummy customer login for demonstration
    // In a real app, this would be an API call
    if (email && password) {
      const customer = { 
        email, 
        role: 'customer', 
        name: email.split('@')[0], 
        id: Math.random().toString(36).substr(2, 9) 
      };
      setUser(customer);
      localStorage.setItem('glamaura_user', JSON.stringify(customer));
      return { success: true };
    }
    return { success: false, error: 'Invalid credentials' };
  };

  const signup = (name, email, password, phone = '') => {
    // Customer signup
    if (name && email && password) {
      const customer = { 
        email, 
        role: 'customer', 
        name, 
        phone: phone || '+1 (555) 234-5678',
        id: 'cust_' + Math.random().toString(36).substr(2, 9) 
      };
      setUser(customer);
      localStorage.setItem('glamaura_user', JSON.stringify(customer));
      return { success: true };
    }
    return { success: false, error: 'Please fill all required fields' };
  };

  const logout = () => {
    if (user?.role === 'admin') {
      localStorage.removeItem('glamaura_admin');
    } else {
      localStorage.removeItem('glamaura_user');
    }
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, loginAdmin, signup, logout, isAdmin: user?.role === 'admin' }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
