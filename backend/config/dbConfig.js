import mongoose from "mongoose";
import logger from "./logger/winston-logger/loggerConfig.js";

const connectDatabase = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_DB_URI);

    logger.info(
      `${process.env.APPLICATION_NAME} successfully connected to MongoDB at ${connection.connection.host}`
    );
  } catch (error) {
    logger.error(
      `Failed to connect ${process.env.APPLICATION_NAME} to MongoDB: ${error.message}`
    );

    throw new Error(
      `Database connection failed: ${error.message}`
    );
  }
};

export default connectDatabase;
