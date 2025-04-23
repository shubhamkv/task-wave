const jwt = require("jsonwebtoken");
require("dotenv").config();

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      msg: "Access Denied : No token found",
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (decoded) {
      req.userId = decoded.userId;
      next();
    }
  } catch (e) {
    res.status(403).json({
      msg: "Invalid token !!",
    });
  }
};

module.exports = authMiddleware;
