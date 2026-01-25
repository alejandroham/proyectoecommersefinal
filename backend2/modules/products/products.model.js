export const findAllActive = async () => {
  return db.query(
    "SELECT * FROM products WHERE is_active = true"
  );
};

export const findById = async (id) => {
  return db.query(
    "SELECT * FROM products WHERE product_id = $1",
    [id]
  );
};

export const create = async (data) => {
  return db.query(
    `INSERT INTO products
     (nombre, descripcion, image_url, price, stock, catego)
     VALUES ($1, $2, $3, $4, $5, $6)`,
    [
      data.nombre,
      data.descripcion,
      data.image_url,
      data.price,
      data.stock,
      data.catego
    ]
  );
};

export const update = async (id, data) => {
  return db.query(
    "UPDATE products SET ? WHERE product_id = ?",
    [data, id]
  );
};
