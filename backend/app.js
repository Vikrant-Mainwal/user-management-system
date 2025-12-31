import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";

import { currentUser } from "base-auth-handler";
import { NotFoundError, errorHandler } from "base-error-handler";

import apiRoutes from "./routes/api-v1-routes.js";
import requestLogger from "./config/logger/HTTP-request-logger.js";
import apiRateLimiter from "./config/api-rate-limiter/api-rate-limiter.js";
import speedLimiter from "./config/api-rate-limiter/api-speed-limiter.js";
import generateSwaggerDocs from "./config/api-documentation/swagger-config.js";
import { getServerHealth } from "./controllers/generalController.js";

const app = express();

/* ----------------------------- GLOBAL MIDDLEWARE ---------------------------- */

// Enable CORS
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// Request logging
app.use(requestLogger());

// API protection
app.use(speedLimiter);
app.use(apiRateLimiter);

// Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

/*  HEALTH CHECK  */

app.get("/health", getServerHealth);

/*  API ROUTES  */

app.use("/api/v1", apiRoutes);

/*  SWAGGER DOCS */

generateSwaggerDocs(app);

/*  STATIC FRONTEND */

if (process.env.NODE_ENV === "production") {
  const __dirname = path.resolve();
  const clientBuildPath = path.join(__dirname, "frontend", "dist");

  app.use(express.static(clientBuildPath));

  app.get(["/", "/admin"], (_, res) => {
    res.sendFile(path.join(clientBuildPath, "index.html"));
  });
}

/* ERROR HANDLING  */

// 404 Handler
app.all("*", () => {
  throw new NotFoundError();
});

// Centralized Error Handler
app.use(errorHandler);

export { app };
