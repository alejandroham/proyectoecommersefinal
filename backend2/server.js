import "dotenv/config";
import app from "./app.js";
import { connectDB } from "./config/database.js";

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  await connectDB(); // ⬅️ CLAVE

  app.listen(PORT, () => {
    console.log(`🚀 API corriendo en puerto ${PORT}`);
  });
};

startServer();
