import { slowDown } from "express-slow-down";

/**
 * API rate slow-down middleware
 * Gradually increases response delay when request limit is exceeded
 */
const apiSpeedLimiter = slowDown({
  windowMs: 10 * 60 * 1000, // 10-minute rolling window
  delayAfter: 610, // Requests allowed before delay starts
  delayMs: (requestCount) => requestCount * 100, // Delay increases per request

  /*
    Example:
    - Requests 1–610 → no delay
    - Request 611 → 61,100 ms delay
    - Request 612 → 61,200 ms delay
    - Delay resets after 10 minutes
  */
});

export default apiSpeedLimiter;
