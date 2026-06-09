import React, { useEffect, useState } from "react";
// import LogoKa from "../images/LogoKa.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FaBarsStaggered } from "react-icons/fa6";
import { FaSignOutAlt } from "react-icons/fa";
import axios from "axios";
import {
  faBars,
  faUser,
  faTh,
  faUsersCog,
  faCalendarAlt,
  faTruck,
  faChartPie,
  faChartLine,
  faChartBar,
  faImage,
  faThLarge,
  faUsers,
  faChalkboard,
  faBookOpen,
  faSchool,
  faChartSimple,
  faList,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { IoIosArrowBack } from "react-icons/io";
import { Link } from "react-router-dom";
import photo from "../../Images/logoImage.jpeg";
import image from "../../Images/FormImage.jpeg";

export default function DashboardForUpdate() {
  const navigate = useNavigate();
  const authLogin = useSelector((state) => state.auth);
  console.log(authLogin);
  const loogedInUser = authLogin?.userPhone?.user?.name;
  // console.log(loogedInUser);

  // const handleLogout = () => {
  //   if (window.confirm("Do you really want to log out?")) {
  //     // Clear session or user data (example using sessionStorage)
  //     window.sessionStorage.removeItem("accessToken");

  //     // Navigate to the login page
  //     navigate("/");
  //   }
  // };
  const handleLogout = () => {
    if (window.confirm("Are you really want to logout")) {
      window.localStorage.removeItem("accessToken");
      navigate("/");
    }
  };
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <div className=" bg-stone-100 text-black p-4  border-2 shadow-gray-200 rounded-b-[20px] relative shadow-2xl">
        <div className="flex items-center justify-between rounded-b-lg h-[2vh] mt-6">
          <div className="flex justify-evenly items-center">
            <Link to={"/Setup"}>
              <button className="text-black text-[30px]  font-extrabold">
                <IoIosArrowBack />{" "}
              </button>
            </Link>
            <div className="flex">
              <img src={photo} alt="Logo" className="h-[18vh] object-contain" />
            </div>
          </div>

          <h1 className="text-black font-extrabold text-2xl capitalize lg:block hidden">
            GIA SCHOOL
          </h1>

          <div className="rounded-full bg-white p-2 px-3">
            {/* <FontAwesomeIcon icon={faUser} className="text-blue-600" /> */}
            <FaSignOutAlt
              className="text-blue-600"
              onClick={handleLogout}
              style={{ cursor: "pointer", display: "inline-block" }}
            />
          </div>
        </div>
      </div>

      {/* Search */}

      {/* Grid of Buttons */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 p-6 mt-8 lg:px-40">
        {[
          {
            label: "Setup Dashboard",
            icon: faTh,
            bg: "bg-gray-700",
            color: "text-white",
            page: "Setup",
          },
          {
            label: "Board",
            icon: faSchool,
            page: "Board",
          },
          {
            label: "Class",
            icon: faChalkboard,
            page: "Class",
          },
          {
            label: "Subject",
            icon: faBookOpen,
            page: "Subject",
          },
          {
            label: "Sub Subject",
            icon: faChartPie,
            page: "SubSubject",
          },

          {
            label: "Chapters",
            icon: faChartSimple,
            page: "Chapters",
          },
          {
            label: "Topics",
            icon: faList,
            page: "Topics",
          },
          {
            label: "Testimonial",
            icon: faUser,
            page: "Testimonial",
          },
        ].map((item, index) => (
          <div
            key={index}
            className={`p-5 rounded-full shadow-md flex flex-row  justify-evenly ${
              item.bg || "bg-white "
            } ${
              item.color || "text-gray-600"
            } hover:shadow-lg shadow-red-500 cursor-pointer`}
            onClick={() => {
              navigate(`/${item.page}`);
            }}
          >
            <FontAwesomeIcon icon={item.icon} className="text-3xl" />
            <div className="mt-2 font-semibold">{item.label}</div>
          </div>
        ))}
      </div>

      {/* Bottom Navigation */}
      <div className="w-full fixed bottom-0 left-0 right-0 bg-white border-t border-gray-300 flex justify-around py-2 text-3xl">
        <button className="text-gray-600 hover:text-blue-600">
          <FontAwesomeIcon icon={faUser} />
        </button>
        <button className="text-blue-600">
          <FontAwesomeIcon icon={faThLarge} />
        </button>
        <button className="text-gray-600 hover:text-blue-600">
          <FontAwesomeIcon icon={faUsers} />
        </button>
      </div>
      <div>
        <img
          src={image}
          alt="form image "
          className="w-[200px] md:w-1/2 h-[30vh] md:h-auto mb-2 "
        />
      </div>
    </div>
  );
}
