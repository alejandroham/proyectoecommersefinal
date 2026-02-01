// modules/users/users.model.js
import { pool } from "../../config/database.js";

export const create = async (data) => {
  const { rows } = await pool.query(
    `
    INSERT INTO users
      (email, password_hash, nombres, apellido, telefono, role)
    VALUES
      ($1, $2, $3, $4, $5, $6)
    RETURNING user_id, email, role
    `,
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
  const { rows } = await pool.query(
    "SELECT user_id, email, role, created_at FROM users"
  );
  return rows;
};

export const findById = async (user_id) => {
  const { rows } = await pool.query(
    "SELECT user_id, email, role FROM users WHERE user_id = $1",
    [user_id]
  );
  return rows[0];
};

export const updateById = async (user_id, data) => {
  const { rows } = await pool.query(
    `
    UPDATE users
    SET email = $1,
        nombres = $2,
        apellido = $3,
        telefono = $4,
        role = $5
    WHERE user_id = $6
    RETURNING user_id, email, role
    `,
    [
      data.email,
      data.nombres,
      data.apellido,
      data.telefono ?? null,
      data.role,
      user_id
    ]
  );

  return rows[0];
};
