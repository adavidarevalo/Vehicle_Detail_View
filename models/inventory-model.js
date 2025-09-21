const { Pool } = require('pg');

exports.getAllFromDb = async function () {
  const query = {
    text: 'SELECT id, make, model, custom_name, year, price, currency, engine, modifications, color, category, image, available, mileage FROM vehicles',
    name: 'get-all-vehicles',
  };
  const result = await pool.query(query);
  return result.rows.map((row) => ({
    id: row.id,
    make: row.make,
    model: row.model,
    custom_name: row.custom_name,
    year: row.year,
    price: Number(row.price),
    currency: row.currency,
    engine: row.engine,
    modifications: row.modifications,
    color: row.color,
    category: row.category,
    image: row.image,
    available: row.available,
    mileage: row.mileage != null ? Number(row.mileage) : undefined,
  }));
};

exports.getByImagePrefix = async function (prefix) {
  if (!pool) {
    const all = loadAll();
    return all.filter((v) => (v.image || '').startsWith(prefix.replace('%', '')));
  }
  const like = prefix.endsWith('%') ? prefix : `${prefix}%`;
  const query = {
    text: 'SELECT id, make, model, custom_name, year, price, currency, engine, modifications, color, category, image, available, mileage FROM vehicles WHERE image LIKE $1',
    values: [like],
    name: 'get-vehicles-by-image-prefix',
  };
  const result = await pool.query(query);
  return result.rows.map((row) => ({
    id: row.id,
    make: row.make,
    model: row.model,
    custom_name: row.custom_name,
    year: row.year,
    price: Number(row.price),
    currency: row.currency,
    engine: row.engine,
    modifications: row.modifications,
    color: row.color,
    category: row.category,
    image: row.image,
    available: row.available,
    mileage: row.mileage != null ? Number(row.mileage) : undefined,
  }));
};

const connectionString = process.env.DATABASE_URL || process.env.POSTGRES_URL;
const pool = connectionString
  ? new Pool({ connectionString, ssl: { rejectUnauthorized: false } })
  : null;

exports.getById = async function (id) {
  if (!id) return null;
  if (!pool) {
    const all = loadAll();
    return all.find((v) => v.id === id) || null;
  }

  const query = {
    text:
      'SELECT id, make, model, custom_name, year, price, currency, engine, modifications, color, category, image, available, mileage FROM vehicles WHERE id = $1',
    values: [id],
    name: 'get-vehicle-by-id',
  };

  const result = await pool.query(query);
  if (result.rows.length === 0) return null;
  const row = result.rows[0];
  return {
    id: row.id,
    make: row.make,
    model: row.model,
    custom_name: row.custom_name,
    year: row.year,
    price: Number(row.price),
    currency: row.currency,
    engine: row.engine,
    modifications: row.modifications,
    color: row.color,
    category: row.category,
    image: row.image,
    available: row.available,
    mileage: row.mileage != null ? Number(row.mileage) : undefined,
  };
};
