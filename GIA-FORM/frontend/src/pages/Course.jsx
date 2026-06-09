import React from "react";
import { IoSearch } from "react-icons/io5";
import CourseHero from "../Components/CourseHero";
import Discovery from "../Components/Discovery";
import CourseLibrary from "../Components/CourseLibrary/CourseLibrary ";
import LearnerPath from "../Components/LearnerPath/LearnerPath";
import Subscribe from "../Components/Subscribe";
 
const Course = () => {
  return (
    <div>
      <CourseHero />
      <Discovery />
      <CourseLibrary />
      <LearnerPath />
      <Subscribe />
    </div>
  );
};

export default Course;
