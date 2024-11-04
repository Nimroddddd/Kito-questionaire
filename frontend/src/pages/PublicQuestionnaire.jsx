import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { questionnaireAPI } from "../services/api";

export default function PublicQuestionnaire() {
  const { link } = useParams();
  const [questionnaire, setQuestionnaire] = useState(null);

  useEffect(() => {
    const fetchQuestionnaire = async () => {
      try {
        const response = await questionnaireAPI.getPublic(link);
        if (response.ok) {
          const data = await response.json();
          setQuestionnaire(data);
        } else {
          alert("Failed to fetch questionnaire");
        }
      } catch (error) {
        console.error("Error:", error);
        alert("Failed to load questionnaire");
      }
    };

    fetchQuestionnaire();
  }, [link]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const answers = [];

    questionnaire.questions.forEach((_, index) => {
      answers.push(formData.get(`q${index}`));
    });

    try {
      const response = await questionnaireAPI.submitPublic(link, answers);
      const {score} = await response.json() 
      if (response.ok) {
        alert(`Thank you for submitting your answers! your score is: ${score}`);
      } else {
        alert("Failed to submit answers");
      }
    } catch (error) {
      console.error("Error:", error);
      console.log(error.message, "is the error")
      alert("An error occurred while submitting answers");
    }
  };

  if (!questionnaire) return <div>Loading...</div>;

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">{questionnaire.title}</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {questionnaire.questions.map((question, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow">
              <p className="font-semibold mb-2">{question.question}</p>
              <div className="space-y-2">
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
                    <label htmlFor={`q${index}a${answerIndex}`}>{answer}</label>
                  </div>
                ))}
              </div>
            </div>
          ))}
          <button
            type="submit"
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
