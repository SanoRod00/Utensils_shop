import jwt from "jsonwebtoken";

const secret = process.env.JWT_SECRET || "kitchen-secret";

export const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: "Missing authorization header" });

  const token = authHeader.replace("Bearer ", "");
  try {
    const decoded = jwt.verify(token, secret);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
};

export const requireAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({ message: "Admin privileges required" });
  }
  next();
};

export const issueToken = (payload) => jwt.sign(payload, secret, { expiresIn: "7d" });
