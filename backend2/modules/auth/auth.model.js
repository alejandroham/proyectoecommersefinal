// modules/auth/auth.model.js
import { pool } from "../../config/database.js";

export const findUserByEmail = async (email) => {
  const { rows } = await pool.query(
    `SELECT user_id, email, password_hash, role
     FROM users
     WHERE email = $1`,
    [email]
  );

  return rows[0];
};

export const findUserById = async (user_id) => {
  const { rows } = await pool.query(
    `SELECT user_id, email, role
     FROM users
     WHERE user_id = $1`,
    [user_id]
  );

  return rows[0];
};
