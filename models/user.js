const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  currentLevel: { type: Number, default: 1 },
  ChatsNumber: { type: Number, default: 0 },
  PresentationsNumber: { type: Number, default: 0 },
  birthDate: { type: Date, required: true },
  userImg: { type: String },
  nativeLanguage: { type: String, required: true },
  languageToLearn: { type: String, required: true },
  timeSpent: { type: Number, default: 1 },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
