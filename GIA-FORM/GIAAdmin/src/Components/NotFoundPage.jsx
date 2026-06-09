import React from "react";
import { useNavigate } from "react-router-dom"; // React Router for navigation
import { FaExclamationTriangle } from "react-icons/fa"; // Icon for 404 page

const NotFoundPage = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1); // Navigates to the previous page
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-center">
      <div className="text-red-500 text-6xl mb-4">
        <FaExclamationTriangle />
      </div>
      <h1 className="text-4xl font-bold text-gray-800 mb-2">
        404 - Page Not Found
      </h1>
      <p className="text-gray-600 mb-6">
        Oops! The page you are looking for does not exist.
      </p>
      <button
        onClick={handleBack}
        className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-all"
      >
        Go Back
      </button>
    </div>
  );
};

export default NotFoundPage;
