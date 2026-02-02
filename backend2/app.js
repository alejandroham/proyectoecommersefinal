import express from "express";
import cors from "cors";
import { registerRoutes } from "./routes.js";
import { logger } from "./middlewares/logger.js";


const app = express();

app.use(cors({
  origin: "https://proyectoecommersefinal.vercel.app",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));



app.use(express.json());
app.use(logger);

app.use(cors());
registerRoutes(app);

export default app;
