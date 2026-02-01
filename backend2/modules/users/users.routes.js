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

// Registro público
router.post("/", registerUser);


// Usuario autenticado
router.get("/me", validarToken, getMe);
router.put("/me", validarToken, updateMe);


// Admin
router.post("/admin", validarToken, autorizar(["admin"]), createUserByAdmin);
router.get("/", validarToken, autorizar(["admin"]), getUsuarios);
router.get("/:id", validarToken, autorizar(["admin"]), getUsuario);
router.put("/:id/enable", validarToken, autorizar(["admin"]), enableUser);
router.put("/:id/disable", validarToken, autorizar(["admin"]), disableUser);

export default router;
