const express = require("express");
const { google } = require("googleapis");
require("dotenv").config();
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();
const customsearch = google.customsearch("v1");

// استخدام كاش (اختياري - تحسين الأداء)
const cache = new Map();

router.get("/api/fetch-image", authMiddleware, async (req, res) => {
  const { searchTerm } = req.query;

  if (!searchTerm) {
    return res.status(400).json({ error: "searchTerm is required" });
  }

  // تحقق من الكاش
  if (cache.has(searchTerm)) {
    return res.json({ imageUrl: cache.get(searchTerm) });
  }

  const apiKey = process.env.GOOGLE_API_KEY;
  const cseId = process.env.CSE_ID;

  if (!apiKey || !cseId) {
    return res.status(500).json({ error: "Server configuration error" });
  }

  try {
    const response = await customsearch.cse.list({
      cx: cseId,
      q: searchTerm,
      searchType: "image",
      key: apiKey,
      num: 1, // تقليل عدد النتائج إلى واحدة فقط
    });

    if (response.data.items && response.data.items.length > 0) {
      const imageUrl = response.data.items[0].link;

      // تخزين النتيجة في الكاش لمدة 10 دقائق (اختياري)
      cache.set(searchTerm, imageUrl);
      setTimeout(() => cache.delete(searchTerm), 120 * 60 * 1000);

      return res.json({ imageUrl });
    } else {
      return res.status(404).json({ error: "No image found" });
    }
  } catch (error) {
    console.error("Error fetching image:", error.message);
    return res.status(500).json({
      error: "Error fetching image",
      details:
        process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
});

module.exports = router;
