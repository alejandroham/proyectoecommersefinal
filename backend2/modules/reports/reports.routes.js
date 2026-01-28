import express from "express";
import { getDashboard } from "./reports.controller.js";
import { validarToken } from "../../middlewares/validarToken.js";
import { autorizar } from "../../middlewares/autorizar.js";

const router = express.Router();

router.get(
  "/admin/dashboard",
  validarToken,
  autorizar(["admin"]),
  getDashboard
);

export default router;
