import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { GetBoard as boardredux } from "../../Redux/store/authSlice";
import Loading from "../../components/Loading";
import NavbarSignIn from "../../components/NavbarSignIn";
import { Footer } from "../../components/Footer";

function GetBoard() {
  const [BoardDat, setBoardsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const BASEURL = import.meta.env.VITE_API_URL_USERS;
  const accessToken = window.sessionStorage.getItem("accessToken");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function fetchData() {
    setLoading(true);
    axios
      .get(`${BASEURL}/data/getBoards`, {
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
      })
      .finally(() => {
        setLoading(false);
      });
  }

  useEffect(() => {
    fetchData();
  }, []);

  const HandleClick = (board) => {
    dispatch(
      boardredux({
        board_id: board?.board_id,
        board_name: board.board_name,
        page_name: "GetClasses",
      })
    );
    navigate("/GetClasses");
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-white to-indigo-50">
      <NavbarSignIn />
      <div className="container mx-auto p-6 sm:pt-20 sm:pb-20 sm:px-20">
        <h1 className="text-3xl font-Montserrat  text-center font-bold mb-8 bg-blue-600 text-white py-3 rounded-lg shadow-lg">
          Choose Board
        </h1>
        {loading ? (
          <Loading />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 m-2">
            {BoardDat.length > 0 ? (
              BoardDat.map((board, index) => (
                <div
                  key={index}
                  onClick={() => HandleClick(board)}
                  className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg hover:scale-105 transform transition-transform duration-300 border gap-3 relative"
                >
                  <img
                    src={board.image_url}
                    alt="Board Image"
                    className="w-full h-48 object-contain rounded-md"
                  />
                  <h2 className="text-xl text-center text-gray-800 font-bold mt-4">
                    {board.board_name || "Untitled Board"}
                  </h2>
                </div>
              ))
            ) : (
              <p className="text-center col-span-full text-gray-500 mt-5">
                No boards available.
              </p>
            )}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default GetBoard;
