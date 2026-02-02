import express from "express";
import {
  getCart,
  addItem,
  updateQty,
  removeItem,
  checkout,
  getMyOrders,
  getAllOrders,
  getDashboard   // 👈 IMPORTANTE
} from "./orders.controller.js";

import { validarToken } from "../../middlewares/validarToken.js";
import { autorizar } from "../../middlewares/autorizar.js";

const router = express.Router();

/* ======================
   CARRITO — BUYER
====================== */
router.get("/cart", validarToken, autorizar(["buyer"]), getCart);
router.post("/cart", validarToken, autorizar(["buyer"]), addItem);
router.put("/cart/:itemId", validarToken, autorizar(["buyer"]), updateQty);
router.delete("/cart/:itemId", validarToken, autorizar(["buyer"]), removeItem);
router.post("/cart/checkout", validarToken, autorizar(["buyer"]), checkout);

/* ======================
   ÓRDENES
====================== */
router.get("/orders/me", validarToken, autorizar(["buyer"]), getMyOrders);
router.get("/orders", validarToken, autorizar(["admin"]), getAllOrders);

/* ======================
   DASHBOARD — ADMIN
====================== */
router.get(  "/orders/dashboard",  validarToken,  autorizar(["admin"]),  getDashboard);

export default router;
