import { pool } from "../../config/database.js";

const DEFAULT_PROFILE_IMAGE =
  "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";

/**
 * Crear usuario
 */
export const create = async (data) => {
  const { rows } = await pool.query(
    `
    INSERT INTO users
      (email, password_hash, nombres, apellido, telefono, role)
    VALUES
      ($1, $2, $3, $4, $5, $6)
    RETURNING
      user_id,
      email,
      role,
      COALESCE(profile_image, $7) AS profile_image
    `,
    [
      data.email,
      data.password_hash,
      data.nombres,
      data.apellido,
      data.telefono ?? null,
      data.role,
      DEFAULT_PROFILE_IMAGE
    ]
  );

  return rows[0];
};

/**
 * Listar usuarios
 */
export const findAll = async () => {
  const { rows } = await pool.query(
    `
    SELECT
      user_id,
      email,
      nombres,
      apellido,
      telefono,
      role,
      created_at,
      COALESCE(profile_image, $1) AS profile_image
    FROM users
    `,
    [DEFAULT_PROFILE_IMAGE]
  );

  return rows;
};

/**
 * Obtener usuario por ID
 */
export const findById = async (user_id) => {
  const { rows } = await pool.query(
    `
    SELECT
      user_id,
      email,
      nombres,
      apellido,
      telefono,
      role,
      COALESCE(profile_image, $1) AS profile_image
    FROM users
    WHERE user_id = $2
    `,
    [DEFAULT_PROFILE_IMAGE, user_id]
  );

  return rows[0];
};

/**
 * Usuario actualiza su propio perfil (SIN rol)
 */
export const updateProfileByUser = async (user_id, data) => {
  const { rows } = await pool.query(
    `
    UPDATE users
    SET email = $1,
        nombres = $2,
        apellido = $3,
        telefono = $4,
        profile_image = $5,
        updated_at = NOW()
    WHERE user_id = $6
    RETURNING
      user_id,
      email,
      nombres,
      apellido,
      telefono,
      role,
      COALESCE(profile_image, $7) AS profile_image
    `,
    [
      data.email,
      data.nombres,
      data.apellido,
      data.telefono ?? null,
      data.profile_image ?? null,
      user_id,
      DEFAULT_PROFILE_IMAGE
    ]
  );

  return rows[0];
};
