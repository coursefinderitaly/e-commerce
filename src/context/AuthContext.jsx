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

  const loginAdmin = async (email, password) => {
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      const adminUser = { email, role: 'admin', name: 'Admin' };
      setUser(adminUser);
      localStorage.setItem('glamaura_admin', JSON.stringify(adminUser));
      return { success: true };
    }
    return { success: false, error: 'Invalid admin credentials' };
  };

  const login = async (email, password) => {
    if (!email || !password) return { success: false, error: 'Invalid credentials' };
    
    try {
      const baseUrl = import.meta.env.VITE_API_URL || '';
      const res = await fetch(`${baseUrl}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        return { success: false, error: data.error || 'Login failed' };
      }
      
      setUser(data.user);
      localStorage.setItem('glamaura_user', JSON.stringify(data.user));
      return { success: true };
    } catch (err) {
      return { success: false, error: 'Server connection failed' };
    }
  };

  const signup = async (name, email, password, phone = '') => {
    if (!name || !email || !password) return { success: false, error: 'Please fill all required fields' };
    
    try {
      const baseUrl = import.meta.env.VITE_API_URL || '';
      const res = await fetch(`${baseUrl}/api/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, phone })
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        return { success: false, error: data.error || 'Signup failed' };
      }
      
      setUser(data.user);
      localStorage.setItem('glamaura_user', JSON.stringify(data.user));
      return { success: true };
    } catch (err) {
      return { success: false, error: 'Server connection failed' };
    }
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
