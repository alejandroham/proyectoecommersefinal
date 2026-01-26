// modules/users/users.model.js
import db from "../../config/database.js";

export const create = async (data) => {
  const { rows } = await db.query(
    `INSERT INTO users
     (email, password_hash, nombres, apellido, telefono, role)
     VALUES ($1, $2, $3, $4, $5, $6)
     RETURNING user_id, email, role, is_active`,
    [
      data.email,
      data.password_hash,
      data.nombres,
      data.apellido,
      data.telefono ?? null,
      data.role
    ]
  );

  return rows[0];
};


export const findAll = async () => {
  return db.query(
    "SELECT id, email, rol, active, created_at FROM users"
  );
};

export const findById = async (id) => {
  return db.query(
    "SELECT id, email, rol, active FROM users WHERE id = ?",
    [id]
  );
};

export const updateById = async (id, data) => {
  return db.query(
    "UPDATE users SET ? WHERE id = ?",
    [data, id]
  );
};

