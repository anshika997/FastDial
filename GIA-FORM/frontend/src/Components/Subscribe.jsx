 // src/components/Subscribe.jsx
import React, { useState } from "react";
import subscribeImg from "../assets/subscribe-bg.png";

export default function Subscribe() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle subscription logic here
    console.log("Subscribing email:", email);
    setEmail("");
  };

  return (
    <section className="w-full py-32 bg-gradient-to-tr from-[#7b37fe] via-[#734bff] to-[#502cb1]">
      <div className="max-w-6xl mx-auto px-4">
        {/* Main Subscribe Card */}
        <div 
          className="relative rounded-3xl overflow-hidden p-16 md:p-20 bg-gradient-to-r from-purple-600 to-pink-600 backdrop-blur-sm min-h-[500px] flex items-center justify-center"
          style={{
            backgroundImage: `url(${subscribeImg})`,
            backgroundSize: 'cover',        
            backgroundBlendMode: 'overlay'
          }}
        >
          {/* Content Container */}
          <div className="relative z-10 text-center max-w-2xl mx-auto">
            {/* Heading */}
            <h2 className="text-3xl md:text-4xl lg:text-6xl font-bold text-white mb-12 leading-tight">
              Subscribe to Get Update On{" "}
              <span className="text-orange-400">New Courses</span>
            </h2>

            {/* Subscription Form */}
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-6 max-w-2xl mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter Your email"
                required
                className="flex-1 px-8 py-5 rounded-xl text-gray-700 bg-white/90 backdrop-blur-sm outline-none focus:bg-white transition-all duration-300 text-xl placeholder:text-gray-500 shadow-lg"
              />
              <button
                type="submit"
                className="px-10 py-5 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-xl font-bold text-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Subscribe
              </button>
            </form>
          </div>

          {/* Decorative Elements */}
          <div className="absolute top-6 left-6 w-12 h-12 bg-orange-400/30 rounded-lg rotate-12"></div>
          <div className="absolute top-16 right-12 w-8 h-8 bg-pink-400/30 rounded-full"></div>
          <div className="absolute bottom-12 left-16 w-6 h-6 bg-blue-400/30 rounded-full"></div>
          <div className="absolute bottom-6 right-6 w-14 h-14 bg-purple-400/30 rounded-lg -rotate-12"></div>
          
          {/* Additional decorative elements for larger size */}
          <div className="absolute top-32 left-32 w-4 h-4 bg-yellow-400/20 rounded-full"></div>
          <div className="absolute bottom-32 right-32 w-6 h-6 bg-green-400/20 rounded-lg rotate-45"></div>
        </div>
      </div>
    </section>
  );
}
