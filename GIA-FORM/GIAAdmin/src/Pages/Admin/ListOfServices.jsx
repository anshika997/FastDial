import React, { useState, useEffect } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import axios from "axios";

export default function GetServicesPage() {
  const BASEURL = import.meta.env.VITE_API_URL_ADMIN;
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const accessToken = window.sessionStorage.getItem("accessToken");

  useEffect(() => {
    const fetchServices = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await axios.get(
          `${BASEURL}/getServices`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        setServices(response.data.services || []);
      } catch (err) {
        console.error("Error fetching services:", err);
        setError(
          err.response?.data?.message ||
            "Failed to fetch services. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, [accessToken]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <div className="bg-green-900 text-white p-4 rounded-b-[20px] relative">
        <div className="flex items-center justify-between rounded-b-lg">
          <Link to={"/Dashboard"}>
            <button className="text-white text-[30px] font-extrabold">
              <IoIosArrowBack />
            </button>
          </Link>
          <h1 className="text-white font-extrabold text-2xl capitalize">GIA</h1>
          <div className="rounded-full bg-white p-2 px-3">
            <FontAwesomeIcon icon={faUser} className="text-blue-600" />
          </div>
        </div>
      </div>

      <h1 className="text-xl font-bold text-center mb-4">Services List</h1>

      {error && <div className="text-red-500 mb-4 text-center">{error}</div>}

      <div className="bg-white mx-10 p-5 rounded-lg shadow-lg">
        {loading ? (
          <p className="text-center">Loading services...</p>
        ) : (
          <ul>
            {services.map((service) => (
              <li
                key={service.id}
                className="p-2 border-b last:border-b-0 flex justify-between"
              >
                <span>{service.name}</span>
                <span className="text-gray-500">ID: {service.id}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
