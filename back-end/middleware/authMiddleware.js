const { auth } = require('express-oauth2-jwt-bearer');
const User = require("../models/User");
const logger = require("../logger");

const AUTH0_AUDIENCE = process.env.AUTH0_AUDIENCE || "https://onlearny-api.com";
const AUTH0_ISSUER_BASE_URL =
  process.env.AUTH0_ISSUER_BASE_URL ||
  "https://dev-5n62t1xjyicrdury.us.auth0.com/";

// ─── Auth0 JWT Middleware ────────────────────────────────────────────────────────
const verifyToken = auth({
  audience: AUTH0_AUDIENCE,
  issuerBaseURL: AUTH0_ISSUER_BASE_URL,
  tokenSigningAlg: 'RS256'
});

// ─── Admin Role Middleware ───────────────────────────────────────────────────────
const isAdmin = async (req, res, next) => {
  try {
    const auth0_id = req.auth.payload.sub;
    const user = await User.findOne({ auth0_id });
    if (!user || user.role !== 'admin') {
      return res.status(403).json({ message: "Forbidden: Admins only" });
    }
    req.dbUser = user;
    next();
  } catch (error) {
    logger.error("Admin check failed:", error);
    res.status(500).json({ message: "Internal server error during authorization" });
  }
};

module.exports = {
  verifyToken,
  isAdmin
};
