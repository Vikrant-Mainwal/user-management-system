import { rateLimit } from "express-rate-limit";

/**
 * Global API rate limiter
 * Limits excessive requests to protect the server
 */
const apiRateLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10-minute window
  max: 600, // Maximum requests per IP in the time window
  standardHeaders: "draft-7", // Return RateLimit headers
  legacyHeaders: false, // Disable deprecated X-RateLimit headers
});

export default apiRateLimiter;
