 import { FaFacebookF, FaInstagram, FaYoutube, FaTwitter, FaLinkedinIn, FaGooglePlay, FaApple } from "react-icons/fa";
import { FiPhone } from "react-icons/fi";
import React from "react";
import Logo from "../assets/Logo.svg";

export default function Footer() {
  const linkClass = "text-sm text-white/80 hover:text-white transition";
  const headingClass = "text-orange-400 font-semibold tracking-wide text-base";

  return (
    <footer className="w-full bg-black text-white border-t-4 border-orange-600">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Logo and horizontal line */}
        <div className="mb-6">
          <img src={Logo} alt="EP Logo" className="w-32 mb-4" />
          <hr className="border-gray-600" />
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left side: Link sections in 2 rows */}
          <div className="flex-1">
            {/* Top row: Company, Schools, Students, Teachers */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
              <div>
                <h4 className={headingClass}>Company</h4>
                <ul className="mt-3 space-y-2">
                  <li><a href="#" className={linkClass}>Contact Us</a></li>
                  <li><a href="#" className={linkClass}>Careers</a></li>
                  <li><a href="#" className={linkClass}>FAQS</a></li>
                </ul>
              </div>

              <div>
                <h4 className={headingClass}>Schools</h4>
                <ul className="mt-3 space-y-2">
                  <li><a href="#" className={linkClass}>Smart Class Plus</a></li>
                  <li><a href="#" className={linkClass}>Assessment Centre</a></li>
                  <li><a href="#" className={linkClass}>School Integrated Program</a></li>
                  <li><a href="#" className={linkClass}>Learning App</a></li>
                  <li><a href="#" className={linkClass}>Parent App</a></li>
                </ul>
              </div>

              <div>
                <h4 className={headingClass}>Students</h4>
                <ul className="mt-3 space-y-2">
                  <li><a href="#" className={linkClass}>K-12</a></li>
                  <li><a href="#" className={linkClass}>NEET</a></li>
                  <li><a href="#" className={linkClass}>JEE</a></li>
                </ul>
              </div>

              <div>
                <h4 className={headingClass}>Teachers</h4>
                <ul className="mt-3 space-y-2">
                  <li><a href="#" className={linkClass}>Teaching App</a></li>
                </ul>
              </div>
            </div>

            {/* Bottom row: Terms & Conditions, Resources */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h4 className={headingClass}>Terms & Conditions</h4>
                <ul className="mt-3 space-y-2">
                  <li><a href="#" className={linkClass}>Terms Of Use</a></li>
                  <li><a href="#" className={linkClass}>Privacy Policy</a></li>
                  <li><a href="#" className={linkClass}>Child Safety</a></li>
                  <li><a href="#" className={linkClass}>E-waste Recycling Program</a></li>
                </ul>
              </div>

              <div>
                <h4 className={headingClass}>Resources</h4>
                <ul className="mt-3 space-y-2">
                  <li><a href="#" className={linkClass}>Newsletter</a></li>
                  <li><a href="#" className={linkClass}>Blogs</a></li>
                  <li><a href="#" className={linkClass}>NEP 2020</a></li>
                  <li><a href="#" className={linkClass}>Webinars</a></li>
                </ul>
              </div>
            </div>
          </div>

          {/* Right side: Download App */}
          <div className="lg:w-80 flex flex-col items-end">
            <h4 className="text-center text-white  font-semibold text-lg mt-65 mb-4 mr-48">Download App</h4>
            <div className="flex  gap-3">
              <a href="#" className="flex items-center gap-3 bg-white text-black rounded-lg px-4 py-3 hover:opacity-90 transition">
                <FaGooglePlay className="text-xl" />
                <div>
                  <p className="text-xs">GET IT ON</p>
                  <p className="font-semibold">Google Play</p>
                </div>
              </a>
              <a href="#" className="flex items-center gap-3 bg-white text-black rounded-lg px-4 py-3 hover:opacity-90 transition">
                <FaApple className="text-xl" />
                <div>
                  <p className="text-xs">Download on the</p>
                  <p className="font-semibold">App Store</p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient bar */}
      <div className="bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 px-6 py-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-white text-xl font-bold">
            <FiPhone />
            <span>+91 9113946827</span>
          </div>
          
          <p className="text-white text-sm">
            Copyright © {new Date().getFullYear()} Experience pavillion. All rights reserved.
          </p>
          
          <div className="flex gap-2">
            <a href="#" className="w-9 h-9 rounded-full bg-orange-500 hover:bg-orange-600 grid place-items-center transition text-white">
              <FaFacebookF />
            </a>
            <a href="#" className="w-9 h-9 rounded-full bg-orange-500 hover:bg-orange-600 grid place-items-center transition text-white">
              <FaInstagram />
            </a>
            <a href="#" className="w-9 h-9 rounded-full bg-orange-500 hover:bg-orange-600 grid place-items-center transition text-white">
              <FaYoutube />
            </a>
            <a href="#" className="w-9 h-9 rounded-full bg-orange-500 hover:bg-orange-600 grid place-items-center transition text-white">
              <FaTwitter />
            </a>
            <a href="#" className="w-9 h-9 rounded-full bg-orange-500 hover:bg-orange-600 grid place-items-center transition text-white">
              <FaLinkedinIn />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
