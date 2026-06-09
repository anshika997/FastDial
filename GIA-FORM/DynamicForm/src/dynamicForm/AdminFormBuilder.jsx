import React, { useEffect, useState } from "react";
import api from "./api";
import { useNavigate, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IoIosArrowBack } from "react-icons/io";
import { faEye, faUser } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useParams } from "react-router-dom";

const AdminFormBuilder = () => {
  const navigate = useNavigate();

  const [formName, setFormName] = useState("");
  const [fields, setFields] = useState([]);
  const [popupData, setPopupData] = useState(null);
  const accessToken = window.sessionStorage.getItem("accessToken");
  const { groupId } = useParams();

  const addField = (type) => {
    const defaultSerialNumber = fields.length + 1;
    setFields([
      ...fields,
      {
        type,
        label: "",
        reason: "",
        serialNumber: defaultSerialNumber.toString(),
        options: [],
        required: false,
        inputType: "text",
        defaultValue: "",
        comment: "",
        attachment: [],
        mode: "manual", // ✅ added default mode
      },
    ]);
  };

  const handlePopupSave = () => {
    const updatedFields = [...fields];
    updatedFields[popupData.index] = popupData.field;
    setFields(updatedFields);
    setPopupData(null);
  };

  const deleteField = (index) => {
    setFields(fields.filter((_, i) => i !== index));
  };

  const validateUniqueCodes = (options) => {
    const codes = options.map((opt) => opt.code);
    return new Set(codes).size === codes.length;
  };

  const uploadAttachmentHandler = async (files, index) => {
    if (!files || files.length === 0) return;

    const uploadedUrls = [];

    for (let file of files) {
      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await axios.post(
          "https://experience-pavillion.com/api/v1/global/upload/file",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        const url = response?.data?.url;
        if (url) uploadedUrls.push(url);
      } catch (error) {
        console.error("Upload error:", error);
      }
    }

    const updatedFields = [...fields];
    if (!Array.isArray(updatedFields[index].attachments)) {
      updatedFields[index].attachments = [];
    }
    updatedFields[index].attachments.push(...uploadedUrls);
    setFields(updatedFields);

    alert("Files uploaded successfully!");
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

    const serialNumbers = fields.map((field) => field.serialNumber);
    const hasDuplicateSerialNumbers =
      new Set(serialNumbers).size !== serialNumbers.length;

    if (hasDuplicateSerialNumbers) {
      alert("Duplicate serial numbers are not allowed.");
      return;
    }

    if (window.confirm("Are you sure you want to save this form?")) {
      try {
        const response = await api.post(
          "/data/insertForms",
          {
            name: formName,
            group_id: groupId,
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
          navigate(`/ListOfForms/${groupId}`);
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
      <div className="bg-green-900 text-white p-4 rounded-b-[20px] relative">
        <div className="flex items-center justify-between rounded-b-lg">
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
      <div className="p-8 space-y-6 bg-gray-100">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-700">Create a Form</h1>
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
        <div className="flex space-x-4">
          <button
            className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
            onClick={() => addField("input")}
          >
            Add Input
          </button>
          {/* <button
            className="px-4 py-2 text-white bg-green-500 rounded-lg hover:bg-green-600"
            onClick={() => addField("textarea")}
          >
            Add Narration
          </button> */}
          {/* <button
            className="px-4 py-2 text-white bg-purple-500 rounded-lg hover:bg-purple-600"
            onClick={() => addField("select")}
          >
            Add Select
          </button> */}
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

        <div className="space-y-4">
          {fields.map((field, index) => (
            <div
              key={index}
              className="flex items-center space-x-4 p-4 bg-white rounded-lg shadow"
            >
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
              {/* <input
                type="text"
                className="flex-grow p-2 border rounded-lg"
                placeholder="Why is this question asked?"
                value={field.reason} // Added reason field
                onChange={(e) => {
                  const updatedFields = [...fields];
                  updatedFields[index].reason = e.target.value;
                  setFields(updatedFields);
                }}
              /> */}
              {/* <input
                type="text"
                className="flex-grow p-2 border rounded-lg"
                placeholder="Default Value"
                value={field.defaultValue}
                onChange={(e) => {
                  const updatedFields = [...fields];
                  updatedFields[index].defaultValue = e.target.value;
                  setFields(updatedFields);
                }}
              /> */}

              <textarea
                className="flex-grow p-2 border rounded-lg"
                placeholder="Add a comment"
                value={field.comment}
                onChange={(e) => {
                  const updatedFields = [...fields];
                  updatedFields[index].comment = e.target.value;
                  setFields(updatedFields);
                }}
              />

              <input
                type="file"
                multiple
                className="p-2 border rounded-lg"
                onChange={(e) => {
                  const selectedFiles = Array.from(e.target.files);
                  uploadAttachmentHandler(selectedFiles, index);
                }}
              />

              {field.attachments?.length > 0 && (
                <div className="flex flex-col gap-1">
                  {field.attachments.map((url, i) => (
                    <a
                      key={i}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline text-sm"
                    >
                      View Attachment {i + 1}
                    </a>
                  ))}
                </div>
              )}

              <button
                className="text-blue-500 hover:text-blue-700"
                onClick={() => {
                  if (!field.serialNumber.trim()) {
                    alert("Serial Number or Label cannot be empty.");
                    return;
                  }
                  setPopupData({
                    index,
                    field: { ...field },
                  });
                }}
              >
                Edit
              </button>

              <button
                className="text-gray-600 hover:text-black disabled:opacity-50"
                disabled={index === 0}
                onClick={() => {
                  if (index > 0) {
                    const newFields = [...fields];
                    [newFields[index - 1], newFields[index]] = [
                      newFields[index],
                      newFields[index - 1],
                    ];
                    setFields(newFields);
                  }
                }}
              >
                ↑
              </button>
              <button
                className="text-gray-600 hover:text-black disabled:opacity-50"
                disabled={index === fields.length - 1}
                onClick={() => {
                  if (index < fields.length - 1) {
                    const newFields = [...fields];
                    [newFields[index + 1], newFields[index]] = [
                      newFields[index],
                      newFields[index + 1],
                    ];
                    setFields(newFields);
                  }
                }}
              >
                ↓
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
              />{" "}
              {popupData.field.type === "input" && (
                <div>
                  {/* Input Type Dropdown */}
                  <p className="font-semibold">Input Type</p>
                  <select
                    className="w-full p-2 border rounded-lg mb-3"
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
                    <option value="doc_link">Document Link</option>
                  </select>

                  {/* Automatic / Manual Radio Buttons */}
                  <p className="font-semibold mt-3">Mode</p>
                  <div className="flex items-center gap-4 mt-2">
                    {/* Automatic */}
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="mode"
                        value="automatic"
                        checked={popupData.field.mode === "automatic"}
                        onChange={(e) =>
                          setPopupData({
                            ...popupData,
                            field: {
                              ...popupData.field,
                              mode: e.target.value,
                            },
                          })
                        }
                      />
                      Automatic
                    </label>

                    {/* Manual */}
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="mode"
                        value="manual"
                        checked={popupData.field.mode === "manual"}
                        onChange={(e) =>
                          setPopupData({
                            ...popupData,
                            field: {
                              ...popupData.field,
                              mode: e.target.value,
                            },
                          })
                        }
                      />
                      Manual
                    </label>
                  </div>
                </div>
              )}
              {/* <input
                type="text"
                className="w-full p-2 border rounded-lg"
                placeholder="Default Value"
                value={popupData.field.defaultValue}
                onChange={(e) =>
                  setPopupData({
                    ...popupData,
                    field: { ...popupData.field, defaultValue: e.target.value },
                  })
                }
              /> */}
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
                        placeholder="Code"
                        value={option.code}
                        onChange={(e) => {
                          const newCode = e.target.value;
                          const updatedOptions = [...popupData.field.options];
                          updatedOptions[idx].code = newCode;

                          // Check for duplicate codes
                          const codes = updatedOptions.map((opt) =>
                            opt.code.trim()
                          );
                          const hasDuplicate = codes.some(
                            (code, i) => code && codes.indexOf(code) !== i
                          );

                          if (hasDuplicate) {
                            alert("Code values must be unique.");
                            return;
                          }

                          setPopupData({
                            ...popupData,
                            field: {
                              ...popupData.field,
                              options: updatedOptions,
                            },
                          });
                        }}
                      />

                      <input
                        type="text"
                        className="p-2 border rounded-lg"
                        placeholder="Value"
                        value={option.value}
                        onChange={(e) => {
                          const updatedOptions = [...popupData.field.options];
                          updatedOptions[idx].value = e.target.value;
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
                          options: [
                            ...popupData.field.options,
                            { value: "", code: "" },
                          ],
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
                    const optionsValid = validateUniqueCodes(
                      popupData.field.options
                    );
                    if (!optionsValid) {
                      alert("Code values must be unique.");
                      return;
                    }
                    handlePopupSave();
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

export default AdminFormBuilder;
