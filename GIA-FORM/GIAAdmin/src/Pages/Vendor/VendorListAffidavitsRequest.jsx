import React, { useEffect, useState } from "react";
// import LogoKa from "../images/LogoKa.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IoIosArrowBack } from "react-icons/io";
import { faEye, faUser } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Select from "react-select";
import { FaTimes } from "react-icons/fa"; // Importing the close icon
import { useDispatch, useSelector } from "react-redux";
import { FaEye } from "react-icons/fa";

export default function ListOfPropertyRegistration() {
  const BASEURL = import.meta.env.VITE_API_URL_ADMIN;
  const accessToken = window.sessionStorage.getItem("accessToken");
  const navigate = useNavigate();
  const authLogin = useSelector((state) => state.auth);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [attendanceData, setAttendanceData] = useState([]); // All attendance data
  const [employeeId, setEmployeeId] = useState(null); // Selected employee ID
  const [date, setDate] = useState(""); // Start date
  const [EndDate, setEndDate] = useState(""); // End date
  const [employeeIdDropdDown, setEmployeeIdDropdDown] = useState([]);
  const [showPopup, setShowPopup] = useState(false); // State for popup visibility
  const [rejectionReason, setRejectionReason] = useState("");
  const [ids, setids] = useState("");
  const [vendors, setVendors] = useState([]);
  const [selectedVendor, setSelectedVendor] = useState(null);

  console.log(authLogin);
  console.log(authLogin?.userPhone?.user?.name);
  useEffect(() => {
    fetchData();
  }, []);

  function fetchData() {
    axios
      .get(`${BASEURL}/data/getAffidavitRequests?assigned_vendor=7`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        setAttendanceData(response.data);
        const uniqueEmployeeIds = [
          ...new Set(response?.data?.map((item) => item.id)),
        ];
        console.log(uniqueEmployeeIds);
        setEmployeeIdDropdDown(uniqueEmployeeIds);
      })
      .catch((error) => {
        console.error("Error fetching attendance data:", error);
      });
    axios
      .get(`${BASEURL}/data/getVendors?vendor_bussiness_name=Affidavits`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        const vendorOptions = response.data.map((vendor) => ({
          value: vendor.vendor_id,
          label: vendor.vendor_name,
        }));
        setVendors(vendorOptions);
      })
      .catch((error) => {
        console.error("Error fetching getVendors data:", error);
      });
  }
  const handleVendorChange = (selectedOption) => {
    setSelectedVendor(selectedOption);
    console.log("Selected Vendor:", selectedOption);
  };
  const handleApprove = (id) => {
    if (!selectedVendor) {
      alert("Please select a vendor");
      return;
    }

    console.log(id);
    const approvedDate = new Date().toISOString();
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().split("T")[0];
    console.log(formattedDate);
    console.log(authLogin?.userPhone?.user?.name);
    axios
      .post(
        `${BASEURL}/data/updateAffidavitsRequest`,
        {
          request_id: id,
          is_approved: 1,
          approved_by: authLogin?.userPhone?.user?.name,
          approved_date: formattedDate,
          assigned_vendor: selectedVendor.value,
          status: "ASSIGNED TO VENDOR",
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((response) => {
        console.log("Approval successful:", response.data);
        alert("Request approved successfully.");
        setSelectedRecord(false);
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error approving request:", error);
      });
  };

  const handleReject = (id) => {
    setids(id);

    setShowPopup(true);
  };

  const handleSubmitRejection = () => {
    // console.log(id);
    if (!rejectionReason.trim()) {
      alert("Rejection reason is required.");
      return;
    }
    console.log(rejectionReason);
    axios
      .post(
        `${BASEURL}/data/updateAffidavitsRequest`,
        {
          request_id: ids,
          rejected_by: authLogin?.userPhone?.user?.name,
          rejected_reason: rejectionReason,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((response) => {
        console.log("Rejection successful:", response.data);
        alert("Request rejected successfully.");
        setShowPopup(false);
        setSelectedRecord(false); // Close popup
        setRejectionReason(""); // Reset rejection reason
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error rejecting request:", error);
      });
  };
  const [selectedData, setSelectedData] = useState(null);

  const openPopup = (record) => {
    setSelectedRecord(record);
    setSelectedData(record);
  };

  const closePopup = () => {
    setSelectedRecord(null);
  };

  // Filtered data based on selected filters
  const filteredData = attendanceData.filter((item) => {
    const matchesEmployeeId = employeeId ? item.empid === employeeId : true;
    const matchesStartDate = date ? item.attendancedate >= date : true;
    const matchesEndDate = EndDate ? item.attendancedate <= EndDate : true;

    return matchesEmployeeId && matchesStartDate && matchesEndDate;
  });
  const previewFile = (url) => {
    if (url) {
      window.open(url, "_blank");
    } else {
      alert("No document available to preview!");
    }
  };
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <div className="bg-green-900 text-white p-4 rounded-b-[20px] relative">
        <div className="flex items-center justify-between">
          <Link to={"/VendorForUpdate"}>
            <button className="text-white text-[30px] font-extrabold">
              <IoIosArrowBack />
            </button>
          </Link>
          <h1 className="text-white font-extrabold text-2xl capitalize">GIA</h1>
          <div className="rounded-full bg-white p-2 px-3">
            <FontAwesomeIcon icon={faUser} className="text-blue-600" />
          </div>
        </div>
      </div>
      <div className="px-10 flex items-center justify-between">
        <h1 className="text-center my-4 text-xl font-bold">
          List Of Affidavits Request List
        </h1>
      </div>

      {/* Attendance Section */}
      <section className="flex justify-center mx-5">
        <div className="bg-white p-4 rounded-lg shadow w-full">
          {/* Attendance Table */}
          <div className="overflow-auto pb-10">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-200">
                  <th>ID</th>
                  <th>Name</th>
                  <th>place</th>
                  <th>address</th>
                  <th>Assigned vendor</th>

                  <th>Rejected by</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.length > 0 ? (
                  filteredData.map((item, index) => (
                    <tr key={index} className="border-b">
                      <td>{item.request_id}</td>
                      <td>{item.name ? item.name : "NA"}</td>
                      <td>{item.place ? item.place : "NA"}</td>
                      <td>{item.address ? item.address : "NA"}</td>
                      <td>
                        {item.assigned_vendor ? item.assigned_vendor : "NA"}
                      </td>

                      <td>{item.rejected_by ? item.rejected_by : "NA"}</td>

                      <td>
                        {item.assigned_vendor
                          ? "APPROVED"
                          : item.rejected_by
                          ? "REJECTED"
                          : "PENDING"}
                      </td>
                      <td>
                        <button
                          onClick={() => openPopup(item)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <FontAwesomeIcon icon={faEye} />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center p-4">
                      No attendance data available.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Popup Modal */}
      {selectedRecord && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg p-6 w-[95%] lg:w-2/4 max-w-xxl shadow-lg relative  h-80 md:h-80 overflow-y-auto">
            <button
              onClick={closePopup}
              className="absolute top-2 right-2 text-red-600 hover:text-red-800"
              title="Close"
            >
              <FaTimes className="text-xl" /> {/* Red close icon */}
            </button>

            {/* Image Fields */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Name */}
              <div>
                <p>
                  <strong>Name:</strong> {selectedData.name || "N/A"}
                </p>
              </div>

              {/* Address */}
              <div>
                <p>
                  <strong>Address:</strong> {selectedData.address || "N/A"}
                </p>
              </div>

              {/* Date */}
              <div>
                <p>
                  <strong>Date:</strong>{" "}
                  {selectedData.date
                    ? new Date(selectedData.date).toLocaleDateString()
                    : "N/A"}
                </p>
              </div>

              {/* Place */}
              <div>
                <p>
                  <strong>Place:</strong> {selectedData.place || "N/A"}
                </p>
              </div>

              {/* Statement */}
              <div>
                <p>
                  <strong>Statement:</strong> {selectedData.statement || "N/A"}
                </p>
              </div>

              {/* Witness Name */}
              <div>
                <p>
                  <strong>Witness Name:</strong>{" "}
                  {selectedData.witness_name || "N/A"}
                </p>
              </div>

              {/* Images */}
              {[
                { label: "ID Proof", field: "id_proof_url" },
                { label: "Address Proof", field: "address_proof_url" },
                { label: "Supporting Documents", field: "supporting_docs_url" },
                { label: "Photo", field: "photo_url" },
                { label: "Witness Signature", field: "witness_signature_url" },
                {
                  label: "Notarization Certificate",
                  field: "notarization_certificate_url",
                },
              ].map(({ label, field }) => (
                <div key={field}>
                  <p>
                    <strong>{label}:</strong>
                  </p>
                  {selectedData[field] ? (
                    <div className="flex items-center gap-2">
                      <img
                        src={selectedData[field]}
                        alt={label}
                        style={{
                          width: "100px",
                          height: "100px",
                          borderRadius: "10px",
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => previewFile(selectedData[field])}
                        className="text-blue-500"
                      >
                        <FaEye />
                      </button>
                    </div>
                  ) : (
                    <span>N/A</span>
                  )}
                </div>
              ))}

              {/* Narration */}
              <div>
                <p>
                  <strong>Narration:</strong> {selectedData.narration || "N/A"}
                </p>
              </div>

              {/* Service Type */}
              <div>
                <p>
                  <strong>Service Type:</strong>{" "}
                  {selectedData.service_type || "N/A"}
                </p>
              </div>

              {/* Status */}
              <div>
                <p>
                  <strong>Status:</strong>{" "}
                  {selectedData.assigned_vendor
                    ? "APPROVED"
                    : selectedData.rejected_by
                    ? "REJECTED"
                    : "PENDING"}
                </p>
              </div>

              {/* Rejected By */}
            </div>
            <article className="lg:flex justify-around">
              <aside>
                <p>
                  <strong>Aadhar Photo:</strong>
                </p>
                {selectedData.id_proof_url ? (
                  <img
                    src={selectedData.id_proof_url}
                    alt="Director"
                    style={{
                      width: "100px",
                      height: "100px",
                      borderRadius: "10px",
                    }}
                  />
                ) : (
                  <span>N/A</span>
                )}
              </aside>
            </article>
          </div>
        </div>
      )}
    </div>
  );
}
