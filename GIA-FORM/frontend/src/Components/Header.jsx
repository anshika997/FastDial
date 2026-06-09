import React, { useState, useEffect } from "react";
import Logo from "../assets/Logo.svg";
import SignupModal from "./SignupModal";
import LoginModal from "./LoginModal";
import InternshipModal from "./InternshipModal";
import toast from "react-hot-toast";
import { useNavigate, useLocation } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showInternship, setShowInternship] = useState(false); // ⬅️ new state
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Check token on mount
  useEffect(() => {
    const token = localStorage.getItem("ep_access_token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("ep_access_token");
    localStorage.removeItem("ep_user");
    setIsLoggedIn(false);
    toast.success("Logged out successfully!");
    setIsMenuOpen(false);
  };

  const go = (path) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-[#26213B4D] backdrop-blur supports-[backdrop-filter]:backdrop-blur text-white">
      <div className="max-w-[80%] mx-auto flex items-center justify-between h-16 sm:h-20 px-4 sm:px-6 lg:px-2 gap-10">
        {/* Logo */}
        <button
          onClick={() => go("/")}
          className="flex items-center gap-2 shrink-0 focus:outline-none"
          aria-label="Go to homepage"
        >
          <img src={Logo} alt="EP Logo" className="h-8 w-auto sm:h-18" />
        </button>

        <div className="md:hidden">
          <button
            onClick={() => setIsMenuOpen((s) => !s)}
            className="inline-flex items-center justify-center rounded-md p-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
            aria-controls="primary-menu"
            aria-expanded={isMenuOpen}
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d={
                  isMenuOpen
                    ? "M6 18L18 6M6 6l12 12"
                    : "M4 6h16M4 12h16M4 18h16"
                }
              />
            </svg>
          </button>
        </div>
        <nav className="hidden md:flex items-center gap-6 lg:gap-10 text-sm lg:text-xl font-semibold">
          <button
            onClick={() => go("/")}
            className={`py-1 hover:text-orange-400 ${
              location.pathname === "/" ? "text-orange-500" : ""
            }`}
          >
            Home
          </button>
          <button
            onClick={() => go("/about")}
            className={`py-1 hover:text-orange-400 ${
              location.pathname === "/about" ? "text-orange-500" : ""
            }`}
          >
            About Us
          </button>
          <button onClick={() => {}} className={`py-1 hover:text-orange-400 ${
              location.pathname === "" ? "text-orange-500" : ""
            }`}>
            Blog
          </button>
          <button
            onClick={() => go("/course")}
            className={`py-1 hover:text-orange-400 ${
    location.pathname === "/course" ? "text-orange-500" : ""
  }`}
          >
            Courses
          </button>
          <button onClick={() => {}} className="py-1 hover:text-orange-400">
            Donate
          </button>
        </nav>

        {/* Desktop Right Controls */}
        <div className="hidden md:flex items-center gap-6 lg:gap-18 ">
          <div
            className="inline-flex rounded-lg bg-gradient-to-r from-[#F45E29] to-[#5A4BDA] p-[2px]"
            onClick={() => setShowInternship(true)} // ⬅️ open modal
          >
            <span className="rounded-[8px] bg-black px-3 py-1 text-base font-semibold text-white cursor-pointer">
              internship
            </span>
          </div>

          {!isLoggedIn ? (
            <div className="hidden md:flex items-center gap-3">
              <button
                className="text-black border border-[#F45E29] px-3 py-1.5 rounded-md bg-white hover:bg-white/90 text-sm lg:text-base"
                onClick={() => setShowSignup(true)}
              >
                Sign Up
              </button>
              <button
                className="bg-orange-500 text-white px-4 py-[7px] rounded-md hover:bg-orange-600 text-sm lg:text-base"
                onClick={() => setShowLogin(true)}
              >
                Login
              </button>
            </div>
          ) : (
            <button
              className="hidden md:inline-flex bg-red-500 text-white px-4 py-1.5 rounded-md hover:bg-red-600 text-sm lg:text-base"
              onClick={handleLogout}
            >
              Logout
            </button>
          )}
        </div>
      </div>

      {/* Mobile Menu Panel */}
      <div
        id="primary-menu"
        className={`md:hidden transition-[max-height,opacity] duration-300 ease-out overflow-hidden ${
          isMenuOpen ? "max-h-[100vh] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-[#352f64] border-t border-white/10 px-4 sm:px-6 pt-2 pb-6">
          <nav className="flex flex-col gap-2 text-base font-semibold">
            <button
              onClick={() => go("/")}
              className="py-2 text-left hover:text-orange-400"
            >
              Home
            </button>
            <button
              onClick={() => go("/about")}
              className="py-2 text-left hover:text-orange-400"
            >
              About Us
            </button>
            <button
              onClick={() => {}}
              className="py-2 text-left hover:text-orange-400"
            >
              Blog
            </button>
            <button
              onClick={() => go("/course")}
              className="py-2 text-left hover:text-orange-400"
            >
              Courses
            </button>
            <button
              onClick={() => {}}
              className="py-2 text-left hover:text-orange-400"
            >
              Donate
            </button>
          </nav>

          {/* Mobile-only Controls inside the menu */}
          <div className="mt-4 flex flex-col gap-3">
            <button
              className="inline-flex rounded-lg bg-gradient-to-r from-[#F45E29] to-[#5A4BDA] p-[2px] "
              onClick={() => {
                setShowInternship(true); // ⬅️ open modal
                setIsMenuOpen(false);
              }}
            >
              <span className="rounded-[8px] bg-black px-3 py-1 text-base font-semibold text-white cursor-pointer ">
                internship
              </span>
            </button>

            {!isLoggedIn ? (
              <>
                <button
                  className="w-full text-black border border-[#F45E29] px-4 py-2 rounded-md bg-white hover:bg-white/90"
                  onClick={() => {
                    setShowSignup(true);
                    setIsMenuOpen(false);
                  }}
                >
                  Sign Up
                </button>
                <button
                  className="w-full bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600"
                  onClick={() => {
                    setShowLogin(true);
                    setIsMenuOpen(false);
                  }}
                >
                  Login
                </button>
              </>
            ) : (
              <button
                className="w-full bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                onClick={handleLogout}
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Modals */}
      <SignupModal
        isOpen={showSignup}
        onClose={() => setShowSignup(false)}
        onSwitchToLogin={() => setShowLogin(true)}
      />
      <LoginModal
        isOpen={showLogin}
        onClose={() => {
          setShowLogin(false);
          // re-check login status after modal closes
          const token = localStorage.getItem("ep_access_token");
          setIsLoggedIn(!!token);
        }}
        onSwitchToSignup={() => setShowSignup(true)}
      />
      <InternshipModal
        isOpen={showInternship} // ⬅️ open state
        onClose={() => setShowInternship(false)} // ⬅️ close handler
      />
    </header>
  );
};

export default Header;
