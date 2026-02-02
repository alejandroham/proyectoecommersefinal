import express from "express";
import cors from "cors";
import { registerRoutes } from "./routes.js";
import { logger } from "./middlewares/logger.js";

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "https://proyectoecommersefinal.vercel.app"
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Permite Postman / curl
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
  })
);

app.use(express.json());
app.use(logger);

registerRoutes(app);

export default app;
