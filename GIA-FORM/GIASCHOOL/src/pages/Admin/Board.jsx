import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IoIosArrowBack } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
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
import image from "../../Images/FormImage.jpeg";
import photo from "../../Images/logoImage.jpeg";
import Select from "react-select";

export default function StockManagement() {
  // const authLogin = useSelector((state) => state.auth);
  // console.log(authLogin, "TEst");
  // const loogedInUser = authLogin?.userPhone?.user?.name;
  const BASEURL = import.meta.env.VITE_API_URL_ADMIN;
  const accessToken = window.sessionStorage.getItem("accessToken");
  const [formData, setFormData] = useState({
    Name: "",
    image_url: "",
    free_course: false,
  });
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [projectsData, setProjectsData] = useState([]); // All projects data
  const [Search, setSearch] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [selectedBoard, setSelectedBoard] = useState(null);
  // const [boards, setBoards] = useState([]);
  const [username, setUsername] = useState("");

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

  const handleLogout = () => {
    if (window.confirm("Are you really want to logout")) {
      window.localStorage.removeItem("accessToken");
      navigate("/");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  function fetchData() {
    axios
      .get(`${BASEURL}/data/getBoards`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        if (response.data) {
          setProjectsData(response.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching projects data:", error);
      });
    axios
      .get(`http://localhost:3000/api/v1/users/data/getLastCartIds`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error("Error fetching boards data:", error);
      });
  }

  const handleEdit = (record) => {
    setEditMode(true);
    setEditId(record.board_id);
    setFormData({ Name: record.board_name, image_url: record.image_url });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? checked : type === "file" ? files[0] : value,
    }));
  };

  const uploadFile = async (file) => {
    if (typeof file === "string") {
      return file;
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

    const { Name, board_id, price, free_course, image_url } = formData;

    if (!Name) {
      alert("Board Name is required.");
      return;
    }

    const nameExists = projectsData.some(
      (project) =>
        project.board_name.toLowerCase() === Name.toLowerCase() &&
        editId !== project.board_id
    );
    if (nameExists) {
      window.alert("This board name already exists.");
      return;
    }

    // Confirmation dialog
    if (
      !window.confirm(
        `Are you sure you want to ${editMode ? "update" : "submit"} the Board?`
      )
    ) {
      return;
    }

    // Upload file if present
    // Upload file if present
    const uploadedFileUrl = await uploadFile(image_url);

    // Prepare payload
    const payload = {
      board_name: Name,
      image_url: uploadedFileUrl,
      board_id,
      price,
      free_course: free_course,
    };

    try {
      if (editMode) {
        // Update existing Board
        const payloadEdit = {
          ...payload,
          board_id: editId,
        };

        const response = await axios.post(
          `${BASEURL}/data/updateBoards`,
          payloadEdit,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        console.log("Board updated successfully:", response.data.message);
        alert(response.data.message);
      } else {
        // Add new Board
        const response = await axios.post(
          `${BASEURL}/data/insertBoards`,
          payload,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        console.log("Board added successfully:", response.data.message);
        alert(response.data.message);
      }

      // Reset form data
      setFormData({ Name: "", image_url: null });
      fetchData(); // Fetch updated data
    } catch (error) {
      console.error(
        `${editMode ? "Error updating" : "Error submitting"} Board:`,
        error
      );
      alert(
        error.response?.data?.message ||
          `An error occurred while ${
            editMode ? "updating" : "submitting"
          } the Board.`
      );
    }
  };

  const boardOptions = projectsData.map((board) => ({
    value: board.board_id,
    label: board.board_name,
  }));

  const filteredData =
    Array.isArray(projectsData) && projectsData.length > 0
      ? projectsData.filter((item) => {
          const matchesBoard = selectedBoard
            ? item.board_name.toUpperCase() ===
              selectedBoard.label.toUpperCase()
            : true;
          const matchesSearch = item?.board_name
            ?.toLowerCase()
            .includes(Search?.toLowerCase());

          const itemDate = new Date(item.created_at);
          const dateToAdjusted = dateTo ? new Date(dateTo) : null;

          // Add 1 day to dateToAdjusted to include the entire "to" day
          if (dateToAdjusted) {
            dateToAdjusted.setDate(dateToAdjusted.getDate() + 1);
          }

          const matchesDate =
            (!dateFrom || itemDate >= new Date(dateFrom)) &&
            (!dateToAdjusted || itemDate < dateToAdjusted); // Use < instead of <=

          return matchesBoard && matchesSearch && matchesDate;
        })
      : [];

  const checkAndDeleteBoard = async (boardId) => {
    try {
      const response = await axios.get(`${BASEURL}/data/getSubjects`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      console.log("Class response:", response);

      const classes = response.data;
      const relatedClasses = classes.filter((cls) => cls.class_id === boardId);

      if (relatedClasses.length > 0) {
        const userConfirmed = confirm(
          "Please delete all the classes associated with this board first."
        );
        if (!userConfirmed) {
          return;
        }
      }

      deleteBoard(boardId);
    } catch (error) {
      if (error.response && error.response.status === 500) {
        console.log("Error response data:", error.response.data);
        const userConfirmed = confirm(
          "Please delete all the classes associated with this board first."
        );
        if (!userConfirmed) {
          return;
        }
      } else {
        alert(
          `Failed to delete the board: ${error.message || "Please try again."}`
        );
      }
      console.error("Error deleting board:", error);
    }
  };

  const deleteBoard = async (boardId) => {
    // Confirmation dialog
    if (!window.confirm(`Are you sure you want to delete?`)) {
      return;
    }
    try {
      const deleteResponse = await axios.delete(
        `${BASEURL}/data/deleteBoards/${boardId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      console.log("Delete response status:", deleteResponse.status);

      if (deleteResponse.status === 200 || deleteResponse.status === 201) {
        alert("Board successfully deleted.");
        setProjectsData((prevClasses) =>
          prevClasses.filter((board) => board.board_id !== boardId)
        );
        fetchBoards();
      } else {
        throw new Error(
          "Deletion failed with status: " + deleteResponse.status
        );
      }
    } catch (error) {
      if (error.response && error.response.status === 500) {
        console.log("Error response data:", error.response.data);
        alert("Please delete all classes associated with this board first.");
      } else {
        alert(
          `Failed to delete the board: ${error.message || "Please try again."}`
        );
      }
      console.error("Error deleting board:", error);
    }
  };

  const hanldeReload = () => {
    window.location.reload();
  };

  const clearFilters = () => {
    setSelectedBoard(null);
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

      <div className="px-10 flex items-center justify-center">
        <h1 className="text-center my-4 text-xl font-bold">
          {editMode ? "Edit Board" : "Add New Board"}
        </h1>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md mx-auto w-full lg:max-w-3xl  mb-10"
      >
        <div className="lg:grid lg:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-black font-semibold text-md">
              Board Name
            </label>
            <input
              type="text"
              name="Name"
              value={formData.Name}
              onChange={handleChange}
              className="bg-gray-50 w-full border-[#92C7CF] shadow-3xl border-2 rounded-full p-2 mt-1"
              placeholder="Board name"
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

        <div className="flex justify-between gap-4 mb-4 items-center">
          <button
            type="submit"
            className="bg-blue-600  text-white py-1 px-3 rounded-full hover:bg-blue-900 mt-6 font-semibold"
          >
            {editMode ? "Update" : "Add Board"}
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
            onChange={setSelectedBoard}
            options={boardOptions}
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
            Boards List
          </div>

          <div className="overflow-auto pb-10">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-200">
                  <th className="p-2">Board Name</th>
                  <th className="p-2">Created At</th>
                  <th className="p-2 ">Image</th>
                  <th className="p-2 text-center">Free Course</th>
                  <th className="p-2 text-center">Edit</th>
                  <th className="p-2 text-center">Delete</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.length > 0 ? (
                  filteredData.map((record, index) => (
                    <tr key={index} className="border-b">
                      <td className="p-2">
                        {record?.board_name.toUpperCase() || "N/A"}
                      </td>
                      <td className="p-2">
                        {record?.created_at
                          ? new Date(record.created_at).toLocaleString(
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
                        {record?.image_url ? (
                          <img
                            className="w-[100px] h-[100px]"
                            src={record?.image_url}
                            alt="IMG"
                          />
                        ) : (
                          "N/A"
                        )}
                      </td>
                      <td className="p-2 text-center">
                        {record.free_course ? "🟢" : "🔴"}
                      </td>
                      <td className="p-2 text-center">
                        <button
                          onClick={() => handleEdit(record)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <FontAwesomeIcon icon={faEdit} />
                        </button>
                      </td>
                      <td className="p-2 text-center">
                        <button
                          onClick={() => checkAndDeleteBoard(record?.board_id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center p-4">
                      No data available.
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
