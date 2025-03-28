const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  question: { type: String, required: true },
  options: [
    {
      translatedOption: { type: String, required: true },
      OptionImg: { type: String, required: false },
    },
  ],
  answer: { type: String, required: true },
  selectedAnswer: { type: String, required: true },
  evaluation: { type: Boolean, required: true },
});

const levelSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  levelNumber: { type: Number, required: true },
  topic: { type: String, required: true },
  questions: [questionSchema], // Array of questions
  completed: { type: Boolean, default: false }, // Track if user finished the level
  score: { type: Number, default: 0 }, // Score for this level
  attempts: { type: Number, default: 0 }, // Track attempts
  nativeLanguage: { type: String },
  targetLanguage: { type: String },
});

const Level = mongoose.model("Level", levelSchema);

module.exports = Level;
