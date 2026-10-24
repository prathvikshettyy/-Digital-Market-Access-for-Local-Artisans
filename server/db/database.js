import { DatabaseSync } from 'node:sqlite';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbDir = __dirname;
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

const dbPath = path.join(dbDir, 'kalaconnect.db');
const db = new DatabaseSync(dbPath);

// Transaction helper for node:sqlite compatibility
db.transaction = (fn) => {
  return (...args) => {
    db.exec('BEGIN');
    try {
      const res = fn(...args);
      db.exec('COMMIT');
      return res;
    } catch (e) {
      db.exec('ROLLBACK');
      throw e;
    }
  };
};

// Enable foreign keys
db.exec('PRAGMA foreign_keys = ON;');

// Initialize schema
db.exec(`
  CREATE TABLE IF NOT EXISTS artisans (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    village TEXT NOT NULL,
    phone TEXT NOT NULL UNIQUE,
    pin TEXT NOT NULL,
    bio TEXT,
    photo TEXT
  );

  CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    artisan_id INTEGER NOT NULL,
    title TEXT NOT NULL,
    craft TEXT NOT NULL,
    price REAL NOT NULL,
    stock INTEGER NOT NULL DEFAULT 1,
    story TEXT,
    technique TEXT,
    materials TEXT,
    hours REAL DEFAULT 0,
    image TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(artisan_id) REFERENCES artisans(id) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    buyer_name TEXT NOT NULL,
    buyer_phone TEXT NOT NULL,
    address TEXT NOT NULL,
    total REAL NOT NULL,
    status TEXT DEFAULT 'placed',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS order_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    order_id INTEGER NOT NULL,
    product_id INTEGER NOT NULL,
    qty INTEGER NOT NULL DEFAULT 1,
    price REAL NOT NULL,
    FOREIGN KEY(order_id) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY(product_id) REFERENCES products(id) ON DELETE CASCADE
  );
`);

export default db;
