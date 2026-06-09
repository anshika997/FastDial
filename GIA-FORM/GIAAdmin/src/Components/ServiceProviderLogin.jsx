import React, { useState, useRef } from "react";
import axios from "axios";
import { IoArrowBackSharp } from "react-icons/io5";
import signin from "../images/signin.svg";
import { Link, useNavigate } from "react-router-dom";
import { loginSuccess } from "../Redux/store/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { FaEye } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash, faL } from "@fortawesome/free-solid-svg-icons";

export default function LandingPage() {
  const BASEURL = import.meta.env.VITE_API_URL_VENDOR;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [activeTab, setActiveTab] = useState("landing"); // landing, signup, signin, explore
  const [formData, setFormData] = useState({
    user_name: "",
    user_mobile: "",
  });
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [otp, setOtp] = useState("");
  const [showOtpScreen, setShowOtpScreen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [resendTimer, setResendTimer] = useState(30); // Timer for resend OTP
  const inputRefs = useRef([]);

  // Sign In User
  const loginUser = () => {
    if (!loginData.email || !loginData.password) {
      setError("All fields are required.");
      return;
    }

    setLoading(true);
    setError("");

    axios
      .post(`${BASEURL}/login/request`, loginData)
      .then((response) => {
        console.log("User logged in succesfully:", response);
        window.sessionStorage.setItem("accessToken", response.data.accessToken);
        alert("User logged in succesfully");
        dispatch(loginSuccess(response.data));
        navigate("/VendorDashboard");
      })
      .catch((error) => {
        console.error("Error", error);
        setError("Failed to login. Please try again.");
      })
      .finally(() => setLoading(false));
  };

  const [vendorFormData, setVendorFormData] = useState({
    vendor_number: "",
    password: "",
    vendor_name: "",
    vendor_email: "",
    email: "",
    vendor_bussiness_name: "",
    venndor_bussiness_address: "",
    vendor_aadhar_url: "",
    vendor_pan_url: "",
    vendor_registration_document_url: "",
  });
  const [files, setFiles] = useState({
    vendor_aadhar: null,
    vendor_pan: null,
    vendor_registration_document: null,
  });

  const businessTypes = [
    { value: "", label: "Select Business Type" },
    { value: "GST Registration", label: "GST Registration" },
    { value: "PAN Registration", label: "PAN Registration" },
    { value: "TAN Registration", label: "TAN Registration" },
    { value: "TDS Returns", label: "TDS Returns" },
    { value: "Legal Notice", label: "Legal Notice" },
    { value: "Sale Agreement", label: "Sale Agreement" },
    { value: "Sale Deed", label: "Sale Deed" },
    { value: "Affidavit Request", label: "Affidavit Request" },
  ];
  // Common field change handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (activeTab === "signup") {
      setFormData((prev) => ({ ...prev, [name]: value }));
    } else if (activeTab === "signin") {
      setLoginData((prev) => ({ ...prev, [name]: value }));
    } else if (activeTab === "vendor_signup") {
      setVendorFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Handle file selection
  const handleFileChange = (e) => {
    const { name, files: selectedFiles } = e.target;
    const file = selectedFiles[0];

    if (
      !file ||
      !["image/jpeg", "image/png", "application/pdf"].includes(file.type)
    ) {
      setError("Only JPG, PNG, and PDF files are allowed.");
      return;
    }
    setFiles((prev) => ({ ...prev, [name]: file }));
    setError("");
  };

  // Upload file and return URL
  const uploadFile = async (file) => {
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await axios.post(
        `https://experience-pavillion.com/api/v1/global/upload/file`,
        formData
      );
      return response.data; // Assuming the URL is in `response.data`
    } catch (error) {
      throw new Error("File upload failed. Please try again.");
    }
  };

  const switchTab = (tab) => {
    setActiveTab(tab);
    setError("");
  };

  const showPasswordButton = () => {
    setShowPassword(!showPassword);
  };

  // Vendor Signup
  const registerVendor = async () => {
    if (
      !vendorFormData.vendor_number ||
      !vendorFormData.password ||
      !vendorFormData.vendor_name ||
      vendorFormData.vendor_email ||
      !vendorFormData.email ||
      !vendorFormData.vendor_bussiness_name ||
      !vendorFormData.venndor_bussiness_address ||
      !files.vendor_aadhar ||
      !files.vendor_pan ||
      !files.vendor_registration_document
    ) {
      setError("All fields are required.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const vendor_aadhar_url = (await uploadFile(files.vendor_aadhar)).url;
      const vendor_pan_url = (await uploadFile(files.vendor_pan)).url;
      const vendor_registration_document_url = (
        await uploadFile(files.vendor_registration_document)
      ).url;

      const finalData = {
        ...vendorFormData,
        vendor_aadhar_url,
        vendor_pan_url,
        vendor_registration_document_url,
      };
      console.log(finalData);

      const response = await axios.post(
        `https://experience-pavillion.com/api/v1/vendors/login/signUp`,
        finalData
      );
      alert("Vendor registered successfully!");
      dispatch(loginSuccess(response.data));
      navigate("/VendorDashboard");
      console.log(response);

      setActiveTab("landing");
    } catch (error) {
      setError(
        error.response?.data?.message || "Signup failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };
  const previewFile = (file) => {
    if (file) {
      const fileURL = URL.createObjectURL(file); // Convert the File object to a URL
      window.open(fileURL, "_blank");
    } else {
      alert("No document available to preview!");
    }
  };
  return (
    <div>
      <nav className="flex justify-between items-center  min-h-[10vh] px-5">
        <h1 className="text-lg font-bold">GIA</h1>
        <div className="space-x-4">
          <button
            className="text-blue-500 hover:text-blue-700 underline"
            onClick={() => navigate("/Sign_in")}
          >
            Back
          </button>
          <button
            className="text-gray-600 hover:text-gray-900 underline"
            onClick={() => navigate("/about")}
          >
            About Us
          </button>
        </div>
      </nav>
      <div className="flex flex-col md:flex-row items-center justify-around h-[80vh] bg-gray-100">
        {" "}
        <div className="bg-white p-8 rounded-lg shadow-lg w-[50%]">
          {activeTab === "landing" && (
            <>
              <h1 className="text-2xl font-bold mb-6 text-center">
                Welcome To Service Provider Portal !
              </h1>
              <button
                className="w-full bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-lg shadow-md mb-4 transition-transform transform hover:scale-105"
                onClick={() => setActiveTab("signin")}
              >
                Sign In
              </button>
              <button
                className="w-full bg-green-900 hover:bg-green-600 text-white p-3 rounded-lg shadow-md mb-4 transition-transform transform hover:scale-105"
                onClick={() => setActiveTab("vendor_signup")}
              >
                Sign Up
              </button>
              <button
                className="w-full bg-purple-500 hover:bg-purple-600 text-white p-3 rounded-lg shadow-md transition-transform transform hover:scale-105"
                onClick={() => setActiveTab("signin")}
              >
                Explore Our Services
              </button>
            </>
          )}

          {activeTab === "signin" && (
            <>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">
                  {activeTab === "signup" ? "Sign Up" : "Sign In"}
                </h2>
                <button
                  className="text-blue-500 hover:underline"
                  onClick={() => setActiveTab("landing")}
                >
                  <IoArrowBackSharp />
                </button>
              </div>

              <input
                type="email"
                name="email"
                placeholder="Enter your mobile number"
                className="w-full p-2 mb-4 border rounded-lg"
                value={
                  activeTab === "signup"
                    ? formData.user_mobile
                    : loginData.user_mobile
                }
                onChange={handleChange}
              />
              <input
                type="password"
                name="password"
                placeholder="Enter your mobile number"
                className="w-full p-2 mb-4 border rounded-lg"
                value={loginData.password}
                onChange={handleChange}
              />
              <FontAwesomeIcon
                style={{
                  position: "absolute",
                  cursor: "pointer",
                  top: "49%",
                  right: "28%",
                }}
                onClick={showPasswordButton}
                icon={showPassword ? faEyeSlash : faEye}
              />
              <button
                className="w-full bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-lg shadow-md transition-transform transform hover:scale-105"
                onClick={loginUser}
                disabled={loading}
              >
                {loading ? "Logging in..." : "Sign In"}
              </button>
              <div className="mt-4 text-center">
                <button
                  onClick={() => switchTab("vendor_signup")}
                  className="text-blue-700 hover:underline"
                >
                  New User? Please register.
                </button>
              </div>
            </>
          )}

          {activeTab === "vendor_signup" && (
            <div className="w-full">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold mb-4">Vendor Signup</h2>
                <button
                  className="text-blue-500 hover:underline"
                  onClick={() => setActiveTab("landing")}
                >
                  <IoArrowBackSharp />
                </button>
              </div>
              {error && <div className="text-red-500 mb-4">{error}</div>}
              <div className="lg:flex flex-wrap justify-between">
                <input
                  type="text"
                  name="vendor_name"
                  placeholder="Vendor Name"
                  className="w-[45%] p-2 border rounded mb-4"
                  value={vendorFormData.vendor_name}
                  onChange={handleChange}
                />{" "}
                <input
                  type="number"
                  name="vendor_number"
                  placeholder="Vendor Number"
                  className="w-[45%] p-2 border rounded mb-4"
                  value={vendorFormData.vendor_number}
                  onChange={handleChange}
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Vendor Email"
                  className="w-[45%] p-2 border rounded mb-4"
                  value={vendorFormData.email}
                  onChange={handleChange}
                />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Vendor Password"
                  className="w-[45%] p-2 border rounded mb-4"
                  value={vendorFormData.password}
                  onChange={handleChange}
                />
                <select
                  name="vendor_bussiness_name"
                  className="w-[45%] p-2 border rounded mb-4"
                  value={vendorFormData.vendor_bussiness_name}
                  onChange={handleChange}
                >
                  {businessTypes.map((type, index) => (
                    <option key={index} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
                <input
                  type="text"
                  name="venndor_bussiness_address"
                  placeholder="Business Address"
                  className="w-[45%] p-2 border rounded mb-4"
                  value={vendorFormData.venndor_bussiness_address}
                  onChange={handleChange}
                />
                {/* File Inputs */}
                <div className="lg:flex justify-between w-full text-[12px]">
                  <label className="block mb-4">
                    Aadhar Document:
                    <input
                      type="file"
                      name="vendor_aadhar"
                      className="block w-full mt-1"
                      onChange={handleFileChange}
                    />
                    <button
                      type="button"
                      onClick={() => previewFile(files.vendor_aadhar)}
                      className="text-blue-500"
                    >
                      <FaEye />
                    </button>
                  </label>
                  <label className="block mb-4">
                    PAN Document:
                    <input
                      type="file"
                      name="vendor_pan"
                      className="block w-full mt-1"
                      onChange={handleFileChange}
                    />
                    <button
                      type="button"
                      onClick={() => previewFile(files.vendor_pan)}
                      className="text-blue-500"
                    >
                      <FaEye />
                    </button>
                  </label>
                  <label className="block mb-4">
                    Registration Document:
                    <input
                      type="file"
                      name="vendor_registration_document"
                      className="block w-full mt-1"
                      onChange={handleFileChange}
                    />
                    <button
                      type="button"
                      onClick={() =>
                        previewFile(files.vendor_registration_document)
                      }
                      className="text-blue-500"
                    >
                      <FaEye />
                    </button>
                  </label>
                </div>
                <button
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-lg shadow-md"
                  onClick={registerVendor}
                  disabled={loading}
                >
                  {loading ? "Submitting..." : "Submit"}
                </button>
              </div>
              <div className="mt-4 text-center">
                <button
                  onClick={() => switchTab("signin")}
                  className="text-blue-700 hover:underline"
                >
                  Already registered? Log in.
                </button>
              </div>
            </div>
          )}
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
