import React, { useEffect, useState } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";

export const Testimonial = () => {
  const BASEURL = import.meta.env.VITE_API_URL_ADMIN;
  const [testimonialData, setTestimonialData] = useState([]);
  const accessToken = window.sessionStorage.getItem("accessToken");

  useEffect(() => {
    const fetchTestimonial = async () => {
      try {
        const response = await axios.get(`${BASEURL}/data/gettestimonial`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        if (response && response.data) {
          setTestimonialData(response.data);
        }
      } catch (error) {
        console.error("Error fetching testimonial data:", error);
      }
    };
    fetchTestimonial();
  }, [BASEURL]);

  return (
    <div className="pt-20 pb-20 sm:px-20 mb-5 bg-gray-100">
      <h2 className="text-center text-4xl font-medium mb-16">
        Trusted by thousands of learners
      </h2>
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        modules={[Autoplay, Pagination]}
        className="mySwiper"
      >
        {Array.isArray(testimonialData) &&
          testimonialData.map((slide, index) => (
            <SwiperSlide key={index}>
              <div className="rounded-lg bg-white shadow-md p-6 h-[300px] flex flex-col overflow-hidden">
                <div className="flex items-center mb-4">
                  <img
                    src={slide.image_url}
                    alt={slide.name}
                    className="w-12 h-12 rounded-full border border-gray-300 mr-3"
                  />
                  <div>
                    <h3 className="font-semibold text-lg">{slide.name}</h3>
                    <p className="text-sm text-gray-500">{slide.designation}</p>
                  </div>
                </div>
                <div className="text-yellow-400 text-lg mb-2">★★★★★</div>
                <div className="overflow-auto h-[100px] no-scrollbar">
                  <p className="text-sm text-gray-700">{slide.description}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};
