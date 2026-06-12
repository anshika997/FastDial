const mysql = require("mysql2");
const dotenv = require("dotenv");

dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_SERVER || "gateway01.ap-southeast-1.prod.alicloud.tidbcloud.com",
  user: process.env.DB_USER || "7jKJKuVNRKwkHZn.root",
  password: process.env.DB_PASSWORD || "9n9WyRtevkUIZJpH",
  database: process.env.DB_NAME || "fast_dial",
  port: process.env.DB_PORT || 4000,
  ssl: (process.env.DB_SERVER && process.env.DB_SERVER !== "localhost") || !process.env.DB_SERVER
    ? { rejectUnauthorized: false }
    : undefined,
  waitForConnections: true,
  connectionLimit: 25,
  queueLimit: 0,
});

// Function to run queries using the pool
const db = (...args) => {
  return new Promise((resolve, reject) => {
    pool.query(...args, (err, results) => {
      if (err) {
        console.error("Database query error:", err);
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};

// Gracefully close the pool when the application exits
process.on("SIGINT", () => {
  pool.end((err) => {
    if (err) {
      console.error("Error closing MySQL pool:", err);
    } else {
      console.log("MySQL pool closed gracefully.");
    }
    process.exit(err ? 1 : 0);
  });
});

module.exports = db;
