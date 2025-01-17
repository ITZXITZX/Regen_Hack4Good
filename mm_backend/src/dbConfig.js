// dbConfig.js
const { Pool } = require('pg');

const db = new Pool({
  user: process.env.DB_USER,       // Database username
  host: process.env.DB_HOST,       // Database host (e.g., 'localhost')
  database: process.env.DB_NAME,   // Database name
  password: process.env.DB_PASSWORD, // Database password
  port: process.env.DB_PORT || 5432,  // Default PostgreSQL port
  ssl: process.env.DB_SSL === 'true', // Optional: Enable SSL if required
});

db.connect()
  .then(() => console.log("Connected to PostgreSQL database"))
  .catch((err) => console.error("Error connecting to PostgreSQL database:", err));

module.exports = db;
