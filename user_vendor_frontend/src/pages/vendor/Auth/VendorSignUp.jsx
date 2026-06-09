import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { vendorSignupRequest } from "../../../saga/features/vendor/vendorSlice";
import { vendorVerifyEmailOtpAPI, vendorResendEmailOtpAPI } from "../../../saga/services/vendorAPI";
import fastdialLogo from "../../../assets/Logo.svg";
import workman from "../../../assets/Workman.png";

const SignUp = () => {
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { signupLoading, signupError } = useSelector((state) => state.vendor);

  const vendorData = location.state || {};

  // OTP state
  const [showOtpStep, setShowOtpStep] = useState(vendorData.fromLoginUnverified || false);
  const [pendingEmail, setPendingEmail] = useState(vendorData.email || "");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [resendTimer, setResendTimer] = useState(vendorData.fromLoginUnverified ? 60 : 0);
  const [otpLoading, setOtpLoading] = useState(false);
  const [otpError, setOtpError] = useState("");
  const [resendLoading, setResendLoading] = useState(false);
  const [resendSuccess, setResendSuccess] = useState(false);
  const otpInputRefs = useRef([]);

  // Countdown timer
  useEffect(() => {
    if (resendTimer > 0) {
      const timerId = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timerId);
    }
  }, [resendTimer]);

  const handleSignUp = async (e) => {
    e.preventDefault();
    const signupData = {
      ...vendorData,
      vendor_password: password,
    };
    console.log("Dispatching signup data:", signupData);
    
    // Call signup API directly to catch response
    try {
      const api = (await import("../../../saga/services/api")).default;
      const response = await api.post("/vendors/signup", signupData);
      console.log("Signup response:", response.data);
      
      if (response.data.requiresVerification) {
        setPendingEmail(response.data.email);
        setShowOtpStep(true);
        setResendTimer(60);
      } else {
        navigate("/vendorlogin");
      }
    } catch (error) {
      console.error("Signup error:", error.response?.data || error.message);
      setOtpError(error.response?.data?.message || "Signup failed. Please try again.");
    }
  };

  const handleOtpChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
    if (value && index < 5) {
      otpInputRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpInputRefs.current[index - 1]?.focus();
    }
  };

  const handleOtpPaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    const newOtp = [...otp];
    for (let i = 0; i < 6; i++) {
      newOtp[i] = pasted[i] || "";
    }
    setOtp(newOtp);
    const focusIndex = Math.min(pasted.length, 5);
    otpInputRefs.current[focusIndex]?.focus();
  };

  const handleVerifyOtp = async () => {
    const otpString = otp.join("");
    if (otpString.length !== 6) return;
    setOtpLoading(true);
    setOtpError("");
    try {
      const result = await vendorVerifyEmailOtpAPI(pendingEmail, otpString);
      console.log("OTP verify result:", result);
      if (result.token) {
        localStorage.setItem("vendorToken", result.token);
        localStorage.setItem("vendorId", String(result.vendor?.id));
        navigate("/vendordashboard");
      } else {
        navigate("/vendorlogin");
      }
    } catch (error) {
      console.error("OTP verify error:", error);
      setOtpError(error.response?.data?.message || "Invalid OTP. Please try again.");
    } finally {
      setOtpLoading(false);
    }
  };

  const handleResendOtp = async () => {
    if (resendTimer > 0) return;
    setResendLoading(true);
    setResendSuccess(false);
    try {
      await vendorResendEmailOtpAPI(pendingEmail);
      setResendSuccess(true);
      setResendTimer(60);
      setTimeout(() => setResendSuccess(false), 3000);
    } catch (error) {
      setOtpError(error.response?.data?.message || "Failed to resend OTP");
    } finally {
      setResendLoading(false);
    }
  };

  const otpString = otp.join("");

  return (
    <>
      <style>{`
        .click-scale {
          transition: transform 0.2s ease-in-out;
        }
        .click-scale:active {
          transform: scale(0.95);
        }
        @media (max-width: 640px) {
          .image-section {
            display: none;
          }
          .form-section {
            width: 100%;
          }
        }
      `}</style>
      <div className="flex flex-col sm:flex-row h-screen">
        <div className="image-section w-full sm:w-1/2 h-48 sm:h-full overflow-hidden" style={{ backgroundColor: "#7AACFF" }}>
          <img src={workman} alt="Construction Worker" className="w-full h-full object-cover" />
        </div>
        <div className="form-section w-full sm:w-1/2 flex items-center justify-center" style={{ backgroundColor: "#7AACFF" }}>
          <div className="w-[90%] max-w-md p-4 sm:p-6 md:p-8">
            <div className="flex justify-center mb-4 sm:mb-6">
              <img src={fastdialLogo} alt="Fastdial Logo" className="h-12 sm:h-14" />
            </div>

            {/* =================== OTP VERIFICATION STEP =================== */}
            {showOtpStep ? (
              <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg">
                <div className="text-center mb-4">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h2 className="text-xl font-bold text-gray-800">Verify Your Email</h2>
                  <p className="text-gray-400 text-sm mt-1">We've sent a 6-digit code to</p>
                  <p className="text-blue-500 font-medium text-sm">{pendingEmail}</p>
                </div>

                {otpError && (
                  <p className="text-red-500 text-xs bg-red-50 p-2 rounded text-center mb-3">{otpError}</p>
                )}
                {resendSuccess && (
                  <p className="text-green-500 text-xs bg-green-50 p-2 rounded text-center mb-3">✓ OTP resent successfully!</p>
                )}

                {/* OTP Input Boxes */}
                <div className="flex justify-center gap-2 mb-4">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      ref={(el) => (otpInputRefs.current[index] = el)}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      onKeyDown={(e) => handleOtpKeyDown(index, e)}
                      onPaste={index === 0 ? handleOtpPaste : undefined}
                      className="w-10 h-12 border-2 rounded-lg text-center text-xl font-bold 
                        outline-none transition-all duration-200
                        focus:border-blue-500 focus:ring-2 focus:ring-blue-200
                        bg-gray-50 hover:bg-white"
                      autoFocus={index === 0}
                    />
                  ))}
                </div>

                <button
                  className={`w-full text-white py-2 rounded-lg transition duration-300 click-scale text-sm sm:text-base ${
                    (otpString.length !== 6 || otpLoading) ? "opacity-50 cursor-not-allowed" : "hover:bg-[#7AACFF]"
                  }`}
                  style={{ backgroundColor: "#4285F4" }}
                  onClick={handleVerifyOtp}
                  disabled={otpString.length !== 6 || otpLoading}
                >
                  {otpLoading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Verifying...
                    </span>
                  ) : "Verify Email"}
                </button>

                <div className="text-center mt-3">
                  <p className="text-gray-500 text-xs">
                    Didn't receive the code?{" "}
                    {resendTimer > 0 ? (
                      <span className="text-gray-400">
                        Resend in <span className="font-bold text-blue-500">{resendTimer}s</span>
                      </span>
                    ) : (
                      <button
                        className="text-blue-500 font-medium hover:underline disabled:opacity-50"
                        onClick={handleResendOtp}
                        disabled={resendLoading}
                      >
                        {resendLoading ? "Sending..." : "Resend OTP"}
                      </button>
                    )}
                  </p>
                </div>
              </div>
            ) : (
              /* =================== SIGNUP FORM =================== */
              <>
                <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-2">Sign Up</h2>
                <p className="text-center text-white text-sm sm:text-base mb-4 sm:mb-6">Complete your signup with Quick Serve</p>
                
                {otpError && (
                  <p className="text-red-200 text-xs bg-red-500 bg-opacity-30 p-2 rounded text-center mb-3">{otpError}</p>
                )}

                <form className="bg-white p-4 sm:p-6 rounded-lg shadow-lg" onSubmit={handleSignUp}>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Name</label>
                    <input
                      type="text"
                      value={vendorData.vendor_name || ""}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-sm sm:text-base"
                      disabled
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Mobile Number</label>
                    <input
                      type="tel"
                      value={vendorData.vendor_mobile || ""}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-sm sm:text-base"
                      disabled
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                    <input
                      type="email"
                      value={vendorData.vendor_email || ""}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-sm sm:text-base"
                      disabled
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                      New Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm sm:text-base"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full text-white py-2 rounded-lg hover:bg-[#7AACFF] transition duration-300 click-scale text-sm sm:text-base"
                    style={{ backgroundColor: "#4285F4" }}
                  >
                    Sign Up
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;