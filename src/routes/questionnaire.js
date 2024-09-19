const express = require("express");
const router = express.Router();
const questionnaireController = require("../controllers/questionnaireController");
const { isAuthenticated } = require("../middleware/auth");

router.post(
  "/create",
  isAuthenticated,
  questionnaireController.createQuestionnaire
);
router.get(
  "/list",
  isAuthenticated,
  questionnaireController.listQuestionnaires
);
router.get(
  "/questionnaire/:id/attempts",
  questionnaireController.getQuestionnaireAttempts
);
router.get("/:id", isAuthenticated, questionnaireController.getQuestionnaire);
router.post(
  "/:id/submit",
  isAuthenticated,
  questionnaireController.submitQuestionnaire
);

module.exports = router;
