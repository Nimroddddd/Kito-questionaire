const mongoose = require("mongoose");
const shortid = require("shortid");

const AttemptSchema = new mongoose.Schema({
  user: { type: String },
  score: { type: Number, required: true },
  answers: [{ type: Number }],
  completedAt: { type: Date, default: Date.now },
});

const QuestionnaireSchema = new mongoose.Schema({
  title: { type: String, required: true },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  questions: [
    {
      question: { type: String, required: true },
      answers: [{ type: String, required: true }],
      correctAnswer: { type: Number, required: true },
      weight: { type: String, enum: ["Low", "Medium", "High"], required: true },
    },
  ],
  shareableLink: { type: String, unique: true, default: shortid.generate },
  attempts: [AttemptSchema],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Questionnaire", QuestionnaireSchema);
