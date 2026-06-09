import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IoIosArrowBack } from "react-icons/io";
import Select from "react-select";
import {
  faBars,
  faUser,
  faTrash,
  faEye,
  faEdit,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import axios from "axios";
export default function BusinessRegistrationForm() {
  const BASEURL = import.meta.env.VITE_API_URL_USERS;
  const [formData, setFormData] = useState({
    photo_url: null,
    pan_url: null,
    aadhar_url: null,
    bank_acc_number: "",
    bank_acc_name: "",
    bank_ifsc_code: "",
    email_id: "",
    contact_number: "",
    bussiness_nature: "",
    bussiness_address_proof_url: null,
    status: "",
    assigned_vendor: null,
    rejected_by: "",
    rejected_reason: "",
    narration: "",
    service_type: "",
  });
  const accessToken = sessionStorage.getItem("accessToken");

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
      const finalData = {
        ...formData,
        photo_url: await uploadFile(formData.photo_url),
        pan_url: await uploadFile(formData.pan_url),
        aadhar_url: await uploadFile(formData.aadhar_url),
        bussiness_address_proof_url: await uploadFile(
          formData.bussiness_address_proof_url
        ),
      };

      const response = await axios.post(
        `${BASEURL}/data/insertGstRegistrationproprietorship`,
        finalData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      alert("Business Registration submitted successfully!");
      console.log(response.data);
    } catch (err) {
      console.error("Failed to submit data", err);
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

      <div className="px-10 flex items-center justify-between"></div>
      <h1 className="text-xl font-bold text-center mb-4">
        Business Registration Form{" "}
      </h1>

      {error && <div className="text-red-500 text-center mt-4">{error}</div>}

      <div className="bg-white mx-10 p-5 mt-6 rounded-lg shadow-lg">
        <div className="grid lg:grid-cols-3 gap-4">
          <div>
            <label>Photo (Upload file)</label>
            <input
              type="file"
              name="photo_url"
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label>PAN (Upload file)</label>
            <input
              type="file"
              name="pan_url"
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label>Aadhar (Upload file)</label>
            <input
              type="file"
              name="aadhar_url"
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label>Bank Account Number</label>
            <input
              type="number"
              name="bank_acc_number"
              value={formData.bank_acc_number}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label>Bank Account Name</label>
            <input
              type="text"
              name="bank_acc_name"
              value={formData.bank_acc_name}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label>Bank IFSC Code</label>
            <input
              type="text"
              name="bank_ifsc_code"
              value={formData.bank_ifsc_code}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label>Email ID</label>
            <input
              type="email"
              name="email_id"
              value={formData.email_id}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label>Contact Number</label>
            <input
              type="number"
              name="contact_number"
              value={formData.contact_number}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label>Business Nature</label>
            <input
              type="text"
              name="bussiness_nature"
              value={formData.bussiness_nature}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label>Business Address Proof (Upload file)</label>
            <input
              type="file"
              name="bussiness_address_proof_url"
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="bg-blue-500 text-white  p-3 rounded mt-4"
        >
          {loading ? "Submitting..." : "Submit Registration"}
        </button>
      </div>
    </div>
  );
}
