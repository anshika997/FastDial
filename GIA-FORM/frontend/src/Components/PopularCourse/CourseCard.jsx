 import React from 'react';
import getStartedBtn from '../../assets/get-started-btn.png';

function CourseCard({ course }) {
  return (
    <div className="min-w-[298px] max-w-[300px] bg-white rounded-xl shadow-lg p-6 flex flex-col mr-10 ml-1">
      <img
        src={course.image}
        alt={course.title}
        className="h-40 w-full object-cover rounded-lg mb-6"
      />
      <div className="flex justify-between items-center mb-3">
        <img
          src={getStartedBtn}
          alt="Get Started"
          className="h-9 w-auto cursor-pointer"
        />
        <span className="text-orange-600 font-semibold text-xl">{course.price}</span>
      </div>
      <h3 className="font-bold text-xl mb-2">{course.title}</h3>
      <p className="text-gray-600 text-base">{course.description}</p>
    </div>
  );
}

export default CourseCard;