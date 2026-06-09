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
import Statustimeline from "../users/statustimeline";

import { FaRegTrashAlt } from "react-icons/fa";
function ListofPanRegistration() {
  const BASEURL = import.meta.env.VITE_API_URL_ADMIN;
  const accessToken = window.sessionStorage.getItem("accessToken");
  const navigate = useNavigate();
  const authLogin = useSelector((state) => state.auth);
  console.log(authLogin);
  const [showPopup, setShowPopup] = useState(false);
  const [employeeIdDropdDown, setEmployeeIdDropdDown] = useState([]);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [attendanceData, setAttendanceData] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [ids, setids] = useState("");
  const [rejectionReason, setRejectionReason] = useState("");
  const [showTimeline, setShowTimeline] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const openTimeline = (item) => {
    setSelectedItem(item);
    setShowTimeline(true);
  };
  const closeTimeline = () => {
    setShowTimeline(false);
    setSelectedItem(null);
  };

  useEffect(() => {
    fetchData();
  }, []);
  function fetchData() {
    axios
      .get(`${BASEURL}/data/getAffidavid`, {
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
      .get(`${BASEURL}/data/getVendors?vendor_bussiness_name=Affidavid`, {
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
    console.log(authLogin?.userPhone?.user?.empid);
    axios
      .post(
        `${BASEURL}/data/updateAffidavid`,
        {
          id: id,

          admin_accepted_or_rejected_by: authLogin?.userPhone?.user?.empid,
          admin_accepted_date_time: formattedDate,
          assigned_vendor_id: selectedVendor.value,
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

  const handleSubmitRejection = (id) => {
    if (!rejectionReason) {
      alert("Please Give Reason for Rejection");
      return;
    }

    const approvedDate = new Date().toISOString();
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().split("T")[0];
    console.log(formattedDate);
    console.log(authLogin?.userPhone?.user?.empid);
    const payload = {
      id: ids,
      admin_accepted_or_rejected_by: authLogin?.userPhone?.user?.empid,
      admin_rejected_date_time: formattedDate,
      admin_rejected_reason: rejectionReason,
      status: "REJECTED",
    };
    axios
      .post(`${BASEURL}/data/updateAffidavid`, payload, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        console.log("Approval successful:", response.data);
        alert("Request Rejected successfully.");
        setSelectedRecord(false);
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error approving request:", error);
      });
  };
  const HandleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this record?"
    );

    if (!confirmDelete) {
      return;
    }

    axios
      .post(`${BASEURL}/data/deleteTanRegistrations/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        console.log("Deletion successful:", response.data);
        alert("Record deleted successfully.");
        setSelectedRecord(false);
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error deleting record:", error);
        alert("Failed to delete the record. Please try again.");
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
  const filteredData = attendanceData.filter((item) => {
    const matchesEmployeeId = name ? item.name === employeeId : true;
    // const matchesStartDate = date ? item.attendancedate >= date : true;
    // const matchesEndDate = EndDate ? item.attendancedate <= EndDate : true;

    return matchesEmployeeId;
    //  && matchesStartDate && matchesEndDate;
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
          <Link to={"/DashboardForUpdate"}>
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
          List of Affidavid Request
        </h1>
      </div>

      {/* Attendance Section */}
      <section className="flex justify-center mx-5">
        <div className="bg-white p-4 rounded-lg shadow w-full">
          {/* Attendance Table */}
          <div className="w-full overflow-x-auto pb-10">
            <table className="min-w-max w-full border-collapse">
              <thead>
                <tr className="bg-gray-200 text-sm text-center">
                  <th className="p-2">ID</th>
                  <th className="p-2">Name</th>
                  <th className="p-2">Age</th>
                  <th className="p-2">Status</th>
                  <th className="p-2">Actions</th>
                  <th className="p-2">Timeline</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.length > 0 ? (
                  filteredData.map((item, index) => (
                    <tr key={index} className="border-b text-sm text-center">
                      <td className="p-2">{item.id}</td>
                      <td className="p-2">{item.name}</td>
                      <td className="p-2">{item.age}</td>
                      <td className="p-2">
                        {item.admin_accepted_date_time
                          ? "Vendor Assigned"
                          : item.admin_rejected_date_time === null &&
                            item.admin_accepted_date_time === null
                          ? "Pending"
                          : "Rejected"}
                      </td>
                      <td className="p-2">
                        <div className="flex justify-center items-center gap-2">
                          <button
                            onClick={() => openPopup(item)}
                            className="text-blue-600 hover:text-blue-800"
                          >
                            <FontAwesomeIcon icon={faEye} />
                          </button>
                          {item.admin_rejected_date_time === null &&
                            item.admin_accepted_date_time === null && (
                              <button
                                onClick={() => HandleDelete(item.id)}
                                className="text-red-600 hover:text-red-800"
                              >
                                <FaRegTrashAlt />
                              </button>
                            )}
                        </div>
                      </td>
                      <td
                        className="p-2 text-blue-500 hover:text-blue-800 font-semibold cursor-pointer"
                        onClick={() => openTimeline(item)}
                      >
                        status
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center p-4">
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center w-full">
          <div className="bg-white rounded-lg p-6 w-[95%] lg:w-3/4 shadow-lg relative h-80 md:h-88 overflow-y-auto">
            <button
              onClick={closePopup}
              className="absolute top-2 right-2 text-red-600 hover:text-red-800"
              title="Close"
            >
              <FaTimes className="text-xl" />
            </button>

            {/* Popup Content */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Display static fields */}
              <div>
                <p>
                  <strong>ID:</strong> {selectedData.id || "N/A"}
                </p>
              </div>
              <div>
                <p>
                  <strong>Address:</strong> {selectedData.address || "N/A"}
                </p>
              </div>
              <div>
                <p>
                  <strong>Details:</strong> {selectedData.details || "N/A"}
                </p>
              </div>
              <div>
                <p>
                  <strong>Vendor ID:</strong> {selectedData.vendor_id || "N/A"}
                </p>
              </div>
              <div>
                <p>
                  <strong>User Enquiry Date:</strong>{" "}
                  {new Date(
                    selectedData.user_enquiry_date_time
                  ).toLocaleDateString()}
                </p>
              </div>
              <div>
                <p>
                  <strong>Admin Accepted Date:</strong>{" "}
                  {new Date(
                    selectedData.admin_accepted_date_time
                  ).toLocaleDateString()}
                </p>
              </div>
              <div>
                <p>
                  <strong>Admin Rejected Date:</strong>{" "}
                  {new Date(
                    selectedData.admin_rejected_date_time
                  ).toLocaleDateString()}
                </p>
              </div>
              <div>
                <p>
                  <strong>Admin Rejected Reason:</strong>{" "}
                  {selectedData.admin_rejected_reason || "N/A"}
                </p>
              </div>
              <div>
                <p>
                  <strong>Admin Accepted Or Rejected By:</strong>{" "}
                  {selectedData.admin_accepted_or_rejected_by || "N/A"}
                </p>
              </div>
              {/* Conditional rendering based on acceptance or rejection */}
              {selectedData.admin_accepted_date_time ? (
                <>
                  <div>
                    <p>
                      <strong>Status:</strong> ACCEPTED
                    </p>
                  </div>
                  <div>
                    <p>
                      <strong>Vendor ID:</strong>{" "}
                      {selectedData.assigned_vendor_id || "N/A"}
                    </p>
                  </div>
                  <div>
                    <p>
                      <strong>Accepted by:</strong>{" "}
                      {selectedData.admin_accepted_or_rejected_by || "N/A"}
                    </p>
                  </div>
                  {/* <>
                    <div>
                      <label className="block font-semibold mb-2">
                        Select Vendor:
                      </label>
                      <Select
                        options={vendors}
                        value={selectedVendor}
                        onChange={handleVendorChange}
                        placeholder="Choose a vendor"
                        className="w-full"
                      />
                    </div>
                    <div className="mt-4 flex gap-6">
                      <button
                        className="bg-green-600 text-black p-2 rounded"
                        onClick={() => handleApprove(selectedData.id)}
                      >
                        Assign Vendor
                      </button>
                      <button
                        className="bg-red-700 text-white p-2 rounded"
                        onClick={() => handleReject(selectedData.id)}
                      >
                        Reject
                      </button>
                    </div>
                  </> */}
                </>
              ) : selectedData.admin_rejected_date_time ? (
                <>
                  <div>
                    <p>
                      <strong>Status:</strong> REJECTED
                    </p>
                  </div>
                  <div>
                    <p>
                      <strong>Rejected Date:</strong>{" "}
                      {new Date(
                        selectedData.admin_rejected_date_time
                      ).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <p>
                      <strong>Rejected By:</strong>{" "}
                      {selectedData.admin_accepted_or_rejected_by || "N/A"}
                    </p>
                  </div>
                  <div>
                    <p>
                      <strong>Rejected Reason:</strong>{" "}
                      {selectedData.admin_rejected_reason || "N/A"}
                    </p>
                  </div>
                  <>
                    <div>
                      <label className="block font-semibold mb-2">
                        Select Vendor:
                      </label>
                      <Select
                        options={vendors}
                        value={selectedVendor}
                        onChange={handleVendorChange}
                        placeholder="Choose a vendor"
                        className="w-full"
                      />
                    </div>
                    <div className="mt-4 flex gap-6">
                      <button
                        className="bg-green-600 text-black p-2 rounded"
                        onClick={() => handleApprove(selectedData.id)}
                      >
                        Assign Vendor
                      </button>
                      <button
                        className="bg-red-700 text-white p-2 rounded"
                        onClick={() => handleReject(selectedData.id)}
                      >
                        Reject
                      </button>
                    </div>
                  </>
                </>
              ) : (
                <>
                  {/* Vendor Assignment Section */}
                  <div>
                    <label className="block font-semibold mb-2">
                      Select Vendor:
                    </label>
                    <Select
                      options={vendors}
                      value={selectedVendor}
                      onChange={handleVendorChange}
                      placeholder="Choose a vendor"
                      className="w-full"
                    />
                  </div>
                  <div className="mt-4 flex gap-6">
                    <button
                      className="bg-green-600 text-black p-2 rounded"
                      onClick={() => handleApprove(selectedData.id)}
                    >
                      Assign Vendor
                    </button>
                    <button
                      className="bg-red-700 text-white p-2 rounded"
                      onClick={() => handleReject(selectedData.id)}
                    >
                      Reject
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg">
            <h2 className="text-xl mb-4">Provide a Reason for Rejection</h2>
            <textarea
              className="w-full p-2 border rounded"
              placeholder="Enter rejection reason"
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
            ></textarea>
            <div className="mt-4 flex gap-4">
              <button
                className="bg-blue-600 text-white p-2 rounded"
                onClick={handleSubmitRejection}
              >
                Submit
              </button>
              <button
                className="bg-gray-400 text-black p-2 rounded"
                onClick={() => setShowPopup(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      {showTimeline && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
            <button
              onClick={closeTimeline}
              className="text-red-400 hover:text-red-800 float-right font-bold"
            >
              Close
            </button>
            <Statustimeline item={selectedItem} />
          </div>
        </div>
      )}
    </div>
  );
}

export default ListofPanRegistration;
