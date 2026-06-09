import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import NavbarSignIn from "./NavbarSignIn";
import image from "../Images/new-landing.png";
import aboutImage from "../Images/about.png";
import { Courses } from "./Courses";
import { Reasons } from "./Reasons";
import { Testimonial } from "./Testimonial";
import { ChooseUs } from "./ChooseUs";
import { Footer } from "./Footer";
import axios from "axios";

const Landing = () => {
  const BASEURL = import.meta.env.VITE_API_URL_USERS;
  const accessToken = window.sessionStorage.getItem("accessToken");
  const [boards, setBoards] = useState([]);
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  useEffect(() => {
    const fetchBoards = () => {
      axios
        .get(`${BASEURL}/data/getBoards`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((response) => {
          if (response.data) {
            setBoards(response.data);
          }
        })
        .catch((error) => {
          console.error("Error fetching boards data:", error);
        });
    };

    const fetchClasses = () => {
      axios
        .get(`${BASEURL}/data/getClasses`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((response) => {
          if (response.data) {
            setClassesData(response.data);
          }
        })
        .catch((error) => {
          console.error("Error fetching classes data:", error);
        });
    };
    fetchClasses();
    fetchBoards();
  }, []);

  const colorClasses = [
    "bg-[#E6F2FE]",
    "bg-[#FDF3D3]",
    "bg-[#FEF5E7]",
    "bg-[#E8FAED]",
    "bg-[#E6F8FE]",
  ];

  return (
    <div className="bg-opacity-10 w-full h-full">
      {/* Conditional Navbar */}
      {isAuthenticated ? <NavbarSignIn /> : <Navbar />}

      {/* Hero Section */}
      <div class="flex flex-col-reverse md:flex-row items-center justify-center px-6 sm:px-10 md:h-screen pt-10 pb-10 bg-gray-100">
        <div class="text-start px-4 md:px-8 flex flex-col justify-center">
          <h1 class="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-4">
            Study Smarter
            <br />
            Dream Bigger
            <br />
            Achieve More!
          </h1>
          <p class="text-base sm:text-lg lg:text-xl font-medium mb-6">
            Experience Pavilion offers engaging online courses led by expert
            instructors, making education flexible, accessible, and empowering
            for learners worldwide.
          </p>
          <button
            onClick={() => {
              navigate("/Board-Class");
            }}
            type="button"
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none w-40"
          >
            View Classes
          </button>
        </div>
        <img
          src={image}
          alt="Landing Page"
          class="w-full md:w-1/2 object-cover self-center"
        />
      </div>

      {/* Top Boards Section */}
      <div className="pt-20 pb-20 px-6 sm:px-20">
        <h1 className="text-3xl sm:text-4xl text-center font-bold pb-4">
          Explore Top Boards
        </h1>
        <p className="text-center text-sm sm:text-base mb-6">
          Explore top boards and discover the best learning resources curated
          just for you.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {boards.slice(0, 5).map((board, index) => (
            <div
              key={board.board_id}
              className={`text-center product-card rounded-lg p-6 shadow-lg w-full ${
                colorClasses[index % colorClasses.length]
              }`}
            >
              <h3 className="text-xl font-semibold mb-2">{board.board_name}</h3>

              <span className="text-sm mb-4">
                {board.free_course ? "🟢Free" : "Paid"} course
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* About Us Section */}
      <div className="flex flex-col md:flex-row-reverse items-center px-6 sm:px-20 md:pt-20 md:pb-20 py-10 bg-gray-100">
        <div className="text-start flex flex-col md:mr-24">
          <h5 className="text-blue-600 md:text-lg mb-4">ABOUT US</h5>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
            Revolutionizing the Learning Experience with Guidance from Industry
            Experts.
          </h1>
          <p className="text-sm sm:text-base lg:text-lg font-medium">
            Experience Pavilion offers engaging online courses led by expert
            instructors, making education flexible, accessible, and empowering
            for learners worldwide.
          </p>
        </div>
        <img
          src={aboutImage}
          alt="About Us"
          className="w-full md:w-1/2 h-80 mt-5 sm:h-80 md:h-full md:mr-36 object-cover mb-6 md:mb-0 md:ml-10"
        />
      </div>
      <Courses />
      <Reasons />
      <Testimonial />
      <ChooseUs />
      <Footer />
    </div>
  );
};

export default Landing;
