import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { GetSubSubject as subsubject } from "../../Redux/store/authSlice";
import { FaCartShopping } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa";
import NavbarSignIn from "../../components/NavbarSignIn";

function GetSubSubject() {
  const [BoardDat, setBoardsData] = useState([]);
  const BASEURL = import.meta.env.VITE_API_URL_USERS;

  const accessToken = window.sessionStorage.getItem("accessToken");
  const data = useSelector((state) => state.auth.Subject);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  console.log(data);
  const Board = useSelector((state) => state.auth.Board);
  const classVALUE = useSelector((state) => state.auth.Classes);

  const HandleSubSubjectClick = (board) => {
    dispatch(
      subsubject({
        sub_subject_id: board.sub_subject_id,
        sub_subject_name: board.sub_subject_name,
        page_name: "GetChapters",
      })
    );
    navigate("/GetChapters");
  };

  function fetchData() {
    axios
      .get(`${BASEURL}/data/getSubSubjects?subject_id=${data?.subject_id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        if (response.data) {
          setBoardsData(response.data);
          console.log(response.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching boards data:", error);
      });
  }

  useEffect(() => {
    fetchData();
  }, [data?.subject_id]); // Ensure to refetch data if the subject_id changes

  const HandleBreadCrumbsBroad = () => {
    navigate("/Getboard");
  };
  const HandleBreadCrumbsClass = () => {
    navigate("/GetClasses");
  };
  const HandleBreadCrumbssubject = () => {
    navigate("/GetSubject");
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-white to-indigo-50">
      {/* <Navbar /> */}
      <NavbarSignIn/>
      <div className="container mx-auto p-6">
      <h1 className="text-3xl font-Montserrat  text-center font-bold mb-8 bg-blue-600 text-white py-3 rounded-lg shadow-lg">
          Choose Sub-subject
        </h1>
        <ul className="flex gap-2 flex-row justify-start items-center mb-1">
          <li className=" text-xl italic text-gray-500 mb-4 hover:text-blue-400 hover:cursor-pointer">
            <a onClick={HandleBreadCrumbsBroad}>{Board?.board_name}</a>
          </li>
          {Board?.board_name && <span className="text-xl mb-4"> {">"}</span>}
          <li className=" text-xl italic text-gray-500 mb-4 hover:text-blue-400 hover:cursor-pointer">
            <a onClick={HandleBreadCrumbsClass}>{classVALUE?.class_name}</a>
          </li>
          {classVALUE?.class_name && (
            <span className="text-xl mb-4"> {">"}</span>
          )}
          <li className=" text-xl italic text-gray-500 mb-4 hover:text-blue-400 hover:cursor-pointer">
            <a onClick={HandleBreadCrumbssubject}>{data?.subject_name}</a>
          </li>
        </ul>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {BoardDat.length > 0 ? (
            BoardDat.map((board, index) => (
              <div
                onClick={() => HandleSubSubjectClick(board)}
                key={index}
                className="bg-white rounded-lg p-4 shadow-lg hover:shadow-2xl transform hover:scale-105 transition-transform duration-300 border-t-4 border-indigo-400 relative"
              >
                {board.subject_image_url ? (
                  <img
                    src={board.subject_image_url}
                    alt="Class"
                    className="w-full h-32 object-contain rounded-md mb-4 shadow-lg p-2"
                  />
                ) : (
                  <div className="w-full h-40 bg-gray-200 flex items-center justify-center rounded-md mb-4">
                    <FaCartShopping className="text-5xl text-gray-400" />
                  </div>
                )}
                <button
                  className=" text-red-500 absolute right-5 top-5"
                  aria-label="Add to Cart"
                  onClick={() => alert("Added To favorite")}
                >
                  <FaHeart className="ml-4 text-2xl hover:bg-fuchsia-200 border-2 p-1 border-red-300 rounded" />
                </button>
                <div className="">
                  <div className="flex items-end flex-wrap justify-between">
                    <span className="font-bold block text-gray-800 text-sm">
                      Sub-Subject
                    </span>
                    <span className="font-bold text-indigo-800 text-3xl">
                      {board.sub_subject_price
                        ? `₹${board.sub_subject_price}`
                        : "N/A"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-indigo-600">
                      {board.sub_subject_name || "Untitled Sub-Subject"}
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center col-span-full text-gray-500">
              No Sub available.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default GetSubSubject;
