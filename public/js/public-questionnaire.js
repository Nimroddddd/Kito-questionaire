document.addEventListener("DOMContentLoaded", async () => {
  const shareableLink = new URLSearchParams(window.location.search).get("link");

  try {
    const response = await fetch(`/q/${shareableLink}`);
    if (!response.ok) throw new Error("Failed to fetch questionnaire");
    const questionnaire = await response.json();

    document.getElementById("questionnaireTitle").textContent =
      questionnaire.title;
    const form = document.getElementById("questionnaireForm");

    questionnaire.questions.forEach((question, index) => {
      const questionDiv = document.createElement("div");
      questionDiv.innerHTML = `
                <p class="font-semibold">${question.question}</p>
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
            `;
      form.appendChild(questionDiv);
    });
  } catch (error) {
    console.error("Error:", error);
    alert("Failed to load questionnaire");
  }
});

document
  .getElementById("questionnaireForm")
  .addEventListener("submit", async (e) => {
    e.preventDefault();
    // Extract the shareable link from the URL query parameter
    const shareableLink = new URLSearchParams(window.location.search).get(
      "link"
    );

    const formData = new FormData(e.target);
    const answers = Array.from(formData.entries()).map(([name, value]) =>
      parseInt(value)
    );

    try {
      const response = await fetch(`/q/${shareableLink}/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers }),
      });
      if (!response.ok) throw new Error("Failed to submit questionnaire");
      const result = await response.json();
      alert(`Your score: ${result.score}`);
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to submit questionnaire");
    }
  });
