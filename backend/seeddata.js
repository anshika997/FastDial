const db = require("./database/db");

async function seed() {
  await db(`INSERT INTO service_categories (service_category_name, service_desc, service_category_url) VALUES
    ('Plumbing', 'All plumbing services', 'plumbing.jpg'),
    ('Electrical', 'All electrical services', 'electrical.jpg'),
    ('Cleaning', 'All cleaning services', 'cleaning.jpg'),
    ('Carpentry', 'All carpentry services', 'carpentry.jpg'),
    ('Painting', 'All painting services', 'painting.jpg')`);

  await db(`INSERT INTO services (service_name, service_description, service_price, service_image_url, service_cat_id) VALUES
    ('Pipe Repair', 'Fix leaking pipes', 500.00, 'pipe.jpg', 1),
    ('Tap Fitting', 'Install new taps', 300.00, 'tap.jpg', 1),
    ('Wiring', 'Electrical wiring work', 800.00, 'wiring.jpg', 2),
    ('Fan Installation', 'Install ceiling fans', 400.00, 'fan.jpg', 2),
    ('Home Cleaning', 'Full home cleaning', 1000.00, 'clean.jpg', 3),
    ('Sofa Cleaning', 'Deep sofa cleaning', 600.00, 'sofa.jpg', 3),
    ('Furniture Repair', 'Fix broken furniture', 700.00, 'furniture.jpg', 4),
    ('Door Fitting', 'Install or fix doors', 500.00, 'door.jpg', 4),
    ('Wall Painting', 'Paint interior walls', 1200.00, 'paint.jpg', 5),
    ('Waterproofing', 'Waterproof walls', 1500.00, 'water.jpg', 5)`);

  console.log("✅ Seed data inserted!");
  process.exit(0);
}

seed().catch(e => { console.error(e); process.exit(1); });