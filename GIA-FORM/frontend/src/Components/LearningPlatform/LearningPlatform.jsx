import React, { useEffect, useState, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import img1 from "../../assets/card1.png";
import img2 from "../../assets/card2.png";
import img3 from "../../assets/card3.png";
import img4 from "../../assets/card4.png";
import img5 from "../../assets/card5.png";
import img6 from "../../assets/card6.png";
import logoImg from "../../assets/Logo1.svg";
import bgDecor from "../../assets/Subtract.svg";

const cards = [
  { id: 1, image: img1, title: "We Don’t Just Teach, We Transform" },
  { id: 2, image: img2, title: "Education That Fits Your Life" },
  { id: 3, image: img3, title: "Skills That Pay Off" },
  { id: 4, image: img4, title: "Recognized Achievements" },
  { id: 5, image: img5, title: "Future-Ready Education" },
  { id: 6, image: img6, title: "Affordable & Accessible" },
];

function LearningPlatform() {
  const [logoMoved, setLogoMoved] = useState(false);
  const logoControls = useAnimation();
  const bgControls = useAnimation();
  const sectionRef = useRef(null);

  // Responsive scroll threshold (~20% of viewport height)
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const { top } = sectionRef.current.getBoundingClientRect();
      const threshold = window.innerHeight * 0.2;
      setLogoMoved(top < threshold);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Animate logo + background
  useEffect(() => {
    const commonTransition = { type: "spring", stiffness: 80, damping: 22 };

    if (logoMoved) {
      logoControls.start({
        top: "-5%",
        left: "16%",
        translateX: "0%",
        translateY: "0%",
        scale: 0.9, // small delta; sizing handled by CSS width
        opacity: 1,
        position: "absolute",
        zIndex: 30,
        transition: commonTransition,
      });
      bgControls.start({ opacity: 0, transition: { duration: 0.6 } });
    } else {
      logoControls.start({
        top: "50%",
        left: "50%",
        translateX: "-50%",
        translateY: "-50%",
        scale: 1,
        opacity: 1,
        position: "absolute",
        zIndex: 30,
        transition: commonTransition,
      });
      bgControls.start({ opacity: 1, transition: { duration: 0.6 } });
    }
  }, [logoMoved, logoControls, bgControls]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-[100vh] lg:min-h-[92vh] flex flex-col items-center justify-center overflow-visible mt-16"
    >
      {/* Decorative background (viewport-based sizing) */}
      <motion.img
        src={bgDecor}
        alt="Decorative Background"
        initial={{
          opacity: 1,
          scale: 1,
          position: "absolute",
          top: "50%",
          left: "50%",
          translateX: "-50%",
          translateY: "-50%",
          zIndex: 0,
        }}
        animate={bgControls}
        className="pointer-events-none select-none w-[75vw] max-w-[720px] md:w-[55vw] md:max-w-[780px] xl:w-[45vw] xl:max-w-[840px] aspect-square"
        style={{ position: "absolute" }}
      />

      {/* Animated EP logo (responsive width) */}
      <motion.img
        src={logoImg}
        alt="Logo"
        initial={{
          top: "50%",
          left: "50%",
          translateX: "-50%",
          translateY: "-50%",
          scale: 1,
          opacity: 1,
          position: "absolute",
          zIndex: 30,
        }}
        animate={logoControls}
        className="select-none pointer-events-none w-[clamp(160px,10vw,520px)] aspect-square p-5 self-center"
        style={{ position: "absolute" }}
      />

      {/* Cards Section */}
      <div
        className={`transition-opacity duration-700 ${
          logoMoved ? "opacity-100" : "opacity-0"
        } z-20 w-full`}
      >
        <div className="mx-auto w-full max-w-6xl mt-5  px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl text-center font-bold text-white lg:text-center md:text-right md:mr-10 mb-8  xl:text-right xl:mr-50 xl:mt-5 sm:mb-10 md:mb-12 lg:mb-16">
            Why Choose Our Learning Platform?
          </h2>

          {/* Grid: 1 → 2 → 3 cols */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 sm:gap-x-8 lg:gap-x-10 gap-y-8 sm:gap-y-10 lg:gap-y-12">
            {cards.map((card, idx) => (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 36 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.5, delay: idx * 0.12 }}
                className="relative overflow-hidden shadow-lg flex items-center justify-center group rounded-2xl aspect-[4/3] sm:aspect-[5/4] bg-neutral-900"
                style={{
                  backgroundImage: `url(${card.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/15 to-black/60 group-hover:from-orange-500/40 transition-colors duration-300" />
                <motion.h3
                  className="relative z-10 px-4 sm:px-5 md:px-6 font-bold text-center text-white text-base sm:text-lg md:text-xl lg:text-2xl drop-shadow"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.3 + idx * 0.1 }}
                >
                  {card.title}
                </motion.h3>
              </motion.div>
            ))}
          </div>

          {/* Spacer adapts to state */}
          <div
            className={`${
              logoMoved ? "pt-24 sm:pt-24 md:pt-28" : "pt-28 sm:pt-32 md:pt-36"
            }`}
          />
        </div>
      </div>

      {/* Respect reduced motion users */}
      <style>
        {`
          @media (prefers-reduced-motion: reduce) {
            * {\n              animation-duration: 0.01ms !important;\n              animation-iteration-count: 1 !important;\n              transition-duration: 0.01ms !important;\n              scroll-behavior: auto !important;\n            }
          }
        `}
      </style>
    </section>
  );
}

export default LearningPlatform;
