import express from "express";
import pool from "./config/database.js";
import { validarToken } from "./middlewares/validarToken.js";
import { autorizar } from "./middlewares/autorizar.js";

const router = express.Router();

router.get(
  "/admin/test-local",
  validarToken,
  autorizar(["admin"]),
  async (req, res) => {
    try {
      console.log("🔎 INICIANDO TEST LOCAL BACKEND");

      const db = await pool.query("SELECT NOW() AS now");

      const users = await pool.query(
        "SELECT COUNT(*)::int AS total FROM users"
      );

      const products = await pool.query(
        "SELECT COUNT(*)::int AS total FROM products"
      );

      const orders = await pool.query(
        "SELECT COUNT(*)::int AS total FROM orders"
      );

      const ordersByStatus = await pool.query(
        `SELECT status, COUNT(*)::int AS total
         FROM orders
         GROUP BY status`
      );

      const result = {
        status: "OK",
        db_time: db.rows[0].now,
        users: users.rows[0].total,
        products: products.rows[0].total,
        orders: orders.rows[0].total,
        orders_by_status: ordersByStatus.rows
      };

      console.log("✅ RESULTADO TEST LOCAL:", result);

      res.json(result);

    } catch (error) {
      console.error("❌ ERROR TEST LOCAL:", error);
      res.status(500).json({
        status: "ERROR",
        message: error.message
      });
    }
  }
);

export default router;
