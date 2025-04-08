const mongoose = require("mongoose");

const messageItemSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true,
  },
  response: {
    type: String,
    required: true,
  },
  key: {
    type: Number,
    required: true,
  },
  userMessage: {
    type: String,
    required: true,
  },
});

const chatSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    messages: [messageItemSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Chat", chatSchema);
