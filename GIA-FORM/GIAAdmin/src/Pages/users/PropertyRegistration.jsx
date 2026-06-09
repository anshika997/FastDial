import React, { useState } from "react";
import { Link } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

export default function PropertyRegistration() {
  const BASEURL = import.meta.env.VITE_API_URL_USERS;
  const [formData, setFormData] = useState({
    sales_deed_url: null,
    khata_certificate_url: null,
    khata_extract_url: null,
    property_tax_paid_reciept: null,
    pan_card_url: null,
    aadhar_url: null,
    driving_lisence: null,
    passport_url: null,
    noc_url: null,
    occupancy_url: null,
    approved_building_plan: null,
    power_of_attorny: null,
    stamp_duty_url: null,
    registration_fee_url: null,
    assigned_vendor: "",
    rejected_by: "",
    rejected_reason: "",
    narration: "",
    service_type: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Function to handle input change
  const handleChange = (e) => {
    const { name, type, value, files } = e.target;
    setFormData((prev) =>
      type === "file"
        ? { ...prev, [name]: files[0] }
        : { ...prev, [name]: value }
    );
  };

  // Function to upload a single file
  const uploadFile = async (file) => {
    if (!file) return null;
    const uploadData = new FormData();
    uploadData.append("image", file);

    try {
      const response = await axios.post(
        "https://experience-pavillion.com/api/v1/global/upload/file",

        uploadData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      return response.data.url;
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
      const accessToken = sessionStorage.getItem("accessToken");
      console.log(accessToken);
      if (!accessToken) {
        throw new Error("User is not logged in. Please log in to continue.");
      }
      // Upload files and prepare final data
      const sales_deed_url = await uploadFile(formData.sales_deed_url);
      const khata_certificate_url = await uploadFile(
        formData.khata_certificate_url
      );
      const khata_extract_url = await uploadFile(formData.khata_extract_url);
      const property_tax_paid_reciept = await uploadFile(
        formData.property_tax_paid_reciept
      );
      const pan_card_url = await uploadFile(formData.pan_card_url);
      const aadhar_url = await uploadFile(formData.aadhar_url);
      const driving_lisence = await uploadFile(formData.driving_lisence);
      const passport_url = await uploadFile(formData.passport_url);
      const noc_url = await uploadFile(formData.noc_url);
      const occupancy_url = await uploadFile(formData.occupancy_url);
      const approved_building_plan = await uploadFile(
        formData.approved_building_plan
      );
      const power_of_attorny = await uploadFile(formData.power_of_attorny);
      const stamp_duty_url = await uploadFile(formData.stamp_duty_url);
      const registration_fee_url = await uploadFile(
        formData.registration_fee_url
      );

      const finalData = {
        sales_deed_url,
        khata_certificate_url,
        khata_extract_url,
        property_tax_paid_reciept,
        pan_card_url,
        aadhar_url,
        driving_lisence,
        passport_url,
        noc_url,
        occupancy_url,
        approved_building_plan,
        power_of_attorny,
        stamp_duty_url,
        registration_fee_url,
        // assigned_vendor: formData.assigned_vendor,
        rejected_by: formData.rejected_by,
        rejected_reason: formData.rejected_reason,
        narration: formData.narration,
        service_type: formData.service_type,
      };

      const response = await axios.post(
        `${BASEURL}/data/insertPropertyRegistrationRequests`,
        finalData, // The request body
        {
          headers: {
            Authorization: `Bearer ${accessToken}`, // Include the access token
          },
        }
      );

      alert("Property registration submitted successfully!");
      console.log(response.data);
    } catch (err) {
      console.error("Failed to submit data", err);
      setError("Failed to submit data. Please try again.");
    } finally {
      setLoading(false);
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

      <h1 className="text-xl font-bold text-center my-4">
        Property Registration Form
      </h1>
      {error && <div className="text-red-500 mb-4">{error}</div>}

      <div className="lg:grid lg:grid-cols-3 gap-4 mb-4 bg-white mx-10 p-5 rounded-lg">
        {/* Input Fields */}
        <div className="mb-4">
          <label>Sales Deed (Upload file)</label>
          <input
            type="file"
            name="sales_deed_url"
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label>Khata Certificate (Upload file)</label>
          <input
            type="file"
            name="khata_certificate_url"
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label>Khata Extract (Upload file)</label>
          <input
            type="file"
            name="khata_extract_url"
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label>Property Tax Paid Receipt (Upload file)</label>
          <input
            type="file"
            name="property_tax_paid_reciept"
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label>PAN Card (Upload file)</label>
          <input
            type="file"
            name="pan_card_url"
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label>Aadhar (Upload file)</label>
          <input
            type="file"
            name="aadhar_url"
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label>Driving License (Upload file)</label>
          <input
            type="file"
            name="driving_lisence"
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label>Passport (Upload file)</label>
          <input
            type="file"
            name="passport_url"
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label>NOC (Upload file)</label>
          <input
            type="file"
            name="noc_url"
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label>Occupancy Certificate (Upload file)</label>
          <input
            type="file"
            name="occupancy_url"
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label>Approved Building Plan (Upload file)</label>
          <input
            type="file"
            name="approved_building_plan"
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label>Power of Attorney (Upload file)</label>
          <input
            type="file"
            name="power_of_attorny"
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label>Stamp Duty (Upload file)</label>
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
          <label>Assigned Vendor</label>
          <input
            type="text"
            name="assigned_vendor"
            value={formData.assigned_vendor} // Correct field name
            onChange={(e) => {
              // Allow only numbers and limit to 10 characters
              const value = e.target.value;
              if (/^\d*$/.test(value) && value.length <= 10) {
                handleChange(e);
              }
            }}
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="mb-4">
          <label>Rejected By</label>
          <input
            type="text"
            name="rejected_by"
            value={formData.rejected_by}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label>Rejected Reason</label>
          <input
            type="text"
            name="rejected_reason"
            value={formData.rejected_reason}
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
        <div className="mb-4 col-span-3">
          <label>Narration</label>
          <textarea
            name="narration"
            value={formData.narration}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="col-span-3 w-full">
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-1/3 bg-blue-500 text-white p-3 rounded mt-4"
          >
            {loading ? "Submitting..." : "Submit Registration"}
          </button>
        </div>
      </div>
    </div>
  );
}
