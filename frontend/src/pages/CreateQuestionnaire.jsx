import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { questionnaireAPI } from "../services/api";

export default function CreateQuestionnaire() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [questions, setQuestions] = useState([
    {
      question: "",
      answers: ["", "", "", ""],
      correctAnswer: "",
      weight: "Low",
    },
  ]);

  const handleAddQuestion = () => {
    setQuestions([
      ...questions,
      {
        question: "",
        answers: ["", "", "", ""],
        correctAnswer: "",
        weight: "Low",
      },
    ]);
  };

  const handleQuestionChange = (index, value) => {
    const newQuestions = [...questions];
    newQuestions[index].question = value;
    setQuestions(newQuestions);
  };

  const handleAnswerChange = (questionIndex, answerIndex, value) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].answers[answerIndex] = value;
    setQuestions(newQuestions);
  };

  const handleWeightChange = (questionIndex, value) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].weight = value;
    setQuestions(newQuestions);
  };

  const handleCorrectAnswerChange = (questionIndex, value) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].correctAnswer = value;
    setQuestions(newQuestions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      alert("Please enter a title");
      return;
    }

    const isValid = questions.every(
      (q) => q.question.trim() && q.answers.every((a) => a.trim())
    );

    if (!isValid) {
      alert("Please fill in all questions and answers");
      return;
    }

    try {
      const response = await questionnaireAPI.create({ title, questions });

      if (response.ok) {
        alert("Questionnaire created successfully");
        navigate("/dashboard");
      } else {
        const data = await response.json();
        alert(data.message || "Failed to create questionnaire");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="antialiased bg-gray-100 min-h-screen">
      <main className="max-w-3xl mx-auto py-6 sm:px-6 lg:px-8 w-full px-4">
        <h2 className="text-2xl font-bold mb-4">Create Questionnaire</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="title"
              className="block mb-2 text-sm font-medium text-gray-600"
            >
              Questionnaire Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {questions.map((question, qIndex) => (
            <div
              key={qIndex}
              className="mb-6 p-4 border border-gray-300 rounded-md"
            >
              <h3 className="text-lg font-semibold mb-2">
                Question {qIndex + 1}
              </h3>
              <input
                type="text"
                value={question.question}
                onChange={(e) => handleQuestionChange(qIndex, e.target.value)}
                placeholder="Enter your question"
                className="w-full px-3 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <div className="space-y-2">
                {question.answers.map((answer, aIndex) => (
                  <input
                    key={aIndex}
                    type="text"
                    value={answer}
                    onChange={(e) =>
                      handleAnswerChange(qIndex, aIndex, e.target.value)
                    }
                    placeholder={`Answer ${aIndex + 1}`}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                ))}
              </div>
              <div className="mt-4">
                <label className="block mb-1 text-sm font-medium text-gray-600">
                  Correct Answer
                </label>
                <select
                  value={question.correctAnswer}
                  onChange={(e) =>
                    handleCorrectAnswerChange(qIndex, e.target.value)
                  }
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="">Select correct answer</option>
                  {question.answers.map((answer, idx) => (
                    <option key={idx} value={idx}>
                      {answer || `Answer ${idx + 1}`}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mt-4">
                <label className="block mb-1 text-sm font-medium text-gray-600">
                  Weight
                </label>
                <select
                  value={question.weight}
                  onChange={(e) => handleWeightChange(qIndex, e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>
            </div>
          ))}

          <button
            type="button"
            onClick={handleAddQuestion}
            className="mt-4 bg-black text-white py-2 px-4 rounded-md hover:bg-black focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
          >
            Add Question
          </button>

          <button
            type="submit"
            className="mt-6 w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Create Questionnaire
          </button>
        </form>
      </main>
    </div>
  );
}
