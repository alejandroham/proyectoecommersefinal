import { pool } from "../../config/database.js";

export const OrdersModel = {


  // CARRITO ACTIVO

  getActiveCartByUser: async (user_id) => {
    const { rows } = await pool.query(
      `
      SELECT *
      FROM orders
      WHERE user_id = $1
        AND status = 'CARRITO'
      LIMIT 1
      `,
      [user_id]
    );
    return rows[0];
  },

  createCart: async (user_id) => {
    const { rows } = await pool.query(
      `
      INSERT INTO orders (user_id, status, total)
      VALUES ($1, 'CARRITO', 0)
      RETURNING *
      `,
      [user_id]
    );
    return rows[0];
  },


  // ESTADO / TOTAL

  updateStatus: async (order_id, status) => {
    await pool.query(
      `
      UPDATE orders
      SET status = $1,
          updated_at = NOW()
      WHERE order_id = $2
      `,
      [status, order_id]
    );
  },

  updateTotal: async (order_id, total) => {
    await pool.query(
      `
      UPDATE orders
      SET total = $1,
          updated_at = NOW()
      WHERE order_id = $2
      `,
      [total, order_id]
    );
  },


  // CONSULTAS

  getByUser: async (user_id) => {
    const { rows } = await pool.query(
      `
      SELECT *
      FROM orders
      WHERE user_id = $1
        AND status <> 'CARRITO'
      ORDER BY order_id DESC
      `,
      [user_id]
    );
    return rows;
  },

  getAll: async () => {
    const { rows } = await pool.query(
      `
      SELECT o.*, u.email
      FROM orders o
      JOIN users u ON u.user_id = o.user_id
      ORDER BY o.order_id DESC
      `
    );
    return rows;
  },


  // ENVÍO

  updateShipping: async (order_id, data) => {
    await pool.query(
      `
      UPDATE orders SET
        ship_label = $1,
        ship_line1 = $2,
        ship_line2 = $3,
        ship_city = $4,
        ship_region = $5,
        updated_at = NOW()
      WHERE order_id = $6
      `,
      [
        data.ship_label,
        data.ship_line1,
        data.ship_line2,
        data.ship_city,
        data.ship_region,
        order_id
      ]
    );
  }
};
