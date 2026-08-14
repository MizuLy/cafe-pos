const mysql = require("mysql2/promise");
const { config } = require("dotenv");
config();

const isLocal =
  process.env.DB_HOST === "localhost" || process.env.DB_HOST === "127.0.0.1";

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  ssl: isLocal ? undefined : { rejectUnauthorized: false },
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// console.log("DB_HOST:", process.env.DB_HOST);
// console.log("DB_USER:", process.env.DB_USER);
// console.log("DB_PASS length:", process.env.DB_PASS?.length);
// console.log("DB_NAME:", process.env.DB_NAME);
// console.log("DB_PORT:", process.env.DB_PORT);

const testConnection = async () => {
  try {
    const connection = await db.getConnection(); // Get connection from pool
    console.log("Database connected!");
    connection.release();
  } catch (err) {
    console.log("Database error!", err);
  }
};

testConnection();

module.exports = db;
