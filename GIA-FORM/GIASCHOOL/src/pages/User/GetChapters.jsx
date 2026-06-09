import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { GetData } from "../../Redux/store/authSlice";
import Loading from "../../components/Loading";
import NavbarSignIn from "../../components/NavbarSignIn";

function GetChapters() {
  const [BoardDat, setBoardsData] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state defaulted to true
  const BASEURL = import.meta.env.VITE_API_URL_USERS;
  const accessToken = window.sessionStorage.getItem("accessToken");

  const data = useSelector((state) => state.auth.SubSubject);
  console.log(data);
  const Subject = useSelector((state) => state.auth.Subject);
  const Board = useSelector((state) => state.auth.Board);
  const classVALUE = useSelector((state) => state.auth.Classes);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Function for handling chapter clicks
  const HandleSubclick = (board) => {
    dispatch(
      GetData({
        chapter_id: board.chapter_id,
        chapter_name: board.chapter_name,
        page_name: "GetTopic",
      })
    );
    navigate("/GetTopic");
  };

  // Fetch data from the API
  const fetchData = async () => {
    try {
      setLoading(true); // Set loading true before fetching data
      const response = await axios.get(
        `${BASEURL}/data/getChapters?sub_subject_id=${data?.sub_subject_id}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (response.data) {
        const sortedData = [...response.data].sort(
          (a, b) => a.chapter_id - b.chapter_id
        );
        setBoardsData(sortedData);
        console.log(sortedData);
      }
    } catch (error) {
      console.error("Error fetching boards data:", error);
    } finally {
      setLoading(false); // Set loading false after data is fetched
    }
  };

  // useEffect to trigger fetch on initial load
  useEffect(() => {
    fetchData();
  }, []); // Depend on the sub_subject_id

  // BreadCrumb Navigation
  const HandleBreadCrumbsBroad = () => navigate("/Getboard");
  const HandleBreadCrumbsClass = () => navigate("/GetClasses");
  const HandleBreadCrumbssubject = () => navigate("/GetSubject");
  const HandleBreadCrumbssubsubject = () => navigate("/GetSubSubject");
  return (
    <div className="min-h-screen bg-gradient-to-r from-white to-indigo-50">
      {/* <Navbar /> */}
      <NavbarSignIn />
      <div className="container mx-auto p-6">
      <h1 className="text-3xl font-Montserrat  text-center font-bold mb-8 bg-blue-600 text-white py-3 rounded-lg shadow-lg">
          Choose Chapter
        </h1>

        {/* Breadcrumb Navigation */}
        <ul className="flex gap-2 flex-row justify-start items-center mb-1">
          <li className="text-xl italic text-gray-500 mb-4 hover:text-blue-400 hover:cursor-pointer">
            <a onClick={HandleBreadCrumbsBroad}>{Board?.board_name}</a>
          </li>
          {Board?.board_name && <span className="text-xl mb-4"> {">"}</span>}
          <li className="text-xl italic text-gray-500 mb-4 hover:text-blue-400 hover:cursor-pointer">
            <a onClick={HandleBreadCrumbsClass}>{classVALUE?.class_name}</a>
          </li>
          {classVALUE?.class_name && (
            <span className="text-xl mb-4"> {">"}</span>
          )}
          <li className="text-xl italic text-gray-500 mb-4 hover:text-blue-400 hover:cursor-pointer">
            <a onClick={HandleBreadCrumbssubject}>{Subject?.subject_name}</a>
          </li>
          {Subject?.subject_name && (
            <span className="text-xl mb-4"> {">"}</span>
          )}
          <li className="text-xl italic text-gray-500 mb-4 hover:text-blue-400 hover:cursor-pointer">
            <a onClick={HandleBreadCrumbssubsubject}>
              {data?.sub_subject_name}
            </a>
          </li>
        </ul>

        {/* Loading State or Data Table */}
        {loading ? (
          <Loading />
        ) : BoardDat.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="table-auto w-full bg-white shadow-md rounded-lg">
              <thead>
                <tr className="bg-gray-200 text-left">
                  <th className="px-4 py-2">Chapter Name</th>
                  <th className="px-4 py-2">Chapter Description</th>
                </tr>
              </thead>
              <tbody>
                {BoardDat.map((board, index) => (
                  <tr
                    key={index}
                    className="border-b hover:bg-pink-50 cursor-pointer"
                    onClick={() => HandleSubclick(board)}
                  >
                    <td className="px-4 py-2">{board.chapter_name || "N/A"}</td>
                    <td className="px-4 py-2">
                      {board.chapter_description || "N/A"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-center text-gray-500">No Chapters available.</p>
        )}
      </div>
    </div>
  );
}

export default GetChapters;
