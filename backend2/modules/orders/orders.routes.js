import express from "express";

// Controllers
import {
  getCart,
  addItem,
  updateQty,
  removeItem,
  checkout,
  changeStatus,
  getMyOrders,
  getAllOrders,
  getDashboardStats
} from "./orders.controller.js";

// Middlewares
import { validarToken } from "../../middlewares/validarToken.js";
import { autorizar } from "../../middlewares/autorizar.js";

const router = express.Router();

/* ============================
   CARRITO — BUYER
============================ */

// Obtener carrito activo
router.get(
  "/cart",
  validarToken,
  autorizar(["buyer"]),
  getCart
);

// Agregar producto al carrito
router.post(
  "/cart",
  validarToken,
  autorizar(["buyer"]),
  addItem
);

// Actualizar cantidad de item
router.put(
  "/cart/:itemId",
  validarToken,
  autorizar(["buyer"]),
  updateQty
);

// Eliminar item del carrito
router.delete(
  "/cart/:itemId",
  validarToken,
  autorizar(["buyer"]),
  removeItem
);

// Checkout del carrito
router.post(
  "/cart/checkout",
  validarToken,
  autorizar(["buyer"]),
  checkout
);

/* ============================
   ÓRDENES
============================ */

// Órdenes del usuario logueado
router.get(
  "/orders/me",
  validarToken,
  autorizar(["buyer"]),
  getMyOrders
);

// Todas las órdenes (admin)
router.get(
  "/orders",
  validarToken,
  autorizar(["admin"]),
  getAllOrders
);

// Cambiar estado de una orden (admin)
router.put(
  "/orders/:orderId/status",
  validarToken,
  autorizar(["admin"]),
  changeStatus
);

/* ============================
   DASHBOARD — ADMIN
============================ */

// Estadísticas del dashboard
router.get(
  "/dashboard",
  validarToken,
  autorizar(["admin"]),
  getDashboardStats
);

export default router;
