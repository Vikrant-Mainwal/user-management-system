import dotenv from "dotenv";
import path from "path";
import winston from "winston";
import "winston-mongodb";

dotenv.config();

const { combine, timestamp, json } = winston.format;

// Optional log directory (if you want file logging later)
// const logDirectory = path.join(process.cwd(), "logs");

const logger = winston.createLogger({
  level: "debug",
  format: combine(
    timestamp(),
    json()
  ),
  defaultMeta: {
    service: process.env.APPLICATION_NAME || "backend-service",
  },
  transports: [
    // MongoDB log transport
    new winston.transports.MongoDB({
      db: process.env.MONGO_DB_URI,
      options: {
        useUnifiedTopology: true,
      },
      collection: "server_logs",
      level: "debug",
    }),

    // Optional console logging (uncomment if needed)
    // new winston.transports.Console({
    //   format: winston.format.simple(),
    // }),

    // Optional file logging
    // new winston.transports.File({
    //   filename: path.join(logDirectory, "errors.log"),
    //   level: "error",
    // }),
  ],
});

export default logger;
