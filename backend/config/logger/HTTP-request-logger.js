import morgan from "morgan";
import logger from "./winston-logger/loggerConfig.js";

/**
 * Custom HTTP request logger using Morgan + Winston
 */
const httpLogger = () => {
  const stream = {
    write: (message) => {
      const logMessage = message.trim();

      // Log to Winston
      logger.info(logMessage);

      // Also output to console for local visibility
      console.log(logMessage);
    },
  };

  return morgan(
    ':method :url :status :res[content-length] - :response-time ms',
    { stream }
  );
};

export default httpLogger;
