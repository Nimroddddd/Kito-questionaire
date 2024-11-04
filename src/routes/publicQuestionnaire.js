const express = require("express");
const router = express.Router();
const publicQuestionnaireController = require("../controllers/publicQuestionnaireController");

router.get(
  "/public/:shareableLink",
  publicQuestionnaireController.getQuestionnaire
);
router.post(
  "/public/:shareableLink/submit",
  publicQuestionnaireController.submitQuestionnaire
);

module.exports = router;
