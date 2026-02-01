import express from "express";
import cors from "cors";
import { registerRoutes } from "./routes.js";
import { logger } from "./middlewares/logger.js";


import cors from "cors";

app.use(cors({
  origin: [
    "http://localhost:5173",
    "http://localhost:5174",
    "http://localhost:5175",
    "https://tu-frontend.vercel.app"
  ],
  credentials: true
}));


app.use(express.json());
app.use(logger);

registerRoutes(app);

export default app;
