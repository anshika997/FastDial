// // src/components/CourseCard.jsx
// import React from "react";

// export default function CourseCard({ 
//   image, 
//   title, 
//   description, 
//   rating, 
//   reviews, 
//   duration, 
//   instructor, 
//   students, 
//   price, 
//   instructorAvatar 
// }) {
//   return (
//     <div className="bg-white/10 backdrop-blur-sm rounded-2xl overflow-hidden hover:bg-white/15 transition-all duration-300 group">
//       {/* Course Image */}
//       <div className="relative overflow-hidden">
//         <img 
//           src={image} 
//           alt={title}
//           className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
//         />
//       </div>
      
//       {/* Card Content */}
//       <div className="p-6">
//         {/* Rating and Duration */}
//         <div className="flex items-center justify-between mb-3">
//           <div className="flex items-center gap-1">
//             {/* <span className="text-yellow-400">⭐</span> */}
//             {/* <span className="text-white text-sm font-medium">
//               {rating} ({reviews} reviews)
//             </span> */}
//           </div>
//           <div className="flex items-center gap-1 text-white/80 text-sm">
//             {/* <span>🕐</span> */}
//             <span>{duration}</span>
//           </div>
//         </div>
        
//         {/* Course Title */}
//         <h3 className="text-white text-xl font-bold mb-3">
//           {title}
//         </h3>
        
//         {/* Description */}
//         <p className="text-white/80 text-sm mb-4 line-clamp-2">
//           {description}
//         </p>
        
//         {/* Instructor Info */}
//         <div className="flex items-center gap-3 mb-4">
//           {/* <img 
//             src={instructorAvatar} 
//             alt={instructor}
//             className="w-8 h-8 rounded-full object-cover"
//           /> */}
//           {/* <div className="flex-1">
//             <p className="text-white font-medium text-sm">{instructor}</p>
//             <p className="text-white/70 text-xs">{students} students</p>
//           </div> */}
//           <div className="text-white font-bold text-lg">
//             {price}
//           </div>
//         </div>
        
//         {/* Enroll Button */}
//         <button className="w-full py-3 bg-gradient-to-r from-[#F45E29] to-[#5A4BDA] text-white rounded-lg font-bold text-sm hover:opacity-90 transition-opacity">
//           Enroll Now
//         </button>
//       </div>
//     </div>
//   );
// }



import React, { useState } from "react";
import EnrollmentModal from "../EnrollmentModal"; // import your modal

export default function CourseCard({ 
  image, 
  title, 
  description, 
  rating, 
  reviews, 
  duration, 
  instructor, 
  students, 
  price, 
  instructorAvatar 
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-2xl overflow-hidden hover:bg-white/15 transition-all duration-300 group">
      {/* Course Image */}
      <div className="relative overflow-hidden">
        <img 
          src={image} 
          alt={title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      
      {/* Card Content */}
      <div className="p-6">
        {/* Rating and Duration */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1">
            {/* you can bring back rating if needed */}
          </div>
          <div className="flex items-center gap-1 text-white/80 text-sm">
            <span>{duration}</span>
          </div>
        </div>
        
        {/* Course Title */}
        <h3 className="text-white text-xl font-bold mb-3">
          {title}
        </h3>
        
        {/* Description */}
        <p className="text-white/80 text-sm mb-4 line-clamp-2">
          {description}
        </p>
        
        {/* Instructor Info / Price */}
        <div className="flex items-center gap-3 mb-4">
          <div className="text-white font-bold text-lg">
            {price}
          </div>
        </div>
        
        {/* Enroll Button */}
        <button
          onClick={() => setIsModalOpen(true)} // ✅ open modal
          className="w-full py-3 bg-gradient-to-r from-[#F45E29] to-[#5A4BDA] text-white rounded-lg font-bold text-sm hover:opacity-90 transition-opacity"
        >
          Enroll Now
        </button>
      </div>

      {/* ✅ Enrollment Modal */}
      <EnrollmentModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        courseTitle={title}  // pass course title if needed
      />
    </div>
  );
}
