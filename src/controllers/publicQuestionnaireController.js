const Questionnaire = require("../models/Questionnaire");
const QuestionnaireAttempt = require("../models/QuestionnaireAttempt");

exports.getQuestionnaire = async (req, res) => {
  try {
    const questionnaire = await Questionnaire.findOne({
      shareableLink: req.params.shareableLink,
    }).select("-questions.correctAnswer");

    if (!questionnaire) {
      return res.status(404).json({ message: "Questionnaire not found" });
    }

    res.json(questionnaire);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching questionnaire", error: error.message });
  }
};

exports.submitQuestionnaire = async (req, res) => {
  try {
    const questionnaire = await Questionnaire.findOne({
      shareableLink: req.params.shareableLink,
    });

    if (!questionnaire) {
      return res.status(404).json({ message: "Questionnaire not found" });
    }

    const { answers } = req.body;
    let score = 0;

    questionnaire.questions.forEach((question, index) => {
      if (answers[index] == question.correctAnswer) {
        switch (question.weight) {
          case "Low":
            score += 1;
            break;
          case "Medium":
            score += 2;
            break;
          case "High":
            score += 3;
            break;
        }
      }
    });

    // Create a new QuestionnaireAttempt
    const attempt = new QuestionnaireAttempt({
      questionnaire: questionnaire._id,
      user: req.user?._id, // Optional user ID
      score,
      answers,
    });

    await attempt.save();

    res.json({ message: "Questionnaire submitted successfully", score });
  } catch (error) {
    res.status(500).json({
      message: "Error submitting questionnaire",
      error: error.message,
    });
  }
};
