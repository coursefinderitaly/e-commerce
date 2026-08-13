const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

const dataDir = path.resolve(__dirname, 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Ensure the live database is stored in a separate directory so it can be gitignored
const dbPath = path.resolve(dataDir, 'live_database.sqlite');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database', err.message);
  } else {
    console.log('Connected to the live SQLite database.');
    
    // Create products table
    db.run(`CREATE TABLE IF NOT EXISTS products (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      description TEXT,
      price REAL NOT NULL,
      originalPrice REAL,
      category TEXT NOT NULL,
      stock INTEGER NOT NULL,
      images TEXT NOT NULL,
      rating REAL,
      reviews INTEGER,
      featured BOOLEAN,
      tags TEXT
    )`, (err) => {
      if (err) console.error('Error creating products table', err.message);
    });

    // Create secure orders table
    db.run(`CREATE TABLE IF NOT EXISTS orders (
      id TEXT PRIMARY KEY,
      customer_email TEXT NOT NULL,
      shipping_details TEXT NOT NULL,
      items TEXT NOT NULL,
      subtotal REAL NOT NULL,
      shipping_cost REAL NOT NULL,
      tax REAL NOT NULL,
      total REAL NOT NULL,
      status TEXT DEFAULT 'pending',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`, (err) => {
      if (err) console.error('Error creating orders table', err.message);
    });

    // Create super secure users table
    db.run(`CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      phone TEXT,
      role TEXT DEFAULT 'customer',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`, (err) => {
      if (err) console.error('Error creating users table', err.message);
    });
  }
});

function seedDatabase() {
  db.get("SELECT COUNT(*) AS count FROM products", (err, row) => {
    if (err) {
      console.error(err.message);
      return;
    }
    if (row.count === 0) {
      console.log('Seeding initial products data...');
      
      const seedData = [
        {
          id: '1',
          name: 'Radiance Face Serum',
          description: 'Lightweight vitamin C serum with hyaluronic acid. Brightens skin tone and provides antioxidant protection.',
          price: 62.00,
          originalPrice: 85.00,
          category: 'Skincare',
          images: JSON.stringify(['https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=600&q=75&fm=webp']),
          stock: 75,
          rating: 4.8,
          reviews: 445,
          featured: 1,
          tags: JSON.stringify(['skincare', 'serum', 'vitamin c'])
        },
        {
          id: '2',
          name: 'Matte Lipstick Collection',
          description: 'A set of six richly pigmented matte lipsticks in everyday nudes. Enriched with shea butter.',
          price: 48.00,
          category: 'Makeup',
          images: JSON.stringify(['https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=600&q=75&fm=webp']),
          stock: 100,
          rating: 4.6,
          reviews: 212,
          featured: 0,
          tags: JSON.stringify(['makeup', 'lips', 'lipstick'])
        }
      ];

      const stmt = db.prepare(`INSERT INTO products (id, name, description, price, originalPrice, category, stock, images, rating, reviews, featured, tags) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`);
      
      seedData.forEach(p => {
        stmt.run(p.id, p.name, p.description, p.price, p.originalPrice || null, p.category, p.stock, p.images, p.rating, p.reviews, p.featured, p.tags);
      });
      
      stmt.finalize();
      console.log('Database seeded.');
    }
  });
}

module.exports = db;
