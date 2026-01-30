// modules/reports/reports.model.js
import { pool } from "../../config/database.js";

export const ReportsModel = {

  ventasRealizadas: async () => {
    const { rows } = await pool.query(
      `SELECT COUNT(*)::int AS total
       FROM orders
       WHERE status IN ('PAGADA','ENVIADA','COMPLETADA')`
    );
    return rows[0].total;
  },

  montoTotalVendido: async () => {
    const { rows } = await pool.query(
      `SELECT COALESCE(SUM(total), 0) AS total
       FROM orders
       WHERE status IN ('PAGADA','ENVIADA','COMPLETADA')`
    );
    return rows[0].total;
  },

  productosMasVendidos: async () => {
    const { rows } = await pool.query(
      `SELECT p.id,
              p.nombre,
              SUM(oi.qty)::int AS vendidos
       FROM order_items oi
       JOIN orders o ON o.id = oi.order_id
       JOIN products p ON p.id = oi.product_id
       WHERE o.status IN ('PAGADA','ENVIADA','COMPLETADA')
       GROUP BY p.id, p.nombre
       ORDER BY vendidos DESC
       LIMIT 5`
    );
    return rows;
  },

  estadosPedidos: async () => {
    const { rows } = await pool.query(
      `SELECT status, COUNT(*)::int AS total
       FROM orders
       GROUP BY status`
    );
    return rows;
  },

  usuariosRegistrados: async () => {
    const { rows } = await pool.query(
      `SELECT COUNT(*)::int AS total
       FROM users`
    );
    return rows[0].total;
  }

};
