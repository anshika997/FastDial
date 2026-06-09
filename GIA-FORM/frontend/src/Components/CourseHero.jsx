 import React from "react";
import heroImg from "../assets/hero-right.svg";                 

export default function CourseHero() {
  return (
    <section className="w-full min-h-[600px] flex items-center justify-center py-12 px-4 bg-gradient-to-tr from-[#7b37fe] via-[#734bff] to-[#502cb1]">
      <div className="max-w-8xl w-full flex flex-col md:flex-row  justify-evenly gap-12 mx-auto">
        {/* Left Side: Text, Search, Buttons */}
        <div className="flex-1 flex flex-col justify-center items-start max-w-xl">
          {/* Heading */}
          <h1 className="text-5xl md:text-6xl font-extrabold mb-7 tracking-tight text-white leading-tight">
            Fuel Your Future
          </h1>
          {/* Subheading */}
          <p className="text-base md:text-lg text-white/90 mb-8 font-medium leading-relaxed">
            Step into a learning space where every course is crafted to fit you—your goals, your pace, your style. From mastering in-demand tech skills to excelling in academics, we go beyond lessons to offer mentorship, hands-on practice, and real-world readiness. It's not just learning—it's a journey built around your success story.
          </p>
          
        
          
          {/* Action Buttons - Responsive */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 w-full sm:w-auto">
            <button
              type="button"
              className="w-full sm:w-auto px-6 sm:px-8 lg:px-10 py-3 sm:py-4 bg-gradient-to-r from-[#F45E29] to-[#5A4BDA] hover:from-[#e54e20] hover:to-[#4a3fb8] text-white rounded-xl font-bold text-base sm:text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 hover:-translate-y-1"
            >
              Get Started Free
            </button>
            {/* <button
              type="button"
              className="w-full sm:w-auto px-6 sm:px-8 lg:px-10 py-3 sm:py-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 hover:border-white/40 text-white rounded-xl font-bold text-base sm:text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 hover:-translate-y-1 flex items-center justify-center gap-2"
            >
              <span>Watch Demo</span>
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </div>
            </button> */}
          </div>
        </div>
        
        {/* Right Side: Image */}
        <div className="">
          <img
            src={heroImg}
            alt="Course Hero visual"
            className="max-w-[520rem] w-full h-auto object-cover"
          />
        </div>
      </div>
    </section>
  );
}
