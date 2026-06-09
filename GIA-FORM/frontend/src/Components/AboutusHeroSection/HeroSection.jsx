import React from "react";
import HeroBG from "../../assets/AboutusHero.jpg";
import Projectimg from "../../assets/project.png";

const HeroSection = () => {
  return (
    <section className="hero-section">
      <div className="relative">
        {/* Background */}
        <img
          src={HeroBG}
          alt="Students learning with guidance and tools"
          className="w-full h-[38rem] sm:h-[36rem] xl:h-[35rem] object-cover"
          loading="eager"
          decoding="async"
        />

        {/* Darken left side for text legibility (matches the mock) */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />

        {/* Content */}
        <div className="absolute inset-0">
          <div className="h-full max-w-[70%] mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 items-center">
            {/* Copy */}
            <div className="order-2 lg:order-1 max-w-2xl">
              <h1
                className="text-white font-bold leading-[1.1] tracking-tight
                             text-4xl md:text-6xl"
              >
                Empowering Learners,
                <br className="hidden md:block" />
                Shaping Futures
              </h1>

              <p className="mt-4 text-white/90 text-base md:text-lg max-w-xl">
                We create an inclusive space where knowledge meets opportunity,
                inspiring every student to achieve their full potential.
              </p>

              <button
                className="mt-6 inline-flex items-center rounded-lg px-6 py-3
                           bg-gradient-to-r from-[#F45E29] to-[#5A4BDA] text-white
                           text-sm md:text-base font-medium
                           shadow-[0_8px_24px_rgba(90,75,218,0.35)]
                           transition-transform hover:scale-[1.02] active:scale-[0.99]
                           focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
                aria-label="Start your learning journey"
              >
                Start your learning Journey
              </button>
            </div>

            {/* Illustration */}
            <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
              <img
                src={Projectimg}
                alt="Showcase of a student project"
                className="w-full max-w-[520px] h-auto rounded-md shadow-md"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
