import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IoIosArrowBack } from "react-icons/io";
import { faBars, faUser } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import axios from "axios";

export default function RentalAgreementPage() {
  const BASEURL = import.meta.env.VITE_API_URL_USERS;
  const [formData, setFormData] = useState({
    property_type: "",
    property_address: "",
    leaser_name: "",
    leaser_aadhar_url: null,
    leaser_pan_url: null,
    leaser_contact: "",
    tenant_name: "",
    tenant_aadhar_url: null,
    tenant_pan_url: null,
    tenant_contact: "",
    rental_start_date: "",
    rental_end_date: "",
    monthly_rent: "",
    witness1_name: "",
    witness1_aadhar_url: null,
    witness1_contact: "",
    witness2_name: "",
    witness2_aadhar_url: null,
    witness2_contact: "",
    agreement_document_url: null,
    stamp_duty_url: null,
    registration_fee_url: null,
    narration: "",
    service_type: "",
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
      const accessToken = sessionStorage.getItem("accessToken");
      console.log(accessToken);
      if (!accessToken) {
        throw new Error("User is not logged in. Please log in to continue.");
      }
      const leaser_aadhar_url = await uploadFile(formData.leaser_aadhar_url);
      const leaser_pan_url = await uploadFile(formData.leaser_pan_url);
      const tenant_aadhar_url = await uploadFile(formData.tenant_aadhar_url);
      const tenant_pan_url = await uploadFile(formData.tenant_pan_url);
      const witness1_aadhar_url = await uploadFile(
        formData.witness1_aadhar_url
      );
      const witness2_aadhar_url = await uploadFile(
        formData.witness2_aadhar_url
      );
      const agreement_document_url = await uploadFile(
        formData.agreement_document_url
      );
      const stamp_duty_url = await uploadFile(formData.stamp_duty_url);
      const registration_fee_url = await uploadFile(
        formData.registration_fee_url
      );

      const finalData = {
        property_type: formData.property_type,
        property_address: formData.property_address,
        leaser_name: formData.leaser_name,
        leaser_aadhar_url,
        leaser_pan_url,
        leaser_contact: formData.leaser_contact,
        tenant_name: formData.tenant_name,
        tenant_aadhar_url,
        tenant_pan_url,
        tenant_contact: formData.tenant_contact,
        rental_start_date: formData.rental_start_date,
        rental_end_date: formData.rental_end_date,
        monthly_rent: formData.monthly_rent,
        witness1_name: formData.witness1_name,
        witness1_aadhar_url,
        witness1_contact: formData.witness1_contact,
        witness2_name: formData.witness2_name,
        witness2_aadhar_url,
        witness2_contact: formData.witness2_contact,
        agreement_document_url,
        stamp_duty_url,
        registration_fee_url,
        narration: formData.narration,
        service_type: formData.service_type,
      };

      const response = await axios.post(
        `${BASEURL}/data/insertRentalAgreements`,
        finalData, // The request body
        {
          headers: {
            Authorization: `Bearer ${accessToken}`, // Include the access token
          },
        }
      );

      alert("Rental Agreement data submitted successfully!");
      console.log(response.data);
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
        Rental Agreement Form
      </h1>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <div className="lg:grid lg:grid-cols-3 gap-4 mb-4 bg-white mx-10 p-5 rounded-lg">
        <div className="mb-4">
          <label>Property Type</label>
          <input
            type="text"
            name="property_type"
            value={formData.property_type}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label>Property Address</label>
          <input
            type="text"
            name="property_address"
            value={formData.property_address}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label>Leaser Name</label>
          <input
            type="text"
            name="leaser_name"
            value={formData.leaser_name}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label>Leaser Contact</label>
          <input
            type="number"
            name="leaser_contact"
            value={formData.leaser_contact}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label>Leaser Aadhar (Upload file)</label>
          <input
            type="file"
            name="leaser_aadhar_url"
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label>Leaser PAN (Upload file)</label>
          <input
            type="file"
            name="leaser_pan_url"
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label>Tenant Name</label>
          <input
            type="text"
            name="tenant_name"
            value={formData.tenant_name}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label>Tenant Contact</label>
          <input
            type="number"
            name="tenant_contact"
            value={formData.tenant_contact}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label>Tenant Aadhar (Upload file)</label>
          <input
            type="file"
            name="tenant_aadhar_url"
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label>Tenant PAN (Upload file)</label>
          <input
            type="file"
            name="tenant_pan_url"
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label>Rental Start Date</label>
          <input
            type="date"
            name="rental_start_date"
            value={formData.rental_start_date}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label>Rental End Date</label>
          <input
            type="date"
            name="rental_end_date"
            value={formData.rental_end_date}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label>Monthly Rent</label>
          <input
            type="number"
            name="monthly_rent"
            value={formData.monthly_rent}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label>Witness 1 Name</label>
          <input
            type="text"
            name="witness1_name"
            value={formData.witness1_name}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label>Witness 1 Aadhar (Upload file)</label>
          <input
            type="file"
            name="witness1_aadhar_url"
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label>Witness 1 Contact</label>
          <input
            type="number"
            name="witness1_contact"
            value={formData.witness1_contact}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label>Witness 2 Name</label>
          <input
            type="text"
            name="witness2_name"
            value={formData.witness2_name}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label>Witness 2 Aadhar (Upload file)</label>
          <input
            type="file"
            name="witness2_aadhar_url"
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label>Witness 2 Contact</label>
          <input
            type="number"
            name="witness2_contact"
            value={formData.witness2_contact}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label>Agreement Document (Upload file)</label>
          <input
            type="file"
            name="agreement_document_url"
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label>Stamp Duty Document (Upload file)</label>
          <input
            type="file"
            name="stamp_duty_url"
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label>Registration Fee Document (Upload file)</label>
          <input
            type="file"
            name="registration_fee_url"
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label>Agreement Narration</label>
          <textarea
            name="narration"
            value={formData.narration}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label>Service Type</label>
          <input
            type="text"
            name="service_type"
            value={formData.service_type}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-blue-500 text-white p-3 rounded mt-4"
        >
          {loading ? "Submitting..." : "Submit Agreement"}
        </button>
      </div>
    </div>
  );
}
