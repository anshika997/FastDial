import React, { useEffect, useState } from "react";
import api from "./api";
import { useNavigate, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IoIosArrowBack } from "react-icons/io";
import { faEye, faUser } from "@fortawesome/free-solid-svg-icons";

const FormResponses = () => {
  const navigate = useNavigate();

  const [responses, setResponses] = useState([]);
  const [selectedFormId, setSelectedFormId] = useState(null);
  const accessToken = window.sessionStorage.getItem("accessToken");

  useEffect(() => {
    const fetchResponses = async () => {
      try {
        const response = await api.get(`/data/getFormsResponses`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        if (response.status === 200) setResponses(response.data);
      } catch (error) {
        console.error("Error fetching responses:", error);
      }
    };
    fetchResponses();
  }, [accessToken]);

  // Group responses by form ID
  const groupedResponses = responses.reduce((acc, response) => {
    if (!acc[response.form_id]) acc[response.form_id] = [];
    acc[response.form_id].push(response);
    return acc;
  }, {});

  if (responses.length === 0) return <div>No responses yet.</div>;

  if (!selectedFormId) {
    return (
      <div>
        <div className="bg-green-900 text-white p-4 rounded-b-[20px] relative">
          <div className="flex items-center justify-between rounded-b-lg">
            <Link to={"/AdminDashboad"}>
              <button className="text-white text-[30px] font-extrabold">
                <IoIosArrowBack />{" "}
              </button>
            </Link>
            <h1 className="text-white font-extrabold text-2xl capitalize">
              GIA
            </h1>
            <div className="rounded-full bg-white p-2 px-3">
              <FontAwesomeIcon icon={faUser} className="text-blue-600" />
            </div>
          </div>
        </div>{" "}
        <div className="p-8 bg-gray-100">
          <div className="flex justify-between items-center">
            {" "}
            <h1 className="text-2xl font-bold mb-4">Form Submissions</h1>
            <button
              className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
              onClick={() => navigate("/ListOfForms")}
            >
              Back{" "}
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.keys(groupedResponses).map((formId) => (
              <div
                key={formId}
                className="p-4 bg-white shadow rounded-lg hover:shadow-lg cursor-pointer"
                onClick={() => setSelectedFormId(Number(formId))}
              >
                <h2 className="text-lg font-bold">Form ID: {formId}</h2>
                <p className="text-gray-600">
                  Submissions: {groupedResponses[formId].length}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const selectedResponses = groupedResponses[selectedFormId];

  // Get all unique keys from responses
  const allKeys = Array.from(
    new Set(
      selectedResponses.flatMap((response) => Object.keys(response.responses))
    )
  );

  return (
    <div>
      <div className="bg-green-900 text-white p-4 rounded-b-[20px] relative">
        <div className="flex items-center justify-between rounded-b-lg">
          <Link to={"/AdminDashboad"}>
            <button className="text-white text-[30px] font-extrabold">
              <IoIosArrowBack />{" "}
            </button>
          </Link>
          <h1 className="text-white font-extrabold text-2xl capitalize">GIA</h1>
          <div className="rounded-full bg-white p-2 px-3">
            <FontAwesomeIcon icon={faUser} className="text-blue-600" />
          </div>
        </div>
      </div>{" "}
      <div className="p-8 bg-gray-100">
        <div className="flex justify-between items-center">
          {" "}
          <h1 className="text-2xl font-bold mb-4">
            Responses for Form ID: {selectedFormId}
          </h1>
          <button
            className="mb-4 px-4 py-2 text-white bg-gray-500 rounded-lg hover:bg-gray-600"
            onClick={() => setSelectedFormId(null)}
          >
            Back to Form List
          </button>
        </div>
        <table className="w-full bg-white shadow rounded-lg">
          <thead>
            <tr className="text-left">
              <th className="p-2 border">ID</th>
              <th className="p-2 border">Form ID</th>
              {allKeys.map((key) => (
                <th key={key} className="p-2 border">
                  {key}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {selectedResponses.map((response, index) => (
              <tr key={index}>
                <td className="p-2 border">{response.id}</td>
                <td className="p-2 border">{response.form_id}</td>
                {allKeys.map((key, idx) => (
                  <td key={idx} className="p-2 border">
                    {response.responses[key] || "N/A"}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FormResponses;
