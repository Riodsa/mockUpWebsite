import { Pool } from "pg";

let pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT || 5432,
  // Connection pool settings
  max: 20, // Maximum number of clients in the pool
  idleTimeoutMillis: 30000, // Close idle clients after 30 seconds
  connectionString:
    process.env.DATABASE_URL || "postgres://postgres:postgres@localhost:5433",
});
export const query = async (text, params) => {
  const start = Date.now();
  try {
    const res = await pool.query(text, params);
    // const duration = Date.now() - start;
    // console.log("Executed query:", { text, duration, rows: res.rowCount });
    return res;
  } catch (error) {
    console.error("Database query error:", error);
    throw error;
  }
};

export default pool;
