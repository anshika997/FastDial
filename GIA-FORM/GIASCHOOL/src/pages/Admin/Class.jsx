import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IoIosArrowBack } from "react-icons/io";
import { FaSignOutAlt } from "react-icons/fa";
import {
  faBars,
  faUser,
  faTrash,
  faEdit,
  faFilterCircleXmark,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import axios from "axios";
import photo from "../../Images/logoImage.jpeg";
import image from "../../Images/FormImage.jpeg";
import Select from "react-select";
import { useSelector } from "react-redux";

export default function ClassManagement() {
  const BASEURL = import.meta.env.VITE_API_URL_ADMIN;
  const accessToken = window.sessionStorage.getItem("accessToken");

  const [boards, setBoards] = useState([]); // For board selection
  const [classesData, setClassesData] = useState([]); // For displaying classes
  const [selectedBoard, setSelectedBoard] = useState(null);
  const [username, setUsername] = useState("");
  const [formData, setFormData] = useState({
    class_name: "",
    board_id: "",
    price: "",
    class_created_by: username || "",
    created_at: new Date().toLocaleDateString("en-CA"), // YYYY-MM-DD format
    image_url: "",
    free_course: false,
  });
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [Search, setSearch] = useState("");
  const [dateSearch, setDateSearch] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [selectedClass, setSelectedClass] = useState(null);

  useEffect(() => {
    fetchBoards();
    fetchClasses();
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

  const handleSelectChange = (selectedOption) => {
    setFormData({
      ...formData,
      board_id: selectedOption ? selectedOption.value : "",
    });
  };

  const handleBoardChange = (selectedOption) => {
    setSelectedBoard(selectedOption);
    setSearch("");
  };
  const boardOptions = boards.map((board) => ({
    value: board.board_id,
    label: board.board_name,
  }));

  const classOption = classesData.map((cls) => ({
    value: cls.class_id,
    label: cls.class_name,
  }));

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
          setClassesData(response.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching classes data:", error);
      });
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
      class_name,
      board_id,
      price,
      image_url,
      class_created_by,
      created_at,
      free_course,
    } = formData;

    if (!class_name || !board_id || !price) {
      alert("All fields are required.");
      return;
    }
    if (
      !window.confirm(
        `Are you sure you want to ${editMode ? "update" : "submit"} the Class?`
      )
    ) {
      return;
    }
    // Upload file if present
    const uploadedFileUrl = await uploadFile(image_url);
    console.log("uploadedFileUrl", uploadedFileUrl);

    const payload = {
      class_name: class_name,
      board_id,
      image_url: uploadedFileUrl,
      price,
      class_created_by,
      created_at,
      free_course: free_course,
    };
    try {
      if (editMode) {
        const payloadEdit = { ...payload, class_id: editId };

        const response = await axios.post(
          `${BASEURL}/data/updateClasses`,
          payloadEdit,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        console.log("Class updated successfully:", response.data.message);
        alert(response.data.message);
        window.location.reload();
      } else {
        const response = await axios.post(
          `${BASEURL}/data/insertClasses`,
          payload,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        console.log("Class added successfully:", response.data.message);
        alert(response.data.message);
        window.location.reload();
      }

      setFormData({
        class_name: "",
        class_created_by: "",
        board_id: "",
        price: "",
      });
      setEditMode(false);
      fetchClasses();
    } catch (error) {
      console.error(
        `${editMode ? "Error updating" : "Error adding"} class:`,
        error
      );
      alert(
        error.response?.data?.message ||
          `An error occurred while ${
            editMode ? "updating" : "adding"
          } the class.`
      );
    }
  };

  const handleEdit = (record) => {
    setEditMode(true);
    setEditId(record.class_id);
    setFormData({
      class_name: record.class_name,
      class_created_by: username || "",
      created_at: new Date().toLocaleDateString("en-CA"), // YYYY-MM-DD format
      board_id: record.board_id,
      price: record.class_price,
      image_url: record.class_image_url,
      free_course: record.free_course,
    });
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const checkAndDeleteClass = async (classId) => {
    try {
      const response = await axios.get(`${BASEURL}/data/getSubjects`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      console.log("Subjects response:", response);
      const subjects = response.data;
      const relatedSubjects = subjects.filter(
        (subject) => subject.class_id === classId
      );

      if (relatedSubjects.length > 0) {
        alert("Please delete all subjects associated with this class first.");
        return;
      }

      deleteClass(classId);
    } catch (error) {
      console.error("Error fetching subjects:", error);
      // More detailed error information
      alert(
        `Failed to check for subjects: ${error.message || "Please try again."}`
      );
    }
  };

  const deleteClass = async (classId) => {
    if (!window.confirm(`Are you sure you want to delete?`)) {
      return;
    }
    try {
      const deleteResponse = await axios.delete(
        `${BASEURL}/data/deleteClasses/${classId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      console.log("Delete response status:", deleteResponse.status);

      if (deleteResponse.status === 200 || deleteResponse.status === 201) {
        alert("Class successfully deleted.");
        setClassesData((prevClasses) =>
          prevClasses.filter((cls) => cls.class_id !== classId)
        );
        fetchClasses();
      } else {
        throw new Error(
          "Deletion failed with status: " + deleteResponse.status
        );
      }
    } catch (error) {
      console.error("Error deleting class:", error);
      alert("Failed to delete the class: " + error.message);
    }
  };

  const filteredData =
    Array.isArray(classesData) && classesData.length > 0
      ? classesData.filter((item) => {
          const matchesBoard = selectedBoard
            ? (item.board_name || "").toUpperCase() ===
              selectedBoard.label.toUpperCase()
            : true;
          const matchesClass = selectedClass
            ? (item.class_name || "").toUpperCase() ===
              selectedClass.label.toUpperCase()
            : true;

          const itemDate = new Date(item.class_created_at);
          const dateToAdjusted = dateTo ? new Date(dateTo) : null;

          if (dateToAdjusted) {
            dateToAdjusted.setDate(dateToAdjusted.getDate() + 1);
          }

          const matchesDate =
            (!dateFrom || itemDate >= new Date(dateFrom)) &&
            (!dateToAdjusted || itemDate < dateToAdjusted); // Use < instead of <=

          return matchesBoard && matchesClass && matchesDate;
        })
      : [];

  const hanldeReload = () => {
    window.location.reload();
  };

  const clearFilters = () => {
    setSelectedBoard(null);
    setSelectedClass(null);
    setDateFrom("");
    setDateTo("");
  };
  const formatNumber = (number) => {
    return new Intl.NumberFormat("en-IN", {
      maximumFractionDigits: 0,
    }).format(number);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <div className=" bg-slate-100 text-white shadow-gray-200 border-2 p-4 rounded-b-[20px] relative shadow-2xl">
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
          {editMode ? "Edit Class" : "Add New Class"}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-black font-semibold text-md">
              Class Name
            </label>
            <input
              type="text"
              name="class_name"
              value={formData.class_name}
              onChange={handleChange}
              className="bg-gray-50 w-full border-[#92C7CF] border-2 rounded-full shadow-2xl p-2 mt-1"
              placeholder="Class name"
            />
          </div>
          <div>
            <label className="block text-black font-semibold text-md">
              Board
            </label>
            <Select
              value={boardOptions.find(
                (option) => option.value === formData.board_id
              )}
              onChange={handleSelectChange}
              options={boardOptions}
              styles={customStyles}
              className="basic-single"
              classNamePrefix="select"
              placeholder="Select a Board"
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
            className="bg-blue-600 hover:bg-blue-900 text-white py-2 px-4 rounded-full font-semibold"
          >
            {editMode ? "Update Class" : "Add Class"}
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
          <h3 className="font-semibold">Filter By Board Name:</h3>
          <Select
            value={selectedBoard}
            options={boardOptions}
            onChange={setSelectedBoard}
            className="basic-single"
            classNamePrefix="select"
            placeholder="Select a Board"
          />
        </div>
        <div className=" gap-2 p-2 items-center mx-4">
          <h3 className="font-semibold">Filter By Class Name:</h3>
          <Select
            value={selectedClass}
            options={classOption}
            onChange={setSelectedClass}
            className="basic-single"
            classNamePrefix="select"
            placeholder="Select a Clas"
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
            Classes List
          </div>

          <div className="overflow-auto pb-10">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-200">
                  <th className="p-2">Board</th>
                  <th className="p-2">Class Name</th>
                  <th className="p-2">Price</th>
                  <th className="p-2">Created By</th>
                  <th className="p-2">Created At</th>
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
                        {(record?.board_name || "").toUpperCase() || "N/A"}
                      </td>
                      <td className="p-2">
                        {(record?.class_name || "").toUpperCase() || "N/A"}
                      </td>
                      <td className="p-2">
                        Rs{" "}
                        {record?.class_price
                          ? formatNumber(record?.class_price)
                          : "N/A"}
                      </td>
                      <td className="p-2">
                        {record?.class_created_by
                          ? record?.class_created_by.toUpperCase()
                          : "N/A"}
                      </td>
                      <td className="p-2">
                        {record?.class_created_at
                          ? new Date(record.class_created_at).toLocaleString(
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
                        {record?.class_image_url ? (
                          <img
                            className="w-[100px] h-[100px]"
                            src={record?.class_image_url}
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
                          onClick={() => checkAndDeleteClass(record.class_id)}
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
                      No Classes Found.
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
