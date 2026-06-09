import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import Logo from "../../assets/Logo.svg";
import DefaultImg from "../../assets/defualtimg.svg";
import SchoolImg from "../../assets/SchoolImg.svg";
import CollegeImg from "../../assets/CollegeImg.svg";
import ItImg from "../../assets/ItImg.svg";
import SupportImg from "../../assets/SupportImg.svg";
import Certificate from "../../assets/CertificateImg.svg";

/**
 * CategoryFeature — styled to match the provided design
 * - Static category buttons (same for all cards)
 * - Card swaps in-place with swipe animation
 * - Left: logo, headline, subhead, 2x3 button grid
 * - Right: framed illustration area with floating cubes
 */
export default function CategoryFeature() {
  const categories = [
    // { id: "school", label: "School Courses" },
    // { id: "college", label: "College Courses" },
    { id: "it", label: "IT Courses" },
    { id: "career", label: "Career Support" },
    { id: "skill", label: "Certifications" },
  ];

  const cards = useMemo(
    () => ({
      "fit-goals": {
        id: "fit-goals",
        title: "Courses That Fit Your Goals",
        accent: "From beginners to pros",
        sub: "-Find the right course, wherever you are in your ambitions.",
        gradient: "from-indigo-700 to-violet-700",
        image: (
          <img
            src={DefaultImg}
            alt="Default Illustration"
            className="max-w-full rounded-lg object-cover"
          />
        ),
      },
      school: {
        id: "school",
        title: "School Courses (Grades 6–12)",
        accent: "Learn concepts. Crack exams.",
        sub: "Interactive lessons, foundational concepts, and exam-focused support for students in Grades 6–12.",
        gradient: "from-blue-700 to-sky-600",
        image: (
          <img
            src={SchoolImg}
            alt="School Illustration"
            className="max-w-full rounded-lg object-cover"
          />
        ),
      },
      college: {
        id: "college",
        heading: "College Courses (UG/PG)",
        title: "College Courses (UG/PG)",
        accent: "Concepts to career",
        sub: " In-depth college curriculum support tailored for UG & PG students across diverse streams.",
        gradient: "from-violet-700 to-fuchsia-700",
        image: (
          <img
            src={CollegeImg}
            alt="College Illustration"
            className="max-w-full rounded-lg object-cover"
          />
        ),
      },
      it: {
        id: "it",
        title: "IT & Software Courses",
        accent: "Dev-ready skills",
        sub: "Industry-relevant IT & software training designed for real-world projects and upskilling.",
        gradient: "from-cyan-700 to-blue-700",
        image: (
          <img
            src={ItImg}
            alt="IT Illustration"
            className="max-w-full rounded-lg object-cover"
          />
        ),
      },
      career: {
        id: "career",
        title: "Career Support / Placement Training",
        accent: "Get Hired, Get Ahead",
        sub: "Short-term certified programs to boost confidence, creativity, and job-readiness.",
        gradient: "from-emerald-700 to-green-700",
        image: (
          <img
            src={SupportImg}
            alt="Career Support Illustration"
            className="max-w-full rounded-lg object-cover"
          />
        ),
      },
      skill: {
        id: "skill",
        title: "Skill Development / Certifications",
        accent: "Learn Skills That Work",
        sub: "Short-term certified programs to boost confidence, creativity, and job-readiness.",
        gradient: "from-orange-600 to-amber-600",
        image: (
          <img
            src={Certificate}
            alt="Skill Development Illustration"
            className="max-w-full rounded-lg object-contain "
          />
        ),
      },
    }),
    []
  );

  // Show the default hero (fit-goals) BUT highlight the School button by default
  const [activeId, setActiveId] = useState("fit-goals");
  // No default highlight — start with none selected
  const [selectedId, setSelectedId] = useState(null);
  const prevIdRef = useRef(activeId);

  const ORDER = ["fit-goals", "school", "college", "it", "career", "skill"]; // for direction only
  const SELECT_ORDER = ["school", "college", "it", "career", "skill"];

  const direction = useMemo(() => {
    const prevIdx = ORDER.indexOf(prevIdRef.current);
    const nextIdx = ORDER.indexOf(activeId);
    return nextIdx >= prevIdx ? 1 : -1;
  }, [activeId]);

  const onSelect = (id) => {
    prevIdRef.current = activeId;
    setActiveId(id);
    setSelectedId(id);
  };

  useEffect(() => {
    const handler = (e) => {
      if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
      const baseIdx = selectedId ? SELECT_ORDER.indexOf(selectedId) : -1;
      const startIdx = baseIdx === -1 ? 0 : baseIdx;
      const nextIdx =
        e.key === "ArrowRight"
          ? (startIdx + 1) % SELECT_ORDER.length
          : (startIdx - 1 + SELECT_ORDER.length) % SELECT_ORDER.length;
      onSelect(SELECT_ORDER[nextIdx]);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [selectedId]);

  const variants = {
    enter: (dir) => ({
      x: dir > 0 ? 48 : -48,
      opacity: 0,
      filter: "blur(8px)",
    }),
    center: {
      x: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: { duration: 0.4 },
    },
    exit: (dir) => ({
      x: dir > 0 ? -48 : 48,
      opacity: 0,
      filter: "blur(8px)",
      transition: { duration: 0.28 },
    }),
  };

  const active = cards[activeId];

  const EPBadge = () => (
    <span className="mr-2 inline-flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-[10px] font-extrabold text-white shadow-sm">
      EP
    </span>
  );

  return (
    <div className="mx-auto w-full  p-4 md:p-6">
      <div className="relative overflow-hidden rounded-2xl shadow-lg">
        <AnimatePresence custom={direction} mode="popLayout" initial={false}>
          <motion.div
            key={active.id}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            className={`relative grid min-h-[17.5rem] grid-cols-1 bg-gradient-to-r ${active.gradient} p-5 text-white md:grid-cols-2 md:p-12 md:px-26 md:h-[37.5rem]`}
          >
            {/* Left column */}
            <div className="flex flex-col gap-4">
              {/* Logo */}
              <div className="flex items-center gap-2">
                <img src={Logo} alt="EP Logo" />
              </div>

              {/* Heading */}
              <div>
                <h2 className="text-2xl font-semibold leading-snug md:text-4xl">
                  {active.title}
                </h2>
                <p className="mt-1 text-lg font-semibold text-blue-200">
                  {active.accent}
                </p>
                <p className="mt-1 max-w-2xl text-sm text-white/80">
                  {active.sub}
                </p>
              </div>

              {/* Static buttons grid (no button for fit-goals) */}
              <div className="mt-2 grid max-w-xl grid-cols-1 gap-3 sm:grid-cols-3">
                {categories.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => onSelect(c.id)}
                    className={
                      "flex items-center justify-start rounded-full border px-3 py-2 text-sm font-semibold shadow-sm transition-all border " +
                      (selectedId && c.id === selectedId
                        ? "border-white/20 bg-white text-gray-900"
                        : "border-white/30 bg-white/10 text-white hover:bg-white/20")
                    }
                    aria-current={c.id === selectedId}
                  >
                    <EPBadge />
                    <span>{c.label}</span>
                  </button>
                ))}
              </div>
              <div>
                {active.id === "fit-goals" ? null : (
                  <button className="mt-6 bg-gradient-to-r from-[#F45E29] to-[#5A4BDA]  text-white px-16 py-2 rounded-md">
                    GET STARTED
                  </button>
                )}
              </div>
            </div>

            {/* Right column: framed illustration */}
            <div className="  flex items-center justify-center ">
              {active.image}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
