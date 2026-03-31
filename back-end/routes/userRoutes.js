const express = require("express");
const router = express.Router();
const { enrollCourse, getProfile, updateProgress } = require("../controllers/userController");
const { verifyToken } = require("../middleware/authMiddleware");

// Both routes require the user to send a valid Auth0 token
router.post("/enroll", verifyToken, enrollCourse);
router.get("/profile", verifyToken, getProfile);
router.post("/progress", verifyToken, updateProgress);

module.exports = router;
