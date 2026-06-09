import React, { useEffect, useState } from "react";
import api from "./api";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IoIosArrowBack } from "react-icons/io";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const EditFormBuilder = () => {
  const navigate = useNavigate();
  const formId = 7; // Get form ID from URL
  const [formName, setFormName] = useState("");
  const [fields, setFields] = useState([]);
  const [popupData, setPopupData] = useState(null);
  const accessToken = window.sessionStorage.getItem("accessToken");

  // Fetch form data on component mount
  useEffect(() => {
    const fetchFormData = async () => {
      try {
        const response = await api.get(`/data/getForms?id=${7}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        if (response.status === 200) {
          const formData = response.data;
          setFormName(formData[0].name);
          setFields(formData[0].fields);
        }
      } catch (error) {
        console.error("Error fetching form data:", error);
        alert("Failed to load form data.");
      }
    };

    fetchFormData();
  }, [formId, accessToken]);

  // Add a new field
  const addField = (type) => {
    const defaultSerialNumber = fields.length + 1;
    setFields([
      ...fields,
      {
        type,
        label: "",
        serialNumber: `${defaultSerialNumber}`,
        options: [],
        required: false,
        inputType: "text",
      },
    ]);
  };

  // Save changes to the form
  const saveForm = async () => {
    if (!formName) {
      alert("Please provide a form name.");
      return;
    }
    if (fields.length === 0) {
      alert("Please add at least one field to save the form.");
      return;
    }

    const serialNumbers = fields.map((field) => field.serialNumber);
    const hasDuplicateSerialNumbers =
      new Set(serialNumbers).size !== serialNumbers.length;

    if (hasDuplicateSerialNumbers) {
      alert("Duplicate serial numbers are not allowed.");
      return;
    }

    if (window.confirm("Are you sure you want to save changes to this form?")) {
      try {
        const response = await api.post(
          `/data/updateForms`,
          {
            id: formId,
            formName,
            fields,
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        if (response.status === 200) {
          alert("Form updated successfully!");
          navigate(`/formDetails/${formId}`); // Navigate to form details page after saving
        }
      } catch (error) {
        console.error("Error updating form:", error);
      }
    }
  };

  // Delete the form
  const deleteForm = async () => {
    if (
      window.confirm(
        "Are you sure you want to delete this form? This action cannot be undone."
      )
    ) {
      try {
        const response = await api.post(
          `/data/deleteForms`,
          {
            id: formId,
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        if (response.status === 200) {
          alert("Form deleted successfully!");
          window.location.reload();
          navigate("/ListOfForms");
        }
      } catch (error) {
        console.error("Error deleting form:", error);
      }
    }
  };

  return (
    <div>
      <div className="bg-green-900 text-white p-4 rounded-b-[20px] relative">
        <div className="flex items-center justify-between rounded-b-lg">
          <button
            className="text-white text-[30px] font-extrabold"
            onClick={() => navigate("/AdminDashboard")}
          >
            <IoIosArrowBack />
          </button>
          <h1 className="text-white font-extrabold text-2xl capitalize">GIA</h1>
          <div className="rounded-full bg-white p-2 px-3">
            <FontAwesomeIcon icon={faUser} className="text-blue-600" />
          </div>
        </div>
      </div>

      <div className="p-8 space-y-6 bg-gray-100">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-700">Edit Form</h1>
          <button
            className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
            onClick={() => navigate("/ListOfForms")}
          >
            Back
          </button>
        </div>

        <input
          type="text"
          className="w-full p-2 border rounded-lg"
          placeholder="Form Name"
          value={formName}
          onChange={(e) => setFormName(e.target.value)}
        />

        <div className="space-y-4">
          {fields.map((field, index) => (
            <div
              key={index}
              className="flex items-center space-x-4 p-4 bg-white rounded-lg shadow"
            >
              {console.log(JSON.stringify(fields, null, 2))}
              <input
                type="text"
                className="w-20 p-2 border rounded-lg"
                placeholder="Serial No."
                value={field.serialNumber}
                onChange={(e) => {
                  const updatedFields = [...fields];
                  updatedFields[index].serialNumber = e.target.value;
                  setFields(updatedFields);
                }}
              />
              <input
                type="text"
                className="flex-grow p-2 border rounded-lg"
                placeholder="Label"
                value={field.label}
                onChange={(e) => {
                  const updatedFields = [...fields];
                  updatedFields[index].label = e.target.value;
                  setFields(updatedFields);
                }}
              />
              <button
                className="text-blue-500 hover:text-blue-700"
                onClick={() => {
                  setPopupData({
                    index,
                    field: { ...field },
                  });
                }}
              >
                Edit
              </button>
              <button
                className="text-red-500 hover:text-red-700"
                onClick={() => {
                  const updatedFields = fields.filter((_, i) => i !== index);
                  setFields(updatedFields);
                }}
              >
                Delete
              </button>
            </div>
          ))}
        </div>

        <div className="flex space-x-4">
          <button
            className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
            onClick={() => addField("input")}
          >
            Add Input
          </button>
          <button
            className="px-4 py-2 text-white bg-green-500 rounded-lg hover:bg-green-600"
            onClick={() => addField("textarea")}
          >
            Add Narration
          </button>
          <button
            className="px-4 py-2 text-white bg-purple-500 rounded-lg hover:bg-purple-600"
            onClick={() => addField("select")}
          >
            Add Select
          </button>
          <button
            className="px-4 py-2 text-white bg-yellow-500 rounded-lg hover:bg-yellow-600"
            onClick={() => addField("checkbox")}
          >
            Add Checkbox
          </button>
          <button
            className="px-4 py-2 text-white bg-pink-500 rounded-lg hover:bg-pink-600"
            onClick={() => addField("radio")}
          >
            Add Radio Button
          </button>
        </div>

        <button
          className="px-4 py-2 text-white bg-indigo-500 rounded-lg hover:bg-indigo-600"
          onClick={saveForm}
        >
          Save Changes
        </button>

        <button
          className="px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600"
          onClick={deleteForm}
        >
          Delete Form
        </button>

        {/* Field Edit Popup */}
        {popupData && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
            <div className="p-6 bg-white rounded-lg shadow-lg space-y-4">
              <h2 className="text-lg font-bold">Configure Field</h2>
              <input
                type="text"
                className="w-full p-2 border rounded-lg"
                placeholder="Label"
                value={popupData.field.label}
                onChange={(e) =>
                  setPopupData({
                    ...popupData,
                    field: { ...popupData.field, label: e.target.value },
                  })
                }
              />
              {popupData.field.type === "input" && (
                <div>
                  <p className="font-semibold">Input Type</p>
                  <select
                    className="w-full p-2 border rounded-lg"
                    value={popupData.field.inputType}
                    onChange={(e) =>
                      setPopupData({
                        ...popupData,
                        field: {
                          ...popupData.field,
                          inputType: e.target.value,
                        },
                      })
                    }
                  >
                    <option value="text">Text</option>
                    <option value="number">Number</option>
                    <option value="date">Date</option>
                  </select>
                </div>
              )}
              {(popupData.field.type === "select" ||
                popupData.field.type === "radio" ||
                popupData.field.type === "checkbox") && (
                <div>
                  <p className="font-semibold">Options</p>
                  {popupData.field.options.map((option, idx) => (
                    <div key={idx} className="flex items-center space-x-2">
                      <input
                        type="text"
                        className="p-2 border rounded-lg"
                        value={option}
                        onChange={(e) => {
                          const updatedOptions = [...popupData.field.options];
                          updatedOptions[idx] = e.target.value;
                          setPopupData({
                            ...popupData,
                            field: {
                              ...popupData.field,
                              options: updatedOptions,
                            },
                          });
                        }}
                      />
                      <button
                        className="text-red-500 hover:text-red-700"
                        onClick={() => {
                          const updatedOptions = popupData.field.options.filter(
                            (_, i) => i !== idx
                          );
                          setPopupData({
                            ...popupData,
                            field: {
                              ...popupData.field,
                              options: updatedOptions,
                            },
                          });
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  ))}
                  <button
                    className="px-2 py-1 mt-2 text-white bg-blue-500 rounded hover:bg-blue-600"
                    onClick={() =>
                      setPopupData({
                        ...popupData,
                        field: {
                          ...popupData.field,
                          options: [...popupData.field.options, ""],
                        },
                      })
                    }
                  >
                    Add Option
                  </button>
                </div>
              )}
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={popupData.field.required}
                  onChange={(e) =>
                    setPopupData({
                      ...popupData,
                      field: { ...popupData.field, required: e.target.checked },
                    })
                  }
                />
                <span>Required</span>
              </label>
              <div className="flex space-x-4">
                <button
                  className="px-4 py-2 text-white bg-green-500 rounded-lg hover:bg-green-600"
                  onClick={() => {
                    const updatedFields = [...fields];
                    updatedFields[popupData.index] = popupData.field;
                    setFields(updatedFields);
                    setPopupData(null); // Close the popup
                  }}
                >
                  Save
                </button>
                <button
                  className="px-4 py-2 text-white bg-gray-500 rounded-lg hover:bg-gray-600"
                  onClick={() => setPopupData(null)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditFormBuilder;
