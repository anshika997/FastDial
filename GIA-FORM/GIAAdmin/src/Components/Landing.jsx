import React, { useState, useRef } from "react";
import axios from "axios";
import { IoArrowBackSharp } from "react-icons/io5";
import signin from "../images/signin.svg";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess } from "../Redux/store/authSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash, faL } from "@fortawesome/free-solid-svg-icons";
import Navbar from "./Navbar";

export default function LandingPage() {
  const BASEURL = import.meta.env.VITE_API_URL_ADMIN;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
  };

  const PasswordShow = () => {
    setShowPassword((showPassword) => !showPassword);
  };
  // Sign In User
  const loginUser = () => {
    setLoading(true);
    setError("");

    axios
      .post(`${BASEURL}/login/request`, loginData)
      .then((response) => {
        window.sessionStorage.setItem("accessToken", response.data.accessToken);
        dispatch(loginSuccess(response.data));
        console.log("Login Successfully", response);
        navigate("/AdminDashboad");
      })
      .catch((error) => {
        console.error("Login failed:", error);
        setError("Failed to login. Please try again.");
      })
      .finally(() => setLoading(false));
  };

  return (
    <div>
      <Navbar />
      <div className="relative flex flex-col md:flex-row-reverse items-center justify-center h-screen bg-cover bg-center bg-gray-100">
        {/* <img
          src={image}
          alt="Landing Page"
          className="w-full md:w-1/2 h-[60vh] md:h-[80vh] "
        /> */}
        <img src={signin} alt="" className="h-[80vh] object-fit" />

        <div className="relative z-10 text-center text-black px-4  mb-50 md:px-8">
          <h1 className="text-2xl md:text-4xl lg:text-4xl font-bold mb-4 md:mb-4">
            Study Smarter
          </h1>
          <h1 className="text-2xl md:text-4xl lg:text-4xl font-bold  ml-52 md:mb-2">
            Dream Bigger
          </h1>
          <h1 className="text-2xl md:text-4xl lg:text-4xl font-bold mb-4 mr-16 md:mb-1">
            Achieve More!
          </h1>
          <h1 className="text-sm md:text-base lg:text-lg font-medium mb-4">
            Building the Foundation for Future Success!
          </h1>

          {/* <button
            onClick={() => {
              navigate("/FormRenderer");
            }}
            className="bg-white text-black mt-4 font-extrabold rounded-3xl py-2 px-4 md:py-3 md:px-6 transition duration-300 ease-in-out hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-50 border shadow-xl hover:shadow-2xl"
          >
            Dynamic Forms
          </button> */}
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full bg-gray-200 py-4 min-h-[10vh]">
        <div className="flex justify-center space-x-6 text-sm">
          <a
            href="https://flutterflirt.com/testimonial.html"
            className="text-blue-500 hover:underline"
          >
            Designed By FLUTTER FLIRT
          </a>
          <a href="/contact" className="text-blue-500 hover:underline">
            Contact Us
          </a>
          <a href="/privacy" className="text-blue-500 hover:underline">
            Privacy Policy
          </a>
        </div>
      </footer>
    </div>
  );
}
