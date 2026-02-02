import { pool } from "../../config/database.js";

/**
 * Obtener todos los productos
 * (admin verá activos e inactivos)
 */
export const findAll = async () => {
  const { rows } = await pool.query(
    `SELECT * FROM products ORDER BY product_id`
  );
  return rows;
};

/**
 * Obtener producto por ID
 */
export const findById = async (id) => {
  const { rows } = await pool.query(
    `SELECT * FROM products WHERE product_id = $1`,
    [id]
  );
  return rows[0];
};

/**
 * Crear producto
 */
export const create = async (data) => {
  const { rows } = await pool.query(
    `
    INSERT INTO products
      (nombre, descripcion, image_url, price, stock, catego, is_active)
    VALUES
      ($1, $2, $3, $4, $5, $6, $7)
    RETURNING *
    `,
    [
      data.nombre,
      data.descripcion,
      data.image_url,
      data.price,
      data.stock,
      data.catego,
      data.is_active ?? true
    ]
  );

  return rows[0];
};

/**
 * Actualizar producto completo
 */
export const update = async (id, data) => {
  const { rows } = await pool.query(
    `
    UPDATE products
    SET nombre = $1,
        descripcion = $2,
        image_url = $3,
        price = $4,
        stock = $5,
        catego = $6,
        is_active = $7,
        updated_at = NOW()
    WHERE product_id = $8
    RETURNING *
    `,
    [
      data.nombre,
      data.descripcion,
      data.image_url,
      data.price,
      data.stock,
      data.catego,
      data.is_active,
      id
    ]
  );

  return rows[0];
};

/**
 * Activar / desactivar producto
 */
export const setActive = async (id, isActive) => {
  await pool.query(
    `
    UPDATE products
    SET is_active = $1,
        updated_at = NOW()
    WHERE product_id = $2
    `,
    [isActive, id]
  );
};

/**
 * Eliminar producto
 */
export const remove = async (id) => {
  await pool.query(
    `DELETE FROM products WHERE product_id = $1`,
    [id]
  );
};
