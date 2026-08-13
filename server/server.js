const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const { connectDB, Product, Order, User } = require('./database.js');
const bcrypt = require('bcryptjs');

const app = express();
app.use(helmet({
  contentSecurityPolicy: false, // Since this serves a react app, you might want to configure this more carefully in production
}));
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// Trust proxy is required when running behind a reverse proxy (like Hostinger's load balancer)
// for express-rate-limit to correctly identify user IPs.
app.set('trust proxy', 1);

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true,
  legacyHeaders: false,
});
app.use('/api/', apiLimiter);

const PORT = process.env.PORT || 5000;

// Helper function to map Mongoose document to frontend-expected format
const formatProduct = (doc) => {
  const obj = doc.toObject();
  return obj;
};

// Basic Security Middleware for Admin routes
const adminAuth = (req, res, next) => {
  // In a real app, use JWT. For now, check a custom header to prevent random access
  const token = req.headers['x-admin-token'];
  if (token !== 'glamaura-secure-admin') {
    return res.status(403).json({ error: 'Unauthorized admin access' });
  }
  next();
};

// Utility to clean environment variables that might have accidental quotes or spaces
const cleanEnvVar = (val) => {
  if (!val) return val;
  return val.trim().replace(/^["']|["']$/g, '');
};

// Initialize Redis
const { createClient } = require('redis');
let redisClient;
const rawRedisUrl = process.env.REDIS_URL;

if (rawRedisUrl && cleanEnvVar(rawRedisUrl) !== '') {
  try {
    const finalUrl = cleanEnvVar(rawRedisUrl);
    // Basic validation to prevent node internal crash
    if (!finalUrl.startsWith('redis://') && !finalUrl.startsWith('rediss://')) {
      throw new Error('Redis URL must start with redis:// or rediss://');
    }
    redisClient = createClient({ url: finalUrl });
    redisClient.on('error', (err) => console.warn('Redis connection failed (Continuing without cache):', err.message));
    redisClient.connect().then(() => console.log('Redis Cache Connected')).catch(() => {});
  } catch (err) {
    console.warn('Redis failed to initialize (Continuing without cache):', err.message);
    redisClient = null;
  }
}

// Helper to clear cache
const clearCache = async () => {
  if (redisClient && redisClient.isReady) {
    try {
      await redisClient.del('all_products');
    } catch (err) {
      console.warn('Failed to clear cache', err);
    }
  }
};

// GET all products (Cached)
app.get('/api/products', async (req, res) => {
  try {
    if (redisClient && redisClient.isReady) {
      const cached = await redisClient.get('all_products');
      if (cached) {
        return res.json(JSON.parse(cached));
      }
    }

    const products = await Product.find({});
    const formatted = products.map(formatProduct);

    if (redisClient && redisClient.isReady) {
      await redisClient.setEx('all_products', 3600, JSON.stringify(formatted)); // Cache for 1 hour
    }

    res.json(formatted);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET single product
app.get('/api/products/:id', async (req, res) => {
  try {
    const product = await Product.findOne({ id: req.params.id });
    if (product) {
      res.json(formatProduct(product));
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST add a product (Secure)
app.post('/api/products', adminAuth, async (req, res) => {
  try {
    const { id, name, description, price, originalPrice, category, stock, images, rating, reviews, featured, tags } = req.body;
    
    await Product.create({
      id, name, description, price, originalPrice: originalPrice || null, category, stock, 
      images: images || [], rating: rating || 4.5, reviews: reviews || 0, featured: featured ? true : false, tags: tags || []
    });
    
    await clearCache();
    res.status(201).json({ message: 'Product created successfully', id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT update a product (Secure)
app.put('/api/products/:id', adminAuth, async (req, res) => {
  try {
    const { name, description, price, originalPrice, category, stock, images, rating, reviews, featured, tags } = req.body;
    
    const updated = await Product.findOneAndUpdate(
      { id: req.params.id },
      { name, description, price, originalPrice: originalPrice || null, category, stock, images: images || [], rating, reviews, featured: featured ? true : false, tags: tags || [] },
      { returnDocument: 'after' }
    );
    
    if (updated) {
      await clearCache();
      res.json({ message: 'Product updated successfully' });
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE a product (Secure)
app.delete('/api/products/:id', adminAuth, async (req, res) => {
  try {
    const deleted = await Product.findOneAndDelete({ id: req.params.id });
    if (deleted) {
      await clearCache();
      res.json({ message: 'Product deleted successfully' });
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET all orders (Secure)
app.get('/api/orders', adminAuth, async (req, res) => {
  try {
    const orders = await Order.find({}).sort({ created_at: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST secure checkout order
app.post('/api/orders', async (req, res) => {
  try {
    const { customer_email, shipping_details, items } = req.body;
    
    if (!items || !items.length) {
      return res.status(400).json({ error: 'Order must contain items' });
    }

    const itemIds = items.map(item => item.id);
    const dbProducts = await Product.find({ id: { $in: itemIds } });
    
    let subtotal = 0;
    const validatedItems = [];
    
    items.forEach(cartItem => {
      const dbProduct = dbProducts.find(p => String(p.id) === String(cartItem.id));
      if (dbProduct) {
        // Use DB PRICE, not frontend price!
        subtotal += dbProduct.price * cartItem.quantity;
        validatedItems.push({
          id: dbProduct.id,
          name: dbProduct.name,
          price: dbProduct.price,
          quantity: cartItem.quantity
        });
      }
    });

    if (validatedItems.length === 0) {
      return res.status(400).json({ error: 'No valid products found' });
    }

    const shipping_cost = subtotal > 200 ? 0 : 12.99;
    const tax = subtotal * 0.08;
    const total = subtotal + shipping_cost + tax;
    
    const orderId = 'GA-' + Date.now().toString(36).toUpperCase();
    
    await Order.create({
      id: orderId,
      customer_email,
      shipping_details,
      items: validatedItems,
      subtotal,
      shipping_cost,
      tax,
      total
    });

    res.status(201).json({ message: 'Order created securely', orderId, total });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST secure user signup
app.post('/api/auth/signup', async (req, res) => {
  const { name, email, password, phone } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Name, email, and password are required' });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: 'Email already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const userId = 'usr_' + Date.now().toString(36) + Math.random().toString(36).substr(2, 5);

    await User.create({
      id: userId,
      name,
      email,
      password: hashedPassword,
      phone: phone || null,
      role: 'customer'
    });
    
    res.status(201).json({ 
      message: 'Account created successfully', 
      user: { id: userId, name, email, phone, role: 'customer' } 
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error during signup' });
  }
});

// POST secure admin login
app.post('/api/auth/admin-login', (req, res) => {
  const { email, password } = req.body;
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@admin.com';
  const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  if (email === adminEmail && password === adminPassword) {
    res.json({ 
      message: 'Admin login successful', 
      user: { email, role: 'admin', name: 'Admin' } 
    });
  } else {
    res.status(401).json({ error: 'Invalid admin credentials' });
  }
});

// POST secure user login
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  try {
    const user = await User.findOne({ email });
    
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    res.json({ 
      message: 'Login successful', 
      user: { id: user.id, name: user.name, email: user.email, phone: user.phone, role: user.role } 
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error during login' });
  }
});

// Serve frontend static files
app.use(express.static(path.join(__dirname, '../dist')));

// Handle React Router SPA fallback
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
