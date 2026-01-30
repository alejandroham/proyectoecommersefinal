import "dotenv/config";
import bcrypt from "bcrypt";
import { pool } from "./config/database.js";

const crearAdmin = async () => {
  try {
    // Datos del admin
    const user = {
      rut: null,
      email: "admin@test.cl",
      password: "Admintest123",
      nombres: "Administrador",
      apellido: "Sistema",
      telefono: null,
      role: "admin"
    };

    // Generar hash
    const password_hash = await bcrypt.hash(user.password, 10);

    // Insertar en la BDD
    await pool.query(
      `INSERT INTO users
       (rut, email, password_hash, nombres, apellido, telefono, role)
       VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [
        user.rut,
        user.email,
        password_hash,
        user.nombres,
        user.apellido,
        user.telefono,
        user.role
      ]
    );

    console.log("✅ Usuario admin creado con éxito");
    console.log("📧 Email:", user.email);
    console.log("🔑 Password:", user.password);
    console.log("👤 Role:", user.role);

  } catch (error) {
    console.error("❌ Error creando admin:", error.message);
  } finally {
    process.exit();
  }
};

crearAdmin();
