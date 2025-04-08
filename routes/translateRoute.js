const express = require("express");
const translate = require("google-translate-api-x");
const authMiddleware = require("../middleware/authMiddleware");
const User = require("../models/user");

const router = express.Router();

router.get("/", authMiddleware, async (req, res) => {
  const { message, translateTo } = req.query;

  if (!message || message.trim() === "") {
    return res.status(400).json({ error: "Message cannot be empty" });
  }

  try {
    const userId = req.user.id;
    const user = await User.findById(userId);

    if (!user || !user.languageToLearn) {
      return res
        .status(400)
        .json({ error: "Target language not found for user" });
    }

    const target =
      translateTo === "native" ? user.nativeLanguage : user.languageToLearn;

    const result = await translate(message, { to: target });

    res.json({ translated: result.text });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: "Translation failed" });
  }
});

module.exports = router;
