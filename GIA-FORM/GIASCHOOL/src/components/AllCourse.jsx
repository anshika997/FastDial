import axios from "axios";
import React, { useEffect, useState } from "react";
import image from "../Images/excel.png";
import Navbar from "./Navbar";
import { Footer } from "./Footer";

export const AllCourse = () => {
  const BASEURL = import.meta.env.VITE_API_URL_USERS;
  const accessToken = window.sessionStorage.getItem("accessToken");
  const [courses, setCourses] = useState([]);
  const [classesData, setClassesData] = useState([]);
  useEffect(() => {
    const fetchBoards = () => {
      axios
        .get(`${BASEURL}/data/getSubjects`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((response) => {
          if (response.data) {
            setCourses(response.data);
          }
        })
        .catch((error) => {
          console.error("Error fetching boards data:", error);
        });
    };
    fetchBoards();
  }, []);
  return (
    <>
      <Navbar />
      <div
        className="pt-0 pb-0 px-0 pt-20 pb-20 sm:pt-20 sm:pb-20 sm:px-5"
        style={{ background: "#FAFAFA" }}
      >
        <h1 className="text-4xl text-center font-medium pb-3">
          Courses
        </h1>
        <p className="text-center mb-5 text-sm sm:text-base">
          {/* Explore top boards and discover the best learning resources curated
          just for you. */}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 px-5 sm:px-10">
          {/* Example Product */}
          {courses.map((cls) => (
            <div
              key={cls.class_id}
              className="product-card rounded-lg p-6 shadow-lg w-full"
            >
              <div className="product-image mb-4">
                <img
                  src={cls.subject_image_url || image}
                  className="w-100 h-32 object-cover"
                />
              </div>
              {/* <div className="product-rating flex items-center gap-2 my-1">
                <div className="stars text-yellow-500 text-xl">★</div>
                <span className="rating text-sm">4.5 (254)</span>
              </div> */}
              <div className="product-info text-dark">
                <h2 className="product-name text-lg font-semibold">
                  {cls.subject_name}
                </h2>
                <div className="product-delivery flex items-center gap-2 my-2">
                  {/* <img src={profile} /> */}
                  <span className="best-price text-xs">{cls.board_name}</span>
                </div>
                {/* <div className="flex justify-between gap-2 my-2">
                  <div className="product-delivery flex items-center gap-2 my-2">
                    <img src={bookOpen} />
                    <span className="best-price text-xs">Lesson (9)</span>
                  </div>
                  <div className="product-delivery flex items-center gap-2 my-2">
                    <img src={clock} />
                    <span className="best-price text-xs">3h 10m</span>
                  </div>
                </div> */}
                <hr />
                <div className="flex justify-between items-center gap-2 pt-4">
                  <div className="product-price text-2xl font-bold mb-4">
                    ₹ {cls.subject_price || "100"}
                  </div>
                  {/* <button
                    type="button"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 
                      focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5"
                  >
                    Add to Cart
                  </button> */}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};
