import React, { useState, useEffect } from 'react';
import NevbarMain from '../../components/NevbarMain';
import SideNevbar from '../../components/SideNevBar';
import axios from 'axios';

function Addvendor() {
  const [formData, setFormData] = useState({
    vendor_name: '',
    vendor_email: '',
    vendor_password: '',
    vendor_mobile: '',
    name_of_bussiness: '',
    bussiness_category: '',
    fast_service_category_name: '',
    bussiness_proof_doc_url: '',
    gst_number: '',
    company_category: '',
    service_radius: '',
    pincode: '',
    service_start_time: '',
    service_end_time: '',
    bussiness_desc: '',
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const token = localStorage.getItem('adminToken');
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/admin/data/getSERVICE_CATEGORIES`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setCategories(res.data || []);
      } catch (err) {
        console.error('Failed to fetch categories:', err);
      }
    };
    fetchCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ text: '', type: '' });

    if (!formData.vendor_name || !formData.vendor_email || !formData.vendor_password || !formData.name_of_bussiness || !formData.bussiness_category) {
      setMessage({ text: 'Please fill all required fields (Name, Email, Password, Business Name, Category)', type: 'error' });
      setLoading(false);
      return;
    }

    if (formData.vendor_password.length < 6) {
      setMessage({ text: 'Password must be at least 6 characters', type: 'error' });
      setLoading(false);
      return;
    }

    try {
      const token = localStorage.getItem('adminToken');
      await axios.post(
        `${import.meta.env.VITE_API_URL}/admin/data/insertvendor`,
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage({ text: 'Vendor added successfully! They can now login with the email and password.', type: 'success' });
      setFormData({
        vendor_name: '',
        vendor_email: '',
        vendor_password: '',
        vendor_mobile: '',
        name_of_bussiness: '',
        bussiness_category: '',
        fast_service_category_name: '',
        bussiness_proof_doc_url: '',
        gst_number: '',
        company_category: '',
        service_radius: '',
        pincode: '',
        service_start_time: '',
        service_end_time: '',
        bussiness_desc: '',
      });
    } catch (err) {
      setMessage({
        text: err.response?.data?.message || 'Failed to add vendor',
        type: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  const inputClass = 'w-full border border-gray-300 p-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition text-sm';
  const labelClass = 'block text-sm font-medium text-gray-600 mb-1';

  return (
    <>
      <NevbarMain />
      <div className="flex h-screen">
        <SideNevbar />
        <div className="flex-1 p-6 pt-5 overflow-y-auto bg-gray-50">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Add Vendor</h2>

          {message.text && (
            <div
              className={`mb-4 p-3 rounded-lg text-sm font-medium ${
                message.type === 'success'
                  ? 'bg-green-100 text-green-700 border border-green-300'
                  : 'bg-red-100 text-red-700 border border-red-300'
              }`}
            >
              {message.text}
            </div>
          )}

          <div className="bg-white p-6 shadow-md rounded-xl">
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Vendor Details Section */}
              <h3 className="col-span-full text-lg font-semibold text-blue-600 border-b border-blue-100 pb-2">
                Vendor Details
              </h3>

              <div>
                <label htmlFor="vendor_name" className={labelClass}>Full Name *</label>
                <input type="text" id="vendor_name" name="vendor_name" value={formData.vendor_name} onChange={handleChange} className={inputClass} placeholder="Enter vendor name" required />
              </div>

              <div>
                <label htmlFor="vendor_email" className={labelClass}>Email *</label>
                <input type="email" id="vendor_email" name="vendor_email" value={formData.vendor_email} onChange={handleChange} className={inputClass} placeholder="vendor@example.com" required />
              </div>

              <div>
                <label htmlFor="vendor_password" className={labelClass}>Password *</label>
                <input type="password" id="vendor_password" name="vendor_password" value={formData.vendor_password} onChange={handleChange} className={inputClass} placeholder="Min 6 characters" required minLength={6} />
                <p className="text-xs text-gray-400 mt-1">Vendor will use this password to login</p>
              </div>

              <div>
                <label htmlFor="vendor_mobile" className={labelClass}>Mobile Number</label>
                <input type="tel" id="vendor_mobile" name="vendor_mobile" value={formData.vendor_mobile} onChange={handleChange} className={inputClass} placeholder="9876543210" />
              </div>

              {/* Business Details Section */}
              <h3 className="col-span-full text-lg font-semibold text-blue-600 border-b border-blue-100 pb-2 mt-4">
                Business Details
              </h3>

              <div>
                <label htmlFor="name_of_bussiness" className={labelClass}>Business Name *</label>
                <input type="text" id="name_of_bussiness" name="name_of_bussiness" value={formData.name_of_bussiness} onChange={handleChange} className={inputClass} placeholder="Enter business name" required />
              </div>

              <div>
                <label htmlFor="bussiness_category" className={labelClass}>Business Category *</label>
                <select id="bussiness_category" name="bussiness_category" value={formData.bussiness_category} onChange={handleChange} className={inputClass} required>
                  <option value="">Select category</option>
                  {categories.map((cat) => (
                    <option key={cat.service_cat_id} value={cat.service_category_name}>
                      {cat.service_category_name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="fast_service_category_name" className={labelClass}>Sub Category</label>
                <input type="text" id="fast_service_category_name" name="fast_service_category_name" value={formData.fast_service_category_name} onChange={handleChange} className={inputClass} placeholder="Service sub-category" />
              </div>

              <div>
                <label htmlFor="gst_number" className={labelClass}>GST Number</label>
                <input type="text" id="gst_number" name="gst_number" value={formData.gst_number} onChange={handleChange} className={inputClass} placeholder="GST number" />
              </div>

              <div>
                <label htmlFor="company_category" className={labelClass}>Company Category</label>
                <select id="company_category" name="company_category" value={formData.company_category} onChange={handleChange} className={inputClass}>
                  <option value="">Select type</option>
                  <option value="Proprietorship">Proprietorship</option>
                  <option value="Partnership">Partnership</option>
                  <option value="LLP">LLP</option>
                  <option value="Private Limited">Private Limited</option>
                  <option value="Public Limited">Public Limited</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label htmlFor="service_radius" className={labelClass}>Service Radius (km)</label>
                <input type="number" id="service_radius" name="service_radius" value={formData.service_radius} onChange={handleChange} className={inputClass} placeholder="e.g. 10" />
              </div>

              <div>
                <label htmlFor="pincode" className={labelClass}>Pincode</label>
                <input type="text" id="pincode" name="pincode" value={formData.pincode} onChange={handleChange} className={inputClass} placeholder="6-digit pincode" maxLength={6} />
              </div>

              <div>
                <label htmlFor="bussiness_proof_doc_url" className={labelClass}>Business Proof URL</label>
                <input type="url" id="bussiness_proof_doc_url" name="bussiness_proof_doc_url" value={formData.bussiness_proof_doc_url} onChange={handleChange} className={inputClass} placeholder="https://..." />
              </div>

              <div>
                <label htmlFor="service_start_time" className={labelClass}>Service Start Time</label>
                <input type="time" id="service_start_time" name="service_start_time" value={formData.service_start_time} onChange={handleChange} className={inputClass} />
              </div>

              <div>
                <label htmlFor="service_end_time" className={labelClass}>Service End Time</label>
                <input type="time" id="service_end_time" name="service_end_time" value={formData.service_end_time} onChange={handleChange} className={inputClass} />
              </div>

              <div className="col-span-full">
                <label htmlFor="bussiness_desc" className={labelClass}>Business Description</label>
                <textarea id="bussiness_desc" name="bussiness_desc" rows="3" value={formData.bussiness_desc} onChange={handleChange} className={inputClass} placeholder="Describe the business..." />
              </div>

              <div className="col-span-full flex justify-end pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-blue-500 text-white px-8 py-2.5 rounded-lg shadow-md hover:bg-blue-600 disabled:bg-blue-300 disabled:cursor-not-allowed transition font-medium"
                >
                  {loading ? 'Adding Vendor...' : 'Add Vendor'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Addvendor;