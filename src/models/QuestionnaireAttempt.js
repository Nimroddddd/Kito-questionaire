const mongoose = require("mongoose");

const questionnaireAttemptSchema = new mongoose.Schema({
  questionnaire: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Questionnaire",
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  score: {
    type: Number,
    required: true,
  },
  answers: [
    {
      type: Number,
      required: true,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model(
  "QuestionnaireAttempt",
  questionnaireAttemptSchema
);
