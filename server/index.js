import express from 'express';
import cors from 'cors';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import db from './db/database.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Setup file uploads directory
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}
app.use('/uploads', express.static(uploadsDir));
app.use('/images', express.static(uploadsDir));

// Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname) || '.jpg';
    cb(null, `craft-${Date.now()}-${Math.round(Math.random() * 1E9)}${ext}`);
  }
});
const upload = multer({
  storage,
  limits: { fileSize: 8 * 1024 * 1024 } // 8MB limit
});

// ======================== API ROUTES ======================== //

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', app: 'KalaConnect API', time: new Date().toISOString() });
});

// 1. Artisan Login (Phone + 4-digit PIN)
app.post('/api/artisans/login', (req, res) => {
  try {
    const { phone, pin } = req.body;
    if (!phone || !pin) {
      return res.status(400).json({ error: 'Phone number and 4-digit PIN are required' });
    }

    const artisan = db.prepare('SELECT id, name, village, phone, bio, photo FROM artisans WHERE phone = ? AND pin = ?').get(phone.trim(), pin.trim());

    if (!artisan) {
      return res.status(401).json({ error: 'Invalid phone number or PIN. Try 9845123456 / 1234' });
    }

    res.json({ success: true, artisan });
  } catch (error) {
    console.error('Artisan login error:', error);
    res.status(500).json({ error: 'Server error during login' });
  }
});

// 2. Get Artisan Profile with Products
app.get('/api/artisans/:id', (req, res) => {
  try {
    const artisan = db.prepare('SELECT id, name, village, phone, bio, photo FROM artisans WHERE id = ?').get(req.params.id);
    if (!artisan) {
      return res.status(404).json({ error: 'Artisan not found' });
    }

    const products = db.prepare('SELECT * FROM products WHERE artisan_id = ? ORDER BY created_at DESC').all(req.params.id);
    res.json({ ...artisan, products });
  } catch (error) {
    console.error('Get artisan error:', error);
    res.status(500).json({ error: 'Failed to retrieve artisan profile' });
  }
});

// 3. Get Products (optional ?craft= filter)
app.get('/api/products', (req, res) => {
  try {
    const { craft } = req.query;
    let query = `
      SELECT p.*, a.name AS artisan_name, a.village AS artisan_village, a.photo AS artisan_photo
      FROM products p
      JOIN artisans a ON p.artisan_id = a.id
    `;
    const params = [];

    if (craft && craft !== 'All') {
      query += ` WHERE p.craft = ?`;
      params.push(craft);
    }
    query += ` ORDER BY p.created_at DESC`;

    const products = db.prepare(query).all(...params);
    res.json(products);
  } catch (error) {
    console.error('Get products error:', error);
    res.status(500).json({ error: 'Failed to retrieve products' });
  }
});

// 4. Get Single Product by ID
app.get('/api/products/:id', (req, res) => {
  try {
    const product = db.prepare(`
      SELECT p.*, a.name AS artisan_name, a.village AS artisan_village, a.bio AS artisan_bio, a.photo AS artisan_photo, a.phone AS artisan_phone
      FROM products p
      JOIN artisans a ON p.artisan_id = a.id
      WHERE p.id = ?
    `).get(req.params.id);

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    console.error('Get product error:', error);
    res.status(500).json({ error: 'Failed to retrieve product' });
  }
});

// 5. Add Product (Multipart upload, simple artisan auth)
app.post('/api/products', upload.single('image'), (req, res) => {
  try {
    const { artisan_id, title, craft, price, stock, story, technique, materials, hours } = req.body;

    if (!artisan_id || !title || !craft || !price) {
      return res.status(400).json({ error: 'Artisan ID, title, craft, and price are required' });
    }

    // Default image if not uploaded
    let imageUrl = 'https://images.unsplash.com/photo-1590736969955-71cc94801759?auto=format&fit=crop&w=800&q=80';
    if (req.file) {
      imageUrl = `/uploads/${req.file.filename}`;
    } else if (req.body.imageUrl) {
      imageUrl = req.body.imageUrl;
    }

    const stmt = db.prepare(`
      INSERT INTO products (artisan_id, title, craft, price, stock, story, technique, materials, hours, image)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    const result = stmt.run(
      parseInt(artisan_id),
      title.trim(),
      craft.trim(),
      parseFloat(price),
      parseInt(stock) || 1,
      story || '',
      technique || '',
      materials || '',
      parseFloat(hours) || 0,
      imageUrl
    );

    const newProduct = db.prepare(`
      SELECT p.*, a.name AS artisan_name, a.village AS artisan_village
      FROM products p
      JOIN artisans a ON p.artisan_id = a.id
      WHERE p.id = ?
    `).get(result.lastInsertRowid);

    res.status(201).json({ success: true, product: newProduct });
  } catch (error) {
    console.error('Add product error:', error);
    res.status(500).json({ error: 'Failed to create product' });
  }
});

// 6. Update Product
app.put('/api/products/:id', (req, res) => {
  try {
    const { title, craft, price, stock, story, technique, materials, hours } = req.body;
    const stmt = db.prepare(`
      UPDATE products
      SET title = COALESCE(?, title),
          craft = COALESCE(?, craft),
          price = COALESCE(?, price),
          stock = COALESCE(?, stock),
          story = COALESCE(?, story),
          technique = COALESCE(?, technique),
          materials = COALESCE(?, materials),
          hours = COALESCE(?, hours)
      WHERE id = ?
    `);

    stmt.run(title, craft, price, stock, story, technique, materials, hours, req.params.id);
    const updated = db.prepare('SELECT * FROM products WHERE id = ?').get(req.params.id);
    res.json({ success: true, product: updated });
  } catch (error) {
    console.error('Update product error:', error);
    res.status(500).json({ error: 'Failed to update product' });
  }
});

// 7. Create Order (Mock payment, always succeeds)
app.post('/api/orders', (req, res) => {
  try {
    const { buyer_name, buyer_phone, address, items } = req.body;

    if (!buyer_name || !buyer_phone || !address || !items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: 'Buyer name, phone, address, and at least one item are required' });
    }

    let total = 0;
    items.forEach(item => {
      total += (parseFloat(item.price) || 0) * (parseInt(item.qty) || 1);
    });

    const createOrderTx = db.transaction(() => {
      // Insert into orders
      const orderStmt = db.prepare(`
        INSERT INTO orders (buyer_name, buyer_phone, address, total, status)
        VALUES (?, ?, ?, ?, 'placed')
      `);
      const orderResult = orderStmt.run(buyer_name.trim(), buyer_phone.trim(), address.trim(), total);
      const orderId = orderResult.lastInsertRowid;

      // Insert each order_item & decrement stock
      const itemStmt = db.prepare(`
        INSERT INTO order_items (order_id, product_id, qty, price)
        VALUES (?, ?, ?, ?)
      `);
      const updateStockStmt = db.prepare(`
        UPDATE products SET stock = MAX(0, stock - ?) WHERE id = ?
      `);

      items.forEach(item => {
        itemStmt.run(orderId, item.product_id, item.qty, item.price);
        updateStockStmt.run(item.qty, item.product_id);
      });

      return orderId;
    });

    const orderId = createOrderTx();
    const createdOrder = db.prepare('SELECT * FROM orders WHERE id = ?').get(orderId);
    const orderItems = db.prepare(`
      SELECT oi.*, p.title AS product_title, p.image AS product_image
      FROM order_items oi
      JOIN products p ON oi.product_id = p.id
      WHERE oi.order_id = ?
    `).all(orderId);

    res.status(201).json({
      success: true,
      message: 'Order placed successfully (Mock Payment Verified)',
      order: { ...createdOrder, items: orderItems }
    });
  } catch (error) {
    console.error('Create order error:', error);
    res.status(500).json({ error: 'Failed to create order' });
  }
});

// 8. Get Artisan Orders
app.get('/api/artisans/:id/orders', (req, res) => {
  try {
    const artisanId = req.params.id;
    const orders = db.prepare(`
      SELECT 
        o.id AS order_id,
        o.buyer_name,
        o.buyer_phone,
        o.address,
        o.status AS order_status,
        o.created_at,
        oi.id AS item_id,
        oi.qty,
        oi.price AS item_price,
        p.id AS product_id,
        p.title AS product_title,
        p.image AS product_image,
        p.craft AS product_craft
      FROM order_items oi
      JOIN orders o ON oi.order_id = o.id
      JOIN products p ON oi.product_id = p.id
      WHERE p.artisan_id = ?
      ORDER BY o.created_at DESC
    `).all(artisanId);

    res.json(orders);
  } catch (error) {
    console.error('Get artisan orders error:', error);
    res.status(500).json({ error: 'Failed to retrieve orders' });
  }
});

// 9. Update Order Status (placed -> confirmed -> shipped)
app.patch('/api/orders/:id/status', (req, res) => {
  try {
    const { status } = req.body;
    const validStatuses = ['placed', 'confirmed', 'shipped'];

    if (!status || !validStatuses.includes(status)) {
      return res.status(400).json({ error: `Status must be one of: ${validStatuses.join(', ')}` });
    }

    const stmt = db.prepare('UPDATE orders SET status = ? WHERE id = ?');
    const result = stmt.run(status, req.params.id);

    if (result.changes === 0) {
      return res.status(404).json({ error: 'Order not found' });
    }

    const updated = db.prepare('SELECT * FROM orders WHERE id = ?').get(req.params.id);
    res.json({ success: true, order: updated });
  } catch (error) {
    console.error('Update status error:', error);
    res.status(500).json({ error: 'Failed to update order status' });
  }
});

// 10. Pricing Suggestion Calculator
// body { hours, materials } -> { suggested_price, breakdown }
app.post('/api/pricing/suggest', (req, res) => {
  try {
    const hours = parseFloat(req.body.hours) || 0;
    const materials = parseFloat(req.body.materials) || 0;

    const hourlyRate = 80; // Standard fair hourly artisan wage in INR
    const labor = Math.round(hours * hourlyRate);
    const platformMargin = Math.round((labor + materials) * 0.05); // 5% cooperative/community fund
    const suggestedPrice = Math.round(materials + labor + platformMargin);

    res.json({
      suggested_price: Math.max(100, suggestedPrice),
      breakdown: {
        materials,
        labor,
        hourly_rate: hourlyRate,
        hours,
        platform_margin: platformMargin,
        total: Math.max(100, suggestedPrice)
      }
    });
  } catch (error) {
    console.error('Pricing suggest error:', error);
    res.status(500).json({ error: 'Failed to calculate price' });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`KalaConnect Backend running on http://localhost:${PORT}`);
});
