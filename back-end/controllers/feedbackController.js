const User = require("../models/User");
const Feedback = require("../models/Feedback");
const logger = require("../logger");

const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:4110";

// ─── Create Feedback ────────────────────────────────────────────────────────
const createFeedback = async (req, res) => {
  try {
    const auth0_id = req.auth.payload.sub;
    const user = await User.findOne({ auth0_id });

    if (!user) {
      return res.status(404).json({ message: "User profile not found. Please sync user first." });
    }

    let { image, rating, comment } = req.body;
    let newFeedback = new Feedback({ 
      user: user._id,
      email: user.email,
      name: user.name,
      image, 
      rating, 
      comment, 
      date: Date.now() 
    });
    
    await newFeedback.save();
    
    if (req.headers["content-type"]?.includes("application/json")) {
      return res.status(201).json({ success: true, feedback: newFeedback });
    }
    res.redirect(`${FRONTEND_URL}/feedback`);
  } catch (err) {
    logger.error("Failed to save feedback:", err);
    res.status(500).json({ message: "Failed to save feedback" });
  }
};

// ─── Get All Feedbacks ──────────────────────────────────────────────────────
const getFeedbacks = async (req, res) => {
  try {
    let data = await Feedback.find({});
    res.send(data);
  } catch (err) {
    logger.error("Failed to fetch feedbacks:", err);
    res.status(500).json({ message: "Failed to fetch feedbacks" });
  }
};

// ─── Get Feedback By ID ─────────────────────────────────────────────────────
const getFeedbackById = async (req, res) => {
  try {
    let { id } = req.params;
    let data = await Feedback.findById(id);
    if (!data) return res.status(404).json({ message: "Feedback not found" });
    res.json(data);
  } catch (err) {
    logger.error("Failed to fetch feedback:", err);
    res.status(500).json({ message: "Failed to fetch feedback" });
  }
};

// ─── Delete Feedback ────────────────────────────────────────────────────────
const deleteFeedback = async (req, res) => {
  try {
    let { id } = req.params;
    
    // Check ownership or admin status
    const auth0_id = req.auth.payload.sub;
    const user = await User.findOne({ auth0_id });
    const feedback = await Feedback.findById(id);
    
    if (!feedback) return res.status(404).json({ message: "Feedback not found" });
    if (!user) return res.status(404).json({ message: "User not found" });

    // Enforce RBAC
    if (feedback.user.toString() !== user._id.toString() && user.role !== 'admin') {
      return res.status(403).json({ message: "Forbidden: You do not own this feedback" });
    }

    await Feedback.findByIdAndDelete(id);
    res.json({ success: true });
  } catch (err) {
    logger.error("Failed to delete feedback:", err);
    res.status(500).json({ message: "Failed to delete feedback" });
  }
};

module.exports = {
  createFeedback,
  getFeedbacks,
  getFeedbackById,
  deleteFeedback
};
