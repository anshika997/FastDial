import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import image from "../Images/excel.png";
import profile from "../Images/excel-profile.png";
import bookOpen from "../Images/BookOpenText.png";
import clock from "../Images/Clock.png";
import axios from "axios";
import { FaBook, FaClock, FaStar } from "react-icons/fa";

export const Courses = () => {
  const BASEURL = import.meta.env.VITE_API_URL_USERS;
  const accessToken = window.sessionStorage.getItem("accessToken");
  const [boards, setBoards] = useState([]);
  const [classesData, setClassesData] = useState([]);
  const navigate = useNavigate();
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

  return (
    <div
      className="pt-0 pb-0 px-0 pt-20 pb-20 sm:pt-20 sm:pb-20 sm:px-5"
      style={{ background: "#FAFAFA" }}
    >
      <h1 className="text-3xl sm:text-4xl text-center font-bold pb-4">
        Our Popular Courses
      </h1>
      <p className="text-center mb-5 text-sm sm:text-base">
        Explore our popular courses designed to help you master new skills, gain
        expert knowledge, and achieve your learning goals with confidence.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 px-5 sm:px-10">
  {/* Example Product */}
  {classesData.slice(0, 8).map((cls) => (
    <div
      key={cls.class_id}
      className="relative product-card rounded-lg p-6 shadow-lg w-full"
    >
      <Link to={`/classes/${cls.class_id}`}>
        <div className="product-image mb-4 relative">
          <img
            src={cls.class_image_url || image}
            className="w-full h-48 object-contain rounded-md"
          />
          {/* Conditional Ribbon Display */}
          {cls.free_course && (
            <div className="absolute top-0 right-0 bg-green-500 text-white py-1 px-3 text-sm font-bold rounded-bl-lg">
              FREE
            </div>
          )}
        </div>
        <div className="product-rating flex items-center gap-2 my-1">
          <div className="stars text-yellow-500 text-xl">★</div>
          <span className="rating text-sm">4.5 (254)</span>
        </div>
        <div className="product-details flex items-center justify-between gap-2 my-1 mb-5">
          <div className="flex items-center gap-2">
            <FaBook className="text-sm text-[#D3D3D3]"/>
            <span className="rating text-sm">{cls.free_course}</span>
          </div>
          <FaClock className="text-sm text-[#D3D3D3]"/>
        </div>
      </Link>
      <hr />
      <div className="flex items-center justify-between">
        <div className="text-2xl font-medium">
          ₹ {cls.class_price || "Free"}
        </div>
        <button
          type="button"
          onClick={() => {
            navigate(`/classes/${cls.class_id}`)
          }}
          className="mt-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5"
        >
          View Class
        </button>
      </div>
    </div>
  ))}
</div>

    </div>
  );
};
