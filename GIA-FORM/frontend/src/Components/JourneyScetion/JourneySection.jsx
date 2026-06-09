import React from "react";
import GirlImg from "../../assets/GirlImg.png";

export default function GradientBorderCard({
  title = "Sharpen your skills",
  subtitle = "Shape your Future",
  description = "we believe that the right skills can open the door to endless opportunities. Our expert-led courses are designed to help you learn faster, work smarter, and achieve your personal and professional goals. Whether you’re a student building your future, a professional advancing your career, or someone simply passionate about learning, we give you the tools to sharpen your skills and shape your life into the one you’ve always dreamed of.",
  cta = "Let's Start Learning Journey",
  imageSrc = GirlImg,
}) {
  return (
    <div
  className="w-full overflow-x-hidden px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-24 py-16 md:py-24 flex justify-center mt-16 md:mt-32">
      {/* 2) SKEWED FRAME */}
      <div
        className="relative w-full mx-auto
                  max-w-[100%] sm:max-w-[92%] md:max-w-[86%] lg:max-w-[80%] xl:max-w-[90rem]  2xl:max-w-[90rem]
                  p-[6px] sm:p-[8px] md:p-[10px] lg:p-[12px]
                  skew-x-[-1deg] sm:skew-x-[-8deg] md:skew-x-[-10deg] lg:skew-x-[-12deg]
                  overflow-visible"
      >
        <div className="animated-gradient-border absolute inset-0 rounded-[22px] pointer-events-none" />

        {/* Card — same rhombus (no counter-skew here) */}
        <div className="relative rounded-[22px] bg-gradient-to-r from-[#735FF2] to-[#43378C] overflow-visible">
          {/* CONTENT gets straightened */}
          <div className="skew-x-[4deg] sm:skew-x-[8deg] md:skew-x-[10deg] xl:skew-x-[12deg] relative text-white">
            {/* Mobile Layout */}
            <div className="block md:hidden">
              <div className="p-6 pb-0">
                <h2 className="text-3xl font-semibold leading-tight">
                  {title}
                </h2>
                <span className="mt-2 text-xl font-semibold text-[#E95C35] block">
                  {subtitle}
                </span>
                <p className="mt-4 text-sm leading-6 text-white/90">
                  {description}
                </p>
                <button className="mt-6 rounded-[12px] bg-gradient-to-r from-[#F45E29] to-[#5A4BDA] w-full py-3 text-base font-semibold text-white hover:opacity-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70">
                  {cta}
                </button>
              </div>

              {/* Mobile Image */}
              <div className="flex justify-center mt-6 relative">
                <img
                  src={imageSrc}
                  alt={title}
                  draggable="false"
                  className="pointer-events-none select-none h-52 w-auto object-contain transform translate-y-4"
                />
              </div>
            </div>

            {/* Tablet Layout */}
            <div className="hidden md:block lg:hidden">
              <div className="grid grid-cols-2 gap-6 p-8 items-center">
                {/* Left content */}
                <div className="flex flex-col">
                  <h2 className="text-4xl font-semibold leading-tight">
                    {title}
                  </h2>
                  <span className="mt-3 text-2xl font-semibold text-[#E95C35]">
                    {subtitle}
                  </span>
                  <p className="mt-4 text-base leading-6 text-white/90">
                    {description}
                  </p>
                  <button className="mt-6 rounded-[12px] bg-gradient-to-r from-[#F45E29] to-[#5A4BDA] w-4/5 py-3 text-lg font-semibold text-white hover:opacity-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70">
                    {cta}
                  </button>
                </div>

                {/* Right image */}
                <div className="flex justify-center items-end relative">
                  <img
                    src={imageSrc}
                    alt={title}
                    draggable="false"
                    className="pointer-events-none select-none h-72 w-auto object-contain transform translate-y-6 translate-x-4"
                  />
                </div>
              </div>
            </div>

            {/* Desktop Layout */}
            <div className="hidden lg:block relative xl:h-[30rem]">
              <div className="grid grid-cols-2 gap-10 p-4   ">
                {/* Left copy */}
                <div className="max-w-full ml-10 flex flex-col justify-center   ">
                  <h2 className="text-5xl xl:text-5xl font-semibold leading-tight">
                    {title}
                  </h2>
                  <span className="mt-4 text-3xl xl:text-1xl font-semibold text-[#E95C35]">
                    {subtitle}
                  </span>
                  <p className="mt-6 text-lg xl:text-lg leading-7 text-white/90">
                    {description}
                  </p>
                  <button className="mt-8 rounded-[12px] bg-gradient-to-r from-[#F45E29] to-[#5A4BDA] w-3/4 xl:w-2/3 py-4 text-xl font-semibold text-white hover:opacity-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 transition-opacity duration-200">
                    {cta}
                  </button>
                </div>

                {/* Right space for absolute positioned image */}
                <div className="relative"></div>
              </div>

              {/* Desktop Image - Absolute positioned */}
              <img
                src={imageSrc}
                alt={title}
                draggable="false"
                className="pointer-events-none select-none absolute bottom-0 right-0 h-[110%] lg:h-[70%]  xl:h-[120%]  w-auto object-contain z-10 transform translate-x-8 translate-y-4"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Styles */}
      <style>{`
        @keyframes borderGradientMove {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animated-gradient-border {
          background: linear-gradient(90deg,#F45E29,#5A4BDA);
          background-size: 1200% 1200%;
          animation: borderGradientMove 6s linear infinite;
          filter: drop-shadow(0 14px 24px rgba(0,0,0,0.28));
          border-radius: 22px;
        }
      `}</style>
    </div>
  );
}
