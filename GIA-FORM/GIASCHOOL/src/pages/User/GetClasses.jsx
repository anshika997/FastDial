import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { GetClasses as classes } from "../../Redux/store/authSlice"; // Ensure this is the correct action
import Loading from "../../components/Loading";
import { FaCartShopping } from "react-icons/fa6";
import NavbarSignIn from "../../components/NavbarSignIn";

function GetClasses() {
  const [BoardDat, setBoardsData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    board_name: "",
    class_name: "",
    priceRange: "all",
  });

  const BASEURL = import.meta.env.VITE_API_URL_USERS;
  const accessToken = window.sessionStorage.getItem("accessToken");
  const data = useSelector((state) => state.auth.Board);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Function to handle click and dispatch Redux action
  const handleClassClick = (board) => {
    dispatch(
      classes({
        class_id: board.class_id,
        class_name: board.class_name,
        page_name: "GetSubject",
      })
    );
    navigate("/GetSubject");
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [BoardDat, filters]);

  function fetchData() {
    setLoading(true);
    axios
      .get(`${BASEURL}/data/getClasses?board_id=${data?.board_id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        if (response.data) {
          setBoardsData(response.data);
          setFilteredData(response.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching boards data:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  const applyFilters = () => {
    const { board_name, class_name, priceRange } = filters;
    let filtered = BoardDat;

    if (board_name) {
      filtered = filtered.filter((board) =>
        board.board_name.toLowerCase().includes(board_name.toLowerCase())
      );
    }

    if (class_name) {
      filtered = filtered.filter((board) =>
        board.class_name.toLowerCase().includes(class_name.toLowerCase())
      );
    }

    if (priceRange !== "all") {
      filtered = filtered.filter((board) => {
        const price = parseFloat(board.class_price);
        if (priceRange === "low") return price < 100;
        if (priceRange === "medium") return price >= 100 && price <= 500;
        if (priceRange === "high") return price > 500;
        return true;
      });
    }

    setFilteredData(filtered);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };
  const HandleBreadCrumbs = () => {
    navigate("/GetBoard");
  };
  return (
    <div className="min-h-screen bg-gradient-to-r from-white to-indigo-50">
      {/* <Navbar /> */}
      <NavbarSignIn/>
      <div className="container mx-auto p-6">
      <h1 className="text-3xl font-Montserrat  text-center font-bold mb-8 bg-blue-600 text-white py-3 rounded-lg shadow-lg">
          Choose Classes
        </h1>
        <div className="flex flex-row justify-start items-center mb-1">
          <ul>
            <li className=" text-xl italic text-gray-500 mb-4 hover:text-blue-400 hover:cursor-pointer">
              <a onClick={HandleBreadCrumbs}>{data?.board_name}</a>
            </li>
          </ul>
        </div>
        {loading ? (
          <Loading />
        ) : (
          <>
            {/* Filters */}

            <div className="mb-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <input
                type="text"
                name="class_name"
                value={filters.class_name}
                onChange={handleInputChange}
                placeholder="Filter by Class Name"
                className="p-2 border rounded-lg shadow-md focus:outline-none focus:ring focus:ring-indigo-300"
              />
              <select
                name="priceRange"
                value={filters.priceRange}
                onChange={handleInputChange}
                className="p-2 border rounded-lg shadow-md focus:outline-none focus:ring focus:ring-indigo-300"
              >
                <option value="all">All Prices</option>
                <option value="low">Below 100</option>
                <option value="medium">100 - 500</option>
                <option value="high">Above 500</option>
              </select>
            </div>

            {/* Classes Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredData.length > 0 ? (
                filteredData.map((board, index) => (
                  <div key={index}>
                    <div
                      onClick={() => handleClassClick(board)}
                      className="bg-white rounded-lg p-4 shadow-lg hover:shadow-2xl transform hover:scale-105 transition-transform duration-300 border-t-4 border-indigo-400"
                    >
                      {board.class_image_url ? (
                        <img
                          src={board.class_image_url}
                          alt="Class"
                          className="w-full h-32 object-contain rounded-md mb-4 shadow-lg p-2"
                        />
                      ) : (
                        <div className="w-full h-40 bg-gray-200 flex items-center justify-center rounded-md mb-4">
                          <FaCartShopping className="text-5xl text-gray-400" />
                        </div>
                      )}
                      <div>
                        <div className="flex items-end flex-wrap justify-between">
                          <span className="font-bold block text-gray-800 text-sm">
                            Class:{" "}
                            <span className="font-bold text-indigo-600 text-2xl">
                              {board.class_name || "Untitled Class"}
                            </span>
                          </span>
                          <span className="font-bold text-indigo-800 text-3xl">
                            {board.class_price
                              ? `₹${board.class_price}`
                              : "N/A"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center col-span-full text-gray-500">
                  No classes available.
                </p>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default GetClasses;
