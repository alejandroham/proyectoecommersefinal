import db from "../../config/database.js";

export const findAllActive = async () => {
  const { rows } = await db.query(
    "SELECT * FROM products WHERE is_active = true"
  );
  return rows;
};

export const findById = async (id) => {
  const { rows } = await db.query(
    "SELECT * FROM products WHERE product_id = $1",
    [id]
  );
  return rows[0];
};

export const create = async (data) => {
  const { rows } = await db.query(
    `INSERT INTO products
     (nombre, descripcion, image_url, price, stock, catego)
     VALUES ($1, $2, $3, $4, $5, $6)
     RETURNING *`,
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
  const { rows } = await db.query(
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