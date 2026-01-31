import pkg from 'pg';
const { Pool } = pkg;

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    require: true,
    rejectUnauthorized: false
  }
});

// Test de conexión al iniciar
export const connectDB = async () => {
  try {
    await pool.query('SELECT 1');
    console.log('✅ Base de datos conectada');
  } catch (error) {
    console.error('❌ Error conectando a la BD:', error.message);
    process.exit(1); // mata el proceso si no conecta
  }
};
