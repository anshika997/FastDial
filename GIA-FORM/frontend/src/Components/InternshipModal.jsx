import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { State, City } from "country-state-city";
import { AiOutlineClose } from "react-icons/ai";

const InternshipModal = ({ isOpen, onClose }) => {
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState(""); 
  const [phone, setPhone] = useState("");

  // ✅ Load Indian states once
  useEffect(() => {
    const indianStates = State.getStatesOfCountry("IN");
    setStates(indianStates);
  }, []);

  // ✅ Load cities when state changes
  useEffect(() => {
    if (selectedState) {
      const citiesList = City.getCitiesOfState("IN", selectedState);
      setCities(citiesList);
    } else {
      setCities([]);
    }
  }, [selectedState]);

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      onClick={onClose}
    >
      {/* Backdrop with blur */}
      <div className="absolute inset-0 bg-black/30 backdrop-blur-lg"></div>

      {/* Modal Content */}
      <div
        className="relative bg-white rounded-lg shadow-lg w-full max-w-lg p-6 z-10 overflow-y-auto max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ✅ Header bar with close button */}
        <div className="mb-5 flex items-center justify-between bg-gradient-to-r from-[#F45E29] to-[#5A4BDA] text-white px-4 py-3 rounded-t-lg">
          <h2 className="text-xl font-semibold text-center flex-1">
            Internship Registration Form
          </h2>
          <button
            onClick={onClose}
            className="ml-2 text-red-600 hover:text-red-800"
          >
            <AiOutlineClose size={22} /> {/* ✅ Red close icon */}
          </button>
        </div>

        <form className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          {/* Contact */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Contact No:
            </label>
            <PhoneInput
              country={"in"}
              value={phone}
              onChange={setPhone}
              inputClass="!w-full !py-2 !pl-12 !pr-3 !border !rounded-md"
              buttonClass="!border !rounded-l-md !bg-white"
              containerClass="w-full"
            />
          </div>

          {/* Gmail */}
          <div>
            <label className="block text-sm font-medium mb-1">Gmail</label>
            <input
              type="email"
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          {/* College Name */}
          <div>
            <label className="block text-sm font-medium mb-1">
              College Name
            </label>
            <input
              type="text"
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          {/* State + City + Pincode */}
          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="block text-sm font-medium mb-1">State</label>
              <select
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                className="w-full border rounded-md px-2 py-2 bg-white"
              >
                <option value="">Select State</option>
                {states.map((s) => (
                  <option key={s.isoCode} value={s.isoCode}>
                    {s.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">City</label>
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="w-full border rounded-md px-2 py-2 bg-white"
              >
                <option value="">Select City</option>
                {cities.map((c) => (
                  <option key={c.name} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Pincode</label>
              <input
                type="text"
                className="w-full border rounded-md px-2 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
            </div>
          </div>

          {/* Branch */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Branch/Course
            </label>
            <input
              type="text"
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          {/* Year of Passing */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Year of Passing
            </label>
            <input
              type="text"
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
          >
            Submit
          </button>
        </form>
      </div>
    </div>,
    document.body
  );
};

export default InternshipModal;
