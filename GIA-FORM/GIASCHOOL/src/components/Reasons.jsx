import React from "react";
import { Link } from "react-router-dom";
import classes from "../Images/classes.png";
import subs from "../Images/subs.png";
import total from "../Images/total.png";
import members from "../Images/members.png";
import { FaAward, FaGraduationCap } from "react-icons/fa";
import { FaPeopleGroup, FaSuitcaseMedical, FaUserGroup } from "react-icons/fa6";

export const Reasons = () => {
  return (
    <div className="pt-0 pb-0 px-0 pt-20 pb-20 sm:pt-20 sm:pb-20 sm:px-20">
      <h1 className="text-4xl text-center font-medium pb-4">
        More reasons to love Experience Pavillion
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 px-5 sm:px-10">
        {/* Class section */}
        <div className="flex flex-col items-center justify-center p-5">
          {/* <img src={classes} alt="Classes" className="w-16 h-16 sm:w-18 sm:h-18" />
           */}
          <FaAward className="text-4xl text-center text-red-500" />
          <h3 className="text-3xl sm:text-4xl text-center font-medium mt-5 mb-4">
            2500 +
          </h3>
          <Link className="text-blue-600 text-sm sm:text-base">Learn More</Link>
        </div>

        {/* Subscribers section */}
        <div className="flex flex-col items-center justify-center p-5">
          {/* <img
            src={subs}
            alt="Subscribers"
            className="w-16 h-16 sm:w-18 sm:h-18"
          /> */}
          <FaUserGroup className="text-4xl text-center text-blue-400"/>
          <h3 className="text-3xl sm:text-4xl text-center font-medium mt-5 mb-4">
            2000 +
          </h3>
          <Link className="text-blue-600 text-sm sm:text-base">
            Happy Subscribers
          </Link>
        </div>

        {/* Total Courses section */}
        <div className="flex flex-col items-center justify-center p-5">
          {/* <img
            src={total}
            alt="Total Courses"
            className="w-16 h-16 sm:w-18 sm:h-18"
          /> */}
          <FaGraduationCap className="text-4xl text-center text-yellow-500"/>
          <h3 className="text-3xl sm:text-4xl text-center font-medium mt-5 mb-4">
            1500 +
          </h3>
          <Link className="text-blue-600 text-sm sm:text-base">
            Total Courses
          </Link>
        </div>

        {/* Mentors section */}
        <div className="flex flex-col items-center justify-center p-5">
          <FaPeopleGroup className="text-3xl text-center text-purple-500"/>
          <h3 className="text-3xl sm:text-4xl text-center font-medium mt-5 mb-4">
            150 +
          </h3>
          <Link className="text-blue-600 text-sm sm:text-base">Mentors</Link>
        </div>
      </div>
    </div>
  );
};
