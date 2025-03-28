const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const SECRET_KEY =
  process.env.SECRET_KEY ||
  "4f8b2c1e3a9d7f6e5b4a1c8d0e2f7b3a6d9c8e1f2a7b4c5d6e9f0a1b2c3d4e5";
const router = express.Router();

router.post("/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({
      $or: [{ email }, { username }],
    });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User already exists", success: false });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ username, email, password: hashedPassword });

    await newUser
      .save()
      .then((user) => console.log("User saved:", user))
      .catch((err) => console.error("Error saving user:", err));

    const token = jwt.sign({ id: newUser._id }, SECRET_KEY);
    res.status(201).json({
      message: "User registered successfully",
      token,
      success: true,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error, success: false });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ message: "Invalid email or password", success: false });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ message: "Invalid email or password", success: false });
    }

    const token = jwt.sign({ id: user._id }, SECRET_KEY);
    res.json({ message: "Login successful", token: token, success: true });
  } catch (error) {
    res.status(500).json({ message: "Server error", error, success: false });
  }
});

router.get("/verify", async (req, res) => {
  try {
    const { token } = req.body;

    if (!token) {
      return res
        .status(400)
        .json({ message: "Token is required", success: false });
    }

    jwt.verify(token, SECRET_KEY, (err, decoded) => {
      if (err) {
        return res
          .status(401)
          .json({ message: "Invalid or expired token", success: false });
      }
      res.json({
        message: "Token is valid",
        userId: decoded.id,
        success: true,
      });
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error, success: false });
  }
});

module.exports = router;
