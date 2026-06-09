 import React, { useEffect, useRef, useState } from "react";
import CourseCard from "./CourseCard";

import course1 from "../../assets/course1.jpg";
import course2 from "../../assets/course2.jpg";
import course3 from "../../assets/course3.jpg";
import course4 from "../../assets/course4.jpg";
import course5 from "../../assets/course5.jpg";
import course6 from "../../assets/course6.jpg";

const courses = [
  {
    id: 1,
    title: "Microsoft Dynamics 365 F&O",
    image: course1,
    description: "Streamline finance and operations with real-world enterprise solutions.",
  },
  {
    id: 2,
    title: "Full Stack Development",
    image: course2,
    description: "Build complete web applications with front-end, back-end, databases, and deployment skills.",
  },
  {
    id: 3,
    title: "DevOps",
    image: course3,
    description: "Accelerate delivery with CI/CD, automation, and collaboration practices.",
  },
  {
    id: 4,
    title: "Generative AI",
    image: course4,
    description: "Build innovative AI solutions with LLMs, automation, and creativity tools.",
  },
  {
    id: 5,
    title: "Cyber Security",
    image: course5,
    description: "Protect systems, data, and networks with advanced security skills.",
  },
  {
    id: 6,
    title: "Mobile Application",
    image: course6,
    description: "Learn to design, develop, and deploy apps for Android and iOS.",
  },
];

const CARD_WIDTH = 340;
const CARDS_VISIBLE = 4;
const SCROLL_STEP_CARDS = 4;
const SCROLL_STEP = CARD_WIDTH * SCROLL_STEP_CARDS;

function PopularCourse() {
  const [direction, setDirection] = useState("right");
  const scrollRef = useRef(null);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const maxScroll = (courses.length - CARDS_VISIBLE) * CARD_WIDTH;
    const intervalDelay = 3000;

    const interval = setInterval(() => {
      if (direction === "right") {
        const newScrollLeft = Math.min(
          container.scrollLeft + SCROLL_STEP,
          maxScroll
        );
        container.scrollTo({ left: newScrollLeft, behavior: "smooth" });

        if (newScrollLeft >= maxScroll) {
          setDirection("left");
        }
      } else {
        const newScrollLeft = Math.max(container.scrollLeft - SCROLL_STEP, 0);
        container.scrollTo({ left: newScrollLeft, behavior: "smooth" });

        if (newScrollLeft <= 0) {
          setDirection("right");
        }
      }
    }, intervalDelay);

    return () => clearInterval(interval);
  }, [direction]);

  return (
    <div className="py-16" style={{ minHeight: "750px" }}>
      <div
        className="mx-auto px-6 flex flex-col items-center max-w-[73%]"
        style={{ maxWidth: `1400px`, width: "100%" }}
      >
        <h2 className="text-4xl font-bold text-center text-white mb-6">
          Our Popular Courses
        </h2>
        <p className="text-center text-white mb-14 text-xl max-w-5xl">
          Explore the top-rated courses loved by learners worldwide. From
          skill-building workshops to professional certifications, discover the
          learning experiences that inspire growth and success.
        </p>
        <div
          ref={scrollRef}
          className="flex overflow-x-auto py-6 custom-scrollbar"
          style={{
            scrollBehavior: "smooth",
            width: "100%",
            minHeight: "460px",
          }}
        >
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </div>

      <style>{`
        .custom-scrollbar {
          scrollbar-width: none; /* Firefox */
        }
        .custom-scrollbar::-webkit-scrollbar {
          display: none; /* Chrome, Safari, Opera */
        }
      `}</style>
    </div>
  );
}

export default PopularCourse;
