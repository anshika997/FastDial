import React, { useEffect, useRef, useState } from "react";
import api from "./api";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useParams } from "react-router-dom";

const compareSerialNumber = (a, b) => {
  const splitA = (a || "0").split(".");
  const splitB = (b || "0").split(".");

  for (let i = 0; i < Math.max(splitA.length, splitB.length); i++) {
    const partA = splitA[i] || "0";
    const partB = splitB[i] || "0";

    if (!isNaN(partA) && !isNaN(partB)) {
      const numA = parseFloat(partA);
      const numB = parseFloat(partB);
      if (numA !== numB) return numA - numB;
    } else {
      if (partA !== partB) return partA.localeCompare(partB);
    }
  }
  return 0;
};

const FormRenderer = () => {
  const [forms, setForms] = useState([]);
  const [selectedForm, setSelectedForm] = useState(null);
  const [responses, setResponses] = useState({});
  const [questions, setQuestions] = useState([
    {
      question: "",
      type: "text",
      answers: [{ code: "", value: "" }],
      attachments: [], // 👈 added this
    },
  ]);

  const [username, setUsername] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [showUserModal, setShowUserModal] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { groupId } = useParams();

  const formListRef = useRef(null);

  const [docAttachments, setDocAttachments] = useState([
    { label: "", link: "" },
  ]);
  const accessToken = window.sessionStorage.getItem("accessToken");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchForms = async () => {
      try {
        const response = await api.get(`/data/getForms`);
        if (response.status === 200) {
          const filteredForms = response.data.filter(
            (form) => form.group_id == groupId
          );
          setForms(filteredForms);
          if (filteredForms.length > 0) {
            const firstForm = { ...filteredForms[0] };
            firstForm.fields = [...firstForm.fields].sort((a, b) =>
              compareSerialNumber(
                a?.serialNumber || "0",
                b?.serialNumber || "0"
              )
            );
            setSelectedForm(firstForm);
          }
        }
      } catch (error) {
        console.error("Error fetching forms:", error);
      }
    };
    fetchForms();
  }, [accessToken]);

  console.log(forms, "forms");

  const handleSubmit = async () => {
    const missingFields = selectedForm.fields.filter(
      (field) => field.required && !responses[field.label]
    );

    if (missingFields.length > 0) {
      const missingFieldNames = missingFields
        .map((field) => field.label)
        .join(", ");
      alert(`The following required fields are missing: ${missingFieldNames}`);
      return;
    }

    const emptyQuestions = questions.some((q) => !q.question);

    if (emptyQuestions) {
      alert("Please fill in all questions before submitting.");
      return;
    }

    const isConfirmed = window.confirm(
      "Are you sure you want to submit the form?"
    );
    if (!isConfirmed) {
      return;
    }

    try {
      const updatedResponses = { ...responses };

      // Separate codes and values for checkboxes, select, and radio fields
      selectedForm.fields.forEach((field) => {
        if (
          field.type === "checkbox" ||
          field.type === "radio" ||
          field.type === "select"
        ) {
          const fieldResponses = responses[field.label] || [];
          const codes = [];
          const values = [];

          if (Array.isArray(fieldResponses)) {
            fieldResponses.forEach((response) => {
              const [code, value] = response.split(" - ");
              codes.push(code);
              values.push(value);
            });
          } else if (fieldResponses) {
            const [code, value] = fieldResponses.split(" - ");
            codes.push(code);
            values.push(value);
          }

          // Add the codes array with the field name suffixed by "Code"
          updatedResponses[`${field.label}Code`] = codes;
          updatedResponses[field.label] = values;
        }
      });

      // Store Q&A as an array of arrays with question, code, and value
      updatedResponses["q&a"] = questions
        .map((qa) => {
          if (qa.type === "text") {
            return [qa.question, "TEXT", qa.answers[0]?.value || ""];
          } else if (qa.type === "checkbox") {
            return qa.answers.map((ans) => [qa.question, ans.code, ans.value]);
          }
        })
        .flat();

      // Store document attachments as an array of arrays (["label", "link"])
      updatedResponses["docAttach"] = docAttachments
        .filter((doc) => doc.label && doc.link) // Ensure both label & link exist
        .map((doc) => [doc.label, doc.link]);

      const response = await api.post("/data/insertFormsResponses", {
        form_id: selectedForm.id,
        user_name: username,
        phone_number: phoneNo,
        responses: updatedResponses,
      });

      if (response.status === 200) {
        setIsSubmitted(true);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred while submitting the form. Please try again.");
    }
  };

  const handleQuestionChange = (questionIndex, answerIndex, field, value) => {
    const updatedQuestions = [...questions];

    if (field === "question") {
      // Directly update the question text
      updatedQuestions[questionIndex].question = value;
    } else {
      // Update answers array
      updatedQuestions[questionIndex].answers[answerIndex][field] = value;
    }

    setQuestions(updatedQuestions);
  };

  const addAnswer = (questionIndex) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].answers.push({ code: "", value: "" });
    setQuestions(updatedQuestions);
  };
  const removeAnswer = (questionIndex, answerIndex) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].answers.splice(answerIndex, 1);
    setQuestions(updatedQuestions);
  };
  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        question: "",
        type: "text",
        answers: [{ code: "", value: "" }],
        attachments: [], // 👈 added this
      },
    ]);
  };

  const removeQuestion = (questionIndex) => {
    const updatedQuestions = [...questions];
    updatedQuestions.splice(questionIndex, 1);
    setQuestions(updatedQuestions);
  };

  const handleMoveUp = (index) => {
    if (index === 0) return;
    setSelectedForm((prev) => {
      const updatedFields = [...prev.fields];
      [updatedFields[index - 1], updatedFields[index]] = [
        updatedFields[index],
        updatedFields[index - 1],
      ];
      return { ...prev, fields: updatedFields };
    });
  };

  const handleMoveDown = (index) => {
    setSelectedForm((prev) => {
      const updatedFields = [...prev.fields];
      if (index === updatedFields.length - 1) return prev;
      [updatedFields[index + 1], updatedFields[index]] = [
        updatedFields[index],
        updatedFields[index + 1],
      ];
      return { ...prev, fields: updatedFields };
    });
  };

  const updateFieldValue = (index, key, value) => {
    setSelectedForm((prev) => {
      const updatedFields = [...prev.fields];
      updatedFields[index] = {
        ...updatedFields[index],
        [key]: value,
      };
      return { ...prev, fields: updatedFields };
    });
  };

  const addNewOption = (index) => {
    setSelectedForm((prev) => {
      const updatedFields = [...prev.fields];
      const field = updatedFields[index];
      const updatedOptions = [
        ...field.options,
        { code: field.newCode, value: field.newValue },
      ];
      updatedFields[index] = {
        ...field,
        options: updatedOptions,
        newCode: "",
        newValue: "",
      };
      return { ...prev, fields: updatedFields };
    });
  };

  // Function to handle adding dynamic inputs (Text, Date, Select)
  const handleAddInputValue = (label) => {
    setResponses((prev) => {
      const currentValues = Array.isArray(prev[label])
        ? prev[label]
        : prev[label]
        ? [prev[label]]
        : [];
      return {
        ...prev,
        [label]: [...currentValues, ""],
      };
    });
  };

  const handleMultiFileUpload = async (label, index, files) => {
    if (!files || files.length === 0) return;

    const uploadedUrls = [];

    for (let file of files) {
      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await axios.post(
          "https://experience-pavillion.com/api/v1/global/upload/file",
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );

        const url = response?.data?.url;
        if (url) uploadedUrls.push(url);
      } catch (error) {
        console.error("Upload error:", error);
        alert("One or more files failed to upload.");
      }
    }

    const uniqueKey = `${label}_${index}_attachments`;

    setResponses((prev) => {
      const existing = Array.isArray(prev[uniqueKey]) ? prev[uniqueKey] : [];
      return {
        ...prev,
        [uniqueKey]: [...existing, ...uploadedUrls],
      };
    });
  };

  const handleQuestionFileUpload = async (questionIndex, files) => {
    const uploadedUrls = [];

    for (let file of files) {
      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await axios.post(
          "https://experience-pavillion.com/api/v1/global/upload/file",
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        const url = response?.data?.url;
        if (url) uploadedUrls.push(url);
      } catch (error) {
        console.error("Upload error:", error);
        alert("Failed to upload one or more attachments.");
      }
    }

    setQuestions((prev) => {
      const updated = [...prev];
      updated[questionIndex].attachments = [...uploadedUrls];

      return updated;
    });
  };

  const scrollLeft = () => {
    formListRef.current.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = () => {
    formListRef.current.scrollBy({ left: 300, behavior: "smooth" });
  };

  // Function to handle value change for dynamic inputs
  const handleInputChange = (label, index, value) => {
    setResponses((prev) => {
      const currentValues = Array.isArray(prev[label])
        ? [...prev[label]]
        : prev[label] !== undefined
        ? [prev[label]]
        : [];

      currentValues[index] = value;

      return {
        ...prev,
        [label]: currentValues,
      };
    });
  };

  const sortedFields = selectedForm?.fields || [];

  if (!selectedForm) {
    return (
      <div className="p-8 text-center">
        <p className="text-gray-500 text-lg">Loading form data...</p>
      </div>
    );
  }

  const speakText = (text) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(utterance);
    } else {
      alert("Your browser does not support text-to-speech functionality.");
    }
  };
  if (showUserModal) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <h2 className="text-xl font-bold mb-4">Enter Your Details</h2>
          <div className="mb-4">
            <label className="block font-semibold mb-1">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-2 border rounded-lg"
              placeholder="Enter your name"
            />
          </div>
          <div className="mb-4">
            <label className="block font-semibold mb-1">Phone Number</label>
            <input
              type="tel"
              value={phoneNo}
              onChange={(e) => setPhoneNo(e.target.value)}
              className="w-full p-2 border rounded-lg"
              placeholder="Enter your phone number"
            />
          </div>
          <button
            onClick={() => {
              if (!username || !phoneNo) {
                alert("Please enter both Username and Phone Number");
                return;
              }
              setShowUserModal(false);
            }}
            className="w-full py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
          >
            Continue to Form
          </button>
        </div>
      </div>
    );
  }

  if (isSubmitted) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-green-50">
        <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md">
          <h2 className="text-2xl font-bold text-green-600 mb-4">
            ✅ Form Submitted Successfully!
          </h2>
          <p className="text-gray-700 mb-6">
            Thank you <span className="font-semibold">{username}</span>! Your
            form has been submitted.
          </p>
          <button
            onClick={() => navigate("/")}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Go to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 bg-gray-100">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold mb-4">Select a Form</h1>
        <button
          className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
          onClick={() => navigate("/")}
        >
          Back
        </button>
      </div>
      <div className="relative w-full mb-6 ">
        {/* Left Scroll Button */}
        <button
          onClick={scrollLeft}
          className="absolute -left-5 top-1/2 transform -translate-y-1/2 z-10 bg-white shadow-md rounded-full p-2 hover:bg-gray-100"
        >
          ←
        </button>

        {/* Scrollable Form List */}
        <div
          ref={formListRef}
          className="overflow-x-auto scroll-smooth snap-x snap-mandatory px-12 scrollbar-hide"
        >
          <div className="flex space-x-4 min-w-max ">
            {forms.map((form) => (
              <div
                key={form.id}
                className={`w-80 h-30 p-4 flex-shrink-0 snap-start bg-white shadow rounded-lg hover:shadow-lg cursor-pointer 
            flex flex-col justify-between 
            ${selectedForm?.id === form.id ? "border-2 border-blue-500" : ""}`}
                onClick={() => setSelectedForm(form)}
              >
                <h2 className="text-lg font-bold truncate overflow-hidden whitespace-nowrap">
                  {form.name}
                </h2>
                <p className="text-gray-600">Form ID: {form.id}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Scroll Button */}
        <button
          onClick={scrollRight}
          className="absolute -right-5 top-1/2 transform -translate-y-1/2 z-10 bg-white shadow-md rounded-full p-2 hover:bg-gray-100"
        >
          →
        </button>
      </div>

      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold mb-4">{selectedForm.name}</h1>
      </div>

      <div className="space-y-6">
        {sortedFields.map((field, index) => (
          <div key={index} className="mb-8 border-b pb-6">
            {/* Move Up and Down Buttons */}
            <div className="flex gap-3 mb-4">
              <button
                onClick={() => handleMoveUp(index)}
                className="text-sm px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded"
                disabled={index === 0}
              >
                ⬆️ Move Up
              </button>
              <button
                onClick={() => handleMoveDown(index)}
                className="text-sm px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded"
                disabled={index === sortedFields.length - 1}
              >
                ⬇️ Move Down
              </button>
            </div>

            <label className="block font-semibold mb-2">
              <span className="text-blue-800 mr-3 font-extrabold">
                {field.serialNumber} )
              </span>
              {field.label}
              <button
                onClick={() => speakText(field.label)}
                className="text-blue-500 ml-5"
              >
                🔊
              </button>
              {field.required && <span className="text-red-500"> *</span>}
            </label>

            {/* {field.reason && (
              <div>
                <p className="text-sm font-semibold text-slate-600">
                  {field.defaultValue} ) Why Question is Asked?
                </p>
              </div>
            )} */}

            {/* {field.inputType === "doc_link" ? (
              <div>
                <button
                  onClick={() => window.open(field.defaultValue, "_blank")}
                  className="text-blue-500"
                >
                  View Document Link
                </button>
              </div>
            ) : (
              <div>
                <input
                  required={field.reason}
                  readOnly
                  value={field.reason}
                  className="w-full p-2 border rounded-lg bg-slate-200"
                />
              </div>
            )} */}

            {!field.required && (
              <div className="flex items-center mb-2">
                <label className="font-semibold">Not Required</label>
                <input
                  type="checkbox"
                  className="ml-2"
                  checked={field.isEnabled === false}
                  onChange={() => {
                    setSelectedForm((prev) => {
                      const updatedFields = [...prev.fields];
                      updatedFields[index] = {
                        ...field,
                        isEnabled: field.isEnabled === false,
                      };
                      return { ...prev, fields: updatedFields };
                    });
                  }}
                />
              </div>
            )}
            <div className="flex items-center mb-2 gap-2">
              {field.comment && (
                <div className="mb-2">
                  <p className="text-sm font-semibold text-slate-600">
                    admin comment : {field.comment}
                  </p>
                </div>
              )}
              {field.attachments && (
                <div className="mb-2">
                  <p className="text-sm font-semibold text-slate-600 flex items-center gap-2">
                    <span>Admin Attachment:</span>
                    {field.attachments.map((attachment, index) => (
                      <img
                        key={index}
                        src={attachment}
                        alt=""
                        className="w-20 h-20"
                        onClick={() => window.open(attachment, "_blank")}
                      />
                    ))}
                  </p>
                </div>
              )}
            </div>

            {field.type === "input" && (
              <div>
                {(Array.isArray(responses[field.label])
                  ? responses[field.label]
                  : [""]
                ).map((val, idx) => (
                  <input
                    key={idx}
                    type={field.inputType || "text"}
                    value={val}
                    className="w-full p-2 border rounded-lg"
                    onChange={(e) =>
                      handleInputChange(field.label, idx, e.target.value)
                    }
                    disabled={field.isEnabled === false}
                  />
                ))}
                <button
                  onClick={() => handleAddInputValue(field.label)}
                  className="text-blue-500 mt-2"
                >
                  Add Another
                </button>
              </div>
            )}

            {field.type === "textarea" && (
              <textarea
                required={field.required}
                className="w-full p-2 border rounded-lg"
                value={responses[field.label] || ""}
                onChange={(e) =>
                  setResponses({
                    ...responses,
                    [field.label]: e.target.value,
                  })
                }
                placeholder={field.placeholder || "Enter your response"}
                rows={4}
                disabled={field.isEnabled === false}
              />
            )}

            {field.type === "radio" && (
              <div className="space-y-2">
                <div className="flex gap-10 font-semibold text-sm text-gray-700 mb-1 ml-6">
                  <span className="w-[100px]">Code</span>
                  <span className="w-[200px]">Description</span>
                </div>

                {field.options.map((option, idx) => (
                  <div key={idx} className="flex items-center">
                    <input
                      type="radio"
                      name={field.label}
                      value={`${option.code} - ${option.value}`}
                      checked={
                        responses[field.label] ===
                        `${option.code} - ${option.value}`
                      }
                      className="mr-2"
                      onChange={(e) =>
                        setResponses({
                          ...responses,
                          [field.label]: e.target.value,
                        })
                      }
                      disabled={field.isEnabled === false}
                    />
                    <div className="flex gap-10 items-center">
                      <span className="w-[100px] px-2 rounded bg-slate-300">
                        {option.code}
                      </span>
                      <span className="w-[200px] px-2 rounded bg-slate-300">
                        {option.value}
                      </span>
                    </div>
                  </div>
                ))}

                <div className="mt-4 space-y-2">
                  <h3 className="font-semibold">Add New Option</h3>
                  <input
                    type="text"
                    placeholder="Code"
                    className="w-[300px] p-2 border rounded-lg"
                    value={field.newCode || ""}
                    onChange={(e) =>
                      updateFieldValue(index, "newCode", e.target.value)
                    }
                    disabled={field.isEnabled === false}
                  />
                  <input
                    type="text"
                    placeholder="Value"
                    className="w-[600px] mx-3 p-2 border rounded-lg"
                    value={field.newValue || ""}
                    onChange={(e) =>
                      updateFieldValue(index, "newValue", e.target.value)
                    }
                    disabled={field.isEnabled === false}
                  />
                  <button
                    onClick={() => addNewOption(index)}
                    className="mt-2 px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
                  >
                    Add Option
                  </button>
                </div>
              </div>
            )}

            {field.type === "checkbox" && (
              <div className="space-y-2">
                <div className="flex gap-10 font-semibold text-sm text-gray-700 mb-1 ml-6">
                  <span className="w-[100px]">Code</span>
                  <span className="w-[200px]">Description</span>
                </div>

                {field.options.map((option, idx) => {
                  const value = `${option.code} - ${option.value}`;
                  const selectedValues = responses[field.label] || [];

                  return (
                    <div key={idx} className="flex items-center">
                      <input
                        type="checkbox"
                        value={value}
                        checked={selectedValues.includes(value)}
                        onChange={(e) => {
                          const isChecked = e.target.checked;
                          const updated = isChecked
                            ? [...selectedValues, value]
                            : selectedValues.filter((v) => v !== value);
                          setResponses({
                            ...responses,
                            [field.label]: updated,
                          });
                        }}
                        className="mr-2"
                        disabled={field.isEnabled === false}
                      />
                      <div className="flex gap-10 items-center">
                        <span className="w-[100px] px-2 rounded bg-slate-300">
                          {option.code}
                        </span>
                        <span className="w-[200px] px-2 rounded bg-slate-300">
                          {option.value}
                        </span>
                      </div>
                    </div>
                  );
                })}

                {/* === USER CAN ADD THEIR OWN OPTION === */}
                <div className="mt-4">
                  <h4 className="font-semibold mb-2">Add Your Own Option</h4>
                  <div className="flex gap-2">
                    {/* Custom Code */}
                    <input
                      type="text"
                      placeholder="Custom Code"
                      className="w-1/3 p-2 border rounded-lg"
                      value={field.userCustomCode || ""}
                      onChange={(e) =>
                        updateFieldValue(
                          index,
                          "userCustomCode",
                          e.target.value
                        )
                      }
                    />
                    {/* Custom Value */}
                    <input
                      type="text"
                      placeholder="Custom Value"
                      className="w-2/3 p-2 border rounded-lg"
                      value={field.userCustomValue || ""}
                      onChange={(e) =>
                        updateFieldValue(
                          index,
                          "userCustomValue",
                          e.target.value
                        )
                      }
                    />
                    <button
                      onClick={() => {
                        if (!field.userCustomCode || !field.userCustomValue) {
                          alert("Please enter both Code and Value!");
                          return;
                        }

                        const newOption = {
                          code: `${field.userCustomCode}`,
                          value: field.userCustomValue,
                        };

                        setSelectedForm((prev) => {
                          const updatedFields = [...prev.fields];
                          updatedFields[index] = {
                            ...field,
                            options: [...field.options, newOption],
                            userCustomCode: "",
                            userCustomValue: "",
                          };
                          return { ...prev, fields: updatedFields };
                        });

                        // ✅ Auto-select the new option
                        setResponses((prevResponses) => ({
                          ...prevResponses,
                          [field.label]: `${newOption.code} - ${newOption.value}`,
                        }));
                      }}
                      className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>
            )}

            {field.type === "select" && (
              <div>
                <select
                  required={field.required}
                  className="w-full p-2 border rounded-lg"
                  value={responses[field.label] || ""}
                  onChange={(e) =>
                    setResponses({
                      ...responses,
                      [field.label]: e.target.value,
                    })
                  }
                  disabled={field.isEnabled === false}
                >
                  <option value="">Select an option</option>
                  {field.options.map((option, idx) => (
                    <option
                      key={idx}
                      value={`${option.code} - ${option.value}`}
                    >
                      {option.code} - {option.value}
                    </option>
                  ))}
                </select>

                <div className="mt-4 space-y-2">
                  <h3 className="font-semibold">Add New Option</h3>
                  <input
                    type="text"
                    placeholder="Code"
                    className="w-[300px] p-2 border rounded-lg"
                    value={field.newCode || ""}
                    onChange={(e) =>
                      updateFieldValue(index, "newCode", e.target.value)
                    }
                    disabled={field.isEnabled === false}
                  />
                  <input
                    type="text"
                    placeholder="Value"
                    className="w-[600px] mx-3 p-2 border rounded-lg"
                    value={field.newValue || ""}
                    onChange={(e) =>
                      updateFieldValue(index, "newValue", e.target.value)
                    }
                    disabled={field.isEnabled === false}
                  />
                  <button
                    onClick={() => addNewOption(index)}
                    className="mt-2 px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
                    disabled={field.isEnabled === false}
                  >
                    Add Option
                  </button>
                </div>
              </div>
            )}

            <div className="mt-2">
              <label className="block font-semibold mb-1">Comment</label>
              <textarea
                className="w-full p-2 border rounded-lg"
                rows={2}
                placeholder="Enter comment for this field..."
                value={responses[`${field.label}_comment`] || ""}
                onChange={(e) =>
                  setResponses({
                    ...responses,
                    [`${field.label}_comment`]: e.target.value,
                  })
                }
                disabled={field.isEnabled === false}
              />
            </div>

            <div className="mt-2">
              <label className="block font-semibold mb-1">
                Attach Files (Images or PDFs)
              </label>
              <input
                type="file"
                multiple
                accept=".pdf,image/*"
                className="w-full p-2 border rounded-lg"
                onChange={(e) =>
                  handleMultiFileUpload(
                    field.label,
                    index,
                    Array.from(e.target.files)
                  )
                }
                disabled={field.isEnabled === false}
              />

              {responses[`${field.label}_${index}_attachments`] &&
                responses[`${field.label}_${index}_attachments`].map(
                  (url, idx) => (
                    <div key={idx} className="mt-1 flex items-center gap-2">
                      <a
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline text-sm"
                      >
                        View File {idx + 1}
                      </a>
                      <button
                        className="text-red-500 text-xs"
                        onClick={() => {
                          setResponses((prev) => {
                            const updated = prev[
                              `${field.label}_${index}_attachments`
                            ].filter((_, i) => i !== idx);
                            return {
                              ...prev,
                              [`${field.label}_${index}_attachments`]: updated,
                            };
                          });
                        }}
                      >
                        ❌
                      </button>
                    </div>
                  )
                )}
            </div>
          </div>
        ))}

        {/* Questions */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Ask a Question</h2>
          {questions.map((qa, questionIndex) => (
            <div key={questionIndex} className="space-y-4 border-b pb-6 mb-6">
              <div className="w-49">
                <label className="block font-semibold mb-2">
                  Question Type
                </label>
                <select
                  value={qa.type}
                  onChange={(e) => {
                    const updated = [...questions];
                    updated[questionIndex].type = e.target.value;
                    setQuestions(updated);
                  }}
                  className="w-full p-2 border rounded-lg mb-3"
                >
                  <option value="text">Text Answer</option>
                  <option value="checkbox">Checkbox Options</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold mb-2">
                  Question {questionIndex + 1}
                </label>
                <input
                  type="text"
                  className="w-full p-2 border rounded-lg"
                  value={qa.question}
                  onChange={(e) =>
                    handleQuestionChange(
                      questionIndex,
                      0,
                      "question",
                      e.target.value
                    )
                  }
                  placeholder="Your question"
                />
              </div>

              {qa.type === "text" && (
                <div>
                  <label className="block font-semibold mb-2">Answer</label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded-lg"
                    value={qa.answers[0]?.value || ""}
                    onChange={(e) =>
                      handleQuestionChange(
                        questionIndex,
                        0,
                        "value",
                        e.target.value
                      )
                    }
                    placeholder="Enter text answer"
                  />
                </div>
              )}

              {qa.type === "checkbox" && (
                <div>
                  <h4 className="font-semibold mb-2">Checkbox Options</h4>
                  {qa.answers.map((answer, answerIndex) => (
                    <div key={answerIndex} className="flex gap-4 mb-2">
                      <input
                        type="text"
                        className="w-1/3 p-2 border rounded-lg"
                        placeholder="Option Code"
                        value={answer.code}
                        onChange={(e) =>
                          handleQuestionChange(
                            questionIndex,
                            answerIndex,
                            "code",
                            e.target.value
                          )
                        }
                      />
                      <input
                        type="text"
                        className="w-2/3 p-2 border rounded-lg"
                        placeholder="Option Value"
                        value={answer.value}
                        onChange={(e) =>
                          handleQuestionChange(
                            questionIndex,
                            answerIndex,
                            "value",
                            e.target.value
                          )
                        }
                      />
                      <button
                        onClick={() => removeAnswer(questionIndex, answerIndex)}
                        className="text-red-500"
                      >
                        ❌
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={() => addAnswer(questionIndex)}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                  >
                    ➕ Add Option
                  </button>
                </div>
              )}

              {/* ✅ Attachment section */}
              <div className="mt-4">
                <label className="block font-semibold mb-2">
                  Attach Files (PDFs or Images)
                </label>
                <input
                  type="file"
                  multiple
                  accept=".pdf,image/*"
                  onChange={(e) =>
                    handleQuestionFileUpload(
                      questionIndex,
                      Array.from(e.target.files)
                    )
                  }
                />
                {qa.attachments?.map((url, idx) => (
                  <div key={idx} className="mt-2 flex items-center gap-2">
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline text-sm"
                    >
                      View File {idx + 1}
                    </a>
                    <button
                      onClick={() => {
                        setQuestions((prev) => {
                          const updated = [...prev];
                          updated[questionIndex].attachments = updated[
                            questionIndex
                          ].attachments.filter((_, i) => i !== idx);
                          return updated;
                        });
                      }}
                      className="text-red-500 text-xs"
                    >
                      ❌
                    </button>
                  </div>
                ))}
              </div>

              <button
                onClick={() => removeQuestion(questionIndex)}
                className="mt-2 px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
              >
                Delete Question
              </button>
            </div>
          ))}

          <button
            onClick={addQuestion}
            className="mt-4 px-4 py-2 text-white bg-green-500 rounded-lg hover:bg-green-600"
          >
            Add Another Question
          </button>
        </div>

        <div className="mt-8">
          <button
            onClick={handleSubmit}
            className="w-full py-3 text-white bg-green-600 rounded-lg hover:bg-green-700"
          >
            Submit Form
          </button>
        </div>
      </div>
    </div>
  );
};

export default FormRenderer;
