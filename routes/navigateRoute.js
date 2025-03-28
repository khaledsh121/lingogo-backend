const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", authMiddleware, async (req, res) => {
  const whereto = req.query.whereto || "/login";
  res.json({ whereto: whereto });
});

module.exports = router;
