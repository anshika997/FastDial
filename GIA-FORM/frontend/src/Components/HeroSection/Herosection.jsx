import React from "react";
import { IoSearch } from "react-icons/io5";
import AnimatedShape from "./Animated";

const HeroSection = () => {
  return (
    <section className="text-white p-0">
      <div className="max-w-[80%] mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 lg:gap-14 xl:gap-16 items-center">
        {/* Left Content */}
        <div className="order-2 md:order-1">
          <h1 className="font-bold leading-tight sm:leading-snug text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
            Your{" "}
            <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#E95C35] to-[#83341E]">
              Modern
            </span>{" "}
            <br className="hidden sm:block" />
            <span className="text-[#E95C35]">Learning</span> Platform
          </h1>

          <p className="mt-4 sm:mt-6 text-base sm:text-lg md:text-lg leading-relaxed text-gray-200 max-w-2xl">
            Start your learning journey with expert-led, industry-ready courses.
            Gain practical skills, hands-on projects, and career growth—anytime,
            anywhere, at your own pace.
          </p>

          <div className="mt-6 sm:mt-8">
            <button className="bg-gradient-to-r from-[#F45E29] to-[#5A4BDA] text-white rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 transition-transform active:scale-[0.98] px-6 py-2 sm:px-8 sm:py-3 md:px-10 md:py-3.5 lg:px-10 lg:py-2 text-sm sm:text-base md:text-lg hover:scale-[1.02] cursor-pointer">
              Start Now
            </button>
          </div>
        </div>

        {/* Right Visual */}
        <div className="order-1 md:order-2 flex justify-center items-center relative w-full h-full min-h-[220px] sm:min-h-[280px] md:min-h-[320px] lg:min-h-[360px] xl:min-h-[420px] ml-[-25px] sm:ml-0">
          <AnimatedShape />
        </div>
      </div>

      {/* Search Bar */}
      <div className="max-w-7xl mx-auto mt-12 sm:mt-14 lg:mt-16 xl:mt-20">
        <h2 className="text-center font-semibold text-2xl sm:text-4xl lg:text-5xl mb-6 sm:mb-8">
          Search Courses
        </h2>

        <form
          onSubmit={(e) => e.preventDefault()}
          className="max-w-4xl mx-auto flex  sm:flex-row items-stretch sm:items-center gap-3 sm:gap-2 bg-white rounded-2xl sm:rounded-full overflow-hidden shadow-md px-3 sm:px-2 py-2"
          role="search"
          aria-label="Course search"
        >
          <div className="flex items-center gap-3 sm:gap-2 px-2 sm:px-3">
            <IoSearch
              className="text-gray-400 w-5 h-5 sm:w-6 sm:h-6"
              aria-hidden="true"
            />
          </div>

          <input
            type="text"
            placeholder="Search the courses .."
            aria-label="Search the courses"
            className="flex-grow px-3 sm:px-4 md:px-6 py-2 sm:py-3 text-gray-700 placeholder-gray-400 focus:outline-none rounded-xl sm:rounded-none"
          />

          <button
            type="submit"
            className="bg-gradient-to-r from-[#fd6767] to-[#8433d4] text-white font-semibold rounded-xl sm:rounded-full px-4 sm:px-6 md:px-8 lg:px-10 py-2 sm:py-2.5 md:py-3 text-sm sm:text-base  hover:scale-[1.02] cursor-pointer"
          >
            Search
          </button>
        </form>
      </div>
    </section>
  );
};

export default HeroSection;
