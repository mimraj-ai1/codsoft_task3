const logger = require("../logger");

const errorHandler = (err, req, res, next) => {
  logger.error("Unhandled Error:", err);
  res.status(500).json({ message: "An unexpected error occurred on the server." });
};

module.exports = errorHandler;
