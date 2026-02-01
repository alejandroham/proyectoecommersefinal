import express from "express";
import {
  registerUser,
  getMe,
  updateMe,
  createUserByAdmin,
  getUsuarios,
  getUsuario,
  enableUser,
  disableUser
} from "./users.controller.js";

import { validarToken } from "../../middlewares/validarToken.js";
import { autorizar } from "../../middlewares/autorizar.js";

const router = express.Router();

/* ===== REGISTRO PÚBLICO ===== */
router.post("/", registerUser);

/* ===== USUARIO AUTENTICADO ===== */
router.get("/me", validarToken, getMe);
router.put("/me", validarToken, updateMe);

/* ===== ADMIN ===== */
router.post("/admin", validarToken, autorizar(["admin"]), createUserByAdmin);
router.get("/", validarToken, autorizar(["admin"]), getUsuarios);
router.get("/:id", validarToken, autorizar(["admin"]), getUsuario);
router.put("/:id/enable", validarToken, autorizar(["admin"]), enableUser);
router.put("/:id/disable", validarToken, autorizar(["admin"]), disableUser);

export default router;
