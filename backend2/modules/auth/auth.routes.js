// modules/auth/auth.routes.js

import express from "express";
import { login, me } from "./auth.controller.js";
import { validarToken } from "../../middlewares/validarToken.js";

const router = express.Router();

router.post("/login", login);
router.get("/me", validarToken, me);

export default router;
