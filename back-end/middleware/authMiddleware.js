const jwt = require('jsonwebtoken');
const jwksClient = require('jwks-rsa');
const User = require("../models/User");
const logger = require("../logger");

const AUTH0_ISSUER = (process.env.AUTH0_ISSUER_BASE_URL || "https://dev-o87pab3dhngt55ct.us.auth0.com/").replace(/\/$/, "");
const AUTH0_CLIENT_ID = process.env.AUTH0_CLIENT_ID || "xeCxJLlTAin7K2xsfx5HQrnBH4OOuac3";

// JWKS client — fetches Auth0's public keys to verify token signatures
const client = jwksClient({
  jwksUri: `${AUTH0_ISSUER}/.well-known/jwks.json`,
  cache: true,
  rateLimit: true,
});

function getKey(header, callback) {
  client.getSigningKey(header.kid, (err, key) => {
    if (err) return callback(err);
    callback(null, key.getPublicKey());
  });
}

// ─── Auth0 ID Token Middleware ───────────────────────────────────────────────
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Missing or invalid Authorization header" });
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(
    token,
    getKey,
    {
      algorithms: ["RS256"],
      // Accept issuer both with and without trailing slash
      issuer: [`${AUTH0_ISSUER}/`, AUTH0_ISSUER],
      audience: AUTH0_CLIENT_ID,
      clockTolerance: 300, // Allow up to 5 min clock skew / token expiry grace
    },
    (err, decoded) => {
      if (err) {
        logger.error("Token verification failed:", err.message);
        return res.status(401).json({ message: "Unauthorized: " + err.message });
      }
      req.auth = { payload: decoded };
      next();
    }
  );
};

// ─── Admin Role Middleware ───────────────────────────────────────────────────
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
