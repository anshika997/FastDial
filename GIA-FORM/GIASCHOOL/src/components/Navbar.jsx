import { useState } from "react";
import { Link } from "react-router-dom";
import image from "../Images/logoImage.jpeg";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Toggle the menu visibility
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="flex items-center justify-between bg-white h-[10vh] border-b-2 shadow-md px-4 md:px-8">
      {/* Logo */}
      <div className="flex items-center">
        <img src={image} alt="Logo" className="h-[25vh] w-auto" />
        {/* <h1 className="text-xl font-bold italic tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-green-500 ml-2">
          StudyNow
        </h1> */}
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex space-x-6">
        <ul className="flex space-x-6">
          <li>
            <Link
              to="/"
              className="text-black hover:text-yellow-500 font-bold text-lg"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/AllCourse"
              className="text-black hover:text-yellow-500 font-bold text-lg"
            >
              Course
            </Link>
          </li>
          <li>
            <Link
              to="#"
              className="text-black hover:text-yellow-500 font-bold text-lg"
            >
              Blog
            </Link>
          </li>
          <li>
            <Link
              to="#"
              className="text-black hover:text-yellow-500 font-bold text-lg"
            >
              Mentor
            </Link>
          </li>
          <li>
            <Link
              to="#"
              className="text-black hover:text-yellow-500 font-bold text-lg"
            >
              About Us
            </Link>
          </li>
        </ul>
      </div>

      {/* Login Links */}
      <div className="hidden md:flex space-x-6">
        <ul className="flex space-x-6">
          <li>
            <Link
              to="/signin"
              className="px-4 py-2 text-blue-600 rounded border border-blue-600 hover:bg-blue-600 hover:text-white font-medium text-lg transition duration-300 ease-in-out"
            >
              User Login
            </Link>
          </li>
          <li>
            <Link
              to="/AdminLoginNew"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-white hover:text-blue-600 hover:border border-blue-600 font-medium text-lg transition duration-300 ease-in-out"
            >
              Admin Login
            </Link>
          </li>
        </ul>
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden flex items-center ">
        <button onClick={toggleMenu} className="text-black focus:outline-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={
                isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"
              }
            />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-white shadow-md py-4 md:hidden">
          <ul className="space-y-4 text-center">
            <li>
              <Link
                to="/"
                className="text-black hover:text-yellow-500 font-bold text-lg"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/AllCourse"
                className="text-black hover:text-yellow-500 font-bold text-lg"
              >
                Course
              </Link>
            </li>
            <li>
              <a
                to="#"
                className="text-black hover:text-yellow-500 font-bold text-lg"
              >
                Blog
              </a>
            </li>
            <li>
              <a
                to="#"
                className="text-black hover:text-yellow-500 font-bold text-lg"
              >
                Mentor
              </a>
            </li>
            <li>
              <a
                to="#"
                className="text-black hover:text-yellow-500 font-bold text-lg"
              >
                About Us
              </a>
            </li>
            <li>
              <a
                to="/User/Login"
                className="text-black hover:text-yellow-500 font-bold text-lg"
              >
                User Login
              </a>
            </li>
            <li>
              <a
                to="/AdminLoginNew"
                className="text-black hover:text-yellow-500 font-bold text-lg"
              >
                Admin Login
              </a>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
