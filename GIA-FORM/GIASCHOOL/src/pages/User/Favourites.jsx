import React, { useState, useEffect } from "react";
import axios from "axios";
import Loading from "../../components/Loading";
import { GetSubject as Subject } from "../../Redux/store/authSlice";
import { FaCartShopping } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import NavbarSignIn from "../../components/NavbarSignIn";
import { Footer } from "../../components/Footer";

const Favourites = () => {
  const [loading, setLoading] = useState(false);
  const [fav, setFav] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [error, setError] = useState(false);
  const [show, setShow] = useState(false);
  const [buy, setBuy] = useState([]);
  const BASEURL = import.meta.env.VITE_API_URL_USERS;
  const BASEURLCART = import.meta.env.VITE_API_URL_CART_USER;
  const accessToken = window.sessionStorage.getItem("accessToken");
  const { isAuthenticated, userPhone } = useSelector((state) => state.auth);
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

    console.log("handleSubjectclick", board);
    dispatch(
      Subject({
        subject_id: board.subject_id,
        subject_name: board.subject_name,
        page_name: "GetSubSubject",
      })
    );
    navigate("/GetSubSubject");
  };

  let favSubjectIds;

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

  const getSubjects = async () => {
    try {
      const response = await axios.get(`${BASEURL}/data/getSubjects`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      const filSubjects = response.data.filter((subject) =>
        favSubjectIds.includes(subject.subject_id)
      );
      setFiltered(filSubjects);
    } catch (error) {
      setError(true);
      console.error(error);
    }
  };

  const getFav = async () => {
    try {
      const response = await axios.get(
        `${BASEURLCART}/data/getuser_favorites?user_id=${userPhone.user.empid}`,
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );

      favSubjectIds = response.data.map((favItem) => favItem.subject_id);
      setFav(response.data);
    } catch (error) {
      setError(true);
      console.error(error);
    }
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      await getFav();
      await getSubjects();
      await getPurchaseData();
    } catch (error) {
      console.error("Error fetching data", error);
    } finally {
      setLoading(false);
    }
  };

  const rmfav = async (item) => {
    setShow(true);
    try {
      const favItem = fav.find(
        (favItem) => favItem.subject_id === item.subject_id
      );

      if (!favItem) {
        alert("Favorite item not found.");
        return;
      }

      await axios.delete(
        `${BASEURLCART}/data/deleteuser_favorites/${favItem.favorite_id}`,
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );

      setFiltered(
        filtered.filter((subject) => subject.subject_id !== item.subject_id)
      );
      alert(`${item.subject_name} has been removed from favorites.`);
    } catch (error) {
      console.error("Error removing from favorites:", error);
      alert("Failed to remove favorite");
    } finally {
      setShow(false);
    }
  };

  const handleCart = async (board) => {
    setShow(true);
    const postData = {
      user_id: userPhone.user?.empid,
      subject_id: board?.subject_id,
      added_at: new Date().toISOString()?.slice(0, 10),
      updated_at: new Date().toISOString()?.slice(0, 10),
    };
    try {
      await axios.post(`${BASEURL}/data/insertUSER_CART`, postData, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      alert("Added Successfully");
    } catch (error) {
      console.error(error);
      alert("Failed to add to cart");
    } finally {
      setShow(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <>
        <NavbarSignIn />
        <Loading />
      </>
    );
  }

  if (error) {
    return (
      <>
        <NavbarSignIn />
        <div
          className="flex justify-center items-center"
          style={{ minHeight: "calc(100vh - 10vh)" }}
        >
          <div className="text-center p-6 bg-white rounded-lg shadow-lg max-w-md w-full">
            <span className="text-red-500 text-xl font-semibold mb-4 block">
              Something went wrong..
            </span>
            <button
              className="bg-[#0455BF] py-3 px-8 text-white font-bold rounded-lg hover:bg-blue-600"
              onClick={fetchData}
            >
              Please Try Again
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <NavbarSignIn />
      <div
        className="bg-gradient-to-r from-white to-indigo-50"
        style={{ minHeight: "calc(100vh - 10vh)" }}
      >
        <div className="container mx-auto p-4 sm:p-6 lg:p-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6 bg-blue-600 text-white py-3 rounded-lg">
            Your Favorites
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filtered.length > 0 ? (
              filtered.map((board, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg p-4 shadow-lg hover:shadow-2xl transition-transform transform hover:scale-105"
                >
                  <div
                    className="flex flex-col items-center"
                    onClick={() => HandlesubjectClick(board)}
                  >
                    {/* Image Section */}
                    {board.subject_image_url ? (
                      <img
                        src={board.subject_image_url}
                        alt="Class"
                        className="w-full h-32 sm:h-40 lg:h-48 object-cover rounded-t-lg"
                      />
                    ) : (
                      <div className="w-full h-32 sm:h-40 lg:h-48 bg-gray-200 flex justify-center items-center rounded-t-lg">
                        <FaCartShopping className="text-5xl text-gray-400" />
                      </div>
                    )}

                    {/* Subject Name Section */}
                    <div className="text-center font-semibold mt-2">
                      {board.subject_name || "Untitled Subject"}
                    </div>
                  </div>

                  {/* Favorite Button */}
                  <button
                    className="absolute right-4 top-4 text-red-500"
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent click event from bubbling up
                      rmfav(board);
                    }}
                  >
                    <FaHeart className="text-2xl" />
                  </button>

                  {/* Add to Cart Button */}
                  <button
                    className="bg-blue-600 text-white font-bold py-2 px-4 rounded mt-4 w-full"
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent click event from bubbling up
                      handleCart(board);
                    }}
                  >
                    Add to Cart
                  </button>
                </div>
              ))
            ) : (
              <p className="text-center col-span-full text-gray-500">
                No favorites found.
              </p>
            )}
          </div>
        </div>
      </div>

      <Footer />

      {show && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-4 w-[90%] sm:w-[70%] md:w-[50%] lg:w-[30%] flex justify-center items-center">
            <Loading />
          </div>
        </div>
      )}
    </>
  );
};

export default Favourites;
