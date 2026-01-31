import express from "express";
import cors from "cors";
import { registerRoutes } from "./routes.js";
import { logger } from "./middlewares/logger.js";

const app = express();

// Middlewares globales
app.use(cors({
  origin: "https://tu-frontend.vercel.app",
  credentials: true
}));
app.use(express.json()); // JSON body
app.use(logger);         // Logger

registerRoutes(app);

export default app;
