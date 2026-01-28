import pool from "../../config/database.js";

export const OrderItemsModel = {

  getByOrder: async (order_id) => {
    const { rows } = await pool.query(
      `SELECT oi.*, p.nombre, p.image_url
       FROM order_items oi
       JOIN products p ON p.product_id = oi.product_id
       WHERE oi.order_id = $1`,
      [order_id]
    );
    return rows;
  },

  addItem: async (order_id, product) => {
    await pool.query(
      `INSERT INTO order_items (order_id, product_id, qty, unit_price, line_total)
       VALUES ($1, $2, 1, $3, $3)
       ON CONFLICT (order_id, product_id)
       DO UPDATE SET
         qty = order_items.qty + 1,
         line_total = (order_items.qty + 1) * order_items.unit_price`,
      [order_id, product.product_id, product.price]
    );
  },

  updateQty: async (order_item_id, qty) => {
    await pool.query(
      `UPDATE order_items
       SET qty = $1,
           line_total = $1 * unit_price
       WHERE order_item_id = $2`,
      [qty, order_item_id]
    );
  },

  removeItem: async (order_item_id) => {
    await pool.query(
      `DELETE FROM order_items
       WHERE order_item_id = $1`,
      [order_item_id]
    );
  },

  calcTotal: async (order_id) => {
    const { rows } = await pool.query(
      `SELECT COALESCE(SUM(line_total),0) AS total
       FROM order_items
       WHERE order_id = $1`,
      [order_id]
    );
    return rows[0].total;
  }
};
