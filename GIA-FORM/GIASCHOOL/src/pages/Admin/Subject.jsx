import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IoIosArrowBack } from "react-icons/io";
import { FaSignOutAlt } from "react-icons/fa";
import Select from "react-select";
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

export default function SubjectManagement() {
  const BASEURL = import.meta.env.VITE_API_URL_ADMIN;
  const accessToken = window.sessionStorage.getItem("accessToken");
  // const username = useSelector((state) => state.auth.userPhone?.user?.name);
  // console.log(username);
  const navigate = useNavigate();

  const [classes, setClasses] = useState([]); // For class selection
  const [subjectsData, setSubjectsData] = useState([]); // For displaying subjects
  const [boards, setBoards] = useState([]); // For Board Selections
  const [selectedBoard, setSelectedBoard] = useState(null);
  const [selectedClass, setSelectedClass] = useState(null);
  const [filterSelectClass, setFilterSelectClass] = useState(null);
  const [username, setUsername] = useState("");

  const [formData, setFormData] = useState({
    subject_name: "",
    subject_created_by: username || "",
    created_date: new Date().toLocaleDateString("en-CA"), // YYYY-MM-DD format
    class_id: "",
    price: "",
    board_name: "",
    class_name: "",
    image_url: "",
    free_course: false,
  });
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [Search, setSearch] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [selectedFilterSubject, setSelectedFilterSubject] = useState(null);

  useEffect(() => {
    fetchClasses();
    fetchSubjects();
    fetchBoards();
  }, []);

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

  const handleLogout = () => {
    if (window.confirm("Are you really want to logout")) {
      window.localStorage.removeItem("accessToken");
      navigate("/");
    }
  };

  const boardOptions = boards.map((board) => ({
    value: board.board_id,
    label: board.board_name,
  }));

  const classOptions = classes
    .map((cls) => ({
      value: cls.class_id,
      label: cls.class_name,
    }));

  const subjectOption = subjectsData.map((sub) => ({
    value: sub.subject_id,
    label: sub.subject_name,
  }));

  const handleBoardChange = (selectedOption) => {
    setSelectedBoard(selectedOption);
    setSelectedClass(null);
    setFormData({
      ...formData,
      board_name: selectedOption ? selectedOption.label : "",
      class_id: "", // Reset class_id because class selection will be cleared
      class_name: "",
    });
  };

  const handleClassChange = (selectedOption) => {
    setSelectedClass(selectedOption);
    setFormData({
      ...formData,
      class_id: selectedOption ? selectedOption.value : "",
      class_name: selectedOption ? selectedOption.label : "",
    });
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

  const fetchBoards = () => {
    axios
      .get(`${BASEURL}/data/getBoards`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        if (res.data) {
          setBoards(res.data);
        }
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
          setSubjectsData(response.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching subjects data:", error);
      });
  };

  const resetForm = () => {
    setFormData({
      subject_name: "",
      subject_created_by: username,
      created_date: new Date().toLocaleDateString("en-CA"),
      class_id: "",
      price: "",
      board_name: "",
      class_name: "",
      free_course: "",
    });
    setSelectedBoard(null);
    setSelectedClass(null);
    setEditMode(false);
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
      subject_name,
      subject_created_by,
      created_date,
      class_id,
      price,
      board_name,
      class_name,
      image_url,
      free_course,
    } = formData;
    console.log(formData);

    if (!subject_name || !class_id || !price || !board_name || !class_name) {
      alert("All fields are required.");
      return;
    }

    if (
      !window.confirm(
        `Are you sure you want to ${
          editMode ? "update" : "submit"
        } the Subject?`
      )
    ) {
      return;
    }
    const uploadedFileUrl = await uploadFile(image_url);
    const payload = {
      subject_name,
      subject_created_by: username,
      created_date,
      class_id,
      price,
      image_url: uploadedFileUrl,
      free_course: free_course,
    };
    try {
      if (editMode) {
        const payloadEdit = {
          ...payload,
          subject_id: editId,
        }; // Exclude board_id

        const response = await axios.post(
          `${BASEURL}/data/updateSubjects`,
          payloadEdit,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        console.log("Subject updated successfully:", response.data.message);
        alert(response.data.message);
        window.location.reload();
      } else {
        const response = await axios.post(
          `${BASEURL}/data/insertSubjects`,
          payload,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        console.log("Subject added successfully:", response.data.message);
        alert(response.data.message);
        window.location.reload();
      }
      // Reset form data and state
      setFormData({
        subject_name: "",
        subject_created_by: "",
        board_name: "",
        class_name: "",
        class_id: "",
        price: "",
      });
      resetForm();
      setEditMode(false);
      fetchSubjects();
    } catch (error) {
      console.error(
        `${editMode ? "Error updating" : "Error adding"} subject:`,
        error
      );
      alert(
        error.response?.data?.message ||
          `An error occurred while ${
            editMode ? "updating" : "adding"
          } the subject.`
      );
    }
  };

  const handleEdit = (record) => {
    setEditMode(true);
    setEditId(record.subject_id);

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
      selectedClass(null);
    }

    setFormData({
      subject_name: record.subject_name,
      subject_created_by: username || "",
      class_id: classToSelect ? classToSelect.class_id : "",
      class_name: classToSelect ? classToSelect.class_name : "",
      board_name: boardToSelect ? boardToSelect.board_name : "",
      price: record.subject_price,
      created_date: new Date().toLocaleDateString("en-CA"), // YYYY-MM-DD format
      image_url: record.subject_image_url,
      free_course: record.free_course,
    });
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const checkAndDeleteSubject = async (subjectId) => {
    if (!window.confirm(`Are you sure you want to delete?`)) {
      return;
    }
    try {
      const response = await axios.get(`${BASEURL}/data/getSubSubjects`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const relatedSubSubjects = response.data.filter(
        (subSubject) => subSubject.subject_id === subjectId
      );

      if (relatedSubSubjects.length > 0) {
        alert(
          "Please delete all sub-subjects associated with this subject first."
        );
        return;
      }
      deleteSubject(subjectId);
    } catch (error) {
      console.error("Error checking sub-subjects:", error);
      alert("Failed to check for sub-subjects. Please try again.");
    }
  };

  const deleteSubject = async (subjectId) => {
    try {
      const deleteResponse = await axios.delete(
        `${BASEURL}/data/deleteSubjects/${subjectId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      console.log("Delete response status:", deleteResponse.status); // Log status for debugging

      if (deleteResponse.status >= 200 && deleteResponse.status < 300) {
        alert("Subject successfully deleted.");
        setSubjectsData((prevSubjects) =>
          prevSubjects.filter((subject) => subject.subject_id !== subjectId)
        );
        fetchSubjects(); // Optionally re-fetch all subjects to ensure UI is up-to-date
      } else {
        throw new Error(
          "Deletion failed with status: " + deleteResponse.status
        );
      }
    } catch (error) {
      console.error("Error deleting subject:", error);
      alert("Failed to delete the subject. Please try again.");
    }
  };

  const filteredData =
    Array.isArray(subjectsData) && subjectsData.length > 0
      ? subjectsData.filter((item) => {
          const matchesClass = filterSelectClass
            ? item.class_name.toUpperCase() ===
              filterSelectClass.label.toUpperCase()
            : true;
          const matchesSubject = selectedFilterSubject
            ? item.subject_name.toUpperCase() ===
              selectedFilterSubject.label.toUpperCase()
            : true;

          const itemDate = new Date(item.subject_created_date);
          const dateToAdjusted = dateTo ? new Date(dateTo) : null;

          // Add 1 day to dateToAdjusted to include the entire "to" day
          if (dateToAdjusted) {
            dateToAdjusted.setDate(dateToAdjusted.getDate() + 1);
          }

          const matchesDate =
            (!dateFrom || itemDate >= new Date(dateFrom)) &&
            (!dateToAdjusted || itemDate < dateToAdjusted); // Use < instead of <=

          return matchesClass && matchesSubject && matchesDate;
        })
      : [];

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
    setFilterSelectClass(null);
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
            <div className="flex justify-between items-center gap-x-4">
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
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md mx-auto w-full lg:max-w-3xl mb-10"
      >
        <h1 className="text-center my-4 text-xl font-bold">
          {editMode ? "Edit Subject" : "Add New Subject"}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-black font-semibold text-md">
              Board
            </label>
            <Select
              value={selectedBoard}
              onChange={handleBoardChange}
              options={boardOptions}
              styles={customStyles}
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
              options={classOptions}
              styles={customStyles}
              placeholder="Select a Class"
              isDisabled={!selectedBoard}
            />
          </div>
          <div>
            <label className="block text-black font-semibold text-md">
              Subject Name
            </label>
            <input
              type="text"
              name="subject_name"
              value={formData.subject_name}
              onChange={handleChange}
              className="bg-gray-50 w-full border-[#92C7CF] shadow-3xl border-2 rounded-full p-2 mt-1"
              placeholder="Subject name"
            />
          </div>

          {/* Created Board Selection */}

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
              Upload file
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
            <label className="block mb-5 text-black font-semibold text-md">
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
            className="bg-blue-600 hover:bg-blue-900 text-white py-2 px-4 rounded-full font-semibold"
          >
            {editMode ? "Update Subject" : "Add Subject"}
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
        <div className="lg:flex gap-2 p-2 items-center mx-4">
          <h3 className="font-semibold">Filter By Class Name:</h3>
          <Select
            options={classOptions}
            value={filterSelectClass}
            onChange={setFilterSelectClass}
            className="basic-single"
            classNamePrefix="select"
            placeholder="Select a Class"
          />
        </div>
        <div className="lg:flex gap-2 p-2 items-center mx-4">
          <h3 className="font-semibold">Filter By Subject Name:</h3>
          <Select
            options={subjectOption}
            value={selectedFilterSubject}
            onChange={setSelectedFilterSubject}
            className="basic-single"
            classNamePrefix="select"
            placeholder="Select a Board"
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
        </div>
        <button className="p-2 rounded flex-none" onClick={clearFilters}><FontAwesomeIcon className="text-2xl text-blue-600" icon={faFilterCircleXmark} /></button>{" "}
      </div>

      <section className="flex justify-center mx-5">
        <div className="bg-white p-4 rounded-lg shadow w-full">
          <div className="text-gray-600 font-bold text-lg mb-2 px-2">
            Subjects List
          </div>

          <div className="overflow-auto pb-10">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-200">
                  <th className="p-2">Subject Name</th>
                  <th className="p-2">Class</th>
                  <th className="p-2">Price</th>
                  <th className="p-2">Created By</th>
                  <th className="p-2">Created Date</th>
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
                        {record?.subject_name
                          ? record.subject_name.toUpperCase()
                          : "N/A"}
                      </td>
                      <td className="p-2">
                        {record?.class_name.toUpperCase() || "N/A"}
                      </td>
                      <td className="p-2">
                        {record?.subject_price
                          ? formatNumber(record?.subject_price)
                          : "N/A"}
                      </td>
                      <td className="p-2">
                        {record?.subject_created_by
                          ? record.subject_created_by.toUpperCase()
                          : "N/A"}
                      </td>
                      <td className="p-2">
                        {record?.subject_created_date
                          ? new Date(
                              record.subject_created_date
                            ).toLocaleString("en-GB", {
                              day: "2-digit",
                              month: "2-digit",
                              year: "numeric",
                            })
                          : "N/A"}
                      </td>
                      <td className="p-2">
                        {record?.subject_image_url ? (
                          <img
                            className="w-[100px] h-[100px]"
                            src={record?.subject_image_url}
                            alt="IMG"
                          />
                        ) : (
                          "N/A"
                        )}
                      </td>
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
                            checkAndDeleteSubject(record.subject_id)
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
