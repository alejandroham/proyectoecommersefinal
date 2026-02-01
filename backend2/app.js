import express from "express";
import cors from "cors";
import { registerRoutes } from "./routes.js";
import { logger } from "./middlewares/logger.js";

const app = express();

app.use(cors({
  origin: [
    "http://localhost:5173",
    "http://localhost:3000",
    "https://tu-frontend.vercel.app"
  ],
  credentials: true
}));

app.use(express.json());
app.use(logger);

registerRoutes(app);

export default app;
