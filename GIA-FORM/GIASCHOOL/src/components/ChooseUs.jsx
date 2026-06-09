import React from "react";
import chooseUsImage from "../Images/choose-us.png";
import videoCamera from "../Images/VideoCamera.png";
import Quotes from "../Images/Quotes.png";
import PdfImage from "../Images/FileArrowDown.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FaViadeo } from "react-icons/fa6";
import { FaCamera, FaDownload, FaEdit, FaQuoteLeft, FaVideo } from "react-icons/fa";

export const ChooseUs = () => {
  return (
    <div className="flex flex-col space-x-4 h-auto bg-cover bg-center pt-20 pb-20 mb-3 pt-0 pb-0 px-0 sm:pt-20 sm:pb-20 sm:px-20">
      <h1 className="text-4xl font-medium text-center mb-10">Why choose us</h1>
      <div className="flex flex-col sm:flex-row-reverse items-center justify-center gap-10 sm:gap-20">
        {/* Content Section */}
        <div className="w-full sm:w-1/2">
          <div className="my-5 flex flex-col justify-center">
            <div className="flex gap-3 items-center">
              {/* <img src={videoCamera} alt="" className="w-8 h-8" /> */}
              <FaVideo className="text-xl"/>
              <div className="text-xl font-medium" style={{ textDecoration: "underline" }}>
                Pre recorded videos
              </div>
            </div>
            <p className="ml-10 text-sm sm:text-base mb-4">{/* Increased text size on larger screens */}
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi.
            </p>
          </div>
          <div className="md:my-5 flex flex-col justify-center">
            <div className="flex gap-3 items-center">
              {/* <img src={PdfImage} alt="" className="w-8 h-8" />
               */}
               <FaDownload className="text-xl"/>
              <div className="text-xl font-medium" style={{ textDecoration: "underline" }}>
                Downloadable PDF Notes
              </div>
            </div>
            <p className="ml-10 text-sm sm:text-base mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi.
            </p>
          </div>
          <div className="my-5 flex flex-col justify-center">
            <div className="flex gap-3 items-center">
              {/* <img src={Quotes} alt="" className="w-8 h-8" />
               */}
               <FaQuoteLeft className="text-xl"/>
              <div className="text-xl font-medium" style={{ textDecoration: "underline" }}>
                Live doubt clearing sessions
              </div>
            </div>
            <p className="ml-10 text-sm sm:text-base">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi.
            </p>
          </div>
        </div>

        {/* Image Section */}
        <img
          src={chooseUsImage}
          alt="About Us"
          className="w-full sm:w-1/2 h-[40vh] sm:h-[70vh] object-cover"
        />
      </div>
    </div>
  );
};
