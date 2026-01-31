import { Router } from "express";
import axios from "axios";

const router = Router();

/**
 * TEST E2E BACKEND
 * Ruta: GET /modules/test
 * Compatible 100% con la BDD actual
 */

const API_URL =
  process.env.API_URL ||
  "https://proyectoecommersefinal.onrender.com";

router.get("/modules/test", async (req, res) => {
  // 🔒 Protección en producción
  if (
    process.env.NODE_ENV === "production" &&
    req.query.force !== "true"
  ) {
    return res.status(404).json({ message: "Not found" });
  }

  const report = [];

  let buyerToken;
  let adminToken;
  let productId;
  let orderId;

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
    // REGISTRO BUYER
    // ==========================
    await step("Registro Buyer", async () => {
      await axios.post(`${API_URL}/users`, {
        rut: "11111111-1",
        email: "buyer@test.cl",
        password: "123456",
        nombres: "Buyer",
        apellido: "Test",
        telefono: "123456789",
      });
    });

    // ==========================
    // LOGIN BUYER
    // ==========================
    await step("Login Buyer", async () => {
      const res = await axios.post(`${API_URL}/auth/login`, {
        email: "buyer@test.cl",
        password: "123456",
      });
      buyerToken = res.data.token;
    });

    // ==========================
    // LOGIN ADMIN
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

      // products.product_id
      productId = res.data?.[0]?.product_id;

      if (!productId) {
        throw new Error("No hay productos disponibles");
      }
    });

    // ==========================
    // CART
    // ==========================
    await step("Agregar al carrito", async () => {
      await axios.post(
        `${API_URL}/cart`,
        {
          productId,
          qty: 2,
        },
        {
          headers: {
            Authorization: `Bearer ${buyerToken}`,
          },
        }
      );
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
      const res = await axios.get(
        `${API_URL}/orders/me`,
        {
          headers: {
            Authorization: `Bearer ${buyerToken}`,
          },
        }
      );

      // orders.orden_id
      orderId = res.data?.[0]?.orden_id;

      if (!orderId) {
        throw new Error("No se encontró orden del buyer");
      }
    });

    await step("Actualizar estado orden (Admin)", async () => {
      await axios.put(
        `${API_URL}/orders/${orderId}/status`,
        { status: "PAGADA" },
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
      await axios.get(
        `${API_URL}/admin/dashboard`,
        {
          headers: {
            Authorization: `Bearer ${adminToken}`,
          },
        }
      );
    });

    // ==========================
    // RESULTADO FINAL
    // ==========================
    return res.status(200).json({
      ok: true,
      executedAt: new Date(),
      apiUrlUsed: API_URL,
      results: report,
    });

  } catch (error) {
    return res.status(500).json({
      ok: false,
      executedAt: new Date(),
      apiUrlUsed: API_URL,
      results: report,
    });
  }
});

export default router;
