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
  faFilter,
  faFilterCircleXmark,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import photo from "../../Images/logoImage.jpeg";
import image from "../../Images/FormImage.jpeg";
import { useSelector } from "react-redux";

export default function SubSubjectManagement() {
  const BASEURL = import.meta.env.VITE_API_URL_ADMIN;
  const accessToken = window.sessionStorage.getItem("accessToken");

  const [subjects, setSubjects] = useState([]); // For subject selection
  const [subSubjectsData, setSubSubjectsData] = useState([]); // For displaying sub-subjects
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [formData, setFormData] = useState({
    sub_subject_name: "",
    sub_subject_created_by: username || "",
    subject_id: "",
    price: "",
    sub_created_date: new Date().toLocaleDateString("en-CA"), // YYYY-MM-DD format
    image_url: "",
    free_course: false,
  });
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState("");
  const [subSearch, setSubSearch] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [classes, setClasses] = useState([]); // For class selection
  const [boards, setBoards] = useState([]); // For Board Selections
  const [selectedBoard, setSelectedBoard] = useState(null);
  const [selectedClass, setSelectedClass] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedFilterSubject, setSelectedFilterSubject] = useState(null);
  const [selectedFilterSubSubject, setSelectedFilterSubSubject] =
    useState(null);

  const reduxUsername = useSelector(
    (state) => state.auth.userPhone?.user?.name
  );
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
    fetchBoards();
    fetchClasses();
    fetchSubjects();
    fetchSubSubjects();
  }, []);

  const handleLogout = () => {
    if (window.confirm("Are you really want to logout")) {
      window.localStorage.removeItem("accessToken");
      navigate("/");
    }
  };

  const fetchBoards = () => {
    axios
      .get(`${BASEURL}/data/getBoards`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        if (response.data) {
          setBoards(response.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching boards data:", error);
      });
  };

  const fetchClasses = () => {
    axios
      .get(`${BASEURL}/data/getClasses`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        if (response.data) {
          setClasses(response.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching classes data:", error);
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

  const fetchSubSubjects = () => {
    axios
      .get(`${BASEURL}/data/getSubSubjects`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        if (response.data) {
          setSubSubjectsData(response.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching sub-subjects data:", error);
      });
  };

  const boardOption = boards.map((board) => ({
    value: board.board_id,
    label: board.board_name,
  }));

  const classOption = classes
    .filter((cls) => cls.board_id === selectedBoard?.value)
    .map((cls) => ({
      value: cls.class_id,
      label: cls.class_name,
    }));

  const subjectOption = subjects
    .filter((sub) => sub.class_id === selectedClass?.value)
    .map((sub) => ({
      value: sub.subject_id,
      label: sub.subject_name,
    }));

  const subSubjectOption = subSubjectsData.map((sub_subject) => ({
    value: sub_subject.sub_subject_id,
    label: sub_subject.sub_subject_name,
  }));

  const handleBoardChange = (selectedOption) => {
    setSelectedBoard(selectedOption);
    setSelectedClass(null);
    setSelectedSubject(null);
  };

  const handleClassChange = (selectedOption) => {
    setSelectedClass(selectedOption);
    setSelectedSubject(null);
  };

  const handleSubjectChange = (selectedOption) => {
    setSelectedSubject(selectedOption);
    setFormData((prevData) => ({
      ...prevData,
      subject_id: selectedOption.value, // Ensure this is correctly assigning the value
    }));
  };

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
    const { name, type, checked, value, files } = e.target;
    if (type === "checkbox") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: checked,
      }));
    } else if (type === "file") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: files[0],
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
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
      sub_subject_name,
      sub_subject_created_by,
      subject_id,
      price,
      sub_created_date,
      image_url,
      free_course,
    } = formData;

    if (!sub_subject_name || !subject_id || !price || !subject_id) {
      alert("All fields are required.");
      return;
    }
    if (
      !window.confirm(
        `Are you sure you want to ${
          editMode ? "update" : "submit"
        } the Sub-Subject?`
      )
    ) {
      return;
    }
    try {
      // Upload file if present
      const uploadedFileUrl = await uploadFile(image_url);
      console.log("uploadedFileUrl", uploadedFileUrl);

      const payload = {
        sub_subject_name,
        sub_subject_created_by: username,
        subject_id,
        price,
        sub_created_date,
        image_url: uploadedFileUrl,
        free_course: free_course,
      };
      console.log(payload);

      if (editMode) {
        // Exclude board_id and class_id from payload
        const payloadEdit = {
          ...payload,
          sub_subject_id: editId,
        };

        const response = await axios.post(
          `${BASEURL}/data/updateSubSubjects`,
          payloadEdit,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        console.log("Sub-subject updated successfully:", response.data.message);
        alert(response.data.message);
        window.location.reload();
      } else {
        // Exclude board_id and class_id from payload

        const response = await axios.post(
          `${BASEURL}/data/insertSubSubjects`,
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
        sub_subject_name: "",
        sub_subject_created_by: "",
        subject_id: "",
        price: "",
        free_course: "",
      });

      // Reset form data and state
      setEditMode(false);
      fetchSubSubjects();
    } catch (error) {
      console.error(
        `${editMode ? "Error updating" : "Error adding"} sub-subject:`,
        error
      );
      alert(
        error.response?.data?.message ||
          `An error occurred while ${
            editMode ? "updating" : "adding"
          } the sub-subject.`
      );
    }
  };

  const FilterSubjectOptions = subjects.map((sub) => ({
    value: sub.subject_id,
    label: sub.subject_name,
  }));

  const handleEdit = (record) => {
    console.log(record, "Record");
    console.log(subjects, "SUbjects");
    setEditMode(true);
    setEditId(record.sub_subject_id);

    const boardToSelect = boards.find(
      (board) => board.board_name === record.board_name
    );
    if (boardToSelect) {
      setSelectedBoard({
        value: boardToSelect.board_id,
        label: boardToSelect.board_name,
      });
    } else {
      setSelectedBoard(null);
    }

    const classToSelect = classes.find(
      (cls) =>
        cls.class_name === record.class_name &&
        cls.board_id === boardToSelect.board_id
    );
    if (classToSelect) {
      setSelectedClass({
        value: classToSelect.class_id,
        label: classToSelect.class_name,
      });
    } else {
      setSelectedClass(null);
    }

    const subjectToSelect = subjects.find(
      (subject) =>
        subject.subject_name === record.subject_name &&
        subject.subject_id === record.subject_id
    );
    if (subjectToSelect) {
      console.log("Seletced Subject", subjectToSelect);
      setSelectedSubject({
        value: subjectToSelect.subject_id,
        label: subjectToSelect.subject_name,
      });
    } else {
      setSelectedSubject(null);
    }

    setFormData({
      sub_subject_name: record.sub_subject_name,
      sub_subject_created_by: username || "",
      subject_id: record.subject_id,
      price: record.sub_subject_price,
      image_url: record.sub_subject_image_url,
      free_course: record.free_course,
    });
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const checkAndSubSubject = async (subSubjectId) => {
    try {
      const response = await axios.get(`${BASEURL}/data/getAboutSubjects`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      console.log("About Subject response:", response);

      const aboutSubjects = response.data;
      const relatedAboutSubjects = aboutSubjects.filter(
        (aboutSub) => aboutSub.class_id === boardId
      );

      if (relatedAboutSubjects.length > 0) {
        alert("Please delete all subjects details with this subject first.");
        return;
      }
      deleteSubSubject(boardId);
    } catch (error) {
      if (error.response && error.response.status === 500) {
        console.log("Error response data:", error.response.data);
        alert("Please delete all subjects details with this subject first.");
      } else {
        alert(
          `Failed to delete the Sub Subject: ${
            error.message || "Please try again."
          }`
        );
      }
      console.error("Error deleting Sub Subject:", error);
    }
  };

  const deleteSubSubject = async (subSubjectId) => {
    if (!window.confirm(`Are you sure you want to delete?`)) {
      return;
    }
    try {
      const deleteResponse = await axios.delete(
        `${BASEURL}/data/deleteSubSubjects/${subSubjectId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      console.log("Delete response status:", deleteResponse.status);

      if (deleteResponse.status === 200 || deleteResponse.status === 201) {
        alert("Sub Subject successfully deleted.");
        setSubSubjectsData((prevClasses) =>
          prevClasses.filter((subSub) => subSub.board_id !== subSubjectId)
        );
        fetchSubSubjects();
      } else {
        throw new Error(
          "Deletion failed with status: " + deleteResponse.status
        );
      }
    } catch (error) {
      if (error.response && error.response.status === 500) {
        console.log("Error response data:", error.response.data);
        alert(
          "Please delete subject details associated with this sub subject first."
        );
      } else {
        alert(
          `Failed to delete the board: ${error.message || "Please try again."}`
        );
      }
      console.error("Error deleting board:", error);
    }
  };

  const filteredData =
    Array.isArray(subSubjectsData) && subSubjectsData.length > 0
      ? subSubjectsData.filter((item) => {
          const matchesSubject = selectedFilterSubject
            ? item.subject_name.toUpperCase() ===
              selectedFilterSubject.label.toUpperCase()
            : true;
          const matchesSubSearch = selectedFilterSubSubject
            ? item.sub_subject_name.toLowerCase() ===
              selectedFilterSubSubject.label.toLowerCase()
            : true;

          const matchesSearch = item?.sub_subject_name
            ?.toLowerCase()
            .includes(search?.toLowerCase());

          const itemDate = new Date(item.sub_subject_created_date);
          const dateToAdjusted = dateTo ? new Date(dateTo) : null;

          if (dateToAdjusted) {
            dateToAdjusted.setDate(dateToAdjusted.getDate() + 1);
          }

          const matchesDate =
            (!dateFrom || itemDate >= new Date(dateFrom)) &&
            (!dateToAdjusted || itemDate < dateToAdjusted); // Use < instead of <=

          return (
            matchesSubject && matchesSearch && matchesDate && matchesSubSearch
          );
        })
      : [];

  const subjectFilterOptions = subjects.map((subject) => ({
    value: subject.subject_id,
    label: subject.subject_name,
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
    setSelectedFilterSubSubject(null); 
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
          {editMode ? "Edit Sub-Subject" : "Add New Sub-Subject"}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-black font-semibold text-md">
              Board
            </label>
            <Select
              value={selectedBoard}
              onChange={handleBoardChange}
              styles={customStyles}
              options={boardOption}
              placeholder="Select a Board"
            />
          </div>

          <div>
            <label className="block text-black font-semibold text-md">
              Class
            </label>
            <Select
              value={selectedClass}
              onChange={handleClassChange}
              styles={customStyles}
              options={classOption}
              placeholder="Select a CLass"
              isDisabled={!selectedBoard}
            />
          </div>
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
              isDisabled={!selectedClass}
            />
          </div>
          <div>
            <label className="block text-black font-semibold text-md">
              Sub-Subject Name
            </label>
            <input
              type="text"
              name="sub_subject_name"
              value={formData.sub_subject_name}
              onChange={handleChange}
              className="bg-gray-50 w-full border-[#92C7CF] shadow-3xl border-2 rounded-full p-2 mt-1"
              placeholder="Sub-Subject name"
            />
          </div>

          <div>
            <label className="block text-black font-semibold text-md">
              Price
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="bg-gray-50 w-full border-[#92C7CF] shadow-3xl border-2 rounded-full p-2 mt-1"
              placeholder="Price"
            />
          </div>
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
          </div>
          <div>
            <label className="block text-black font-semibold text-md">
              Free Course
            </label>
            <input
              type="checkbox"
              name="free_course"
              checked={formData.free_course}
              onChange={handleChange}
              className="large-checkbox"
            />
          </div>
        </div>

        <div className="flex justify-center gap-4 mt-6">
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 px-4 rounded-full hover:bg-blue-900 font-semibold"
          >
            {editMode ? "Update Sub-Subject" : "Add Sub-Subject"}
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
        <div className="flex gap-2 p-2 items-center mx-4">
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
        <div className="flex gap-2 p-2 items-center mx-4">
          <h3 className="font-semibold">Filter By Sub-Subject Name:</h3>
          <Select
            options={subSubjectOption}
            value={selectedFilterSubSubject}
            onChange={setSelectedFilterSubSubject}
            className="basic-single"
            classNamePrefix="select"
            placeholder="Select a Subject"
          />
        </div>
        <div className="flex gap-2 p-2 items-center mx-4">
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
        </div>
        <button className="p-2 rounded flex-none" onClick={clearFilters}><FontAwesomeIcon className="text-2xl text-blue-600" icon={faFilterCircleXmark} /></button>{" "}
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
                  <th className="p-2">Subject</th>
                  <th className="p-2">Sub-Subject Name</th>
                  <th className="p-2">Price</th>
                  <th className="p-2">Created By</th>
                  <th className="p-2">Created At</th>{" "}
                  <th className="p-2 ">Image</th>
                  <th className="p-2 text-center">Free Course</th>
                  <th className="p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.length > 0 ? (
                  filteredData.map((record, index) => (
                    <tr key={index} className="border-b">
                      <td className="p-2">
                        {record?.subject_name.toUpperCase() || "N/A"}
                      </td>
                      <td className="p-2">
                        {record?.sub_subject_name.toUpperCase() || "N/A"}
                      </td>
                      <td className="p-2">
                        Rs{" "}
                        {record?.sub_subject_price
                          ? formatNumber(record.sub_subject_price)
                          : "N/A"}
                      </td>
                      <td className="p-2">
                        {record?.sub_subject_created_by.toUpperCase() || "N/A"}
                      </td>
                      <td className="p-2">
                        {record?.sub_subject_created_date
                          ? new Date(
                              record.sub_subject_created_date
                            ).toLocaleString("en-GB", {
                              day: "2-digit",
                              month: "2-digit",
                              year: "numeric",
                              hour12: false,
                            })
                          : "N/A"}
                      </td>
                      <td className="p-2">
                        {record?.sub_subject_image_url ? (
                          <img
                            className="w-[100px] h-[100px]"
                            src={record?.sub_subject_image_url}
                            alt="IMG"
                          />
                        ) : (
                          "N/A"
                        )}
                      </td>{" "}
                      <td className="p-2 text-center">
                        {record.free_course ? "🟢" : "🔴"}
                      </td>
                      <td className="p-2 flex justify-center gap-2">
                        <button
                          onClick={() => handleEdit(record)}
                          className="bg-yellow-400 text-white py-1 px-2 rounded-md"
                        >
                          <FontAwesomeIcon icon={faEdit} />
                        </button>
                        <button
                          onClick={() =>
                            deleteSubSubject(record?.sub_subject_id)
                          }
                          className="bg-red-500 text-white py-1 px-2 rounded-md"
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center text-gray-500 py-4">
                      No Subjects Found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}
