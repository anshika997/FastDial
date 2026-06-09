import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IoIosArrowBack } from "react-icons/io";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import axios from "axios";
import { FaEye } from "react-icons/fa";

export default function AffidavitsRequest() {
  const BASEURL = import.meta.env.VITE_API_URL_ADMIN;
  const [formData, setFormData] = useState({
    // id: "",
    name: "",
    photo_url: null,
    aadhar_url: null,
    residental_proof_url: null,
    bank_statement_url: null,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const uploadFile = async (file) => {
    if (!file) return null;
    const uploadData = new FormData();
    uploadData.append("image", file);

    try {
      const response = await axios.post(
        "https://experience-pavillion.com/api/v1/global/upload/file",
        uploadData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data.url;
    } catch (err) {
      console.error("File upload failed", err);
      setError("File upload failed. Please try again.");
      return null;
    }
  };

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
      const photo_url = await uploadFile(formData.photo_url);
      const residental_proof_url = await uploadFile(
        formData.residental_proof_url
      );
      const name = formData.name;
      const aadhar_url = await uploadFile(formData.aadhar_url);
      const bank_statement_url = await uploadFile(formData.bank_statement_url);

      const finalData = {
        ...formData,
        name,
        photo_url,
        residental_proof_url,
        aadhar_url,
        bank_statement_url,
      };

      const response = await axios.post(
        `${BASEURL}/data/insertPanRegistrations`, // Updated API endpoint
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

  const previewFile = (file) => {
    if (file) {
      const fileURL = URL.createObjectURL(file);
      window.open(fileURL, "_blank");
    } else {
      alert("No document available to preview!");
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
        Insert Pan Registration Form
      </h1>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <div className="lg:grid lg:grid-cols-3 gap-4 mb-4 bg-white mx-10 p-5 rounded-lg">
        <div className="mb-4">
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label>Photo (Upload file)</label>
          <div className="flex items-center gap-2">
            <input
              type="file"
              name="photo_url"
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
            <button
              type="button"
              onClick={() => previewFile(formData.photo_url)}
              className="text-blue-500"
            >
              <FaEye />
            </button>
          </div>
        </div>
        <div className="mb-4">
          <label>Residental proof (Upload file)</label>
          <div className="flex items-center gap-2">
            <input
              type="file"
              name="residental_proof_url"
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
            <button
              type="button"
              onClick={() => previewFile(formData.residental_proof_url)}
              className="text-blue-500"
            >
              <FaEye />
            </button>
          </div>
        </div>
        <div className="mb-4">
          <label>Aadhar Card (Upload file)</label>
          <div className="flex items-center gap-2">
            <input
              type="file"
              name="aadhar_url"
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
            <button
              type="button"
              onClick={() => previewFile(formData.aadhar_url)}
              className="text-blue-500"
            >
              <FaEye />
            </button>
          </div>
        </div>
        <div className="mb-4">
          <label>Bank Statement (Upload file)</label>
          <div className="flex items-center gap-2">
            <input
              type="file"
              name="bank_statement_url"
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
            <button
              type="button"
              onClick={() => previewFile(formData.bank_statement_url)}
              className="text-blue-500"
            >
              <FaEye />
            </button>
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
