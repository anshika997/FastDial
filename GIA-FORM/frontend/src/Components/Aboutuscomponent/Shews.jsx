import React from "react";
import TiltPanel from "./ShewCard";
import Arrow from "../../assets/Arrow.png";
import StudentPng from "../../assets/study.png";
import office from "../../assets/office.png";
import Launcher from "../../assets/Startuplaunch.png";
export default function TiltPanels() {
  const cn = (...xs) => xs.filter(Boolean).join(" ");
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-4  space-y-10">


      <div className="relative rounded-[22px] bg-gradient-to-r from-[#735FF2] to-[#43378C] overflow-hidden w-full p-6 max-w-[1200px] mx-auto mt-10">
  <div className="flex flex-col xl:flex-row xl:items-center gap-8 text-white">
    {/* Video Section */}
    <div className="xl:w-1/2 w-full border-4 border-orange-500 rounded-[15px] overflow-hidden">
      <video
        src=""
        controls
        className="w-full aspect-video object-cover rounded-[12px]"
      />
    </div>

    {/* Text Section */}
    <div className="xl:w-1/2 flex flex-col pt-3 gap-6 text-center xl:text-left">
      <h1 className="text-2xl xl:text-3xl font-bold">
        Learn With Us – Anytime, Anywhere!
      </h1>
      <p className="text-[1rem] leading-7 text-white/90">
        Our video library makes learning flexible, practical, and highly
        engaging. Get expert tips, step-by-step guidance, and real-world
        insights that simplify even complex topics. Learn at your own pace,
        revisit lessons anytime, and turn knowledge into a powerful habit that
        drives lasting success.
      </p>
    </div>
  </div>

  {/* Footer Text */}
  <div className="xl:flex justify-center  text-white gap-1 pt-5 text-center xl:text-left ">
    <span className="font-bold mr-1">Watch Now</span>
    <span>
      to explore our teaching style, course highlights, and how we help learners
      build real-world skills.
    </span>
  </div>
</div>


      
      <TiltPanel
        title="Our Mission"
        bullets={[
          "Delivering practical, industry‑relevant courses.",
          "A flexible learning experience for all schedules.",
          "Encouraging lifelong learning for growth.",
          "Global network of learners and mentors.",
          "Hands‑on projects and real‑world applications.",
        ]}
        imageSrc={Arrow}
        textSide="left"
        tilt="right" // card tilts towards right‑bottom
        revealFrom="lb" // reveal from left‑bottom
        className="mt-6"
      />

      <TiltPanel
        title="Why Learn with Us?"
        bullets={[
          "We go beyond just lessons—get guidance and confidence to succeed.",
          "Interactive projects to apply your skills.",
          "Learn anytime, anywhere with a flexible platform.",
          "Recognized certificates for your resume.",
          "Ongoing mentorship and support.",
        ]}
        imageSrc={StudentPng}
        textSide="right" // text on right, image on left
        tilt="left" // card tilts towards left‑bottom
        revealFrom="rb" // reveal from right‑bottom
      />
      <TiltPanel
        title="Our Mission"
        bullets={[
          "Access to cutting-edge courses in trending fields.",
          "A personalized learning path that fits your goals.",
          "Develop job-ready skills with guided practice",
          "Stay ahead with future-proof knowledge.",
          "Transform your passion into real career opportunities.",
        ]}
        imageSrc={Launcher}
        textSide="left"
        tilt="right" // card tilts towards right‑bottom
        revealFrom="lb" // reveal from left‑bottom
        className="mt-6"
      />

      <TiltPanel
        title="Why Learn with Us?"
        bullets={[
          "Thousands of happy learners worldwide",
          "Career transitions into top global companies.",
          "Students launching their own successful startups.",
          "Proven results with measurable skill growth",
          "Inspiring journeys from beginners to experts",
        ]}
        imageSrc={office}
        textSide="right" // text on right, image on left
        tilt="left" // card tilts towards left‑bottom
        revealFrom="rb" // reveal from right‑bottom
      />
      <div className="w-full overflow-x-hidden px-4 sm:px-6 md:px-8 lg:px-10 xl:px-14 2xl:px-20 py-6 md:py-8 flex justify-center">
        <div
          className={cn(
            "relative w-full mx-auto",

            "max-w-[100%] sm:max-w-[97%] md:max-w-[95%] lg:max-w-[93%] xl:max-w-[110rem]",

            "p-[4px] sm:p-[6px] md:p-[8px] lg:p-[10px]",
            "rounded-[22px] bg-gradient-to-r from-[#F45E29] to-[#5A4BDA]"
          )}
        >
          

        </div>
      </div>
    </div>
  );
}
