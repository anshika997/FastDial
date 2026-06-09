// src/components/LearnerCard.jsx
import React from "react";

const levelColors = {
  "Beginner": "bg-green-500",
  "Intermediate": "bg-orange-500", 
  "Advanced": "bg-blue-600"
};

export default function LearnerCard({
  image,
  level,
  title,
  instructor,
  instructorAvatar,
  rating,
  students,
  duration,
  price,
  originalPrice
}) {
  return (
    <div className="min-w-[350px] bg-white/10 backdrop-blur-sm rounded-2xl overflow-hidden hover:bg-white/15 transition-all duration-300 group mr-6">
      {/* Course Image with Level Badge */}
      <div className="relative overflow-hidden">
        <img 
          src={image} 
          alt={title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className={`absolute top-4 right-4 ${levelColors[level]} text-white px-3 py-1 rounded-full text-sm font-semibold`}>
          {level}
        </div>
      </div>
      
      {/* Card Content */}
      <div className="p-6">
        {/* Rating and Students */}
        <div className="flex items-center justify-between mb-3">
          {/* <div className="flex items-center gap-1">
            <span className="text-yellow-400">⭐</span>
            <span className="text-white text-sm font-medium">
              {rating} ({students})
            </span>
          </div> */}
          {/* <div className="flex items-center gap-1 text-white/80 text-sm">
            <span>👥</span>
            <span>20,000</span>
          </div> */}
        </div>
        
        {/* Course Title */}
        <h3 className="text-white text-xl font-bold mb-4">
          {title}
        </h3>
        
        {/* Instructor Info */}
        {/* <div className="flex items-center gap-3 mb-4">
          <img 
            src={instructorAvatar} 
            alt={instructor}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div className="flex-1">
            <p className="text-white font-medium">{instructor}</p>
            <p className="text-white/70 text-sm">Trainer</p>
          </div>
        </div> */}
        
        {/* Duration and Price */}
        {/* <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-1 text-white/80 text-sm">
            <span>🕐</span>
            <span>{duration}</span>
          </div>
          <div className="text-right">
            <span className="text-white font-bold text-lg">₹{price}</span>
            {originalPrice && (
              <span className="text-white/60 text-sm line-through ml-2">₹{originalPrice}</span>
            )}
          </div>
        </div> */}
        
        {/* Enroll Button */}
        <button className="w-full py-3 bg-gradient-to-r from-[#F45E29] to-[#5A4BDA] text-white rounded-lg font-bold text-sm hover:opacity-90 transition-opacity">
          Enroll Now
        </button>
      </div>
    </div>
  );
}
