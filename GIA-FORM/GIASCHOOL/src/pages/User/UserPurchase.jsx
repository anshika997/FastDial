import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { GetData } from "../../Redux/store/authSlice";
function UserPurchase() {
  const [BoardDat, setBoardsData] = useState([]);
  const BASEURL = import.meta.env.VITE_API_URL_USERS;
  const BASEURLADMIN = import.meta.env.VITE_API_URL_ADMIN;
  const accessToken = window.sessionStorage.getItem("accessToken");
  const data = useSelector((state) => state.auth.data);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  console.log(data);
  function fetchData() {
    axios
      .get(`${BASEURL}/data/getUserClassPurchased`, {
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
  }, []);

  const HandlePurchase = (board) => {
    dispatch(GetData(board));
    navigate("/UserPurchase");
  };
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 ">
          {BoardDat.length > 0 ? (
            BoardDat.map((board, index) => (
              <div
                onClick={() => HandleClick(board)}
                key={index}
                className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow duration-300"
              >
                <h2 className="text-xl  text-gray-800">
                  <span className="font-bold">Board: </span>
                  {board.board_name || "Untitled Board"}
                </h2>
                <p className="text-xl  text-gray-800">
                  {" "}
                  <span className="font-bold">Class: </span>{" "}
                  {board.class_name || "Untitled Board"}
                </p>
                <p className="text-xl  text-gray-800">
                  {" "}
                  <span className="font-bold">Subject: </span>{" "}
                  {board.subject_name || "Untitled Board"}
                </p>
                <p className="text-xl  text-gray-800">
                  {" "}
                  <span className="font-bold">Class Price: </span>{" "}
                  {board.class_price || "Untitled Board"}
                </p>
                <p className="text-xl  text-gray-800">
                  {" "}
                  <span className="font-bold">Subject Price: </span>{" "}
                  {board.subject_price || "Untitled Board"}
                </p>
                <div className="text-end">
                  <button
                    onClick={() => HandlePurchase(board)}
                    className="bg-green-600 p-2 m-2 rounded-lg text-white"
                  >
                    Purchase
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center col-span-full text-gray-500">
              No boards available.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserPurchase;
