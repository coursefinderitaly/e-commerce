const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

const dbs = [
  path.resolve(__dirname, 'server/data/live_database.sqlite'),
  path.resolve(__dirname, 'server/database.sqlite')
];

dbs.forEach(dbPath => {
  if (fs.existsSync(dbPath)) {
    const db = new sqlite3.Database(dbPath);
    db.run("DELETE FROM products", function(err) {
      if (err) {
        console.error(`Error deleting products from ${dbPath}:`, err.message);
      } else {
        console.log(`Cleared ${this.changes} products from ${dbPath}`);
      }
    });
    db.close();
  }
});
