import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IoIosArrowBack } from "react-icons/io";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import axios from "axios";

export default function AffidavitsRequest() {
  const BASEURL = import.meta.env.VITE_API_URL_ADMIN;
  const [formData, setFormData] = useState({
    // id: "",
    name: "",
    address: "",
    details: "",
    age: null,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!window.confirm("Are you sure you want to submit the form?")) {
      return;
    }
    setLoading(true);
    setError("");

    try {
      const accessToken = sessionStorage.getItem("accessToken");
      if (!accessToken) {
        throw new Error("User is not logged in. Please log in to continue.");
      }

      const finalData = {
        ...formData,
      };

      const response = await axios.post(
        `${BASEURL}/data/insertAffidavid`,
        finalData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      alert("Request submitted successfully!");
      console.log(response.data);
      window.location.reload();
    } catch (error) {
      console.error("Failed to submit data", error);
      setError("Failed to submit data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file") {
      setFormData((prev) => ({
        ...prev,
        [name]: files[0],
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <div className="bg-green-900 text-white p-4 rounded-b-[20px] relative">
        <div className="flex items-center justify-between">
          <Link to={"/Services"}>
            <button className="text-white text-[30px] font-extrabold">
              <IoIosArrowBack />
            </button>
          </Link>
          <h1 className="text-white font-extrabold text-2xl">GIA</h1>
          <div className="rounded-full bg-white p-2 px-3">
            <FontAwesomeIcon icon={faUser} className="text-blue-600" />
          </div>
        </div>
      </div>
      <h1 className="text-xl font-bold text-center mb-4">
        Affidavid Form
      </h1>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <div className="lg:grid lg:grid-cols-3 gap-4 mb-4 bg-white mx-10 p-5 rounded-lg">
        <div className="mb-4">
          <label>Name</label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              name="name"
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
        </div>
        <div className="mb-4">
          <label>Age</label>
          <div className="flex items-center gap-2">
            <input
              type="number"
              name="age"
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
        </div>
        <div className="mb-4">
          <label>Details</label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              name="details"
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
        </div>
        <div className="mb-4">
          <label>address</label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              name="address"
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
        </div>
        <div className="flex w-full justify-center p-4 bg-gray-100">
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full max-w-md bg-blue-500 text-white p-3 rounded"
          >
            {loading ? "Submitting..." : "Submit Request"}
          </button>
        </div>
      </div>
    </div>
  );
}
