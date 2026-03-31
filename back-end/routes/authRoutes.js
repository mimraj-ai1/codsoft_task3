const express = require("express");
const router = express.Router();
const { syncUser } = require("../controllers/authController");
const { verifyToken } = require("../middleware/authMiddleware");

// Route for syncing User profile from Auth0
router.post("/sync-user", verifyToken, syncUser);

// Demo protected route mapping
router.get("/protected", verifyToken, (req, res) => {
  res.json({ message: `Success! You provided a valid Auth0 access token.` });
});

module.exports = router;
