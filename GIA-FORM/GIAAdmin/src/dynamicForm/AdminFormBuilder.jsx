import React, { useEffect, useState } from "react";
import api from "./api";
import { useNavigate, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IoIosArrowBack } from "react-icons/io";
import { faEye, faUser } from "@fortawesome/free-solid-svg-icons";

const AdminFormBuilder = () => {
  const navigate = useNavigate();

  const [formName, setFormName] = useState("");
  const [fields, setFields] = useState([]);
  const [popupData, setPopupData] = useState(null);
  const accessToken = window.sessionStorage.getItem("accessToken");

  const addField = (type) => {
    setFields([
      ...fields,
      { type, label: "", options: [], required: false, inputType: "text" },
    ]);
  };

  const handlePopupSave = () => {
    const updatedFields = [...fields];
    updatedFields[popupData.index] = popupData.field;
    setFields(updatedFields);
    setPopupData(null); // Close popup
  };

  const deleteField = (index) => {
    setFields(fields.filter((_, i) => i !== index));
  };

  const saveForm = async () => {
    if (!formName) {
      alert("Please provide form name.");
      return;
    }
    if (fields.length === 0) {
      alert("Please add at least one field to save the form.");
      return;
    }
    if (window.confirm("Are you sure you want to save this form?")) {
      try {
        const response = await api.post(
          "/data/insertForms",
          {
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
          alert("Form saved successfully!");
          navigate("/ListOfForms");
        } else {
          alert(`Failed to save form. Status code: ${response.status}`);
        }
      } catch (error) {
        console.error("Error saving form:", error);
        alert(
          "An error occurred while saving the form. Please try again later."
        );
      }
    }
  };

  return (
    <div>
      {" "}
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
      <div className="p-8 space-y-6 bg-gray-100">
        <div className="flex justify-between items-center">
          {" "}
          <h1 className="text-2xl font-bold text-gray-700">
            Create a Form
          </h1>{" "}
          <button
            className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
            onClick={() => navigate("/ListOfForms")}
          >
            Back{" "}
          </button>
        </div>
        <input
          type="text"
          className="w-full p-2 border rounded-lg"
          placeholder="Form Name"
          value={formName}
          onChange={(e) => setFormName(e.target.value)}
        />
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
        </div>

        <div className="space-y-4">
          {fields.map((field, index) => (
            <div
              key={index}
              className="flex items-center space-x-4 p-4 bg-white rounded-lg shadow"
            >
              <span className="text-lg font-semibold">
                {field.label || "Untitled Field"}
              </span>
              <button
                className="text-blue-500 hover:text-blue-700"
                onClick={() =>
                  setPopupData({
                    index,
                    field: { ...field },
                  })
                }
              >
                Edit
              </button>
              <button
                className="text-red-500 hover:text-red-700"
                onClick={() => deleteField(index)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>

        <button
          className="px-4 py-2 text-white bg-indigo-500 rounded-lg hover:bg-indigo-600"
          onClick={saveForm}
        >
          Save Form
        </button>

        {/* Popup for Field Configuration */}
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
                  <div className="flex space-x-4">
                    {["text", "date", "number"].map((type) => (
                      <label key={type} className="flex items-center space-x-2">
                        <input
                          type="radio"
                          name="inputType"
                          value={type}
                          checked={popupData.field.inputType === type}
                          onChange={(e) =>
                            setPopupData({
                              ...popupData,
                              field: {
                                ...popupData.field,
                                inputType: e.target.value,
                              },
                            })
                          }
                        />
                        <span>{type}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}
              {popupData.field.type === "select" && (
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
                  onClick={handlePopupSave}
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

export default AdminFormBuilder;
