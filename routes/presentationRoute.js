const express = require("express");
const router = express.Router();
const Presentation = require("../models/presentation");
const authMiddleware = require("../middleware/authMiddleware");
const User = require("../models/user");

router.post("/save", authMiddleware, async (req, res) => {
  try {
    const { translatingFrom, translatingTo, slides } = req.body;
    const userId = req.user.id;
    const user = await User.findById(userId);

    if (!translatingFrom || !translatingTo || !slides || slides.length === 0) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newPresentation = new Presentation({
      userId,
      translatingFrom,
      translatingTo,
      slides,
    });

    await newPresentation.save();
    user.PresentationsNumber++;
    await user.save();

    res.status(201).json({
      message: "Presentation saved successfully",
      presentation: newPresentation,
    });
  } catch (error) {
    console.error("Error saving presentation:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/get", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;

    const presentations = await Presentation.find({ userId });

    if (presentations.length === 0) {
      return res.status(404).json({ message: "No presentations found" });
    }

    res.status(200).json(presentations);
  } catch (error) {
    console.error("Error fetching presentations:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
