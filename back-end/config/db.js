const mongoose = require("mongoose");
const logger = require("../logger");

const connectDB = async () => {
  try {
    const mongoURL = process.env.MONGO_URI;
    if (!mongoURL) {
      throw new Error("MONGO_URI not defined in environment variables");
    }
    await mongoose.connect(mongoURL);
    logger.info("connected to db");
  } catch (err) {
    logger.error("DB connection error:", err);
    process.exit(1);
  }
};

module.exports = connectDB;
