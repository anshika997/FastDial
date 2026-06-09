import React from "react";
import schoolImg from "../assets/school-courses.png";
import collegeImg from "../assets/college-courses.png";
import itImg from "../assets/it-courses.png";
import careerImg from "../assets/career-support.png";
import certImg from "../assets/certifications.png";

const fieldsData = [
  // {
  //   id: 1,
  //   title: "School Courses",
  //   co Courses",
  //   image: schoolImg,
  //   bgColor: "bg-blue-600"
  // },
  // {
  //   id: 2,
  //   title: "College Courses",
  //   co Courses",
  //   image: collegeImg,
  //   bgColor: "bg-purple-600"
  // },
  {
    id: 3,
    title: "IT Courses",
    courses: "",
    image: itImg,
    bgColor: "bg-blue-600",
  },
  {
    id: 4,
    title: "Carrier Support",
    courses: "",
    image: careerImg,
    bgColor: "bg-orange-500",
  },
  {
    id: 5,
    title: "Certifications",
    courses: "",
    image: certImg,
    bgColor: "bg-green-600",
  },
];

export default function Discovery() {
  return (
    <section className="w-full py-16 bg-gradient-to-tr from-[#7b37fe] via-[#734bff] to-[#502cb1]">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Discover Our Most Popular Fields
          </h2>
          <p className="text-lg text-white/90 font-medium">
            Choose from a wide range of courses in top learning areas
          </p>
        </div>

        {/* Cards Grid */}
        <div className="w-full ml-70"> 
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 ">
          {fieldsData.map((field) => (
            <div
              key={field.id}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 flex flex-col items-center text-center hover:bg-white/15 transition-all duration-300 cursor-pointer group"
            >
              {/* Image Container */}
              <div
                className={`w-20 h-20 ${field.bgColor} rounded-xl flex items-center justify-center mb-6 group-hover:scale-105 transition-transform duration-300`}
              >
                <img
                  src={field.image}
                  alt={field.title}
                  className="w-12 h-12 object-contain"
                />
              </div>

              {/* Course Count */}
              <p className="text-white/90 text-sm font-medium mb-2">
                {field.courses}
              </p>

              {/* Title */}
              <h3 className="text-white text-lg font-bold">{field.title}</h3>
            </div>
          ))}
        </div>
        </div>
      </div>
    </section>
  );
}
