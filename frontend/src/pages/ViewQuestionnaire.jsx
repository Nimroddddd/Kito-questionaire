import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { questionnaireAPI } from "../services/api";

export default function ViewQuestionnaire() {
  const { id } = useParams();
  const [questionnaire, setQuestionnaire] = useState(null);

  useEffect(() => {
    const fetchQuestionnaire = async () => {
      try {
        const response = await questionnaireAPI.getById(id);
        if (response.ok) {
          const data = await response.json();
          setQuestionnaire(data);
        } else {
          alert("Failed to fetch questionnaire");
        }
      } catch (error) {
        console.error("Error:", error);
        alert("An error occurred. Please try again.");
      }
    };

    fetchQuestionnaire();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const answers = {};

    questionnaire.questions.forEach((_, index) => {
      answers[`q${index}`] = formData.get(`q${index}`);
    });

    try {
      const response = await questionnaireAPI.submitAnswers(id, answers);
      if (response.ok) {
        alert("Answers submitted successfully");
      } else {
        alert("Failed to submit answers");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while submitting answers");
    }
  };

  if (!questionnaire) return <div>Loading...</div>;

  return (
    <div className="antialiased bg-gray-100 min-h-screen">
      <main className="max-w-3xl mx-auto py-6 sm:px-6 lg:px-8 w-full px-4">
        <h2 className="text-2xl font-bold mb-4">{questionnaire.title}</h2>
        <div className="mb-6 text-sm text-gray-600">
          Created by: {questionnaire.creator.firstName}{" "}
          {questionnaire.creator.lastName} ({questionnaire.creator.position})
        </div>
        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            {questionnaire.questions.map((question, index) => (
              <div
                key={index}
                className="mb-6 p-4 border border-gray-300 rounded-md"
              >
                <h3 className="text-lg font-semibold mb-2">
                  Question {index + 1}
                </h3>
                <p className="mb-2">{question.question}</p>
                <div className="mb-2 space-y-2">
                  {question.answers.map((answer, answerIndex) => (
                    <div key={answerIndex}>
                      <input
                        type="radio"
                        id={`q${index}a${answerIndex}`}
                        name={`q${index}`}
                        value={answerIndex}
                        required
                        className="mr-2"
                      />
                      <label htmlFor={`q${index}a${answerIndex}`}>
                        {answer}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <button
            type="submit"
            className="mt-6 w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Submit Answers
          </button>
        </form>
      </main>
    </div>
  );
}
