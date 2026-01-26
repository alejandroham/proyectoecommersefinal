import fs from "fs";
import path from "path";

const logPath = path.resolve("logs", "activity.json");

// Asegura que la carpeta exista
if (!fs.existsSync("logs")) {
  fs.mkdirSync("logs");
}

export const logger = (req, res, next) => {
  const start = Date.now();

  res.on("finish", () => {
    const log = {
      timestamp: new Date().toISOString(),
      method: req.method,
      path: req.originalUrl,
      status: res.statusCode,
      ip: req.ip,
      userId: req.usuario?.id ?? null
    };

    fs.appendFile(
      logPath,
      JSON.stringify(log) + ",\n",
      (err) => {
        if (err) console.error("Error escribiendo log", err);
      }
    );
  });

  next();
};
