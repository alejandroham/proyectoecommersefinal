// modules/products/products.model.js
import { pool } from "../../config/database.js";

export const findAllActive = async () => {
  const { rows } = await pool.query(
    "SELECT * FROM products ORDER BY product_id"
  );
  return rows;
};

export const findById = async (id) => {
  const { rows } = await pool.query(
    "SELECT * FROM products WHERE product_id = $1",
    [id]
  );
  return rows[0];
};

export const create = async (data) => {
  const { rows } = await pool.query(
    `
    INSERT INTO products
      (nombre, descripcion, image_url, price, stock, catego)
    VALUES
      ($1, $2, $3, $4, $5, $6)
    RETURNING product_id, nombre, price, catego
    `,
    [
      data.nombre,
      data.descripcion,
      data.image_url,
      data.price,
      data.stock,
      data.catego
    ]
  );

  return rows[0];
};

export const update = async (id, data) => {
  const { rows } = await pool.query(
    `UPDATE products
     SET nombre = $1,
         descripcion = $2,
         image_url = $3,
         price = $4,
         stock = $5,
         catego = $6
     WHERE product_id = $7
     RETURNING *`,
    [
      data.nombre,
      data.descripcion,
      data.image_url,
      data.price,
      data.stock,
      data.catego,
      id
    ]
  );
  return rows[0];
};

// Obtener producto con lock (evita ventas dobles)
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

// Descontar stock
export const discountStock = async (product_id, qty, client) => {
  await client.query(
    `
    UPDATE products
    SET stock = stock - $1
    WHERE product_id = $2
    `,
    [qty, product_id]
  );
};