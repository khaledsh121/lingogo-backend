const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  currentLevel: { type: Number, default: 1 },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
