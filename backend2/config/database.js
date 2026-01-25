//database/connection.js

import pkg from "pg";
const { Pool } = pkg;
import "../dotenv/config.js";

const pool = new Pool({
user: process.env.PGUSER,
host: process.env.PGHOST,
database: process.env.PGDATABASE,
password: process.env.PGPASSWORD,
port: process.env.PGPORT,
allowExitOnIdle: true,
});

export default pool;