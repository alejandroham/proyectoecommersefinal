import { pool } from "../../config/database.js";

/**
 * Obtener todos los productos activos
 */
export const findAllActive = async () => {
  const { rows } = await pool.query(
    `
    SELECT *
    FROM products
    WHERE is_active = true
    ORDER BY product_id
    `
  );
  return rows;
};

/**
 * Obtener producto por ID
 */
export const findById = async (id) => {
  const { rows } = await pool.query(
    `
    SELECT *
    FROM products
    WHERE product_id = $1
    `,
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
      data.descripcion ?? null,
      data.image_url ?? null,
      data.price,
      data.stock ?? 0,
      data.catego ?? "Notebook",
      data.is_active ?? true
    ]
  );

  return rows[0];
};

/**
 * Actualizar producto
 */
export const update = async (id, data) => {
  const { rows } = await pool.query(
    `
    UPDATE products
    SET
      nombre = $1,
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
      data.descripcion ?? null,
      data.image_url ?? null,
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
 * Obtener producto con lock (evita ventas dobles)
 * Se usa dentro de una transacción
 */
export const findByIdForUpdate = async (product_id, client) => {
  const { rows } = await client.query(
    `
    SELECT *
    FROM products
    WHERE product_id = $1
    FOR UPDATE
    `,
    [product_id]
  );
  return rows[0];
};

/**
 * Descontar stock (con validación)
 */
export const discountStock = async (product_id, qty, client) => {
  const { rowCount } = await client.query(
    `
    UPDATE products
    SET stock = stock - $1
    WHERE product_id = $2
      AND stock >= $1
    `,
    [qty, product_id]
  );

  if (rowCount === 0) {
    throw new Error("Stock insuficiente");
  }
};

export const findAll = async () => {
  const { rows } = await pool.query(
    "SELECT * FROM products ORDER BY product_id"
  );
  return rows;
};
