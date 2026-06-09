import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signupRequest, verifyOtpRequest, resendOtpRequest, clearOtpState } from '../../../saga/features/customer/customerSlice';
import LoginImage from "../../../assets/cuate.png";

const SignupModal = ({ isOpen, onClose, onOpenLoginModal }) => {
  const dispatch = useDispatch();
  const { 
    signupLoading, signupError, isAuthenticated,
    pendingVerificationEmail, otpVerifyLoading, otpVerifyError,
    otpResendLoading, otpResendSuccess
  } = useSelector((state) => state.customer);
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [localError, setLocalError] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  
  // OTP state
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [resendTimer, setResendTimer] = useState(0);
  const otpInputRefs = useRef([]);

  // Countdown timer for resend button
  useEffect(() => {
    if (resendTimer > 0) {
      const timerId = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timerId);
    }
  }, [resendTimer]);

  // Start timer when entering OTP step
  useEffect(() => {
    if (pendingVerificationEmail) {
      setResendTimer(60);
    }
  }, [pendingVerificationEmail]);

  // Clear resend success message after 3 seconds
  useEffect(() => {
    if (otpResendSuccess) {
      setResendTimer(60);
    }
  }, [otpResendSuccess]);

  const handleSignup = () => {
    setLocalError('');

    if (!name || !email || !mobile || !password) {
      setLocalError('Please fill all required fields');
      return;
    }

    if (mobile.length !== 10 || !/^\d+$/.test(mobile)) {
      setLocalError('Mobile number must be exactly 10 digits');
      return;
    }

    if (password.length < 6) {
      setLocalError('Password must be at least 6 characters');
      return;
    }

    if (password !== confirmPassword) {
      setLocalError('Passwords do not match');
      return;
    }

    dispatch(signupRequest({ customer_name: name, customer_email: email, mobile, password }));
  };

  const handleOtpChange = (index, value) => {
    if (!/^\d*$/.test(value)) return; // Only digits

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1); // Only last character
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      otpInputRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpInputRefs.current[index - 1]?.focus();
    }
  };

  const handleOtpPaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    const newOtp = [...otp];
    for (let i = 0; i < 6; i++) {
      newOtp[i] = pasted[i] || '';
    }
    setOtp(newOtp);
    // Focus last filled input or the next empty one
    const focusIndex = Math.min(pasted.length, 5);
    otpInputRefs.current[focusIndex]?.focus();
  };

  const handleVerifyOtp = () => {
    const otpString = otp.join('');
    if (otpString.length !== 6) return;
    dispatch(verifyOtpRequest({ customer_email: pendingVerificationEmail, otp: otpString }));
  };

  const handleResendOtp = () => {
    if (resendTimer > 0) return;
    dispatch(resendOtpRequest({ customer_email: pendingVerificationEmail }));
  };

  const handleClose = () => {
    dispatch(clearOtpState());
    setOtp(['', '', '', '', '', '']);
    setResendTimer(0);
    onClose();
  };

  // After successful verification (auto-login), redirect to home
  if (isAuthenticated && isOpen) {
    handleClose();
    window.location.href = '/home';
    return null;
  }

  if (!isOpen) return null;

  const otpString = otp.join('');
  const isOtpStep = !!pendingVerificationEmail;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-[90%] md:max-w-[780px] h-auto max-h-[90vh] flex flex-col md:flex-row relative">
        <button
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 text-lg md:text-xl z-10"
          onClick={handleClose}
        >
          ×
        </button>
        <div className="w-full md:w-1/2 bg-blue-100 flex justify-center items-center p-4 md:p-6">
          <img src={LoginImage} alt="Sign Up" className="w-full h-auto object-cover max-h-[250px] md:max-h-[500px]" />
        </div>
        <div className="p-4 md:p-6 flex flex-col justify-center gap-3 md:gap-4 w-full overflow-y-auto">
          
          {/* =================== OTP VERIFICATION STEP =================== */}
          {isOtpStep ? (
            <>
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-gray-800">Verify Your Email</h2>
                <p className="text-gray-400 text-xs md:text-sm mt-1">
                  We've sent a 6-digit code to
                </p>
                <p className="text-blue-500 font-medium text-sm">{pendingVerificationEmail}</p>
              </div>

              {otpVerifyError && (
                <p className="text-red-500 text-xs md:text-sm bg-red-50 p-2 rounded text-center">
                  {otpVerifyError}
                </p>
              )}

              {otpResendSuccess && (
                <p className="text-green-500 text-xs md:text-sm bg-green-50 p-2 rounded text-center">
                  ✓ OTP resent successfully!
                </p>
              )}

              {/* OTP Input Boxes */}
              <div className="flex justify-center gap-2 md:gap-3 my-2">
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
                    className="w-10 h-12 md:w-12 md:h-14 border-2 rounded-lg text-center text-xl font-bold 
                      outline-none transition-all duration-200
                      focus:border-blue-500 focus:ring-2 focus:ring-blue-200
                      bg-gray-50 hover:bg-white"
                    autoFocus={index === 0}
                  />
                ))}
              </div>

              {/* Verify Button */}
              <button
                className={`bg-blue-500 text-white py-2 md:py-3 rounded-md w-full text-base md:text-lg font-semibold 
                  hover:bg-blue-600 transition ${
                  (otpString.length !== 6 || otpVerifyLoading) ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                onClick={handleVerifyOtp}
                disabled={otpString.length !== 6 || otpVerifyLoading}
              >
                {otpVerifyLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Verifying...
                  </span>
                ) : 'Verify Email'}
              </button>

              {/* Resend OTP */}
              <div className="text-center">
                <p className="text-gray-500 text-xs md:text-sm">
                  Didn't receive the code?{' '}
                  {resendTimer > 0 ? (
                    <span className="text-gray-400">
                      Resend in <span className="font-bold text-blue-500">{resendTimer}s</span>
                    </span>
                  ) : (
                    <button
                      className="text-blue-500 font-medium hover:underline disabled:opacity-50"
                      onClick={handleResendOtp}
                      disabled={otpResendLoading}
                    >
                      {otpResendLoading ? 'Sending...' : 'Resend OTP'}
                    </button>
                  )}
                </p>
              </div>

              {/* Back to signup */}
              <p className="text-center text-gray-400 text-xs mt-1">
                <span 
                  className="text-blue-500 cursor-pointer hover:underline"
                  onClick={() => dispatch(clearOtpState())}
                >
                  ← Back to Sign Up
                </span>
              </p>
            </>
          ) : (
            /* =================== SIGNUP FORM STEP =================== */
            <>
              <h2 className="text-xl md:text-2xl font-bold text-gray-800">Create Account</h2>
              <p className="text-gray-400 text-xs md:text-sm">Sign up to get started</p>

              {(localError || signupError) && (
                <p className="text-red-500 text-xs md:text-sm bg-red-50 p-2 rounded">
                  {localError || signupError}
                </p>
              )}
              {signupLoading && <p className="text-blue-500 text-xs md:text-sm">Creating account...</p>}

              <div className="space-y-3">
                <div>
                  <label className="text-gray-600 text-sm font-medium">Name <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    placeholder="Enter your full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full border p-2 rounded-md mt-1 bg-gray-50 outline-none text-sm focus:ring-2 focus:ring-blue-400"
                  />
                </div>
                <div>
                  <label className="text-gray-600 text-sm font-medium">Email <span className="text-red-500">*</span></label>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border p-2 rounded-md mt-1 bg-gray-50 outline-none text-sm focus:ring-2 focus:ring-blue-400"
                  />
                </div>
                <div>
                  <label className="text-gray-600 text-sm font-medium">Phone Number <span className="text-red-500">*</span></label>
                  <div className="flex items-center border rounded-md mt-1 bg-gray-50">
                    <span className="text-gray-500 font-medium text-sm px-3">+91</span>
                    <input
                      type="tel"
                      placeholder="Mobile Number"
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value.replace(/\D/g, ''))}
                      className="w-full p-2 bg-transparent outline-none text-sm"
                      maxLength={10}
                    />
                  </div>
                </div>
                <div>
                  <label className="text-gray-600 text-sm font-medium">Password <span className="text-red-500">*</span></label>
                  <input
                    type="password"
                    placeholder="Create a password (min 6 chars)"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full border p-2 rounded-md mt-1 bg-gray-50 outline-none text-sm focus:ring-2 focus:ring-blue-400"
                  />
                </div>
                <div>
                  <label className="text-gray-600 text-sm font-medium">Confirm Password <span className="text-red-500">*</span></label>
                  <input
                    type="password"
                    placeholder="Re-enter your password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full border p-2 rounded-md mt-1 bg-gray-50 outline-none text-sm focus:ring-2 focus:ring-blue-400"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 md:gap-3">
                <input 
                  type="checkbox" 
                  id="signup-terms" 
                  className="w-4 h-4"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                />
                <label htmlFor="signup-terms" className="text-gray-600 text-xs md:text-sm">
                  <a href="/T&C" target="_blank" rel="noopener noreferrer">
                    Agree with our <span className="text-blue-500 cursor-pointer">Terms & Conditions</span>
                  </a>
                </label>
              </div>

              <button
                className={`bg-blue-500 text-white py-2 md:py-3 rounded-md w-full text-base md:text-lg font-semibold hover:bg-blue-600 transition ${
                  (!name || !email || !mobile || !password || !agreeTerms || signupLoading) ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                onClick={handleSignup}
                disabled={!name || !email || !mobile || !password || !agreeTerms || signupLoading}
              >
                {signupLoading ? 'Creating Account...' : 'Sign Up'}
              </button>

              <p className="text-center text-gray-500 text-xs md:text-sm">
                Already have an account?{' '}
                <span
                  className="text-blue-500 cursor-pointer hover:underline font-medium"
                  onClick={() => {
                    handleClose();
                    onOpenLoginModal();
                  }}
                >
                  Login
                </span>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignupModal;
