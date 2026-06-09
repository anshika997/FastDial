import React, { useState } from "react";
import { Link } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
export default function PartnerRegistrationForm() {
  const BASEURL = import.meta.env.VITE_API_URL_USERS;
  const [formData, setFormData] = useState({
    partner_id: "",
    id_partners: "",
    partnership_deep: "",
    partner_name: "",
    partner_pan_url: null,
    partner_aadhar_url: null,
    partner_photo_url: null,
    partner_contact: "",
    firm_pan_url: null,
    bussiness_address_proof_url: null,
    bank_acc_number: "",
    bank_acc_name: "",
    bank_ifsc_code: "",
    gst_auth_partner_letter_url: null,
    status: "",
    assigned_vendor: "",
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
        partner_pan_url: await uploadFile(formData.partner_pan_url),
        partner_aadhar_url: await uploadFile(formData.partner_aadhar_url),
        partner_photo_url: await uploadFile(formData.partner_photo_url),
        firm_pan_url: await uploadFile(formData.firm_pan_url),
        bussiness_address_proof_url: await uploadFile(
          formData.bussiness_address_proof_url
        ),
        gst_auth_partner_letter_url: await uploadFile(
          formData.gst_auth_partner_letter_url
        ),
      };
      const response = await axios.post(
        `${BASEURL}/data/insertGstRegistrationpartnership`,
        finalData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      alert("Partner Registration submitted successfully!");
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
      <h1 className="text-xl font-bold text-center mb-4">
        Partner Registration
      </h1>
      {error && <div className="text-red-500 text-center mt-4">{error}</div>}

      <div className="bg-white mx-10 p-5 mt-6 rounded-lg shadow-lg">
        <div className="grid lg:grid-cols-3 gap-4">
          <div>
            <label>Partner ID</label>
            <input
              type="text"
              name="partner_id"
              value={formData.partner_id}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label>Partners JSON</label>
            <textarea
              name="id_partners"
              value={formData.id_partners}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            ></textarea>
          </div>
          <div>
            <label>Partnership Deep</label>
            <input
              type="text"
              name="partnership_deep"
              value={formData.partnership_deep}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label>Partner Name</label>
            <input
              type="text"
              name="partner_name"
              value={formData.partner_name}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label>Partner PAN (Upload file)</label>
            <input
              type="file"
              name="partner_pan_url"
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label>Partner Aadhar (Upload file)</label>
            <input
              type="file"
              name="partner_aadhar_url"
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label>Partner Photo (Upload file)</label>
            <input
              type="file"
              name="partner_photo_url"
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label>Partner Contact</label>
            <input
              type="text"
              name="partner_contact"
              value={formData.partner_contact}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label>Firm PAN (Upload file)</label>
            <input
              type="file"
              name="firm_pan_url"
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
          <div>
            <label>Bank Account Number</label>
            <input
              type="text"
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
            <label>GST Authorization Letter (Upload file)</label>
            <input
              type="file"
              name="gst_auth_partner_letter_url"
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
