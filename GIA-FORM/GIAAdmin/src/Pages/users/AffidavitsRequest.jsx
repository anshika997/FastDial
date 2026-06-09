import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IoIosArrowBack } from "react-icons/io";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import axios from "axios";
import { FaEye } from "react-icons/fa";

export default function AffidavitsRequest() {
  const BASEURL = import.meta.env.VITE_API_URL_USERS;
  const accessToken = sessionStorage.getItem("accessToken");
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    date: new Date().toISOString().split("T")[0], // Extracts only the date part (YYYY-MM-DD)
    place: "",
    statement: "",
    id_proof_url: null,
    address_proof_url: null,
    supporting_docs_url: null,
    photo_url: null,
    witness_name: "",
    witness_signature_url: null,
    notarization_certificate_url: null,

    service_type: "AffidavitsRequest",
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
    setLoading(true);
    setError("");

    try {
      console.log(accessToken);
      if (!accessToken) {
        throw new Error("User is not logged in. Please log in to continue.");
      }
      const id_proof_url = await uploadFile(formData.id_proof_url);
      const address_proof_url = await uploadFile(formData.address_proof_url);
      const supporting_docs_url = await uploadFile(
        formData.supporting_docs_url
      );
      const photo_url = await uploadFile(formData.photo_url);
      const witness_signature_url = await uploadFile(
        formData.witness_signature_url
      );
      const notarization_certificate_url = await uploadFile(
        formData.notarization_certificate_url
      );
      const finalData = {
        ...formData,
        id_proof_url,
        address_proof_url,
        supporting_docs_url,
        photo_url,
        witness_signature_url,
        notarization_certificate_url,
      };

      const response = await axios.post(
        `${BASEURL}/data/insertAffidavitsRequest`,
        finalData, // The request body
        {
          headers: {
            Authorization: `Bearer ${accessToken}`, // Include the access token
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
    setFormData((prev) =>
      type === "file"
        ? { ...prev, [name]: files[0] }
        : { ...prev, [name]: value }
    );
  };
  const previewFile = (file) => {
    if (file) {
      const fileURL = URL.createObjectURL(file); // Convert the File object to a URL
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
        Affidavit Registration Form
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
          <label>Address</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="mb-4">
          <label>Place</label>
          <input
            type="text"
            name="place"
            value={formData.place}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label>Statement</label>
          <input
            type="text"
            name="statement"
            value={formData.statement}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label>ID Proof (Upload file)</label>
          <div className="flex items-center gap-2">
            <input
              type="file"
              name="id_proof_url"
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
            <button
              type="button"
              onClick={() => previewFile(formData.id_proof_url)}
              className="text-blue-500"
            >
              <FaEye />
            </button>
          </div>
        </div>
        <div className="mb-4">
          <label>Address Proof (Upload file)</label>
          <div className="flex items-center gap-2">
            <input
              type="file"
              name="address_proof_url"
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
            <button
              type="button"
              onClick={() => previewFile(formData.address_proof_url)}
              className="text-blue-500"
            >
              <FaEye />
            </button>
          </div>
        </div>
        <div className="mb-4">
          <label>Supporting Documents (Upload file)</label>
          <div className="flex items-center gap-2">
            <input
              type="file"
              name="supporting_docs_url"
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
            <button
              type="button"
              onClick={() => previewFile(formData.supporting_docs_url)}
              className="text-blue-500"
            >
              <FaEye />
            </button>
          </div>
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
          <label>Witness Name</label>
          <input
            type="text"
            name="witness_name"
            value={formData.witness_name}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label>Witness Signature (Upload file)</label>
          <div className="flex items-center gap-2">
            <input
              type="file"
              name="witness_signature_url"
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
            <button
              type="button"
              onClick={() => previewFile(formData.witness_signature_url)}
              className="text-blue-500"
            >
              <FaEye />
            </button>
          </div>
        </div>
        <div className="mb-4">
          <label>Notarization Certificate (Upload file)</label>
          <div className="flex items-center gap-2">
            <input
              type="file"
              name="notarization_certificate_url"
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
            <button
              type="button"
              onClick={() => previewFile(formData.id_proof_url)}
              className="text-blue-500"
            >
              <FaEye />
            </button>
          </div>
        </div>
        <div className="mb-4"></div>
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
