import db from './database.js';

console.log('Seeding KalaConnect database...');

// Clear existing tables
db.exec(`
  DELETE FROM order_items;
  DELETE FROM orders;
  DELETE FROM products;
  DELETE FROM artisans;
  DELETE FROM sqlite_sequence WHERE name IN ('artisans', 'products', 'orders', 'order_items');
`);

const insertArtisan = db.prepare(`
  INSERT INTO artisans (name, village, phone, pin, bio, photo)
  VALUES (@name, @village, @phone, @pin, @bio, @photo)
`);

const insertProduct = db.prepare(`
  INSERT INTO products (artisan_id, title, craft, price, stock, story, technique, materials, hours, image)
  VALUES (@artisan_id, @title, @craft, @price, @stock, @story, @technique, @materials, @hours, @image)
`);

const seedData = db.transaction(() => {
  // 1. Rukmini Bai
  const rukmini = insertArtisan.run({
    name: 'Rukmini Bai',
    village: 'Narendra, Dharwad',
    phone: '9845123456',
    pin: '1234',
    bio: 'Master Kasuti needlewoman with 28 years of devotion to 7th-century knotless reversible embroidery. Mentors younger village women in counted-thread temple geometry.',
    photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80'
  });

  // 2. Devamma Poojarthi
  const devamma = insertArtisan.run({
    name: 'Devamma Poojarthi',
    village: 'Hemmadi, Kundapura',
    phone: '9845234567',
    pin: '2345',
    bio: 'Custodian of coastal Beedu palm craft. Forages wild date palm fronds from Western Ghat foothills, curing with smoke and wild neem bark for natural insect resistance.',
    photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80'
  });

  // 3. Sanjeeva Shettigar
  const sanjeeva = insertArtisan.run({
    name: 'Sanjeeva Shettigar',
    village: 'Talipady, Udupi',
    phone: '9845345678',
    pin: '3456',
    bio: '3rd-generation pit-loom weaver at Talipady Weavers Society. Crafts GI-tagged Malnad cottons treated with natural starch and fermented plant dye selvedges.',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80'
  });

  // Products for Rukmini Bai (Kasuti)
  insertProduct.run({
    artisan_id: rukmini.lastInsertRowid,
    title: 'Hand-Embroidered Kasuti Pallu Saree',
    craft: 'Kasuti',
    price: 3850,
    stock: 2,
    story: 'Features sacred Gopura (temple tower) and Ratha (chariot) motifs counted thread-by-thread without knots or chalk tracings. Identical on both sides.',
    technique: 'Gavanti (double running) and Murgi (zigzag ladder) stitches',
    materials: 'Pure handspun Kora silk-cotton with plant-dyed floss',
    hours: 42,
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80'
  });

  insertProduct.run({
    artisan_id: rukmini.lastInsertRowid,
    title: 'Kasuti Badami Chariot Cushion Covers (Pair)',
    craft: 'Kasuti',
    price: 1250,
    stock: 5,
    story: 'Geometric depiction of Chalukyan rock-cut temple chariots. Stitched thread-by-thread onto unbleached linen.',
    technique: 'Double running Gavanti and Negi weaving stitches',
    materials: 'Unbleached natural linen cloth, cotton embroidery thread',
    hours: 14,
    image: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=800&q=80'
  });

  insertProduct.run({
    artisan_id: rukmini.lastInsertRowid,
    title: 'Kasuti Sacred Lotus Table Runner',
    craft: 'Kasuti',
    price: 1600,
    stock: 3,
    story: 'Traditional Kamala (lotus) motifs symbolizing prosperity and purity, hand-embroidered by artisan collective during monsoon months.',
    technique: 'Gavanti stitch, reversible finish',
    materials: 'Handwoven Malnad cotton with indigo & turmeric threads',
    hours: 18,
    image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=800&q=80'
  });

  // Products for Devamma Poojarthi (Beedu)
  insertProduct.run({
    artisan_id: devamma.lastInsertRowid,
    title: 'Traditional Beedu Wild Palm Storage Basket',
    craft: 'Beedu',
    price: 720,
    stock: 8,
    story: 'Woven from hand-split wild date palm leaves cured in woodsmoke. Naturally repels moisture and pests, lasting for generations without any plastic.',
    technique: 'Multi-rib cross interlock weaving',
    materials: 'Forest-foraged palmyra leaves, neem bark extract, bamboo rim',
    hours: 8,
    image: 'https://images.unsplash.com/photo-1590736969955-71cc94801759?auto=format&fit=crop&w=800&q=80'
  });

  insertProduct.run({
    artisan_id: devamma.lastInsertRowid,
    title: 'Hand-Woven Beedu Palm Fruit Tray',
    craft: 'Beedu',
    price: 480,
    stock: 6,
    story: 'Wide shallow tray woven with fine palm ribs. Perfect for natural table decor, fruits, or dry kitchen storage.',
    technique: 'Radial spiraling herringbone weave',
    materials: 'Tender date palm fronds, natural wild madder dye wash',
    hours: 5,
    image: 'https://images.unsplash.com/photo-1534349762230-e0cadf78f5da?auto=format&fit=crop&w=800&q=80'
  });

  insertProduct.run({
    artisan_id: devamma.lastInsertRowid,
    title: 'Coastal Wild Palm Tea Coasters (Set of 6)',
    craft: 'Beedu',
    price: 360,
    stock: 12,
    story: 'Compact hexagonal coasters hand-braided from coastal wild palms. Heat-resistant and zero plastic.',
    technique: 'Tight circular braid with lock-stitch edge',
    materials: 'Sundried palmyra fronds',
    hours: 4,
    image: 'https://images.unsplash.com/photo-1607344645866-009c320c5ab8?auto=format&fit=crop&w=800&q=80'
  });

  // Products for Sanjeeva Shettigar (Handloom & Bidriware)
  insertProduct.run({
    artisan_id: sanjeeva.lastInsertRowid,
    title: 'Udupi 80s Count Pure Kora Cotton Stole',
    craft: 'Handloom',
    price: 1450,
    stock: 4,
    story: 'Woven on traditional Malnad pit looms using natural tapioca starch sizing. Breathable, feather-light, with auspicious arecanut-dyed borders.',
    technique: 'Fly-shuttle pit loom weave with dobby border',
    materials: '80s combed pure cotton, natural arecanut dye',
    hours: 15,
    image: 'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=800&q=80'
  });

  insertProduct.run({
    artisan_id: sanjeeva.lastInsertRowid,
    title: 'Udupi Natural Indigo & Turmeric Dupatta',
    craft: 'Handloom',
    price: 1850,
    stock: 3,
    story: 'Handspun organic cotton dyed in fermented natural indigo vats with sun-bright turmeric temple borders.',
    technique: 'Two-pedal tie-up handloom weave',
    materials: 'Organic yarn, natural fermented indigo, temple turmeric',
    hours: 20,
    image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80'
  });

  insertProduct.run({
    artisan_id: sanjeeva.lastInsertRowid,
    title: 'Bidriware Floral Silver Wire Inlay Trinket Box',
    craft: 'Bidriware',
    price: 2200,
    stock: 2,
    story: 'Zinc-copper alloy blackened with soil from ancient Bidar fort, meticulously inlaid with 99.9% fine silver wire in floral arabesques.',
    technique: 'Tarkashi silver wire chisel and inlay',
    materials: 'Zinc-copper blackened alloy, pure silver wire',
    hours: 26,
    image: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80'
  });
});

seedData();
console.log('Seeding completed successfully! 3 artisans and 9 products created.');
