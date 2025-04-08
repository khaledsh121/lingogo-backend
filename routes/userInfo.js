const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const User = require("../models/user"); // Import the User model
const path = require("path");

const router = express.Router();

router.get("/", authMiddleware, async (req, res) => {
  const userId = req.user?.id;
  if (!userId) {
    return res.status(400).json({ message: "User ID not found" });
  }

  try {
    const userInfo = await User.findById(userId);
    if (!userInfo) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(userInfo); // Send the user info as a JSON response
  } catch (error) {
    console.error("Error fetching user info:", error);
    res.status(500).json({ message: "Server error", error });
  }
});

router.get("/img", authMiddleware, async (req, res) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized", success: false });
    }

    const user = await User.findById(userId).select("userImg");

    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found", success: false });
    }

    res.json({ img: user.userImg.replace(/\\/g, "/"), success: true });
  } catch (error) {
    res.status(500).json({ message: "Server error", error, success: false });
  }
});

router.put("/update", authMiddleware, async (req, res) => {
  try {
    const userId = req.user?.id;

    const updateFields = {};
    if (req.body.username !== undefined)
      updateFields.username = req.body.username;
    if (req.body.email !== undefined) updateFields.email = req.body.email;
    if (req.body.birthDate !== undefined)
      updateFields.birthDate = req.body.birthDate;
    if (req.body.userImg !== undefined) updateFields.userImg = req.body.userImg;
    if (req.body.nativeLanguage !== undefined)
      updateFields.nativeLanguage = req.body.nativeLanguage;
    if (req.body.languageToLearn !== undefined)
      updateFields.languageToLearn = req.body.languageToLearn;

    const updatedUser = await User.findByIdAndUpdate(userId, updateFields, {
      new: true,
    });

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ message: "User updated successfully", user: updatedUser });
  } catch (error) {
    console.error("Update Error:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/saveTime", authMiddleware, async (req, res) => {
  const { timeSpent } = req.body;
  const userId = req.user?.id;

  const user = await User.findById(userId);
  user.timeSpent = timeSpent;
  await user.save();

  res.send({ success: true });
});

module.exports = router;
