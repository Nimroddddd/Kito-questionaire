let questionCount = 0;

function addQuestion() {
  questionCount++;
  const questionDiv = document.createElement("div");
  questionDiv.className = "mb-6 p-4 border border-gray-300 rounded-md";
  questionDiv.innerHTML = `
    <h3 class="text-lg font-semibold mb-2">Question ${questionCount}</h3>
    <div class="mb-2">
      <label class="block mb-1 text-sm font-medium text-gray-600">Question Text</label>
      <input type="text" name="questions[${questionCount}][question]" required class="w-full px-3 py-2 border border-gray-300 rounded-md">
    </div>
    <div class="mb-2">
      <label class="block mb-1 text-sm font-medium text-gray-600">Answers (comma-separated)</label>
      <input type="text" name="questions[${questionCount}][answers]" required class="w-full px-3 py-2 border border-gray-300 rounded-md" onchange="updateCorrectAnswerOptions(${questionCount})">
    </div>
    <div class="mb-2">
      <label class="block mb-1 text-sm font-medium text-gray-600">Correct Answer</label>
      <select name="questions[${questionCount}][correctAnswer]" required class="w-full px-3 py-2 border border-gray-300 rounded-md">
        <option value="">Select correct answer</option>
      </select>
    </div>
    <div>
      <label class="block mb-1 text-sm font-medium text-gray-600">Weight</label>
      <select name="questions[${questionCount}][weight]" required class="w-full px-3 py-2 border border-gray-300 rounded-md">
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>
    </div>
  `;
  document.getElementById("questions").appendChild(questionDiv);
}

function updateCorrectAnswerOptions(questionNumber) {
  const answersInput = document.querySelector(
    `input[name="questions[${questionNumber}][answers]"]`
  );
  const correctAnswerSelect = document.querySelector(
    `select[name="questions[${questionNumber}][correctAnswer]"]`
  );
  const answers = answersInput.value
    .split(",")
    .map((answer) => answer.trim())
    .filter((answer) => answer !== "");

  correctAnswerSelect.innerHTML =
    '<option value="">Select correct answer</option>';

  answers.forEach((answer, index) => {
    const option = document.createElement("option");
    option.value = index;
    option.textContent = answer;
    correctAnswerSelect.appendChild(option);
  });
}

document
  .getElementById("addQuestionBtn")
  .addEventListener("click", addQuestion);

document
  .getElementById("createQuestionnaireForm")
  .addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const questionnaire = {
      title: formData.get("title"),
      questions: [],
    };

    for (let i = 1; i <= questionCount; i++) {
      const answers = formData
        .get(`questions[${i}][answers]`)
        .split(",")
        .map((answer) => answer.trim())
        .filter((answer) => answer !== "");
      questionnaire.questions.push({
        question: formData.get(`questions[${i}][question]`),
        answers: answers,
        correctAnswer: parseInt(formData.get(`questions[${i}][correctAnswer]`)),
        weight: formData.get(`questions[${i}][weight]`),
      });
    }

    try {
      const response = await fetch("/questionnaire/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(questionnaire),
      });

      if (response.ok) {
        alert("Questionnaire created successfully");
        window.location.href = "/dashboard.html";
      } else {
        const data = await response.json();
        alert(data.message || "Failed to create questionnaire");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    }
  });
