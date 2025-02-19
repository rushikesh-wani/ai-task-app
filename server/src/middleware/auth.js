const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const auth = async (req, res, next) => {
  try {
    let token = req.header("Authorization");
    if (!token) {
      return res.status(401).json({ err: "No token, authorization denied" });
    }

    token = token.startsWith("Bearer ") ? token.split(" ")[1] : token;

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const { _id, email, name } = decoded;

    const isUserAuthenticated = await User.findOne({ _id, email, name });
    if (!isUserAuthenticated) {
      return res.status(400).json({ err: "Token is not Valid" });
    }

    req.user = isUserAuthenticated;
    next();
  } catch (err) {
    console.error("Auth Middleware Error:", err);
    return res
      .status(500)
      .json({ message: "JWT verification failed", err: err.message });
  }
};

module.exports = auth;
