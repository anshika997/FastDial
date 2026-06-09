import React, { useEffect, useState } from "react";
import api from "./api";
import { useNavigate, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IoIosArrowBack } from "react-icons/io";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const FormResponses = () => {
  const navigate = useNavigate();
  const [responses, setResponses] = useState([]);
  const [selectedFormId, setSelectedFormId] = useState(null);
  const [fromName, setFromName] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const accessToken = window.sessionStorage.getItem("accessToken");

  useEffect(() => {
    const fetchResponses = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/data/getFormsResponses`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        if (response.status === 200) {
          setResponses(response.data);
        } else {
          setError("Failed to fetch form responses.");
        }
      } catch (error) {
        console.error("Error fetching responses:", error);
        setError("An error occurred while fetching responses.");
      } finally {
        setLoading(false);
      }
    };
    fetchResponses();
  }, [accessToken]);

  const deleteResponse = async (idToDelete) => {
    if (window.confirm("Are you sure you want to delete this form?")) {
      try {
        const response = await api.delete(
          `/data/deleteFormsResponses/${idToDelete}`,
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        );
        if (response.status === 200) {
          alert("Form deleted successfully!");
          window.location.reload();
        }
      } catch (error) {
        console.error("Error deleting response:", error);
        alert("Error occurred while deleting the form.");
        window.location.reload();
      }
    }
  };

  // Group responses by form ID
  const groupedResponses = responses.reduce((acc, response) => {
    if (!acc[response.form_id]) acc[response.form_id] = [];
    acc[response.form_id].push(response);
    return acc;
  }, {});

  if (loading) return <div className="text-center">Loading...</div>;

  if (error) return <div className="text-center text-red-500">{error}</div>;

  if (responses.length === 0) return <div>No responses yet.</div>;

  if (!selectedFormId) {
    return (
      <div>
        <div className="bg-green-900 text-white p-4 rounded-b-[20px] relative">
          <div className="flex items-center justify-between">
            <Link to="/AdminDashboad">
              <button className="text-white text-[30px] font-extrabold">
                <IoIosArrowBack />
              </button>
            </Link>
            <h1 className="text-white font-extrabold text-2xl capitalize">
              GIA
            </h1>
            <div className="rounded-full bg-white p-2 px-3">
              <FontAwesomeIcon icon={faUser} className="text-blue-600" />
            </div>
          </div>
        </div>
        <div className="p-8 bg-gray-100">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold mb-4">Form Submissions</h1>
            <button
              className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
              onClick={() => navigate("/ListOfForms")}
            >
              Back
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.keys(groupedResponses).map((formId) => (
              <div
                key={formId}
                className="p-4 bg-white shadow-md rounded-lg hover:shadow-lg cursor-pointer transform hover:scale-105 transition"
                onClick={() => {
                  setSelectedFormId(Number(formId));
                  setFromName(
                    responses.find((r) => r.form_id === Number(formId))
                      ?.form_name || "Unknown Form"
                  );
                }}
              >
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold">
                    Form Name:{" "}
                    {responses.find((r) => r.form_id === Number(formId))
                      ?.form_name || "Unknown"}
                  </h2>
                  <h2 className="text-lg font-semibold">Form ID: {formId}</h2>
                  <button
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent form selection
                      deleteResponse(formId);
                    }}
                    className="px-2 py-1 text-white bg-red-500 rounded-lg text-sm hover:bg-red-600"
                    title="Delete this form"
                  >
                    Delete
                  </button>
                </div>
                <p className="text-gray-600 mt-2">
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
  const allKeys = Array.from(
    new Set(
      selectedResponses.flatMap((response) => Object.keys(response.responses))
    )
  );
  console.log("All Keys:", allKeys);
  console.log("Selected Responses:", selectedResponses);

  const renderFieldValue = (key, value) => {
    if (!value) return <span className="text-gray-500">N/A</span>;

    // Case 1: Single Image URL (string)
    if (typeof value === "string" && value.startsWith("https")) {
      return (
        <img
          src={value}
          alt="Uploaded"
          className="max-w-[150px] max-h-[150px] object-cover rounded"
        />
      );
    }

    // Case 2: Array of image URLs
    if (
      Array.isArray(value) &&
      value.length > 0 &&
      typeof value[0] === "string" &&
      value[0].startsWith("http") &&
      /\.(jpg|jpeg|png|gif|webp)$/i.test(value[0])
    ) {
      return (
        <div className="flex gap-2 flex-wrap">
          {value.map((url, idx) => (
            <img
              key={idx}
              src={url}
              alt={`Uploaded ${idx + 1}`}
              className="max-w-[150px] max-h-[150px] object-cover rounded"
            />
          ))}
        </div>
      );
    }

    // Case 3: File or other URL
    if (
      Array.isArray(value) &&
      value.length > 0 &&
      typeof value[0] === "string" &&
      value[0].startsWith("http")
    ) {
      return (
        <a href={value[0]} target="_blank" rel="noopener noreferrer">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md transition-all hover:bg-blue-700">
            Open File
          </button>
        </a>
      );
    }

    // Case 4: Array of values (non-image)
    if (Array.isArray(value)) {
      return (
        <ul className="list-decimal list-inside">
          {value.map((item, idx) => (
            <li key={idx}>
              {typeof item === "object"
                ? JSON.stringify(item)
                : item || <span className="text-gray-500">N/A</span>}
            </li>
          ))}
        </ul>
      );
    }

    // Case 5: Object
    if (typeof value === "object") {
      return (
        <pre className="whitespace-pre-wrap text-xs">
          {JSON.stringify(value, null, 2)}
        </pre>
      );
    }

    return value;
  };

  const renderQATable = (qaArray) => {
    if (!Array.isArray(qaArray) || qaArray.length === 0) {
      return <td className="p-2 border">N/A</td>;
    }

    // Group answers by question
    const groupedQA = {};
    qaArray.forEach(([question, code, value]) => {
      if (!groupedQA[question]) {
        groupedQA[question] = [];
      }
      groupedQA[question].push({ code, value });
    });

    return (
      <td className="p-2 border">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              {Object.keys(groupedQA).map((question, qIndex) => (
                <th
                  key={qIndex}
                  className="p-1 border bg-gray-200 text-sm font-semibold text-gray-700"
                >
                  {question}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              {Object.keys(groupedQA).map((question, qIndex) => (
                <td key={qIndex} className="border">
                  {groupedQA[question].map((entry, idx) => (
                    <tr key={idx} className="bg-gray-100">
                      <td className="border p-2 bg-gray-200">
                        <span className="font-bold">Code:</span>{" "}
                        {entry.code || (
                          <span className="text-gray-500">N/A</span>
                        )}
                      </td>
                      <td className="border p-2 bg-gray-200">
                        <span className="font-bold">Ans:</span>{" "}
                        {entry.value || (
                          <span className="text-gray-500">N/A</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </td>
    );
  };

  return (
    <div>
      <div className="bg-green-900 text-white p-4 rounded-b-[20px] relative">
        <div className="flex items-center justify-between">
          <Link to="/AdminDashboad">
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
      <div className="p-8 bg-gray-100">
        <h1 className="text-2xl font-bold mb-4">
          Responses for Form: {fromName} ({selectedFormId})
        </h1>
        <button
          className="mb-4 px-4 py-2 text-white bg-gray-500 rounded-lg hover:bg-gray-600"
          onClick={() => setSelectedFormId(null)}
        >
          Back to Form List
        </button>
        <div className="overflow-x-auto">
          <table className="w-full bg-white shadow-md rounded-lg border-collapse">
            <thead className="bg-gray-100">
              <tr className="text-left text-sm font-semibold text-gray-700">
                <th className="p-2 border">ID</th>
                <th className="p-2 border">Form ID</th>
                {allKeys
                  .filter((key) => key !== "q&a")
                  .map((key) => (
                    <th key={key} className="p-2 border">
                      {key}
                    </th>
                  ))}
                <th className="p-2 border">Q&A</th>
              </tr>
            </thead>
            <tbody>
              {selectedResponses.map((response, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="p-2 border">{response.id}</td>
                  <td className="p-2 border">{response.form_id}</td>
                  {allKeys
                    .filter((key) => key !== "q&a")
                    .map((key) => (
                      <td key={key} className="p-2 border">
                        {renderFieldValue(key, response.responses[key])}
                      </td>
                    ))}
                  {renderQATable(response.responses["q&a"])}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default FormResponses;
