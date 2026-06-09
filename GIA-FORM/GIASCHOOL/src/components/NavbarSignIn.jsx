import React, { useState, useEffect } from "react";
import image from "../Images/logoImage.jpeg";
import userImage from "../Images/dummy-user.jpg"
import { CiHeart } from "react-icons/ci";
import { FaShoppingCart } from "react-icons/fa";
import { HiOutlineMenuAlt3, HiOutlineX } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../Redux/store/authSlice"; // Adjust the path to your authSlice file
import axios from "axios";

const NavbarSignIn = () => {
  const BASEURL = import.meta.env.VITE_API_URL_USERS;
  const accessToken = window.sessionStorage.getItem("accessToken");
  const { isAuthenticated, userPhone } = useSelector((state) => state.auth);
  const dispatch = useDispatch(); // Hook to dispatch Redux actions
  const navigate = useNavigate();
  const [userData, setuserData] = useState(null);
  let name = userPhone?.user?.name || "Guest";

  // Extract the first and last character, then convert to uppercase
  let firstChar = name.charAt(0).toUpperCase();
  let lastChar = name.charAt(name.length - 1).toUpperCase();

  // Concatenate them to form the logo
  let logo = firstChar + lastChar;

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      if (!isAuthenticated) return;

      try {
        const response = await axios.get(
          `${BASEURL}/data/getclass_users?user_id=${userPhone.user.empid}`,
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        );
        setuserData(response.data[0]); // Adjust according to actual data structure
      } catch (error) {
        console.error("Failed to fetch user data:", error);
        // setError(true);
        console.error(error);
      }
    };

    fetchUserData();
  }, [userPhone.user.empid, accessToken, isAuthenticated]);

  useEffect(() => {
    if (isDropdownOpen) {
      const timer = setTimeout(() => {
        setIsDropdownOpen(false);
      }, 2000); // Close dropdown after 2 seconds

      return () => clearTimeout(timer); // Cleanup timer if the component unmounts or dropdown state changes
    }
  }, [isDropdownOpen]);

  const handleLogout = () => {
    dispatch(logout()); // Dispatch the logout action
    window.sessionStorage.removeItem("accessToken");
    navigate("/");
    console.log("User logged out");
  };

  const handleUpdate = () => {
    navigate("/Profile");
  };
  return (
    <nav className="relative bg-white shadow-md h-[10vh] px-6 flex items-center justify-between">
      {/* Logo Section */}
      <div className="flex items-center">
        <img src={image} alt="Logo" className="h-[25vh] w-auto" />
      </div>

      {/* Hamburger Menu for Mobile/Tablet */}
      <div className="lg:hidden flex items-center">
        {!isMenuOpen ? (
          <HiOutlineMenuAlt3
            className="text-3xl cursor-pointer"
            onClick={toggleMenu}
          />
        ) : (
          <HiOutlineX
            className="text-3xl cursor-pointer"
            onClick={toggleMenu}
          />
        )}
      </div>

      {/* Navigation Links */}
      <div className="hidden lg:flex items-center space-x-6 text-lg">
        <Link to="/" className="hover:text-gray-700">
          Home
        </Link>
        <Link to="/GetBoard" className="hover:text-gray-700">
          Boards
        </Link>
        <Link to="/MyCourse" className="hover:text-gray-700">
          My Courses
        </Link>
        <Link to="/Favourite" className="hover:text-gray-700">
          <CiHeart className="text-2xl" />
        </Link>
        <Link to="/CartScreen" className="hover:text-gray-700">
          <FaShoppingCart className="text-2xl" />
        </Link>

        {/* Logo with Dropdown */}
        <div className="relative">
          <img
            src={
              userData && userData.profile_image
                ? userData.profile_image
                : userImage
            }
            alt="Profile"
            className="w-10 h-10 rounded-full cursor-pointer"
            onClick={toggleDropdown}
          />
          {isDropdownOpen && (
            <div className="absolute top-full right-0 mt-2 w-40 bg-gray-50 border border-gray-300 rounded shadow-lg flex flex-col">
              <button
                onClick={handleUpdate}
                className="px-4 py-2 text-left hover:bg-gray-200"
              >
                Update Profile
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-left hover:bg-gray-200"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile/Tablet Menu */}
      {isMenuOpen && (
        <div className="absolute top-0 right-0 w-1/2 bg-white z-50 flex flex-col items-center space-y-6 py-12 shadow-lg">
          <button
            className="absolute top-4 right-6 text-3xl focus:outline-none"
            onClick={toggleMenu}
          >
            <HiOutlineX />
          </button>
          <div className="relative w-full flex justify-center">
            <div
              className="w-10 h-10 flex items-center justify-center bg-blue-500 text-white rounded-full cursor-pointer"
              onClick={toggleDropdown}
            >
              {logo}
            </div>
            {isDropdownOpen && (
              <div className="absolute top-full mt-2 w-40 bg-gray-50 border border-gray-300 rounded shadow-lg flex flex-col">
                <button
                  onClick={handleUpdate}
                  className="px-4 py-2 text-left hover:bg-gray-200"
                >
                  Update Profile
                </button>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 text-left hover:bg-gray-200"
                >
                  Logout
                </button>
              </div>
            )}
          </div>

          <Link
            to="/"
            className="text-lg font-medium hover:text-gray-700"
            onClick={toggleMenu}
          >
            Home
          </Link>
          <Link
            to="/GetBoard"
            className="text-lg font-medium hover:text-gray-700"
            onClick={toggleMenu}
          >
            Boards
          </Link>
          <Link
            to="/MyCourse"
            className="text-lg font-medium hover:text-gray-700"
            onClick={toggleMenu}
          >
            My Courses
          </Link>
          <Link
            to="/Favourite"
            className="text-lg font-medium hover:text-gray-700"
            onClick={toggleMenu}
          >
            <CiHeart className="text-2xl" />
          </Link>
          <Link
            to="/CartScreen"
            className="text-lg font-medium hover:text-gray-700"
            onClick={toggleMenu}
          >
            <FaShoppingCart className="text-2xl" />
          </Link>
        </div>
      )}
    </nav>
  );
};

export default NavbarSignIn;
