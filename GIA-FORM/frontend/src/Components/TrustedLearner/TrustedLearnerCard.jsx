import React from "react";

const bgColors = {
  green: "bg-[#319F43]",
  purple: "bg-[#9747FF]",
  blue: "bg-[#1877F2]",
  orange: "bg-[#F45E29]",
};

function PlatformBadge({ platform, platformColor }) {
  const colorClass =
    platform === "Instagram"
      ? "bg-gradient-to-r from-pink-500 via-yellow-500 to-orange-600 text-white"
      : platform === "Facebook"
      ? "bg-[#1877F2] text-white"
      : platform === "LinkedIn"
      ? "bg-[#0A66C2] text-white"
      : "bg-gray-800 text-white";
  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-medium inline-block ${colorClass} mr-2`}
    >
      {platform}
    </span>
  );
}

// Pass all data as props from parent!
function TrustedLearnerCard({
  color,
  profileImage,
  name,
  stars,
  level,
  testimonial,
  company,
  platform,
  platformColor,
}) {
  return (
    <div
      className={`min-w-[400px] max-w-[400px] rounded-2xl shadow-lg px-6 py-5 flex items-center justify-between ${bgColors[color]} text-white mr-6`}
      style={{ minHeight: "200px" }}
    >
      {/* Textual content */}
      <div className="flex flex-col items-start flex-1 pr-4">
        {/* Name */}
        <div className="font-bold text-lg mb-1">{name}</div>

        {/* Stars */}
        <div className="flex items-center space-x-1 mb-2 text-yellow-300">
          {Array(5)
            .fill(0)
            .map((_, i) => (
              <svg
                key={i}
                className={`w-4 h-4 ${i < stars ? "" : "opacity-30"}`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <polygon points="10,1.5 12.4,7.5 18.9,7.6 13.8,11.7 15.9,17.7 10,14.1 4.1,17.7 6.2,11.7 1.1,7.6 7.6,7.5" />
              </svg>
            ))}
        </div>

        {/* Level/degree */}
        <div className="bg-white text-[#F84646] font-semibold px-3 rounded-full py-1 text-xs mb-3">
          {level}
        </div>

        {/* Testimonial */}
        <div className="text-white text-sm mb-3 leading-relaxed">
          "{testimonial}"
        </div>

        {/* Company/latest role */}
        <div className="font-semibold text-sm mb-1">{company}</div>

        {/* Platform label */}
        <div className="italic text-xs opacity-85 flex items-center">
          Discovered us via&nbsp;
          <PlatformBadge platform={platform} platformColor={platformColor} />
        </div>
      </div>

      {/* Profile photo */}
      <div className="flex-shrink-0">
        <img
          src={profileImage}
          alt={name}
          className="w-20 h-20 rounded-full object-cover  border-4 border-white shadow-md"
        />
      </div>
    </div>
  );
}

export default TrustedLearnerCard;
