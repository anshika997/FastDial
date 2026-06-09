import React, { useState } from "react";
import axios from "axios";
import { IoArrowBackSharp } from "react-icons/io5";
import signin from "../images/signin.svg";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../Redux/store/authSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

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
        let alertMessage = "Something went wrong. Please try again.";

        if (error.response) {
          const errorMessage =
            error.response.data.message ||
            error.response.data.error ||
            error.response.data.err;

          if (errorMessage.includes("Invalid email address")) {
            alertMessage = "Invalid email address. Please check and try again.";
          } else if (errorMessage.includes("Invalid email or password")) {
            alertMessage = "Invalid email or password. Please try again.";
          } else if (errorMessage.includes("Something went very wrong")) {
            alertMessage = "Something went very wrong. Please try again later.";
          }
        } else {
          alertMessage =
            "Unable to connect to the server. Please try again later.";
        }

        alert(alertMessage); // Display alert box
      })
      .finally(() => setLoading(false));
  };
  return (
    <div>
      <Navbar />
      <div className="flex flex-col md:flex-row items-center justify-around h-[80vh] bg-gray-100">
        <img src={signin} alt="" className="h-[80vh] object-fit" />
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md md:w-1/2">
          <h3 className="font-bold text-center text-lg md:text-xl lg:text-2xl whitespace-nowrap mb-3">
            Sign In to Your Admin Account
          </h3>

          {error && (
            <div className="text-red-500 mb-4 text-center">
              <strong>{error}</strong>
            </div>
          )}
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            className="w-full p-2 mb-4 border rounded-lg"
            value={loginData.email}
            onChange={handleChange}
          />
          <div className="relative mb-4">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter your password"
              className="w-full p-2 mb-4 border rounded-lg"
              value={loginData.password}
              onChange={handleChange}
            />
            <FontAwesomeIcon
              style={{
                position: "absolute",
                cursor: "pointer",
                right: "10%",
                top: "35%",
                transform: "translateY(-50%)",
              }}
              onClick={PasswordShow}
              icon={showPassword ? faEyeSlash : faEye}
            />
          </div>
          <button
            className="w-full bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-lg shadow-md transition-transform transform hover:scale-105"
            onClick={loginUser}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Sign In"}
          </button>
        </div>
      </div>
      {/* Footer */}
      <footer className="w-full bg-gray-200 py-4 min-h-[10vh]">
        <div className="flex justify-center space-x-6 text-sm">
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
