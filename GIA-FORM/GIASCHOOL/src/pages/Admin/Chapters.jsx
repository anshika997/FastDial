import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Select from "react-select";
import { FaSignOutAlt } from "react-icons/fa";

import { IoIosArrowBack } from "react-icons/io";
import {
  faBars,
  faUser,
  faTrash,
  faEdit,
  faFilterCircleXmark,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import photo from "../../Images/logoImage.jpeg";
import image from "../../Images/FormImage.jpeg";
import { useSelector } from "react-redux";

export default function Chapters() {
  const BASEURL = import.meta.env.VITE_API_URL_ADMIN;
  const accessToken = window.sessionStorage.getItem("accessToken");

  const [subjects, setSubjects] = useState([]);
  const [SubChaptersfordropdown, setSubSubjectsfordropdown] = useState([]); // For subject selection
  const [Chapters, setChapters] = useState([]); // For displaying sub-subjects
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const date = new Date("7/1/2025"); // Parses the date
  const formattedDate = date.toISOString().split("T")[0];
  const [formData, setFormData] = useState({
    chapter_name: "",
    sub_subject_id: "",
    chapter_created_by: username || "",
    subject_id: "",
    serial_no: "",
    description: "", // YYYY-MM-DD format
    image_url: "",
    free_course: false,
  });
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState("");
  const [SubSubjects, setSubSubjects] = useState([]);
  const [subSearch, setSubSearch] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [SelectedSubsubject, setSelectedSubsubject] = useState(null);
  const [selectedFilterSubject, setSelectedFilterSubject] = useState(null);
  const [selectedFilterClass, setSelectedFilterClass] = useState(null);

  const reduxUsername = useSelector(
    (state) => state.auth.userPhone?.user?.name
  );
  console.log(reduxUsername);
  useEffect(() => {
    // Attempt to get username from session storage first
    const storedUsername = window.sessionStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    } else {
      // Optionally fall back to Redux state or another method
      const reduxUsername = useSelector(
        (state) => state.auth.userPhone?.user?.name
      );
      if (reduxUsername) {
        setUsername(reduxUsername);
      }
    }
  }, []);

  useEffect(() => {
    fetchSubjects();
    fetchChapters();
    SubSubjectsNames();
  }, []);

  const handleLogout = () => {
    if (window.confirm("Are you really want to logout")) {
      window.localStorage.removeItem("accessToken");
      navigate("/");
    }
  };
  const fetchChapters = () => {
    axios
      .get(`${BASEURL}/data/getChapters`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        setChapters(response.data); // Make sure this line exists and is correctly setting data
        console.log("Chapters:", response.data); // This will help verify the data is fetched
      })
      .catch((error) => {
        console.error("Error fetching chapters data:", error);
      });
  };

  const fetchSubjects = () => {
    axios
      .get(`${BASEURL}/data/getSubjects`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        if (response.data) {
          setSubjects(response.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching subjects data:", error);
      });
  };

  const subjectOption = subjects?.map((sub) => ({
    value: sub.subject_id,
    label: sub.subject_name,
  }));

  const handleSubjectChange = (selectedOption) => {
    setSelectedSubject(selectedOption);
    axios
      .get(
        `${BASEURL}/data/getSubSubjects?subject_id=${selectedOption?.value}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((response) => {
        if (response.data) {
          setSubSubjectsfordropdown(response.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching sub-subjects data:", error);
      });

    setFormData((prevData) => ({
      ...prevData,
      subject_id: selectedOption.value, // Ensure this is correctly assigning the value
    }));
  };

  const subsubjectOption = SubChaptersfordropdown?.map((sub) => ({
    value: sub.sub_subject_id,
    label: sub.sub_subject_name,
  }));

  const subSubjectOption = Chapters.map((chapter) => ({
    value: chapter.sub_subject_id,
    label: chapter.sub_subject_name,
  }));

  const handleSubSubjectName = (selectedOption) => {
    setSelectedSubsubject(selectedOption);
    setFormData((prevData) => ({
      ...prevData,
      sub_subject_id: selectedOption.value, // Ensure this is correctly assigning the value
    }));
  };
  function SubSubjectsNames() {
    axios
      .get(`${BASEURL}/data/getSubSubjects`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        if (response.data) {
          setSubSubjects(response.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching sub-subjects data:", error);
      });
  }
  const customStyles = {
    control: (base, state) => ({
      ...base,
      border: "2px solid #92C7CF",
      borderRadius: "30px",
      padding: "2px",
      boxShadow: state.isFocused ? "0 0 0 1px #92C7CF" : 0,
      "&:hover": {
        border: "2px solid #92C7CF",
      },
    }),
    option: (provided, state) => ({
      ...provided,
      borderBottom: "1px dotted pink",
      color: state.isSelected ? "#fff" : "D3D3D3",
      padding: 10,
    }),
  };

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData((prev) =>
      type === "file"
        ? { ...prev, [name]: files[0] } // Save the file object
        : { ...prev, [name]: value }
    );
  };

  const uploadFile = async (file) => {
    // Ensure file is provided
    if (typeof file === "string") {
      return file; // Return the existing URL without uploading
    }
    if (!file) return null;

    const uploadData = new FormData();
    uploadData.append("image", file);

    try {
      const response = await axios.post(
        "https://experience-pavillion.com/api/v1/global/upload/file",
        uploadData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data.url; // URL of the uploaded file
    } catch (err) {
      console.error("File upload failed", err);
      alert("File upload failed. Please try again.");
      return null;
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const {
      chapter_name,
      sub_subject_id,
      chapter_created_by,
      subject_id,
      serial_no,
      description,
      image_url,
    } = formData;

    if (!chapter_name || !subject_id || !description || !serial_no) {
      alert("All fields are required.");
      return;
    }

    if (
      !window.confirm(
        `Are you sure you want to ${
          editMode ? "update" : "submit"
        } the chapter?`
      )
    ) {
      return;
    }
    try {
      const uploadedFileUrl = await uploadFile(image_url);
      console.log("uploadedFileUrl", uploadedFileUrl);

      const payload = {
        chapter_name,
        sub_subject_id,
        chapter_created_by: username,
        subject_id,
        serial_no,
        description,
        image_url: uploadedFileUrl,
      };
      console.log(payload);

      if (editMode) {
        // Exclude board_id and class_id from payload
        const payloadEdit = {
          ...payload,
          chapter_id: editId,
        };

        const response = await axios.post(
          `${BASEURL}/data/updateChapters`,
          payloadEdit,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        console.log("chapter updated successfully:", response.data.message);
        alert(response.data.message);
        window.location.reload();
      } else {
        const response = await axios.post(
          `${BASEURL}/data/insertChapters`,
          payload,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        console.log("Sub-subject added successfully:", response.data.message);
        alert(response.data.message);
        window.location.reload();
      }
      setFormData({
        // chapter_name: "",
        // sub_subject_id: "",
        chapter_created_by: username || "",
        // subject_id: "",
        serial_no: "",
        description: "",
      });

      // Reset form data and state
      setEditMode(false);
      fetchChapters();
    } catch (error) {
      console.error(
        `${editMode ? "Error updating" : "Error adding"} Chapter:`,
        error
      );
      alert(
        error.response?.data?.message ||
          `An error occurred while ${
            editMode ? "updating" : "adding"
          } the Chapter.`
      );
    }
  };

  const FilterSubjectOptions = subjects.map((sub) => ({
    value: sub.subject_id,
    label: sub.subject_name,
  }));

  const handleEdit = (chapter) => {
    console.log(chapter, "Selected Chapter for Editing");

    setEditMode(true);
    setEditId(chapter.chapter_id);

    // Find the matching subject
    const subjectToSelect = subjects.find(
      (subject) => subject.subject_id === chapter.subject_id
    );
    if (subjectToSelect) {
      setSelectedSubject({
        value: subjectToSelect.subject_id,
        label: subjectToSelect.subject_name,
      });
    } else {
      setSelectedSubject(null);
    }

    // Find the matching sub-subject
    const subsubjectToSelect = SubSubjects.find(
      (sub) => sub.sub_subject_id === chapter.sub_subject_id
    );
    if (subsubjectToSelect) {
      setSelectedSubsubject({
        value: subsubjectToSelect.sub_subject_id,
        label: subsubjectToSelect.sub_subject_name,
      });
    } else {
      setSelectedSubsubject(null);
    }

    // Correctly map form data
    setFormData({
      chapter_name: chapter.chapter_name || "",
      sub_subject_id: chapter.sub_subject_id || "",
      chapter_created_by: username || "",
      subject_id: chapter.subject_id || "",
      serial_no: chapter.serial_no || "",
      description: chapter.chapter_description || "",
      image_url: chapter.chapter_image_url || "",
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const deleteSubSubject = async (chapterid) => {
    console.log(chapterid);
    if (!window.confirm(`Are you sure you want to delete?`)) {
      return;
    }
    try {
      const deleteResponse = await axios.delete(
        `${BASEURL}/data/deleteChapters/${chapterid}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      console.log("Delete response status:", deleteResponse.status);

      if (deleteResponse.status === 200 || deleteResponse.status === 201) {
        alert("Chapter successfully deleted.");
        // setChapters((prevClasses) =>
        //   prevClasses.filter((subSub) => subSub.board_id !== subSubjectId)
        // );
        fetchChapters();
      } else {
        throw new Error(
          "Deletion failed with status: " + deleteResponse.status
        );
      }
    } catch (error) {
      if (error.response && error.response.status === 500) {
        console.log("Error response data:", error.response.data);
        alert(
          "Please delete subject details associated with this chapter first."
        );
      } else {
        alert(
          `Failed to delete the board: ${error.message || "Please try again."}`
        );
      }
      console.error("Error deleting board:", error);
    }
  };

  const filteredData = Chapters.filter((chapter) => {
    const subjectMatch = selectedFilterSubject
      ? chapter.subject_name === selectedFilterSubject.label
      : true;
    const classtMatch = selectedFilterClass
      ? chapter.chapter_name === selectedFilterClass.label
      : true;
    const fromDateMatch = dateFrom
      ? new Date(chapter.chapter_created_date) >= new Date(dateFrom)
      : true;
    const toDateMatch = dateTo
      ? new Date(chapter.chapter_created_date) <= new Date(dateTo)
      : true;

    return subjectMatch && classtMatch && fromDateMatch && toDateMatch;
  });

  const subjectFilterOptions = subjects.map((subject) => ({
    value: subject.subject_id,
    label: subject.subject_name,
  }));

  const chapterOptions = Chapters.map((chapter) => ({
    value: chapter.chapter_id,
    label: chapter.chapter_name,
  }));

  const hanldeReload = () => {
    window.location.reload();
  };

  const formatNumber = (number) => {
    return new Intl.NumberFormat("en-IN", {
      maximumFractionDigits: 0,
    }).format(number);
  };

  const clearFilters = () => {
    setSelectedFilterSubject(null);
    setSelectedFilterClass(null);
    setDateFrom("");
    setDateTo("");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <div className=" bg-stone-100 text-black p-4  border-2 shadow-gray-200 rounded-b-[20px] relative shadow-2xl">
        <div className="flex items-center justify-between rounded-b-lg h-[3vh] mt-6">
          <div className="flex justify-evenly items-center">
            <Link to={"/Setup"}>
              <button className="text-black text-[30px]  font-extrabold">
                <IoIosArrowBack />{" "}
              </button>
            </Link>
            <div className="flex">
              <img src={photo} alt="Logo" className="h-[18vh] object-contain" />
            </div>
          </div>

          <h1 className="text-black font-extrabold text-2xl capitalize lg:block hidden">
            GIA SCHOOL
          </h1>

          <div className="flex justify-between items-center gap-x-4">
            <button
              onClick={hanldeReload}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 
              focus:ring-blue-300 font-medium rounded-lg text-sm lg:px-5 px-2 py-2.5 me-2 mb-2 
              dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              New Record
            </button>
            <div className="rounded-full bg-white p-2 px-3">
              <FaSignOutAlt
                className="text-blue-600"
                onClick={handleLogout}
                style={{ cursor: "pointer", display: "inline-block" }}
              />
              {/* <FontAwesomeIcon icon={faUser} className="text-blue-600" /> */}
            </div>
          </div>
        </div>
      </div>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md mx-auto w-full lg:max-w-3xl mb-10"
      >
        <h1 className="text-center my-4 text-xl font-bold">
          {editMode ? "Edit Chapter" : "Add New Chapter"}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-black font-semibold text-md">
              Subject
            </label>
            <Select
              value={selectedSubject}
              onChange={handleSubjectChange}
              styles={customStyles}
              options={subjectOption}
              placeholder="Select a Subject"
            />
          </div>
          <div>
            <label className="block text-black font-semibold text-md">
              Sub-Subject Name
            </label>
            <Select
              value={SelectedSubsubject}
              onChange={handleSubSubjectName}
              styles={customStyles}
              options={subsubjectOption}
              placeholder="Select a Sub-Subject Name"
            />
          </div>
          <div>
            <label className="block text-black font-semibold text-md">
              Chapter Name
            </label>
            <input
              type="text"
              name="chapter_name"
              value={formData.chapter_name}
              onChange={handleChange}
              className="bg-gray-50 w-full border-[#92C7CF] shadow-3xl border-2 rounded-full p-2 mt-1"
              placeholder="Chapter Name"
            />
          </div>
          <div>
            <label className="block text-black font-semibold text-md">
              Serial No
            </label>
            <input
              type="number"
              name="serial_no"
              value={formData.serial_no}
              onChange={handleChange}
              className="bg-gray-50 w-full border-[#92C7CF] shadow-3xl border-2 rounded-full p-2 mt-1"
              placeholder="serial no"
            />
          </div>{" "}
          <div>
            <label className="block text-black font-semibold text-md">
              Upload Card Image
            </label>
            <input
              type="file"
              name="image_url"
              accept=".jpg,.jpeg,.png,.gif"
              onChange={handleChange}
              className="bg-gray-50 w-full border-[#92C7CF] shadow-3xl border-2 rounded-full p-2 mt-1"
            />
            {formData.image_url && (
              <div className="mt-2">
                <p className="text-gray-500 text-sm">Current Image:</p>
                <img
                  src={formData.image_url}
                  alt="Preview"
                  className="w-[150px] h-[150px] rounded-lg border border-gray-300 shadow-md"
                />
              </div>
            )}
          </div>
          <div>
            <label className="block text-black font-semibold text-md">
              Description
            </label>
            <textarea
              type="number"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="bg-gray-50 w-full border-[#92C7CF] shadow-3xl border-2 rounded-full p-4 mt-1"
              placeholder="description"
            />
          </div>
        </div>

        <div className="flex justify-center gap-4 mt-6">
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 px-4 rounded-full hover:bg-blue-900 font-semibold"
          >
            {editMode ? "Update Chapter" : "Add Chapter"}
          </button>
        </div>
        {/* <div>
          <img
            src={image}
            alt="form image "
            className="w-[200px] md:w-1/2 h-[40vh] md:h-auto mb-2 "
          />
        </div> */}
      </form>

      <div className="lg:flex align-items-center justify-content-center">
        <div className=" gap-2 p-2 items-center mx-4">
          <h3 className="font-semibold">Filter By Subject Name:</h3>
          <Select
            options={FilterSubjectOptions}
            value={selectedFilterSubject}
            onChange={setSelectedFilterSubject}
            className="basic-single"
            classNamePrefix="select"
            placeholder="Select a Subject"
          />
        </div>
        <div className=" gap-2 p-2 items-center mx-4">
          <h3 className="font-semibold">Filter By Chapter:</h3>
          <Select
            value={selectedFilterClass}
            onChange={setSelectedFilterClass}
            // styles={customStyles}
            options={chapterOptions}
            placeholder="Select a Chapter Name"
          />
        </div>
        <div className="lg:flex gap-2 p-2 items-center mx-4">
          <h3 className="font-semibold">Filter By Date:</h3>
          <input
            type="date"
            className="bg-gray-50 border border-gray-300 rounded-md p-2 mt-2"
            placeholder="From Date"
            value={dateFrom}
            onChange={(e) => setDateFrom(e.target.value)}
          />
          To
          <input
            type="date"
            className="bg-gray-50 border border-gray-300 rounded-md p-2 mt-2"
            placeholder="To Date"
            value={dateTo}
            onChange={(e) => setDateTo(e.target.value)}
          />
        </div>{" "}
        <button className="p-2 rounded flex-none" onClick={clearFilters}>
          <FontAwesomeIcon
            className="text-2xl text-blue-600"
            icon={faFilterCircleXmark}
          />
        </button>{" "}
      </div>

      <section className="flex justify-center mx-5">
        <div className="bg-white p-4 rounded-lg shadow w-full">
          <div className="text-gray-600 font-bold text-lg mb-2 px-2">
            Sub-Subjects List
          </div>

          <div className="overflow-auto pb-10">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-200">
                  <th className="p-2">Chapter</th>
                  <th className="p-2">Description</th>
                  <th className="p-2">Created By</th>{" "}
                  <th className="p-2">Created Date</th>{" "}
                  <th className="p-2 ">Image</th>
                  {/* <th className="p-2 ">Free Course</th> */}
                  <th className="p-2">Actions</th>
                </tr>
              </thead>
              {filteredData.length > 0 ? (
                filteredData.map((chapter, index) => (
                  <tr key={index} className="border-b">
                    <td className="p-2">{chapter.chapter_name}</td>
                    <td className="p-2">{chapter.chapter_description}</td>
                    <td className="p-2">
                      {chapter.chapter_created_by || "NA"}
                    </td>
                    <td className="p-2">
                      {chapter.chapter_created_date
                        ? new Date(chapter.chapter_created_date).toLocaleString(
                            "en-GB",
                            {
                              day: "2-digit",
                              month: "2-digit",
                              year: "numeric",
                            }
                          )
                        : "N/A"}
                    </td>
                    <td className="p-2">
                      {chapter?.chapter_image_url ? (
                        <img
                          className="w-[100px] h-[100px]"
                          src={chapter?.chapter_image_url}
                          alt="IMG"
                        />
                      ) : (
                        "N/A"
                      )}
                    </td>{" "}
                    {/* <td className="p-2 text-center">
                      {chapter.free_course ? "🟢" : "🔴"}
                    </td> */}
                    <td className="p-2 flex justify-center gap-2">
                      <button
                        onClick={() => handleEdit(chapter)}
                        className="bg-yellow-400 text-white py-1 px-2 rounded-md"
                      >
                        <FontAwesomeIcon icon={faEdit} />
                      </button>
                      <button
                        onClick={() => deleteSubSubject(chapter?.chapter_id)}
                        className="bg-red-500 text-white py-1 px-2 rounded-md"
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center">
                    No matching chapters found.
                  </td>
                </tr>
              )}
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}
