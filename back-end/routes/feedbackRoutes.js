const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middleware/authMiddleware");
const {
  createFeedback,
  getFeedbacks,
  getFeedbackById,
  deleteFeedback
} = require("../controllers/feedbackController");

// Feedback Routes
router.post("/new", verifyToken, createFeedback);
router.get("/", getFeedbacks);
router.get("/:id", getFeedbackById);
router.delete("/:id", verifyToken, deleteFeedback);

module.exports = router;
