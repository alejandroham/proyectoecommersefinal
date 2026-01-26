import pkg from "pg";
const { Pool } = pkg;
if (!process.env.PGPASSWORD) {
  throw new Error("❌ PGPASSWORD NO está cargado");
}
const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: String(process.env.PGPASSWORD),
  port: process.env.PGPORT,
});

export default pool;

