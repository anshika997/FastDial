import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginRequest } from '../../../saga/features/customer/customerSlice';
import LoginImage from "../../../assets/cuate.png";
import SignupModal from './SignupModal';

const LoginModal = ({ isOpen, onClose, onOpenSignupModal }) => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.customer);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);

  const handleLogin = () => {
    if (email && password && agreeTerms) {
      console.log('LoginModal: Submitting login:', { email });
      dispatch(loginRequest({ customer_email: email, password }));
    }
  };

  // After successful login, close modal
  const { isAuthenticated, newUser, pendingVerificationEmail } = useSelector((state) => state.customer);

  if (pendingVerificationEmail && isOpen) {
    onClose();
    onOpenSignupModal();
    return null;
  }

  if (isAuthenticated && isOpen) {
    onClose();
    if (!newUser) {
      window.location.href = '/home';
    }
    return null;
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-[90%] md:max-w-[780px] h-auto md:h-[70%] flex flex-col md:flex-row relative">
        <button
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 text-lg md:text-xl"
          onClick={onClose}
        >
          ×
        </button>
        <div className="w-full md:w-1/2 bg-blue-100 flex justify-center items-center p-4 md:p-6">
          <img src={LoginImage} alt="Login" className="w-full h-auto object-cover max-h-[300px] md:max-h-[500px]" />
        </div>
        <div className="p-4 md:p-6 flex flex-col justify-center gap-4 md:gap-5 w-full">
          <h2 className="text-xl md:text-2xl font-bold text-gray-800">Welcome back!</h2>
          <p className="text-gray-400 text-xs md:text-sm">Login to your account</p>

          {error && <p className="text-red-500 text-xs md:text-sm">Error: {error}</p>}
          {loading && <p className="text-blue-500 text-xs md:text-sm">Logging in...</p>}

          <div className="space-y-3">
            <div>
              <label className="text-gray-600 text-sm font-medium">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border p-2 md:p-3 rounded-md mt-1 bg-gray-50 outline-none text-sm md:text-base focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div>
              <label className="text-gray-600 text-sm font-medium">Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border p-2 md:p-3 rounded-md mt-1 bg-gray-50 outline-none text-sm md:text-base focus:ring-2 focus:ring-blue-400"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 md:gap-3">
            <input
              type="checkbox"
              id="terms"
              className="w-4 h-4"
              checked={agreeTerms}
              onChange={(e) => setAgreeTerms(e.target.checked)}
            />
            <label htmlFor="terms" className="text-gray-600 text-xs md:text-sm">
              <a href="/T&C" target="_blank" rel="noopener noreferrer">
                Agree with our <span className="text-blue-500 cursor-pointer">Terms & Conditions</span>
              </a>
            </label>
          </div>

          <button
            className={`bg-blue-500 text-white py-2 md:py-3 rounded-md w-full text-base md:text-lg font-semibold hover:bg-blue-600 transition ${
              (!email || !password || !agreeTerms || loading) ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            onClick={handleLogin}
            disabled={!email || !password || !agreeTerms || loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>

          <p className="text-center text-gray-500 text-xs md:text-sm">
            Don't have an account?{' '}
            <span
              className="text-blue-500 cursor-pointer hover:underline font-medium"
              onClick={() => {
                onClose();
                onOpenSignupModal();
              }}
            >
              Sign Up
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

// ─── Standalone page wrapper (used by the /User/Login route) ───────────────────
export const LoginPage = () => {
  const navigate = useNavigate();
  const [signupOpen, setSignupOpen] = useState(false);

  return (
    <>
      <LoginModal
        isOpen={true}
        onClose={() => navigate('/')}
        onOpenSignupModal={() => setSignupOpen(true)}
      />
      {signupOpen && (
        <SignupModal
          isOpen={signupOpen}
          onClose={() => setSignupOpen(false)}
        />
      )}
    </>
  );
};

export default LoginModal;
