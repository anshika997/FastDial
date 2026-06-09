import React from "react";
import { IoSearch } from "react-icons/io5";
import HeroSection from "../Components/HeroSection/Herosection";
import CoursesSection from "../Components/CoursesSection/CoursesSection";
import JourneySection from "../Components/JourneyScetion/JourneySection";
import PopularCourse from "../Components/PopularCourse/PopularCourse";
import CoursesPlanSection from "../Components/CoursesPlanSection/CoursesPlanSection";
import LearningPlatform from "../Components/LearningPlatform/LearningPlatform";
import OurPartner from "../Components/Ourpartner";
import TrustedLearner from "../Components/TrustedLearner/TrustedLearners";
import DataSection from "../Components/data";

const Home = () => {
  return (
    <div className="">
      <HeroSection />
      <CoursesSection />
      <JourneySection />
      <LearningPlatform />
      <DataSection />
      <CoursesPlanSection />
      <PopularCourse />
      <OurPartner />
      <TrustedLearner />
    </div>
  );
};

export default Home;
