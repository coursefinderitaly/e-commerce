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
  featured: Boolean(row.featured)
});

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

// POST add a product
app.post('/api/products', (req, res) => {
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

// PUT update a product
app.put('/api/products/:id', (req, res) => {
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

// DELETE a product
app.delete('/api/products/:id', (req, res) => {
  db.run('DELETE FROM products WHERE id = ?', [req.params.id], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ message: 'Product deleted successfully', changes: this.changes });
  });
});

app.listen(PORT, () => {
  console.log(\`Server is running on port \${PORT}\`);
});
