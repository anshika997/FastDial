import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import LabelledInput from "./LabelInput";
import { loginSuccess } from "../Redux/store/authSlice";
import signin from "../Images/pana.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash, faL } from "@fortawesome/free-solid-svg-icons";
import Navbar from "./Navbar";

export default function AuthForm({ type }) {
  const BASEURL = import.meta.env.VITE_API_URL_USERS;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [postInputs, setPostInputs] = useState({
    user_name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function senRequest() {
    setLoading(true);
    try {
      console.log(postInputs);
      const response = await axios.post(
        `${BASEURL}/login/${type === "signup" ? "signup" : "request"}`,
        postInputs
      );
      if (type === "signup") {
        alert("Successfully signed up");
        navigate("/signin");
      } else {
        alert("Logged in Successfully");
        window.sessionStorage.setItem("accessToken", response.data.accessToken);
        console.log(response.data);
        dispatch(loginSuccess(response.data));
        navigate("/GetBoard");
      }
    } catch (error) {
      if (type === "signup") {
        alert("Failed to sign-up, Please try again later!!");
      } else {
        alert("Failed to sign-in, Please try again later!!");
      }
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  const showPasswordButton = () => {
    setShowPassword(!showPassword);
  };

  function handleChange(e) {
    const { name, value } = e.target;
    if (name) {
      // This check ensures that the name is not empty
      setPostInputs((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  }

  return (
    <>
      {/* <nav className="flex justify-between items-center  min-h-[10vh] px-5">
        <h1 className="text-lg font-bold">GIA SCHOOL</h1>
        <div className="space-x-4">
          <button
            className="text-blue-500 hover:text-blue-700 underline"
            onClick={() => navigate("/ServiceProviderLogin")}
          >
            Become a Service Provider
          </button>
          <button
            className="text-gray-600 hover:text-gray-900 underline"
            onClick={() => navigate("/AdminLogin")}
          >
            Admin Login
          </button>
        </div>
      </nav> */}
      <Navbar />
      <div className="flex flex-col md:flex-row items-center justify-center md:justify-around h-screen bg-gray-100 p-4">
        <img
          src={signin}
          alt=""
          className="hidden md:block h-[70vh] object-contain"
        />
        <div className="p-6 md:p-8 w-full max-w-md">
          <h3 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-6">
            {type === "signup"
              ? "Sign up to Experience Pavillion"
              : "Sign in to Experience Pavillion"}
          </h3>
          {type === "signup" && (
            <LabelledInput
              type="text"
              name="user_name"
              placeholder="Enter your Name"
              value={postInputs.user_name}
              onChange={handleChange}
              className="mb-4"
            />
          )}
          <LabelledInput
            type="email"
            name="email"
            placeholder="Enter your Email"
            value={postInputs.email}
            onChange={handleChange}
            className="mb-4"
          />
          <div className="relative mb-4 w-full">
            <LabelledInput
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter your Password"
              value={postInputs.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-12"
            />
            <FontAwesomeIcon
              className="absolute top-1/2 right-2 md:right-4 transform -translate-y-1/2 text-gray-500 cursor-pointer"
              onClick={showPasswordButton}
              icon={showPassword ? faEyeSlash : faEye}
            />
          </div>

          <button
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg shadow-md transition-transform transform hover:scale-105"
            onClick={senRequest}
          >
            {type === "signup" ? "Create an Account" : "Sign In"}
          </button>
          <div className="text-center text-gray-600 mt-4">
            {type === "signin"
              ? "Don't have an account?"
              : "Already have an account?"}
            <Link
              to={type === "signin" ? "/signup" : "/signin"}
              className="text-blue-600 hover:underline pl-1"
            >
              {type === "signin" ? "Sign Up" : "Sign In"}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
