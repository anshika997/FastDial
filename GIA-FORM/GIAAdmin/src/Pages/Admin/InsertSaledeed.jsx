import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IoIosArrowBack } from "react-icons/io";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import axios from "axios";
import { FaEye } from "react-icons/fa";

export default function AffidavitsRequest() {
  const BASEURL =
    import.meta.env.VITE_API_URL_ADMIN || "https://default-url.com/api"; // Fallback URL
  const [formData, setFormData] = useState({
    purchaser_details: "",
    seller_details: "",
    sale_amount: "",
    advance_received: "",
    tax_receipt_URL: null,
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

      const tax_receipt_URL = await uploadFile(formData.tax_receipt_URL);

      const finalData = {
        ...formData,
        tax_receipt_URL,
      };

      const response = await axios.post(
        `${BASEURL}/data/insertSaledeed`,
        finalData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      alert("Request submitted successfully!");
      console.log(response.data);
      window.location.reload();
    } catch (err) {
      console.error("Failed to submit data", err);
      const message =
        err.response?.data?.message ||
        err.message ||
        "Failed to submit data. Please try again.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData((prev) =>
      type === "file"
        ? { ...prev, [name]: files[0] }
        : { ...prev, [name]: value }
    );
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
        Saledeed Registration Form
      </h1>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <div className="lg:grid lg:grid-cols-3 gap-4 mb-4 bg-white mx-10 p-5 rounded-lg">
        <div className="mb-4">
          <label>Purchaser Details:</label>
          <input
            type="text"
            name="purchaser_details"
            value={formData.purchaser_details}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label>Seller Details:</label>
          <input
            type="text"
            name="seller_details"
            value={formData.seller_details}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label>Sale Amount:</label>
          <input
            type="number"
            name="sale_amount"
            value={formData.sale_amount}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label>Advance Received:</label>
          <input
            type="number"
            name="advance_received"
            value={formData.advance_received}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label>Tax Receipt: (Upload File)</label>
          <div className="flex items-center gap-2">
            <input
              type="file"
              name="tax_receipt_URL"
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
            <button
              type="button"
              onClick={() => previewFile(formData.tax_receipt_URL)}
              className="text-blue-500"
            >
              <FaEye />
            </button>
          </div>
        </div>
        <div className="flex w-full justify-between">
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-blue-500 text-white p-3 rounded mt-4"
          >
            {loading ? "Submitting..." : "Submit Request"}
          </button>
        </div>
      </div>
    </div>
  );
}
