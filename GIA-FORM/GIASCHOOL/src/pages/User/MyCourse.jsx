import React, { useEffect, useState } from "react";
import NavbarSignIn from "../../components/NavbarSignIn";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { FaCartShopping } from "react-icons/fa6";
import Loading from "../../components/Loading";
import { GetSubject as Subject } from "../../Redux/store/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { Footer } from "../../components/Footer";

const MyCourse = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const BASEURL = import.meta.env.VITE_API_URL_USERS;
  const BASEURLCART = import.meta.env.VITE_API_URL_CART_USER;
  const accessToken = window.sessionStorage.getItem("accessToken");
  const { isAuthenticated, userPhone } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const HandlesubjectClick = (board) => {
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

  const getData = async () => {
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
      setData(response.data);
    } catch (error) {
      setError(true);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
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
              onClick={getData}
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
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 sm:pt-20 sm:pb-20 sm:px-20">
        <h1 className="text-3xl font-Montserrat text-center font-bold mb-8 bg-blue-600 text-white py-3 rounded-lg shadow-lg">
          My Courses
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-5">
          {data && data.length > 0 ? (
            data.map((board, index) => (
              <div key={index} className="flex flex-col">
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
                  <div
                    className="cursor-pointer flex flex-col gap-1 sm:gap-2 items-start"
                    onClick={() => HandlesubjectClick(board)}
                  >
                    <span className="font-bold text-gray-800 text-sm">
                      Subject:
                      <span className="text-indigo-600 ml-1">
                        {board.subject_name || "Untitled Subject"}
                      </span>
                    </span>
                    <span className="font-bold text-gray-800 text-sm">
                      Class:
                      <span className="text-indigo-600 ml-1">
                        {board.class_name || "Untitled Class"}
                      </span>
                    </span>
                    <span className="font-bold text-gray-800 text-sm">
                      Board:
                      <span className="text-indigo-600 ml-1">
                        {board.board_name || "Untitled Board"}
                      </span>
                    </span>
                  </div>

                  <div className="mt-4 flex justify-center gap-2"></div>
                </div>
              </div>
            ))
          ) : (
            <>
              <p className="text-center col-span-full text-gray-500">
                You have not purchased any Course.
              </p>
              <Link
                to="/GetBoard"
                className="text-center col-span-full text-blue-500 hover:underline"
              >
                Buy Here
              </Link>
            </>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default MyCourse;
