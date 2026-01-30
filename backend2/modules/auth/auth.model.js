// modules/auth/auth.model.js
import { pool } from "../../config/database.js";

export const findUserByEmail = async (email) => {
  const { rows } = await pool.query(
    `SELECT id, email, password_hash, role
     FROM users
     WHERE email = $1`,
    [email]
  );

  return rows[0];
};

export const findUserById = async (id) => {
  const { rows } = await pool.query(
    "SELECT id, email, role FROM users WHERE id = $1",
    [id]
  );

  return rows[0];
};
