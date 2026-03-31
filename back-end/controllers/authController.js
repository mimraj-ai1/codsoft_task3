const User = require("../models/User");
const logger = require("../logger");

// ─── Sync Auth0 User ─────────────────────────────────────────────────────────
const syncUser = async (req, res) => {
  try {
    const auth0_id = req.auth.payload.sub; // the Auth0 ID from the verified token
    const { email, name } = req.body;
    
    if (!email) {
      return res.status(400).json({ message: "Email is required to sync user." });
    }

    // Upsert prevents duplicate users. If the user with this auth0_id exists, 
    // it simply updates their email/name. If not, it creates them!
    const user = await User.findOneAndUpdate(
      { auth0_id },
      { email, name },
      { new: true, upsert: true }
    );

    res.status(200).json({ success: true, user });
  } catch (error) {
    logger.error("Failed to sync user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  syncUser
};
