import dotenv from "dotenv";
import { app } from "./app.js";
import connectDatabase from "./config/dbConfig.js";
import logger from "./config/logger/winston-logger/loggerConfig.js";

dotenv.config();

const validateEnv = () => {
  const requiredVars = [
    "APPLICATION_NAME",
    "PORT",
    "NODE_ENV",
    "JWT_KEY",
    "JWT_TOKEN_DURATION",
    "MONGO_DB_URI",
    "ADMIN_REGISTRATION_KEY",
  ];

  requiredVars.forEach((key) => {
    if (!process.env[key]) {
      throw new Error(`Environment variable ${key} is missing`);
    }
  });
};

const startServer = async () => {
  try {
    validateEnv();

    const PORT = process.env.PORT || 5000;

    if (!logger) {
      throw new Error("Logger is not initialized");
    }

    await connectDatabase();

    app.get("/", (req, res) => {
      res.status(200).json({
        status: "success",
        message: "Backend API is running successfully!",
      });
    });

    app.listen(PORT, () => {
      logger.info(
        `${process.env.APPLICATION_NAME} running on port ${PORT} in ${process.env.NODE_ENV} mode`
      );
    });
  } catch (error) {
    console.error("Server startup failed:", error.message);
    process.exit(1);
  }
};

startServer();
