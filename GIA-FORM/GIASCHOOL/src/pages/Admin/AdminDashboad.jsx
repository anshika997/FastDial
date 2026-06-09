import React, { useEffect, useState } from "react";
// import LogoKa from "../images/LogoKa.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FaBarsStaggered } from "react-icons/fa6";
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
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";

export default function Dashboard() {
  const navigate = useNavigate();
  const authLogin = useSelector((state) => state.auth);
  console.log(authLogin);
  const loogedInUser = authLogin?.userPhone?.user?.name;
  console.log(loogedInUser);

  const handleLogout = () => {
    if (window.confirm("Do you really want to log out?")) {
      window.sessionStorage.removeItem("accessToken");
      navigate("/");
    }
  };
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <div className="bg-gray-700 text-white p-4  px-8 rounded-b-[20px] relative ">
        <div className=" flex items-center justify-between rounded-b-lg">
          <button className="text-white text-2xl font-extrabold">
            <FaBarsStaggered />{" "}
          </button>

          <h1 className="text-white font-extrabold text-2xl capitalize">
            GIA SCHOOL
          </h1>
          <button
            onClick={handleLogout}
            className="text-white text-2xl font-extrabold"
            title="Logout"
          >
            <FaSignOutAlt />
          </button>
        </div>
        <section className="flex  justify-between items-center">
          <div>
            <div className="font-normal text-2xl">Welcome,</div>
            <h1 className="font-extrabold text-2xl capitalize">
              {loogedInUser ? loogedInUser : "Admin"}
            </h1>
          </div>
          <div className="flex w-[90%] lg:w-[95%] justify-center mt-4 absolute lg:bottom-[-20px] bottom-[-30px]  z-50 overflow-hidden">
            <input
              type="text"
              placeholder="Search For product..."
              className="w-3/4 lg:w-1/3 p-2 rounded-full border shadow-lg shadow-red-500 focus:outline-none text-black"
            />
          </div>
          <div
            className="rounded-full bg-white lg:p-2 lg:px-3 lg:font-semibold p-1 px-2"
            onClick={() => {
              navigate(`/AdminUserList`);
            }}
          >
            <button className="text-black">Add New Admin &nbsp;</button>
            <FontAwesomeIcon icon={faUser} className="text-blue-600" />
          </div>
        </section>
      </div>

      {/* Grid of Buttons */}
      <div className="grid grid-cols-2 lg:grid-cols-4 p-4 mt-8 lg:px-40 ">
        {[
          /* {
            label: "Dashboard",
            icon: faTh,
            bg: "bg-gray-700",
            color: "text-white",
            page: "Dashboard",
          }, */
          {
            label: "Setup",
            icon: faUsersCog,
            page: "Setup",
          },
        ].map((item, index) => (
          <div
            key={index}
            className={` p-5 rounded-full shadow-sm ${
              item.bg || " bg-white flex flex-row  justify-evenly "
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
    </div>
  );
}
