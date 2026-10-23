# KalaConnect (ಕಲಾಕನೆಕ್ಟ್) — Coastal Artisan Marketplace
> Digital marketplace and transparent fair-wage sanctuary for local coastal Indian master artisans (Kasuti embroidery, Beedu wild palm craft, Udupi handloom, Bidriware). Built for 24-hour Hackathon MVP demo.

---

## 🌟 Tech Stack & Monorepo Architecture

- **Frontend (`/client`)**: React 19 + Vite, React Router, Tailwind CSS v4, `react-i18next` (Bilingual English + Kannada), Lucide Icons, `qrcode.react`, Canvas Confetti.
- **Backend (`/server`)**: Node.js + Express, SQLite via `better-sqlite3`, Multer for craft photo uploads, CORS.
- **Monorepo Scripts**: Root `package.json` with `concurrently` running both client and server with a single command.
- **Authentication**: Lightweight artisan auth (Phone + 4-digit PIN). No login required for buyers.

---

## 🚀 Quick Start Guide

### 1. Install Dependencies
Run the install command from the root directory:
```bash
npm run install:all
```
*(Or install in `/server` and `/client` individually)*

### 2. Seed Database
Populate 3 master artisans and 9 coastal craft masterworks:
```bash
npm run seed
```

### 3. Run Both Client & Server Concurrently
```bash
npm run dev
```
- **Backend API**: `http://localhost:5000`
- **Frontend App**: `http://localhost:5173`

---

## 📋 End-to-End Hackathon Demo Script (Under 3 Minutes)

Follow this script to demonstrate the full end-to-end flow:

### Step 1: Artisan Lists a Craft in < 60s
1. Click **"Artisan Login"** in the top navigation.
2. Select **"Rukmini Bai"** via 1-tap quick fill (Phone: `9845123456`, PIN: `1234`) and click **"Login to My Workshop"**.
3. On the dashboard, tap **"+ Add New Craft"**.
4. Toggle between English and **ಕನ್ನಡ (Kannada)** right on the form to demonstrate vernacular accessibility.
5. Enter hours (e.g. `14`) and materials cost (e.g. `₹300`).
6. Click **"Auto-Calculate Fair Price"** — see the backend `/api/pricing/suggest` compute fair hourly labor (`14h × ₹80/hr = ₹1,120`) + materials + 5% fund = **₹1,491**.
7. Click **"Publish Craft to Marketplace"** — confetti triggers and the craft goes live!

### Step 2: Buyer Finds Craft, Reads Provenance & QR Code
1. Click the top logo **"KalaConnect"** to return to the buyer catalogue.
2. Filter by craft (e.g., *Kasuti Embroidery* or *Beedu Wild Palm*).
3. Tap on any craft card to open the **Product Story & Provenance Page**.
4. Review the **Provenance Card**:
   - Master artisan photo, village location, technique details, and craft story.
   - **Fair Price Breakdown**: Inspect raw materials + artisan labor earnings + co-op fund.
   - Click **"Provenance QR"** to inspect the scannable public QR code.

### Step 3: 1-Tap Simulated UPI Checkout
1. Tap **"Buy Now"** (or **"Add to Cart"** and proceed to checkout).
2. Enter buyer name, phone, and delivery address.
3. Select your preferred UPI app (**Google Pay, PhonePe, Paytm, or BHIM UPI**).
4. Tap **"Pay via UPI"** — a 1.5s simulated UPI verification executes, creates the order in SQLite, and displays the **Order Confirmation** with lifecycle tracking.

### Step 4: Artisan Fulfills & Ships Order
1. Go back to **Artisan Dashboard** (`/artisan/dashboard`).
2. Under **"Incoming Orders"**, observe the newly placed order with buyer details and address.
3. Tap **"Confirm Order"** (updates status from `placed` to `confirmed`).
4. Tap **"Mark as Shipped"** (updates status to `shipped` with India Post Speed Post confirmation).

---

## 💳 Payment Gateway Next Step
> [!NOTE]
> For this 24h Hackathon MVP, UPI payment processing is mocked to guarantee 100% reliable zero-downtime offline and online demos. In production, **Razorpay UPI & Smart Collect APIs** will be integrated to execute automated splits: 95% straight to artisan UPI VPAs and 5% to the cooperative cluster bank account.

---

## 📂 Data Model (SQLite)

```sql
artisans(id, name, village, phone, pin, bio, photo)
products(id, artisan_id, title, craft, price, stock, story, technique, materials, hours, image, created_at)
orders(id, buyer_name, buyer_phone, address, total, status, created_at)
order_items(id, order_id, product_id, qty, price)
```
Status lifecycle: `placed` ➔ `confirmed` ➔ `shipped`
