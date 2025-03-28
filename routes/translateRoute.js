const express = require("express");
const translate = require("google-translate-api-x");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", authMiddleware, async (req, res) => {
  const { message, target } = req.query;

  if (!message || message.trim() === "") {
    return res.status(400).json({ error: "Message cannot be empty" });
  }

  try {
    const result = await translate(message, { to: target });

    res.json({ translated: result.text });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: "Translation failed" });
  }
});

module.exports = router;
