import { Router } from "express";
import {
  actualizarMiPerfilController,
  listarUsuariosController,
  obtenerUsuarioController
} from "./users.controller.js";
import { authMiddleware } from "../../middlewares/auth.middleware.js";

const router = Router();

/*Usuario autenticado edita su perfil */
router.put(  "/users/me",  authMiddleware,  actualizarMiPerfilController);

/* Obtener usuario por ID */
router.get(  "/users/:id",  authMiddleware,  obtenerUsuarioController);

/* Listar usuarios */
router.get(  "/users",  authMiddleware,  listarUsuariosController);

export default router;
