document.addEventListener("DOMContentLoaded", async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const questionnaireId = urlParams.get("id");

  if (!questionnaireId) {
    alert("No questionnaire ID provided");
    window.location.href = "/dashboard.html";
    return;
  }

  try {
    const response = await fetch(`/questionnaire/${questionnaireId}`);
    if (response.ok) {
      const questionnaire = await response.json();
      document.getElementById("questionnaireTitle").textContent =
        questionnaire.title;
      document.getElementById(
        "questionnaireInfo"
      ).textContent = `Created by: ${questionnaire.creator.firstName} ${questionnaire.creator.lastName} (${questionnaire.creator.position})`;

      const questionsContainer = document.getElementById("questions");
      questionnaire.questions.forEach((question, index) => {
        const questionDiv = document.createElement("div");
        questionDiv.className = "mb-6 p-4 border border-gray-300 rounded-md";
        questionDiv.innerHTML = `
          <h3 class="text-lg font-semibold mb-2">Question ${index + 1}</h3>
          <p class="mb-2">${question.question}</p>
          <div class="mb-2">
            ${question.answers
              .map(
                (answer, answerIndex) => `
              <div>
                <input type="radio" id="q${index}a${answerIndex}" name="q${index}" value="${answerIndex}" required>
                <label for="q${index}a${answerIndex}">${answer}</label>
              </div>
            `
              )
              .join("")}
          </div>
        `;
        questionsContainer.appendChild(questionDiv);
      });
    } else {
      alert("Failed to fetch questionnaire");
    }
  } catch (error) {
    console.error("Error:", error);
    alert("An error occurred. Please try again.");
  }
});

document
  .getElementById("submitQuestionnaireForm")
  .addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const answers = Array.from(formData.entries()).map(([name, value]) =>
      parseInt(value)
    );

    try {
      const urlParams = new URLSearchParams(window.location.search);
      const questionnaireId = urlParams.get("id");
      const response = await fetch(`/questionnaire/${questionnaireId}/submit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ answers }),
      });

      if (response.ok) {
        const result = await response.json();
        alert(`Your score: ${result.score}`);
        window.location.href = "/dashboard.html";
      } else {
        const data = await response.json();
        alert(data.message || "Failed to submit answers");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    }
  });
