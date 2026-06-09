import React, { useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import axios from "axios";

export default function InsertServicesPage() {
  const BASEURL = import.meta.env.VITE_API_URL_ADMIN;
  const [serviceName, setServiceName] = useState("");
  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const [error, setError] = useState("");
  const accessToken = window.sessionStorage.getItem("accessToken");

  // Handle form submission
  const handleSubmit = async () => {
    if (!serviceName.trim()) {
      setError("Service name is required.");
      return;
    }

    setLoading(true);
    setError("");
    setResponseMessage("");
    try {
      const response = await axios.post(
        `${BASEURL}/insertServices`,

        {
          service_name: serviceName,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      setResponseMessage(
        response.data.message || "Service added successfully!"
      );
      setServiceName(""); // Clear the input after success
    } catch (err) {
      console.error("Error submitting service name:", err);
      setError(
        err.response?.data?.message ||
          "Failed to add service. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <div className="bg-green-900 text-white p-4 rounded-b-[20px] relative">
        <div className="flex items-center justify-between rounded-b-lg">
          <Link to={"/Dashboard"}>
            <button className="text-white text-[30px] font-extrabold">
              <IoIosArrowBack />{" "}
            </button>
          </Link>
          <h1 className="text-white font-extrabold text-2xl capitalize">GIA</h1>
          <div className="rounded-full bg-white p-2 px-3">
            <FontAwesomeIcon icon={faUser} className="text-blue-600" />
          </div>
        </div>
      </div>

      <h1 className="text-xl font-bold text-center mb-4">Insert Service</h1>

      {error && <div className="text-red-500 mb-4 text-center">{error}</div>}
      {responseMessage && (
        <div className="text-green-500 mb-4 text-center">{responseMessage}</div>
      )}

      <div className="bg-white mx-10 p-5 rounded-lg shadow-lg">
        <div className="mb-4">
          <label className="block font-semibold mb-2">Service Name</label>
          <input
            type="text"
            name="service_name"
            value={serviceName}
            onChange={(e) => setServiceName(e.target.value)}
            placeholder="Enter service name"
            className="w-full p-2 border rounded"
          />
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-blue-500 text-white p-3 rounded mt-4"
        >
          {loading ? "Submitting..." : "Submit Service"}
        </button>
      </div>
    </div>
  );
}
