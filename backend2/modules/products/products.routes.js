import express from "express";
import {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  enableProduct,
  disableProduct,
  deleteProduct,
  getCategorias
} from "./products.controller.js";

import { validarToken } from "../../middlewares/validarToken.js";
import { autorizar } from "../../middlewares/autorizar.js";

const router = express.Router();

// Público
router.get("/", getProducts);
router.get("/meta/categories", getCategorias);
router.get("/:id", getProduct);

// Vendor / Admin
router.post("/", validarToken, autorizar(["vendor", "admin"]), createProduct);
router.put("/:id", validarToken, autorizar(["vendor", "admin"]), updateProduct);

// Admin
router.put("/:id/enable", validarToken, autorizar(["admin"]), enableProduct);
router.put("/:id/disable", validarToken, autorizar(["admin"]), disableProduct);
router.delete("/:id", validarToken, autorizar(["admin"]), deleteProduct);

export default router;
