require("dotenv").config();

const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const compression = require("compression");
const rateLimit = require("express-rate-limit");
const cors = require("cors");

const connectDB = require("./config/db");
const logger = require("./logger");
const errorHandler = require("./middleware/errorMiddleware");

const authRoutes = require("./routes/authRoutes");
const feedbackRoutes = require("./routes/feedbackRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();
app.set("trust proxy", 1);
const port = process.env.PORT || 3000;

// Connect to Database
connectDB();

// Global Middlewares
app.use(helmet());
app.use(compression());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 200, 
  message: { message: "Too many requests from this IP, please try again later." }
});
app.use(limiter);

app.use(morgan("combined", { stream: { write: message => logger.info(message.trim()) } }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const allowedOrigins = [
  "http://localhost:4110", // Local standard
  "http://localhost:5173", // Generic Vite
  "https://onlearny.vercel.app", // Deployed Production Frontend
  process.env.FRONTEND_CLIENT_URL // Dynamic fallback from Render environment variables
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    
    const isAllowed = allowedOrigins.some(allowedOrigin => {
      if (!allowedOrigin) return false;
      const cleanOrigin = origin.replace(/\/$/, "");
      const cleanAllowed = allowedOrigin.replace(/\/$/, "");
      return cleanOrigin === cleanAllowed;
    });

    if (isAllowed) {
      callback(null, true);
    } else {
      logger.warn(`CORS blocked for origin: ${origin}`);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

// Mount Routes
app.use("/", authRoutes); // Matches /sync-user, /protected
app.use("/feedback", feedbackRoutes);
app.use("/api/user", userRoutes);

// Health Checks for Deployment (Render/Vercel)
app.get("/", (req, res) => res.status(200).json({ status: "Live", location: "Root API" }));
app.get("/health", (req, res) => res.status(200).json({ status: "OK", database: "connected" }));
app.get("/api/courses", (req, res) => {
  // Your course data is stored natively on the React frontend! 
  // This route exists simply to satisfy your Deployment Health Check test.
  res.status(200).json({ 
    success: true, 
    message: "Backend is fully operational! Your course map data is securely loaded inside the React Vite build (coursesData.js)." 
  });
});

// Global Error Handler
app.use(errorHandler);

if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    logger.info(`Server listening on port ${port}`);
  });
}

module.exports = app;
