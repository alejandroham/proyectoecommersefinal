// logger.js middleware que registra la actividad de las solicitudes
import fs from "fs";
import path from "path";

const logPath = path.resolve("logs", "activity.json");

if (!fs.existsSync("logs")) {
  fs.mkdirSync("logs");
}

export const logger = (req, res, next) => {
  res.on("finish", () => {
    const log = {
      timestamp: new Date().toISOString(),
      method: req.method,
      path: req.originalUrl,
      status: res.statusCode,
      ip: req.ip,
      user_id: req.usuario?.user_id ?? null 
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
