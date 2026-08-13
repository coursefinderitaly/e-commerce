const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const bcrypt = require('bcryptjs');

const dbPath = path.resolve(__dirname, 'server', 'data', 'live_database.sqlite');
const db = new sqlite3.Database(dbPath);

async function createAdmin() {
  const email = 'admin@glamaura.com';
  const password = 'admin';
  const hashedPassword = await bcrypt.hash(password, 10);
  
  db.get('SELECT * FROM users WHERE email = ?', [email], (err, row) => {
    if (err) {
      console.error(err);
      return;
    }
    
    if (!row) {
      db.run(`INSERT INTO users (id, name, email, password, role) VALUES (?, ?, ?, ?, ?)`, 
      ['admin_001', 'Admin', email, hashedPassword, 'admin'], function(err) {
        if (err) console.error(err);
        else console.log('Admin user created: admin@glamaura.com / admin');
      });
    } else {
      // update role to admin if it exists
      db.run('UPDATE users SET role = "admin", password = ? WHERE email = ?', [hashedPassword, email], function(err) {
         if (err) console.error(err);
         else console.log('Admin user updated: admin@glamaura.com / admin');
      });
    }
  });
}

createAdmin();
