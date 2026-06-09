import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import signin from "../images/signin.svg";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div>
      <Navbar />
      {/* Hero Section */}
      <div className="relative flex flex-col md:flex-row-reverse items-center justify-center h-screen bg-cover bg-center bg-gray-100">
        <img src={signin} alt="Landing" className="h-[80vh] object-cover" />
        <div className="text-center px-6 md:px-12">
          <h1 className="text-3xl md:text-5xl font-bold mb-4 text-gray-800">
            Your Gateway to Simplicity
          </h1>
          <h2 className="text-lg md:text-2xl font-medium text-gray-700 mb-6">
            Fill, Submit, Succeed!
          </h2>
          <p className="text-sm md:text-base text-gray-600 mb-8">
            Empowering you with dynamic forms for seamless data collection. No
            matter your need, our forms adapt to you!
          </p>
          {/* <button
            onClick={() => navigate("/ListofGroupuser")}
            className="bg-blue-600 text-white font-bold rounded-full py-3 px-6 shadow-lg transition transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-600"
          >
            Fill Out a Form Now
          </button> */}
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-gray-50 py-12">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl md:text-4xl font-bold text-center text-gray-800 mb-6">
            Why Use Our Forms?
          </h2>
          <ul className="space-y-4 text-gray-700 text-lg">
            <li>✅ Fully customizable to fit your needs.</li>
            <li>✅ Secure and reliable data handling.</li>
            <li>✅ Real-time results and updates.</li>
            <li>✅ Built to save time and effort.</li>
          </ul>
          <div className="mt-8 text-center">
            <h3 className="text-xl font-semibold text-gray-800">
              Example Applications
            </h3>
            <p className="text-gray-600">
              Surveys, Event Registrations, Team Collaboration, Customer
              Feedback, and more!
            </p>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <footer className="bg-gray-200 py-6">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-sm text-gray-600">
            Still have questions?{" "}
            <a href="/contact" className="text-blue-500 hover:underline">
              Contact us
            </a>{" "}
            or read our{" "}
            <a href="/testimonials" className="text-blue-500 hover:underline">
              testimonials
            </a>{" "}
            to see what others have to say.
          </p>
          <p className="text-sm mt-4 text-gray-600">
            Designed by FLUTTER FLIRT. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
