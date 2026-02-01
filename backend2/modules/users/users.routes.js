import express from "express";
import {
  registerUser,
  createUserByAdmin,
  getUsuarios,
  getUsuario,
  updateMe,
  enableUser,
  disableUser
} from "./users.controller.js";

import { validarToken } from "../../middlewares/validarToken.js";
import { autorizar } from "../../middlewares/autorizar.js";

const router = express.Router();

// Registro público (Buyer)
router.post("/", registerUser);

// Usuario autenticado
router.put("/me", validarToken, updateMe);

// Admin crea usuarios
router.post(
  "/admin",
  validarToken,
  autorizar(["admin"]),
  createUserByAdmin
);

// Admin

router.get("/", validarToken, autorizar(["admin"]), getUsuarios);

//  RUTAS CON :id AL FINAL
router.get("/:id", validarToken, autorizar(["admin"]), getUsuario);
router.put("/:id/enable", validarToken, autorizar(["admin"]), enableUser);
router.put("/:id/disable", validarToken, autorizar(["admin"]), disableUser);

export default router;
