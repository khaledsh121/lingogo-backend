const express = require("express");
const Level = require("../models/level");
const axios = require("axios");
const Presentation = require("../models/presentation");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

const FASTAPI_URL = "http://127.0.0.1:8000/predict_performance";

router.post("/", authMiddleware, async (req, res) => {
  const userId = req.user.id;

  try {
    const levels = await Level.find({ userId });

    const presentations = await Presentation.find({ userId });

    const performanceData = {
      presentations: presentations.map((p) => ({
        userId: p.userId,
        translatingFrom: p.translatingFrom,
        translatingTo: p.translatingTo,
        slides: p.slides.map((slide) => ({
          id: slide.id,
          source: slide.source,
          nativeLanguage: slide.nativeLanguage,
          translation: slide.translation,
        })),
      })),
      levels: levels.map((l) => ({
        userId: l.userId,
        score: l.score,
        attempts: l.attempts,
        completed: l.completed,
        levelNumber: l.levelNumber,
        topic: l.topic,
        nativeLanguage: l.nativeLanguage,
        targetLanguage: l.targetLanguage,
      })),
    };

    const response = await axios.post(FASTAPI_URL, performanceData);

    return res.json(response.data);
  } catch (error) {
    // console.error("Error during performance prediction:", error);
    return res
      .status(500)
      .json({ error: "Failed to get performance prediction." });
  }
});

module.exports = router;
