import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="antialiased bg-gray-100 flex items-center justify-center min-h-screen">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h1 className="sm:text-3xl text-xl font-bold mb-6 text-center text-gray-800">
          Welcome to Questionnaire System
        </h1>
        <div className="flex justify-center">
          <Link to="/login">
            <button
              type="button"
              className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Proceed
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
