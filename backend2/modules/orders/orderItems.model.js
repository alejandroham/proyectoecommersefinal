import { pool } from "../../config/database.js";

export const OrderItemsModel = {

  addItem: async (order_id, product_id, qty, unit_price) => {
    const { rows } = await pool.query(
      `
      INSERT INTO order_items
        (order_id, product_id, qty, unit_price, line_total)
      VALUES
        ($1, $2, $3, $4, $3 * $4)
      RETURNING *
      `,
      [order_id, product_id, qty, unit_price]
    );
    return rows[0];
  },

  getByOrder: async (order_id, client = pool) => {
    const { rows } = await client.query(
      `
      SELECT
        oi.order_item_id,
        oi.product_id,
        oi.qty,
        oi.unit_price,
        oi.line_total,
        p.nombre
      FROM order_items oi
      JOIN products p ON p.product_id = oi.product_id
      WHERE oi.order_id = $1
      `,
      [order_id]
    );
    return rows;
  },

  calcTotal: async (order_id) => {
    const { rows } = await pool.query(
      `
      SELECT COALESCE(SUM(line_total), 0)::numeric AS total
      FROM order_items
      WHERE order_id = $1
      `,
      [order_id]
    );
    return Number(rows[0].total);
  },

  updateQty: async (order_item_id, qty) => {
    await pool.query(
      `
      UPDATE order_items
      SET qty = $1,
          line_total = $1 * unit_price
      WHERE order_item_id = $2
      `,
      [qty, order_item_id]
    );
  },

  removeItem: async (order_item_id) => {
    await pool.query(
      `DELETE FROM order_items WHERE order_item_id = $1`,
      [order_item_id]
    );
  }
};
