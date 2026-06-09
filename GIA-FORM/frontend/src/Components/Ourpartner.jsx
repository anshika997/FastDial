import React from "react";
import { motion } from "framer-motion";
import Awlogo from "../assets/Awlogo.png";
import Amazonlogo from "../assets/amazonlogo.png";
import Microsoftlogo from "../assets/Microsoftlogo.png";
import googlelogo from "../assets/googlelogo.png";
import EYlogo from "../assets/EYlogo.png";
import Deepseeklogo from "../assets/deepseeklogo.png";
import Ibmlogo from "../assets/Ibmlogo.png";
import Mindlogo from "../assets/MindLogo.png";
import FFlogo from "../assets/FFlogo.png";
import Qslogo from "../assets/QSlogo.png";
import Tcslogo from "../assets/Tcslogo.png";
import NttDatalogo from "../assets/Nttdatalogo.png";
import OpenAilogo from "../assets/Openailogo.png";
import SAPlogo from "../assets/Saplogo.png";

export default function PartnersMarquee({ logos = [] }) {
  const fallback = [
    Awlogo,
    Amazonlogo,
    Microsoftlogo,
    googlelogo,
    EYlogo,
    Deepseeklogo,
    Ibmlogo,
    Mindlogo,
    FFlogo,
    Qslogo,
    Tcslogo,
    NttDatalogo,
    OpenAilogo,
    SAPlogo,
  ];

  const items = logos.length ? logos : fallback;

  // Split into two groups
  const midIndex = Math.ceil(items.length / 2);
  const firstRow = items.slice(0, midIndex);
  const secondRow = items.slice(midIndex);

  return (
    <section className="relative w-full overflow-hidden py-14 text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Our Partners
          </h2>
          <p className="mt-2 text-violet-100/90 text-xl">
            Trusted by leading institutions and organizations.
          </p>
        </div>

        <div
          className="relative"
          style={{
            WebkitMaskImage:
              "linear-gradient(90deg, transparent 0, black 8%, black 92%, transparent 100%)",
            maskImage:
              "linear-gradient(90deg, transparent 0, black 8%, black 92%, transparent 100%)",
          }}
        >
          {/* First row */}
          <MarqueeRow items={firstRow} direction="ltr" />
          {/* Second row */}
          <MarqueeRow items={secondRow} direction="rtl" className="mt-6" />
        </div>
      </div>
    </section>
  );
}

function MarqueeRow({ items, direction = "ltr", className = "" }) {
  const duration = 28;
  const dir = direction === "ltr" ? ["-50%", "0%"] : ["0%", "-50%"];

  const row = (
    <div className="flex shrink-0 gap-6 pr-6">
      {items.concat(items).map((src, idx) => (
        <LogoCard key={`${direction}-${idx}`} src={src} />
      ))}
    </div>
  );

  return (
    <div className={`group relative ${className}`}>
      <motion.div
        className="flex w-[200%]"
        animate={{ x: dir }}
        transition={{ duration, ease: "linear", repeat: Infinity }}
      >
        {row}
      </motion.div>
    </div>
  );
}

function LogoCard({ src }) {
  return (
    <div className="rounded-2xl bg-white backdrop-blur-sm ring-1 ring-white/15 shadow-sm overflow-hidden">
      {/* Bigger card size */}
      <div className="w-42 h-26 p-4 lg:p-0 md:w-80 md:h-40 lg:w-76 lg:h-40 flex items-center justify-center">
        <img
          src={src}
          alt="Partner logo"
          className=" w-45 h-45 object-scale-down opacity-90"
        />
      </div>
    </div>
  );
}
