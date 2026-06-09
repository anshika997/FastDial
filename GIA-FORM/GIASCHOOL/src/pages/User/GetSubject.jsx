import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import axios from "axios";
import { GetSubject as Subject } from "../../Redux/store/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/Loading";
import { FaCartShopping } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import NavbarSignIn from "../../components/NavbarSignIn";
function GetSubject() {
  const [BoardDat, setBoardsData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [CartDetails, setCartDetails] = useState([]);
  const [filters, setFilters] = useState({
    board_name: "",
    class_name: "",
    subject_name: "",
  });
  const BASEURL = import.meta.env.VITE_API_URL_USERS;
  const BASEURLCART = import.meta.env.VITE_API_URL_CART_USER;
  const accessToken = window.sessionStorage.getItem("accessToken");
  const data = useSelector((state) => state.auth.Classes);
  const { isAuthenticated, userPhone } = useSelector((state) => state.auth);
  const board = useSelector((state) => state.auth.Board);
  const [fav, setFav] = useState([]);
  const [buy, setBuy] = useState([]);
  const [FavForDelete, setFavForDelete] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const HandlesubjectClick = (board) => {
    if (
      buy.length === 0 ||
      !buy.some((item) => board.subject_id === item.subject_id)
    ) {
      alert("You haven't bought the course !!");
      return;
    }

    console.log("handleSubjectclick");
    dispatch(
      Subject({
        subject_id: board.subject_id,
        subject_name: board.subject_name,
        page_name: "GetSubSubject",
      })
    );
    navigate("/GetSubSubject");
  };

  useEffect(() => {
    fetchData();
    getFav();
    getPurchaseData();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [filters, BoardDat]);

  const getFav = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${BASEURLCART}/data/getuser_favorites?user_id=${userPhone.user?.empid}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const favoriteSubjectIds = response.data.map((fav) => fav.subject_id);
      setFavForDelete(response.data);
      setFav(favoriteSubjectIds);
    } catch (error) {
      console.error("Error fetching favorites:", error);
    } finally {
      setLoading(false);
    }
  };

  const getPurchaseData = async () => {
    if (!isAuthenticated || !userPhone?.user?.empid) {
      setError(true);
      return;
    }
    try {
      setLoading(true);
      const response = await axios.get(
        `${BASEURL}/data/getsubjects_purchased?user_id=${userPhone.user.empid}`,
        // `${BASEURL}/data/getsubjects_purchased`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log(response.data);
      setBuy(response.data);
    } catch (error) {
      setError(true);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchData = () => {
    setLoading(true);
    axios
      .get(`${BASEURL}/data/getSubjects?class_id=${data?.class_id}`, {
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
  };

  const applyFilters = () => {
    const filtered = BoardDat.filter((board) => {
      return (
        (filters.board_name === "" ||
          board.board_name
            ?.toLowerCase()
            .includes(filters.board_name.toLowerCase())) &&
        (filters.class_name === "" ||
          board.class_name
            ?.toLowerCase()
            .includes(filters.class_name.toLowerCase())) &&
        (filters.subject_name === "" ||
          board.subject_name
            ?.toLowerCase()
            .includes(filters.subject_name.toLowerCase()))
      );
    });
    setFilteredData(filtered);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleCart = async (board) => {
    const postData = {
      cart_id: CartDetails?.cart_id,
      user_id: userPhone.user?.empid,
      subject_id: board?.subject_id,
      added_at: new Date().toISOString()?.slice(0, 10),
      updated_at: new Date().toISOString()?.slice(0, 10),
    };
    try {
      await axios.post(`${BASEURL}/data/insertUSER_CART`, postData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      alert("Added Successfully");
    } catch (error) {
      console.error(error);
      alert("Failed to add to cart");
    }
  };

  const addfav = async (item) => {
    try {
      const postData = {
        user_id: userPhone.user?.empid,
        subject_id: item.subject_id,
      };
      const response = await axios.post(
        `${BASEURLCART}/data/insertuser_favorites`,
        postData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setFav((prevFav) => [...prevFav, item.subject_id]);
      getFav();
    } catch (error) {
      console.error("Error adding to favorites:", error);
    }
  };

  const rmfav = async (item) => {
    console.log("Item to remove:", item.subject_id);
    console.log("Favorites list:", FavForDelete);
    setLoading(true);
    try {
      // Find the favorite item with the matching subject_id
      const favItem = FavForDelete.find(
        (favItem) => favItem.subject_id === item.subject_id
      );

      if (!favItem) {
        alert("Favorite item not found.");
        return;
      }

      // Use the favorite_id to delete the favorite
      await axios.delete(
        `${BASEURLCART}/data/deleteuser_favorites/${favItem.favorite_id}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      // Update local favorites state
      setFav(fav.filter((favItem) => favItem.subject_id !== item.subject_id));

      alert(`${item.subject_name} has been removed from favorites.`);
      getFav();
    } catch (error) {
      console.error("Error removing from favorites:", error);
      alert("Failed to remove favorite");
    } finally {
      setLoading(false);
    }
  };

  const HandleBreadCrumbs = () => {
    navigate("/GetClasses");
  };
  const HandleBreadCrumbsClass = () => {
    navigate("/GetBoard");
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-white to-indigo-50">
      <NavbarSignIn />
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-Montserrat  text-center font-bold mb-8 bg-blue-600 text-white py-3 rounded-lg shadow-lg">
          Choose Subject
        </h1>
        <div className="flex flex-row justify-start items-center mb-1">
          <ul className="flex gap-2">
            <li className="text-xl italic text-gray-500 mb-4 hover:text-blue-400 hover:cursor-pointer">
              <a onClick={HandleBreadCrumbsClass}>{board?.board_name}</a>
            </li>{" "}
            {board?.board_name ? (
              <span className="text-xl"> {">"}</span>
            ) : (
              <></>
            )}
            <li className="text-xl italic text-gray-500 mb-4 hover:text-blue-400 hover:cursor-pointer">
              <a onClick={HandleBreadCrumbs}>{data?.class_name}</a>
            </li>
          </ul>
        </div>
        {loading ? (
          <Loading />
        ) : (
          <>
            {/* Filters Section */}
            <div className="mb-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              <input
                type="text"
                name="subject_name"
                placeholder="Filter by Subject Name"
                value={filters.subject_name}
                onChange={handleFilterChange}
                className="p-2 border rounded"
              />
            </div>

            {/* Subjects Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredData.length > 0 ? (
                filteredData.map((board, index) => (
                  <div key={index}>
                    <div className="bg-white rounded-lg p-4 shadow-lg hover:shadow-2xl transform hover:scale-105 transition-transform duration-300 border-t-4 border-indigo-400 relative">
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
                      {/* Heart Icon (Favorites Button) */}
                      <button
                        className="text-red-500 absolute right-5 top-5"
                        aria-label="Add to Favorites"
                      >
                        <FaHeart
                          onClick={() =>
                            fav.includes(board.subject_id)
                              ? rmfav(board)
                              : addfav(board)
                          }
                          className={`ml-4 text-2xl border-2 p-1 rounded-full transition-transform duration-300 ease-in-out ${
                            fav.includes(board.subject_id)
                              ? "text-red-600 bg-fuchsia-200 hover:text-red-800 hover:bg-fuchsia-300"
                              : "text-gray-400 hover:text-red-600 hover:bg-gray-200"
                          }`}
                        />
                      </button>
                      <div
                        className="cursor-pointer"
                        onClick={() => HandlesubjectClick(board)}
                      >
                        <div className="flex items-end flex-wrap justify-between">
                          <span className="font-bold block text-gray-800 text-sm">
                            Subject
                          </span>
                          <span className="font-bold text-indigo-800 text-3xl">
                            {board.subject_price
                              ? `₹${board.subject_price}`
                              : "N/A"}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-indigo-600">
                            {board.subject_name || "Untitled Subject"}
                          </span>
                        </div>
                      </div>
                      <div className="mt-4 flex justify-center gap-2">
                        <button
                          className="bg-blue-600 text-white font-bold py-2 px-4 rounded w-full hover:bg-blue-700 hover:scale-105 transform transition-transform duration-300 flex items-center justify-center"
                          aria-label="Add to Cart"
                          onClick={() => handleCart(board)}
                        >
                          <span>Add to Cart</span>
                          <FaCartShopping className="ml-2" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center col-span-full text-gray-500">
                  No subjects available.
                </p>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default GetSubject;
