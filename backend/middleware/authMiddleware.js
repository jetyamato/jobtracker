const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;

function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  // expected: "Authorization: Bearer <token>"
  if (!authHeader) {
    return res.status(401).json({ error: "Missing authentication header" });
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Missing token" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    // attach user info to request
    req.user = { id: decoded.userId };

    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
}

module.exports = authMiddleware;
