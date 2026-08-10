const express = require('express');
const cors = require('cors');
const db = require('./database.js');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// Helper function to format rows (parse JSON fields)
const formatProduct = (row) => ({
  ...row,
  images: row.images ? JSON.parse(row.images) : [],
  tags: row.tags ? JSON.parse(row.tags) : [],
});

// Basic Security Middleware for Admin routes
const adminAuth = (req, res, next) => {
  // In a real app, use JWT. For now, check a custom header to prevent random access
  const token = req.headers['x-admin-token'];
  if (token !== 'glamaura-secure-admin') {
    return res.status(403).json({ error: 'Unauthorized admin access' });
  }
  next();
};

// GET all products
app.get('/api/products', (req, res) => {
  db.all('SELECT * FROM products', [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows.map(formatProduct));
  });
});

// GET single product
app.get('/api/products/:id', (req, res) => {
  db.get('SELECT * FROM products WHERE id = ?', [req.params.id], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (row) {
      res.json(formatProduct(row));
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  });
});

// POST add a product (Secure)
app.post('/api/products', adminAuth, (req, res) => {
  const { id, name, description, price, originalPrice, category, stock, images, rating, reviews, featured, tags } = req.body;
  
  const sql = `INSERT INTO products (id, name, description, price, originalPrice, category, stock, images, rating, reviews, featured, tags) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  const params = [
    id, name, description, price, originalPrice || null, category, stock, 
    JSON.stringify(images || []), rating || 4.5, reviews || 0, featured ? 1 : 0, JSON.stringify(tags || [])
  ];

  db.run(sql, params, function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.status(201).json({ message: 'Product created successfully', id });
  });
});

// PUT update a product (Secure)
app.put('/api/products/:id', adminAuth, (req, res) => {
  const { name, description, price, originalPrice, category, stock, images, rating, reviews, featured, tags } = req.body;
  
  const sql = `UPDATE products SET name = ?, description = ?, price = ?, originalPrice = ?, category = ?, stock = ?, images = ?, rating = ?, reviews = ?, featured = ?, tags = ? WHERE id = ?`;
  const params = [
    name, description, price, originalPrice || null, category, stock, 
    JSON.stringify(images || []), rating, reviews, featured ? 1 : 0, JSON.stringify(tags || []), req.params.id
  ];

  db.run(sql, params, function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ message: 'Product updated successfully', changes: this.changes });
  });
});

// DELETE a product (Secure)
app.delete('/api/products/:id', adminAuth, (req, res) => {
  db.run('DELETE FROM products WHERE id = ?', [req.params.id], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ message: 'Product deleted successfully', changes: this.changes });
  });
});

// GET all orders (Secure)
app.get('/api/orders', adminAuth, (req, res) => {
  db.all('SELECT * FROM orders ORDER BY created_at DESC', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows.map(row => ({
      ...row,
      shipping_details: JSON.parse(row.shipping_details),
      items: JSON.parse(row.items)
    })));
  });
});

// POST secure checkout order
app.post('/api/orders', (req, res) => {
  const { customer_email, shipping_details, items } = req.body;
  
  if (!items || !items.length) {
    return res.status(400).json({ error: 'Order must contain items' });
  }

  // Fetch prices securely from DB to prevent tampering
  const placeholders = items.map(() => '?').join(',');
  const itemIds = items.map(item => item.id);
  
  db.all(`SELECT id, name, price FROM products WHERE id IN (${placeholders})`, itemIds, (err, dbProducts) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    
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
    
    const sql = `INSERT INTO orders (id, customer_email, shipping_details, items, subtotal, shipping_cost, tax, total) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
    const params = [
      orderId, customer_email, JSON.stringify(shipping_details), JSON.stringify(validatedItems),
      subtotal, shipping_cost, tax, total
    ];

    db.run(sql, params, function(err) {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ message: 'Order created securely', orderId, total });
    });
  });
});

const bcrypt = require('bcryptjs');

// POST secure user signup
app.post('/api/auth/signup', async (req, res) => {
  const { name, email, password, phone } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Name, email, and password are required' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const userId = 'usr_' + Date.now().toString(36) + Math.random().toString(36).substr(2, 5);

    const sql = `INSERT INTO users (id, name, email, password, phone, role) VALUES (?, ?, ?, ?, ?, 'customer')`;
    
    db.run(sql, [userId, name, email, hashedPassword, phone || null], function(err) {
      if (err) {
        if (err.message.includes('UNIQUE constraint failed')) {
          return res.status(409).json({ error: 'Email already registered' });
        }
        return res.status(500).json({ error: 'Database error' });
      }
      
      // Return user object without password
      res.status(201).json({ 
        message: 'Account created successfully', 
        user: { id: userId, name, email, phone, role: 'customer' } 
      });
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error during signup' });
  }
});

// POST secure user login
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  db.get('SELECT * FROM users WHERE email = ?', [email], async (err, user) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    try {
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
});

const path = require('path');

// Serve frontend static files
app.use(express.static(path.join(__dirname, '../dist')));

// Handle React Router SPA fallback
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
