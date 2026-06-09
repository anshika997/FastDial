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

export default function GstRegistrationPage() {
  const BASEURL = import.meta.env.VITE_API_URL_USERS;
  const [formData, setFormData] = useState({
    director_name: "",
    director_din: "",
    director_pan_url: null,
    director_aadhar_url: null,
    director_photo_url: null,
    director_contact: "",
    company_pan_url: null,
    bussiness_address_proof_url: null,
    bank_acc_number: "",
    bank_acc_name: "",
    bank_ifsc_code: "",
    email: "",
    bussiness_nature: "",
    import_export_code: "",
    gst_auth_director_letter_url: null,
    status: "",
  });
  const accessToken = sessionStorage.getItem("accessToken");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Function to handle file uploads and get URLs
  const uploadFile = async (file) => {
    if (!file) return null; // Handle missing files gracefully
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
      return response.data.url; // Assuming the response contains a `url` field
    } catch (err) {
      console.error("File upload failed", err);
      setError("File upload failed. Please try again.");
      return null;
    }
  };

  // Function to handle form submission
  const handleSubmit = async () => {
    setLoading(true);
    setError("");

    try {
      // Upload files and get their URLs
      const articles_association_url = await uploadFile(
        formData.articles_association_url
      );
      const moa_url = await uploadFile(formData.moa_url);
      const company_certificate_url = await uploadFile(
        formData.company_certificate_url
      );
      const director_pan_url = await uploadFile(formData.director_pan_url);
      const director_aadhar_url = await uploadFile(
        formData.director_aadhar_url
      );
      const director_photo_url = await uploadFile(formData.director_photo_url);
      const bussiness_address_proof_url = await uploadFile(
        formData.bussiness_address_proof_url
      );
      const gst_auth_director_letter_url = await uploadFile(
        formData.gst_auth_director_letter_url
      );

      // Construct final data object
      // Construct final data object in the required format
      const finalData = {
        director_id: 1,
        articles_association_url,
        moa_url,
        company_certificate_url,
        director_name: formData.director_name,
        director_din: formData.director_din,
        director_pan_url,
        director_aadhar_url,
        director_photo_url,
        director_contact: formData.director_contact,
        company_pan_url: await uploadFile(formData.company_pan_url),
        bussiness_address_proof_url,
        bank_acc_number: formData.bank_acc_number,
        bank_acc_name: formData.bank_acc_name,
        bank_ifsc_code: formData.bank_ifsc_code,
        email: formData.email,
        bussiness_nature: formData.bussiness_nature,
        import_export_code: formData.import_export_code,
        gst_auth_director_letter_url,
        status: formData.status || null, // Use null if status is not provided
      };

      // Make API call to submit GST registration data
      const response = await axios.post(
        `${BASEURL}/data/insertGstRegistrationCompany`,
        finalData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      alert("GST Registration data submitted successfully!");
      console.log(response.data);
    } catch (error) {
      console.error("Failed to submit data", error);
      setError("Failed to submit data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Handle input changes
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

      <div className="px-10 flex items-center justify-between"></div>
      <h1 className="text-xl font-bold text-center mb-4">
        GST Registration Form
      </h1>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <div className="lg:grid lg:grid-cols-3 gap-4 mb-4 bg-white mx-10 p-5 rounded-lg">
        <div className="mb-4">
          <label>Director Name</label>
          <input
            type="text"
            name="director_name"
            value={formData.director_name}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label>Director Number</label>
          <input
            type="number"
            name="director_contact"
            value={formData.director_contact}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label>Director DIN</label>
          <input
            type="text"
            name="director_din"
            value={formData.director_din}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label>Director PAN (Upload file)</label>
          <input
            type="file"
            name="director_pan_url"
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label>Director Aadhar (Upload file)</label>
          <input
            type="file"
            name="director_aadhar_url"
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label>Director Photo (Upload file)</label>
          <input
            type="file"
            name="director_photo_url"
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label>Company PAN (Upload file)</label>
          <input
            type="file"
            name="company_pan_url"
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label>Business Address Proof (Upload file)</label>
          <input
            type="file"
            name="bussiness_address_proof_url"
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label>Bank Account Number</label>
          <input
            type="text"
            name="bank_acc_number"
            value={formData.bank_acc_number}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label>Bank Account Name</label>
          <input
            type="text"
            name="bank_acc_name"
            value={formData.bank_acc_name}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label>Bank IFSC Code</label>
          <input
            type="text"
            name="bank_ifsc_code"
            value={formData.bank_ifsc_code}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label>Business Nature</label>
          <input
            type="text"
            name="bussiness_nature"
            value={formData.bussiness_nature}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label>Import Export Code</label>
          <input
            type="text"
            name="import_export_code"
            value={formData.import_export_code}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label>GST Authorization Director Letter URL (Upload file)</label>
          <input
            type="file"
            name="gst_auth_director_letter_url"
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-blue-500 text-white p-3 rounded mt-4"
        >
          {loading ? "Submitting..." : "Submit Registration"}
        </button>
      </div>
    </div>
  );
}
