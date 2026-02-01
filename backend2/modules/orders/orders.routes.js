// orders.routes.js
import express from "express";
import {
  getCart,
  addItem,
  updateQty,
  removeItem,
  checkout, 
  updateOrderStatus,
  getMyOrders,
  getAllOrders
} from "./orders.controller.js";

import { validarToken } from "../../middlewares/validarToken.js";
import { autorizar } from "../../middlewares/autorizar.js";

const router = express.Router();

/* CARRITO — BUYER */
router.get("/cart", validarToken, autorizar(["buyer"]), getCart);
router.post("/cart", validarToken, autorizar(["buyer"]), addItem);
router.put("/cart/:itemId", validarToken, autorizar(["buyer"]), updateQty);
router.delete("/cart/:itemId", validarToken, autorizar(["buyer"]), removeItem);
router.post("/cart/checkout", validarToken, autorizar(["buyer"]), checkout);

/* ORDERS */
router.get("/orders/me", validarToken, autorizar(["buyer"]), getMyOrders);
router.get("/orders", validarToken, autorizar(["admin"]), getAllOrders);
router.put(
  "/orders/:orderId/status",
  validarToken,
  autorizar(["admin"]),
  updateOrderStatus
);

export default router;
