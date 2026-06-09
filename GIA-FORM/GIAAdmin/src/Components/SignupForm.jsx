import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import signin from "../images/signin.svg";
import { useDispatch, useSelector } from "react-redux";
import LabelledInput from "./LabelInput";
import { loginSuccess } from "../Redux/store/authSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
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
      const response = await axios.post(
        `${BASEURL}/login/${type === "signup" ? "signup" : "request"}`,
        postInputs
      );
      window.sessionStorage.setItem("accessToken", response.data.accessToken);
      dispatch(loginSuccess(response.data));
      navigate("/Dashboard");
    } catch (error) {
      console.error("Error response:", error.response);
      if (error.response) {
        const errorMessage = error.response.data.message || error.response.data.error || error.response.data.err;

        if (errorMessage.includes("Invalid email address")) {
          alert("Invalid email address. Please check and try again.");
        } else if (errorMessage.includes("Invalid email or password")) {
          alert("Invalid email or password. Please try again.");
        } else if (errorMessage.includes("Something went very wrong")) {
          alert("Something went very wrong. Please try again later.");
        } else {
          alert("Something went wrong. Please check your inputs and try again.");
        }
      } else {
        alert("Unable to connect to the server. Please try again later.");
      }
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
      setPostInputs((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  }

  return (
    <>
      <Navbar />
      <div className="flex flex-col md:flex-row items-center justify-around h-[80vh] bg-gray-100">
        <img src={signin} alt="" className="h-[80vh] object-fit" />
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md md:w-1/2">
          <h3 className="font-bold text-center sm:text-2xl md:text-3xl mb-3">
            {type === "signup" ? "Create an Account" : "Login to your account"}
          </h3>
          {type === "signup" ? (
            <LabelledInput
              type="text"
              name="user_name"
              placeholder="Enter your Name"
              value={postInputs.user_name}
              onChange={handleChange}
            />
          ) : null}

          <LabelledInput
            type="email"
            name="email"
            value={postInputs.email}
            placeholder="Enter your Email"
            onChange={handleChange}
          />
          <div className="relative mb-4">
            <LabelledInput
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter your Password"
              value={postInputs.password}
              onChange={handleChange}
              className="w-full pr-10"
            />
            <FontAwesomeIcon
              onClick={showPasswordButton}
              icon={showPassword ? faEyeSlash : faEye}
              className="absolute top-1/2 right-3 transform -translate-y-4 text-black-500 cursor-pointer"
            />
          </div>
          <div className="mt-2.5">
            <button
              className="w-full bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-lg shadow-md transition-transform transform hover:scale-105"
              onClick={senRequest}
            >
              {type === "signup" ? "Sign Up" : "Sign In"}
            </button>
          </div>
          <div className="text-dark-400 mt-2">
            {type === "signin"
              ? "Don't have an account?"
              : "Already have an account"}
            <Link
              to={type === "signin" ? "/signup" : "/signin"}
              className="pl-2 underline"
            >
              {type === "signin" ? "Sign Up" : "Sign In"}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
