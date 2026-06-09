// SearchBar.js
import React from "react";

const SearchBar = ({ placeholder = "Search For Courses", onSearch }) => {
  return (
    <div className="relative w-full max-w-lg mx-auto py-6">
      <input
        id="search"
        type="text"
        placeholder={placeholder}
        className="block w-full md:w-4/5 lg:w-[85vh] pl-10 py-3 border border-gray-300 font-extrabold rounded-full shadow-2xl focus:ring-blue-500 focus:border-blue-500 text-sm md:text-base lg:text-lg bg-[#92C7CF] text-black"
        onChange={(e) => onSearch && onSearch(e.target.value)}
      />
      <span className="absolute inset-y-0 left-0 flex items-center pl-3 font-bold text-black">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 md:h-6 md:w-6 text-black"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1111.463 3.675l4.852 4.852a1 1 0 01-1.414 1.414l-4.852-4.852A6 6 0 012 8z"
            clipRule="evenodd"
          />
        </svg>
      </span>
    </div>
  );
};

export default SearchBar;
