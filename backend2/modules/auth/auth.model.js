// modules/auth/auth.model.js
import db from "../../config/database.js";

export const findUserByEmail = async (email) => {
  const { rows } = await db.query(
    `SELECT user_id, email, password_hash, role
     FROM users
     WHERE email = $1 AND is_active = true`,
    [email]
  );

  return rows[0];
};

export const findUserById = async (id) => {
  return db.query(
    "SELECT id, email, rol FROM users WHERE id = ?",
    [id]
  );
};
