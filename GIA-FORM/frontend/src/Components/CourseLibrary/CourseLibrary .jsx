// src/components/CourseLibrary.jsx
import React, { useState } from "react";
import CourseCard from "./CourseCard";

// Import your 6 course images
import course1 from "../../assets/course1.jpg";
import course2 from "../../assets/course2.jpg";
import course3 from "../../assets/course3.jpg";
import course4 from "../../assets/course4.jpg";
import course5 from "../../assets/course5.jpg";
import course6 from "../../assets/course6.jpg";
import instructorImg from "../../assets/instructor-jackson.jpg";
import instructorImg2 from "../../assets/instructor-sara.png";
import instructorImg3 from "../../assets/instructor-albert.png";
import instructorImg4 from "../../assets/instructor-Divya.png";
import instructorImg5 from "../../assets/instructor-caroline.png";
import instructorImg6 from "../../assets/instructor-nick.png";
const categories = [
  "All",
  // "School Courses",
  // "College Courses",
  "IT Courses",
  "Carrier Support",
  "Certifications",
];

const coursesData = [
  {
    id: 1,
    image: course1,
    title: "Web Development",
    description:
      "Learn to build modern, responsive, and dynamic websites from scratch.",
    // rating: "4.8",
    // reviews: "",
    // duration: "42 hours",
    // instructor: "Jackson",
    // students: "3,000",
    // price: "₹25,000",
    // instructorAvatar: instructorImg,
    category: "IT Courses",
  },
  {
    id: 2,
    image: course2,
    title: "UI/UX Design",
    description:
      "Master the art of creating user-friendly, engaging, and visually appealing designs.",
    // rating: "4.8",
    // reviews: "",
    // duration: "42 hours",
    // instructor: "Sara",
    // students: "3,000",
    // price: "₹25,000",
    // instructorAvatar: instructorImg2,
    category: "IT Courses",
  },
  {
    id: 3,
    image: course3,
    title: "Science",
    description:
      " Explore concepts that strengthen knowledge and fuel curiosity for innovation.",
    // rating: "4.8",
    // reviews: "",
    // duration: "42 hours",
    // instructor: "Albert",
    // students: "3,000",
    // price: "₹25,000",
    // instructorAvatar: instructorImg3,
    category: "School Courses",
  },
  {
    id: 4,
    image: course4,
    title: "Java Full Stack",
    description:
      " Become industry-ready with front-end to back-end Java development skills.",
    // rating: "4.8",
    // reviews: "",
    // duration: "42 hours",
    // instructor: "Divya",
    // students: "3,000",
    // price: "₹25,000",
    // instructorAvatar: instructorImg4,
    category: "College Courses",
  },
  {
    id: 5,
    image: course5,
    title: "Career Guidance",
    description:
      " Get expert mentoring to choose the right path for your future success.",
    // rating: "4.8",
    // reviews: "",
    // duration: "42 hours",
    // instructor: "Caroline",
    // students: "3,000",
    // price: "₹25,000",
    // instructorAvatar: instructorImg5,
    category: "Certifications",
  },
  {
    id: 6,
    image: course6,
    title: "Placement Training",
    description:
      "Prepare with mock tests, soft skills, and technical practice to crack interviews.",
    // rating: "4.8",
    // reviews: "",
    // duration: "42 hours",
    // instructor: "Nick",
    // students: "3,000",
    // price: "₹25,000",
    // instructorAvatar: instructorImg6,
    category: "Carrier Support",
  },
];

export default function CourseLibrary() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [query, setQuery] = useState("");

  const normalize = (s) => (s || "").toString().toLowerCase().trim();

  const matchesSearch = (course) => {
    const q = normalize(query);
    if (!q) return true;
    return [
      course.title,
      course.description,
      course.instructor,
      course.category,
    ].some((field) => normalize(field).includes(q));
  };

  const filteredCourses = coursesData.filter(
    (course) =>
      (activeCategory === "All" || course.category === activeCategory) &&
      matchesSearch(course)
  );

  return (
    <section className="w-full py-16 bg-gradient-to-tr from-[#7b37fe] via-[#734bff] to-[#502cb1]">
      <div className="max-w-7xl mx-auto px-4 flex flex-col items-center">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Our Courses Library
          </h2>
          <p className="text-lg text-white/90">
            Explore a complete collection of courses across every category.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === category
                  ? "bg-white text-purple-700"
                  : "bg-white/20 text-white hover:bg-white/30"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <form
          className="flex xl:w-[60%] h-15 items-center bg-white rounded-full shadow-2xl mb-10 p-2"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="pl-6 pr-2">
            <svg
              className="w-6 h-6 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>

          <input
            type="text"
            placeholder="What do you want to learn?"
            className="flex-1 py-4 px-2 text-sm lg:text-lg xl:text-lg text-gray-700 bg-transparent outline-none placeholder:text-gray-400"
            style={{ fontWeight: 500 }}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />

          <button
            type="submit"
            className="xl:py-3 xl:px-8 py-1 px-4 bg-purple-600 hover:bg-purple-700 text-white rounded-full xl:text-lg font-bold transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Search
          </button>
        </form>

        {/* Courses Grid */}
        {filteredCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCourses.map((course) => (
              <CourseCard
                key={course.id}
                image={course.image}
                title={course.title}
                description={course.description}
                rating={course.rating}
                reviews={course.reviews}
                duration={course.duration}
                instructor={course.instructor}
                students={course.students}
                price={course.price}
                instructorAvatar={course.instructorAvatar}
              />
            ))}
          </div>
        ) : (
          <div className="w-full text-center text-white/90 mt-8">
            No courses found for “{query}”. Try a different keyword or category.
          </div>
        )}
      </div>
    </section>
  );
}
