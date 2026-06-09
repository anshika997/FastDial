import React, { useEffect, useState } from "react";
// import LogoKa from "../images/LogoKa.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IoIosArrowBack } from "react-icons/io";
import { faEye, faUser } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Select from "react-select";
import { FaTimes } from "react-icons/fa"; // Importing the close icon

export default function AttendanceAllEmployee() {
  const BASEURL = import.meta.env.VITE_API_URL_ADMIN;
  const accessToken = window.sessionStorage.getItem("accessToken");
  const navigate = useNavigate();

  const [selectedRecord, setSelectedRecord] = useState(null);
  const [attendanceData, setAttendanceData] = useState([]); // All attendance data
  const [employeeId, setEmployeeId] = useState(null); // Selected employee ID
  const [date, setDate] = useState(""); // Start date
  const [EndDate, setEndDate] = useState(""); // End date
  const [employeeIdDropdDown, setEmployeeIdDropdDown] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  function fetchData() {
    axios
      .get(`${BASEURL}/data/getGstRegistrationCompany`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        setAttendanceData(response.data);
        const uniqueEmployeeIds = [
          ...new Set(response?.data?.map((item) => item.empid)),
        ];

        setEmployeeIdDropdDown(uniqueEmployeeIds);
      })
      .catch((error) => {
        console.error("Error fetching attendance data:", error);
      });
  }
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

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <div className="bg-green-900 text-white p-4 rounded-b-[20px] relative">
        <div className="flex items-center justify-between">
          <Link to={"/AdminDashboad"}>
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
          List Of Enquiry List
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
                  <th>Director Name</th>
                  <th>Email</th>
                  <th>Bank Account Name</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.length > 0 ? (
                  filteredData.map((item, index) => (
                    <tr key={index} className="border-b">
                      <td>{item.id}</td>
                      <td>{item.director_name}</td>
                      <td>{item.email}</td>
                      <td>{item.bank_acc_name}</td>
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
          <div className="bg-white rounded-lg p-6 w-[95%] lg:w-3/4 max-w-xl shadow-lg relative">
            <button
              onClick={closePopup}
              className="absolute top-2 right-2 text-red-600 hover:text-red-800"
              title="Close"
            >
              <FaTimes className="text-xl" /> {/* Red close icon */}
            </button>
            <p>
              <strong>ID:</strong> {selectedData.id}
            </p>
            <p>
              <strong>Director ID:</strong> {selectedData.director_id}
            </p>
            <p>
              <strong>Director Name:</strong> {selectedData.director_name}
            </p>
            <p>
              <strong>Email:</strong> {selectedData.email}
            </p>
            <p>
              <strong>Bank Account Name:</strong> {selectedData.bank_acc_name}
            </p>
            <p>
              <strong>Bank Account Number:</strong>{" "}
              {selectedData.bank_acc_number}
            </p>
            <p>
              <strong>Bank IFSC Code:</strong> {selectedData.bank_ifsc_code}
            </p>
            <p>
              <strong>Business Nature:</strong> {selectedData.bussiness_nature}
            </p>
            <p>
              <strong>Director Contact:</strong> {selectedData.director_contact}
            </p>
            <p>
              <strong>Import Export Code:</strong>{" "}
              {selectedData.import_export_code}
            </p>

            {/* Image Fields */}
            <p>
              <strong>Director Photo:</strong>
            </p>
            {selectedData.director_photo_url ? (
              <img
                src={selectedData.director_photo_url}
                alt="Director"
                style={{ width: "100px", height: "100px", borderRadius: "50%" }}
              />
            ) : (
              <span>N/A</span>
            )}

            <p>
              <strong>Articles of Association:</strong>
            </p>
            {selectedData.articles_association_url ? (
              <a
                href={selectedData.articles_association_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                View File
              </a>
            ) : (
              <span>N/A</span>
            )}

            <p>
              <strong>Company Certificate:</strong>
            </p>
            {selectedData.company_certificate_url ? (
              <a
                href={selectedData.company_certificate_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                View File
              </a>
            ) : (
              <span>N/A</span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
