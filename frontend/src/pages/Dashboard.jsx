import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { questionnaireAPI } from "../services/api";

export default function Dashboard() {
  const [questionnaires, setQuestionnaires] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      navigate("/login");
      return;
    }

    const fetchQuestionnaires = async () => {
      try {
        const response = await questionnaireAPI.getList();
        if (response.ok) {
          const data = await response.json();
          setQuestionnaires(data);
        } else {
          alert("Failed to fetch questionnaires");
        }
      } catch (error) {
        console.error("Error:", error);
        alert("An error occurred while fetching questionnaires");
      }
    };

    fetchQuestionnaires();
  }, [navigate]);

  return (
    <div className="antialiased bg-gray-100 min-h-screen">
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between px-4 mb-7">
          <h2 className="text-base sm:text-2xl font-bold px-4">
            Your Questionnaires
          </h2>
          <Link
            to="/create-questionnaire"
            className="bg-blue-500 text-white sm:text-base text-[12px] py-2 px-2 max-w-max sm:px-3 rounded-md font-medium hover:bg-blue-600"
          >
            Create Questionnaire
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full px-5">
          {questionnaires.map((questionnaire) => (
            <div
              key={questionnaire._id}
              className="bg-white p-4 rounded-lg shadow h-[146px] flex flex-col justify-between sm:h-auto relative"
            >
              <h3 className="text-lg font-semibold">{questionnaire.title}</h3>
              <p className="text-sm text-gray-600">
                Created by: {questionnaire.creator.firstName}{" "}
                {questionnaire.creator.lastName} (
                {questionnaire.creator.position})
              </p>
              <p className="text-sm text-gray-500">
                Created on:{" "}
                {new Date(questionnaire.createdAt).toLocaleDateString()}
              </p>
              <div className="flex items-center justify-between mt-2">
                <Link
                  to={`/questionnaire/${questionnaire._id}`}
                  className="inline-block text-blue-500 hover:underline"
                >
                  View Questionnaire
                </Link>
              <button onClick={() => {  
                navigator.clipboard.writeText(`http://localhost:5173/q/${questionnaire.shareableLink}`)
                // add toast successfully coppied to clipboard here
                }} className="bg-blue-500 text-white px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                Copy
              </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
