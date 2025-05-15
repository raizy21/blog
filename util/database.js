import mysql from "mysql2/promise";
import dotenv from "dotenv";

// load .env into process.env
dotenv.config();

// create a connection pool
export const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// connect to the database
export async function connectDB() {
  try {
    const conn = await pool.getConnection();
    conn.release();
    console.log("mysql connected");
  } catch (err) {
    console.error("mysql connection failed:", err);
    throw err;
  }
}
