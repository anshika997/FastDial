import React, { useEffect, useState } from "react";
import api from "./api";
import { useNavigate, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IoIosArrowBack } from "react-icons/io";
import { faEye, faUser } from "@fortawesome/free-solid-svg-icons";

const FormRenderer = () => {
  const [forms, setForms] = useState([]);
  const [selectedForm, setSelectedForm] = useState(null);
  const [responses, setResponses] = useState({});
  const accessToken = window.sessionStorage.getItem("accessToken");
  const navigate = useNavigate();

  // Fetch available forms
  useEffect(() => {
    const fetchForms = async () => {
      try {
        const response = await api.get(`/data/getForms`);
        if (response.status === 200) {
          setForms(response.data);
        }
      } catch (error) {
        console.error("Error fetching forms:", error);
      }
    };
    fetchForms();
  }, [accessToken]);

  const handleSubmit = async () => {
    // Validate required fields
    const missingFields = selectedForm.fields.filter(
      (field) => field.required && !responses[field.label]
    );

    if (missingFields.length > 0) {
      alert(
        `Please fill in the required fields: ${missingFields
          .map((f) => f.label)
          .join(", ")}`
      );
      return;
    }

    try {
      const response = await api.post("/data/insertFormsResponses", {
        form_id: selectedForm.id,
        responses,
      });
      if (response.status === 200) {
        alert("Form submitted successfully!");
        window.location.reload();
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  if (!selectedForm) {
    return (
      <div className="p-8 bg-gray-100">
        <div className="flex justify-between items-center">
          {" "}
          <h1 className="text-2xl font-bold mb-4">Select a Form</h1>{" "}
          <button
            className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
            onClick={() => navigate("/")}
          >
            Back{" "}
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {forms.map((form) => (
            <div
              key={form.id}
              className="p-4 bg-white shadow rounded-lg hover:shadow-lg cursor-pointer"
              onClick={() => setSelectedForm(form)}
            >
              <h2 className="text-lg font-bold">{form.name}</h2>
              <p className="text-gray-600">Form ID: {form.id}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 bg-gray-100">
      <div className="flex justify-between items-center">
        {" "}
        <h1 className="text-2xl font-bold mb-4">{selectedForm.name}</h1>
        <button
          className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
          onClick={() => setSelectedForm(null)}
        >
          Back{" "}
        </button>
      </div>{" "}
      <div className="space-y-6">
        {selectedForm.fields.map((field, index) => (
          <div key={index}>
            <label className="block font-semibold mb-2">
              {field.label}
              {field.required && <span className="text-red-500"> *</span>}
            </label>
            {field.type === "input" && (
              <input
                type={field.inputType || "text"}
                required={field.required}
                className="w-full p-2 border rounded-lg"
                onChange={(e) =>
                  setResponses({ ...responses, [field.label]: e.target.value })
                }
              />
            )}
            {field.type === "textarea" && (
              <textarea
                required={field.required}
                className="w-full p-2 border rounded-lg"
                onChange={(e) =>
                  setResponses({ ...responses, [field.label]: e.target.value })
                }
              />
            )}
            {field.type === "select" && (
              <select
                required={field.required}
                className="w-full p-2 border rounded-lg"
                onChange={(e) =>
                  setResponses({ ...responses, [field.label]: e.target.value })
                }
              >
                <option value="">Select an option</option>
                {field.options.map((option, idx) => (
                  <option key={idx} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            )}
          </div>
        ))}
      </div>
      <div className="mt-6 flex space-x-4">
        <button
          className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
          onClick={handleSubmit}
        >
          Submit
        </button>
        <button
          className="px-4 py-2 text-white bg-gray-500 rounded-lg hover:bg-gray-600"
          onClick={() => setSelectedForm(null)}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default FormRenderer;
