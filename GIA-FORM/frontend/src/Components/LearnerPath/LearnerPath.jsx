// src/components/LearnerPath.jsx
import React from "react";
import { motion } from "framer-motion";
import LearnerCard from "./LearnerCard";

// Import your 6 course images
import course1 from "../../assets/course1.jpg";
import course2 from "../../assets/course2.jpg"; 
import course3 from "../../assets/course3.jpg";
import course4 from "../../assets/course4.jpg";
import course5 from "../../assets/course5.jpg";
import course6 from "../../assets/course6.jpg";
import instructorImg from "../../assets/instructor-jackson.jpg";

const pathsData = [
  // {
  //   id: 1,
  //   image: course1,
  //   level: "Advanced",
  //   title: "React-Native",
  //   // instructor: "Joseph",
  //   // instructorAvatar: instructorImg,
  //   // rating: "4.8",
  //   // students: "20,000",
  //   // duration: "42 hours",
  //   // price: "25,000",
  //   // originalPrice: "30,000"
  // },
  {
    id: 2,
    image: course2,
    level: "Advanced", 
    title: "Devops",
    // instructor: "Joseph",
    // instructorAvatar: instructorImg,
    // rating: "4.8",
    // students: "20,000",
    // duration: "42 hours",
    // price: "25,000",
    // originalPrice: "30,000"
  },
  {
    id: 3,
    image: course3,
    level: "Advanced",
    title: "Microsoft Dynamic 365 F&O",
    // instructor: "Joseph", 
    // instructorAvatar: instructorImg,
    // rating: "4.8",
    // students: "20,000",
    // duration: "42 hours",
    // price: "25,000",
    // originalPrice: "30,000"
  },
  {
    id: 4,
    image: course4,
    level: "Advanced",
    title: "Microsoft dynamic 365 Business Central",
    // instructor: "Joseph",
    // instructorAvatar: instructorImg,
    // rating: "4.8", 
    // students: "20,000",
    // duration: "42 hours",
    // price: "25,000",
    // originalPrice: "30,000"
  },
  {
    id: 5,
    image: course5,
    level: "Advanced",
    title: "React-Native", 
    // instructor: "Joseph",
    // instructorAvatar: instructorImg,
    // rating: "4.8",
    // students: "20,000",
    // duration: "42 hours",
    // price: "25,000",
    // originalPrice: "30,000"
  },
  {
    id: 6,
    image: course6,
    level: "Advanced",
    title: "Web Development",
    // instructor: "Joseph",
    // instructorAvatar: instructorImg,
    // rating: "4.8",
    // students: "20,000", 
    // duration: "42 hours",
    // price: "25,000",
    // originalPrice: "30,000"
  }
];

export default function LearnerPath() {
  return (
    <section className="w-full py-16 bg-gradient-to-tr from-[#7b37fe] via-[#734bff] to-[#502cb1]">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Discover Our Most Loved Learning Paths
          </h2>
          <p className="text-lg text-white/90">
            Join learners worldwide mastering skills through our carefully crafted programs
          </p>
        </div>

        {/* Scrolling Cards */}
        <div
          className="relative overflow-hidden"
          style={{
            WebkitMaskImage: "linear-gradient(90deg, transparent 0, black 8%, black 92%, transparent 100%)",
            maskImage: "linear-gradient(90deg, transparent 0, black 8%, black 92%, transparent 100%)",
          }}
        >
          <MarqueeRow items={pathsData} direction="rtl" />
        </div>
      </div>
    </section>
  );
}

function MarqueeRow({ items, direction = "rtl" }) {
  const duration = 40; // Adjust speed as needed
  const dir = direction === "ltr" ? ["-50%", "0%"] : ["0%", "-50%"];

  const rowContent = (
    <div className="flex shrink-0 gap-6 pr-6">
      {items.map((path, idx) => (
        <LearnerCard
          key={path.id + idx}
          image={path.image}
          level={path.level}
          title={path.title}
          instructor={path.instructor}
          instructorAvatar={path.instructorAvatar}
          rating={path.rating}
          students={path.students}
          duration={path.duration}
          price={path.price}
          originalPrice={path.originalPrice}
        />
      ))}
    </div>
  );

  return (
    <div className="group relative">
      <motion.div
        className="flex w-[200%]"
        animate={{ x: dir }}
        transition={{ duration, ease: "linear", repeat: Infinity }}
      >
        {rowContent}
        {rowContent} {/* Duplicate for continuous loop */}
      </motion.div>
    </div>
  );
}
