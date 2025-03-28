const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res
      .status(401)
      .json({ whereto: "/Login", message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(
      token.replace("Bearer ", ""),
      process.env.JWT_SECRET ||
        "4f8b2c1e3a9d7f6e5b4a1c8d0e2f7b3a6d9c8e1f2a7b4c5d6e9f0a1b2c3d4e5"
    );

    req.user = decoded;
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ whereto: "/Login", message: "Invalid or expired token" });
  }
};
