import { Router } from "express";
import axios from "axios";

const router = Router();

/**
 * ⚠️ TEST E2E BACKEND
 * Ruta: GET /modules/test
 * SOLO PARA DEV / QA
 */

const API_URL =
  process.env.API_URL || "http://localhost:3000";

router.get("/modules/test", async (req, res) => {
  // Seguridad básica
  if (process.env.NODE_ENV === "production") {
    return res.status(404).json({ message: "Not found" });
  }

  const report = [];
  let buyerToken, adminToken, productId, cartItemId, orderId;

  const step = async (name, fn) => {
    try {
      await fn();
      report.push({ step: name, status: "OK" });
    } catch (error) {
      report.push({
        step: name,
        status: "ERROR",
        error: error.response?.data || error.message,
      });
      throw error;
    }
  };

  try {
    // ==========================
    // BUYER
    // ==========================
    await step("Registro Buyer", async () => {
      await axios.post(`${API_URL}/users`, {
        name: "Buyer Test",
        email: "buyer@test.cl",
        password: "123456",
      });
    });

    await step("Login Buyer", async () => {
      const res = await axios.post(`${API_URL}/auth/login`, {
        email: "buyer@test.cl",
        password: "123456",
      });
      buyerToken = res.data.token;
    });

    // ==========================
    // ADMIN
    // ==========================
    await step("Login Admin", async () => {
      const res = await axios.post(`${API_URL}/auth/login`, {
        email: "admin@test.cl",
        password: "123456",
      });
      adminToken = res.data.token;
    });

    // ==========================
    // PRODUCTS
    // ==========================
    await step("Listar productos", async () => {
      const res = await axios.get(`${API_URL}/products`);
      productId = res.data[0]?.id;
      if (!productId) throw new Error("No hay productos disponibles");
    });

    // ==========================
    // CART
    // ==========================
    await step("Agregar al carrito", async () => {
      const res = await axios.post(
        `${API_URL}/cart`,
        { productId, qty: 2 },
        {
          headers: {
            Authorization: `Bearer ${buyerToken}`,
          },
        }
      );
      cartItemId = res.data.items?.[0]?.id;
    });

    await step("Checkout", async () => {
      await axios.post(
        `${API_URL}/cart/checkout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${buyerToken}`,
          },
        }
      );
    });

    // ==========================
    // ORDERS
    // ==========================
    await step("Mis órdenes", async () => {
      const res = await axios.get(`${API_URL}/orders/me`, {
        headers: {
          Authorization: `Bearer ${buyerToken}`,
        },
      });
      orderId = res.data[0]?.id;
    });

    await step("Actualizar estado orden (Admin)", async () => {
      await axios.put(
        `${API_URL}/orders/${orderId}/status`,
        { status: "PAID" },
        {
          headers: {
            Authorization: `Bearer ${adminToken}`,
          },
        }
      );
    });

    // ==========================
    // DASHBOARD
    // ==========================
    await step("Dashboard Admin", async () => {
      await axios.get(`${API_URL}/admin/dashboard`, {
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      });
    });

    return res.status(200).json({
      ok: true,
      executedAt: new Date(),
      results: report,
    });

  } catch (error) {
    return res.status(500).json({
      ok: false,
      executedAt: new Date(),
      results: report,
    });
  }
});

export default router;
