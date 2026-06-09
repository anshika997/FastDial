import React from "react";
export default function CourseCard({
  bgColor,
  logo,
  title,
  subtitle,
  description,
  courses,
  defaultImageSrc,
  defaultImageAlt
}) {
  const [activeCourse, setActiveCourse] = React.useState(courses[0]);

  return (
    <div className={`${bgColor} text-white rounded-lg p-6 flex flex-col md:flex-row items-center md:items-start gap-6`}>
      {/* Left Section */}
      <div className="flex-1">
        {logo && <div className="mb-3">{logo}</div>}
        <h2 className="text-2xl font-bold mb-1">{title}</h2>
        <h3 className="text-lg font-semibold mb-2">{subtitle}</h3>
        <p className="text-white/80 mb-4">{description}</p>
        <div className="flex flex-wrap gap-3">
          {courses.map((course, idx) => (
            <button
              key={idx}
              onClick={() => setActiveCourse(course)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full shadow hover:shadow-lg transition text-sm font-medium ${
                activeCourse.label === course.label ? 'bg-blue-600 text-white' : 'bg-white text-[#212121]'
              }`}
            >
              {course.icon && (
                <course.icon className={activeCourse.label === course.label ? 'text-white' : 'text-blue-600'} />
              )}
              {course.label}
            </button>
          ))}
        </div>
      </div>

      {/* Right Section */}
      <div className="flex-shrink-0">
        <img
          src={activeCourse.imageSrc || defaultImageSrc}
          alt={activeCourse.imageAlt || defaultImageAlt}
          width={200}
          height={200}
          className="rounded-lg object-contain"
        />
      </div>
    </div>
  );
}