const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const presentationSchema = new mongoose.Schema({
  presentationId: {
    type: String,
    unique: true,
    default: uuidv4,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  translatingFrom: {
    type: String,
    required: true,
  },
  translatingTo: {
    type: String,
    required: true,
  },
  slides: [
    {
      id: { type: Number, required: true },
      source: { type: String, required: true },
      nativeLanguage: { type: String, required: true },
      translation: { type: String, required: true },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Presentation = mongoose.model("Presentation", presentationSchema);

module.exports = Presentation;
