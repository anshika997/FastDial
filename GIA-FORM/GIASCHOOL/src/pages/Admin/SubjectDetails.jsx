import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FaSignOutAlt } from "react-icons/fa";
import Select from "react-select";
import {
  faBars,
  faUser,
  faTrash,
  faEdit,
  faPlay,
  faEye,
} from "@fortawesome/free-solid-svg-icons";
import { IoIosArrowBack } from "react-icons/io";
import ReactPlayer from "react-player";
import photo from "../../Images/logoImage.jpeg";
import image from "../../Images/FormImage.jpeg";
import { useSelector } from "react-redux";

export default function SubjectDetails() {
  const BASEURL = import.meta.env.VITE_API_URL_ADMIN;
  const accessToken = window.sessionStorage.getItem("accessToken");
  const [subSubjectsData, setSubSubjectsData] = useState([]);
  const [search, setSearch] = useState("");
  const [classes, setClasses] = useState([]); // For class selection
  const [boards, setBoards] = useState([]); // For Board Selections
  const [subjectsData, setSubjectsData] = useState([]); // For displaying subjects
  const [subSubjectsDetails, setSubSubjectsDetails] = useState([]); // For displaying sub-subjects
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [selectedBoard, setSelectedBoard] = useState(null);
  const [selectedClass, setSelectedClass] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedSubSubject, setSelectedSubSubject] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [username, setUsername] = useState("");

  const [formData, setFormData] = useState({
    video_url: "",
    notes_url: "",
    comments: "",
    author: "",
    status: "Active",
    language: "",
    sub_subject_id: "",
    created_by: username || "",
  });
  const [error, setError] = useState(null);

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
    fetchSubjectData();
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

  const fetchSubjectData = () => {
    axios
      .get(`${BASEURL}/data/getSubjects`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        if (response.data) {
          console.log("Fetched subjects:", response.data); // Debugging line
          setSubjectsData(response.data);
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
          setSubSubjectsDetails(response.data);
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

  const subjectOption = Array.isArray(subjectsData)
    ? subjectsData
        .filter((sub) => sub.class_id === selectedClass?.value)
        .map((sub) => ({
          value: sub.subject_id,
          label: sub.subject_name,
        }))
    : [];

  const subSubjectOption = subSubjectsDetails
    .filter((sub_subject) => sub_subject.subject_id === selectedSubject?.value) // Correct field and array
    .map((sub_subject) => ({
      value: sub_subject.sub_subject_id,
      label: sub_subject.sub_subject_name,
    }));

  const handleBoardChange = (selectedOption) => {
    setSelectedBoard(selectedOption);
    setSelectedClass(null);
    setSelectedSubject(null);
    setSelectedSubSubject(null);
  };

  const handleClassChange = (selectedOption) => {
    setSelectedClass(selectedOption);
    setSelectedSubject(null);
    setSelectedSubSubject(null);
  };

  const handleSubjectChange = (selectedOption) => {
    setSelectedSubject(selectedOption);
    setSelectedSubSubject(null);
  };

  const handleSubSubjectChange = (selectedOption) => {
    setSelectedSubSubject(selectedOption);
    setFormData((prev) => ({
      ...prev,
      sub_subject_id: selectedOption.value, // Ensure this matches your data structure
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
    const { name, value, type, files } = e.target;
    setFormData((prev) =>
      type === "file"
        ? { ...prev, [name]: files[0] }
        : { ...prev, [name]: value }
    );
  };

  const uploadFile = async (file) => {
    // Check if file is a string (text URL), return it as is
    if (typeof file === "string") {
      return file; // Return the existing URL without uploading
    }

    // If it's a file object, proceed with file upload
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
      return response.data.url; // Return the uploaded file URL
    } catch (err) {
      console.error("File upload failed", err);
      setError("File upload failed. Please try again.");
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !window.confirm(
        `Are you sure you want to ${
          editMode ? "update" : "submit"
        } the Subject details?`
      )
    ) {
      return;
    }
    try {
      // Upload files first
      const video_url = await uploadFile(formData.video_url);
      const notes_url = await uploadFile(formData.notes_url);

      // Proceed with submission after file upload
      const finalData = {
        video_url: video_url || formData.video_url, // Fallback to existing values if upload fails
        notes_url: notes_url || formData.notes_url, // Same as above
        comments: formData.comments,
        author: formData.author,
        status: formData.status,
        language: formData.language,
        sub_subject_id: formData.sub_subject_id,
        created_by: username || "",
      };

      // Submit subject details
      const response = await axios.post(
        `${BASEURL}/data/insertAboutSubjects`,
        finalData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      alert(response.data.message);
      setFormData({
        video_url: "",
        notes_url: "",
        comments: "",
        author: "",
        status: "",
        language: "",
        sub_subject_id: "",
        created_by: "",
      });
      window.location.reload();
    } catch (error) {
      console.error("Error submitting subject details:", error);
      alert(
        error.response?.data?.message ||
          "An error occurred while submitting the details."
      );
    }
  };

  useEffect(() => {
    fetchSubjects();
  }, []);
  const fetchSubjects = () => {
    axios
      .get(`${BASEURL}/data/getAboutSubjects`, {
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
        console.error("Error fetching subjects data:", error);
      });
  };

  const handleEdit = (record) => {
    console.log("Edit record:", record);
    window.scrollTo(0, 0);
    setEditMode(true);

    const boardToSelect = boards.find(
      (board) => board.board_id === record.board_id
    );
    setSelectedBoard(
      boardToSelect
        ? { value: boardToSelect.board_id, label: boardToSelect.board_name }
        : null
    );

    const classToSelect = classes.find(
      (cls) => cls.class_id === record.class_id
    );
    setSelectedClass(
      classToSelect
        ? { value: classToSelect.class_id, label: classToSelect.class_name }
        : null
    );

    const subjectToSelect = subjectsData.find(
      (subject) => subject.subject_id === record.subject_id
    );
    setSelectedSubject(
      subjectToSelect
        ? {
            value: subjectToSelect.subject_id,
            label: subjectToSelect.subject_name,
          }
        : null
    );

    const subSubjectToSelect = subSubjectsDetails.find(
      (sub) => sub.sub_subject_id === record.sub_subject_id
    );
    setSelectedSubSubject(
      subSubjectToSelect
        ? {
            value: subSubjectToSelect.sub_subject_id,
            label: subSubjectToSelect.sub_subject_name,
          }
        : null
    );

    // Setting formData
    setFormData({
      video_url: record.video_url,
      notes_url: record.notes_url,
      comments: record.comments,
      author: record.author,
      status: record.status,
      language: record.language,
      sub_subject_id: record.sub_subject_id.toString(),
      created_by: username || "",
    });
  };

  const handleDelete = async (subjecDetailtId) => {
    if (
      !window.confirm("Are you sure you want to delete this about subject?")
    ) {
      return;
    }

    try {
      const url = `${BASEURL}/data/deleteAboutSubjects/${subjecDetailtId}`;
      const response = await axios.delete(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.status === 200 || response.status === 201) {
        alert("About subject has been successfully deleted.");
        // Remove the deleted item from state
        setSubSubjectsData((prevSubDetails) =>
          prevSubDetails.filter(
            (subjectDetails) =>
              subjectDetails.about_subject_id !== subjecDetailtId
          )
        );
      } else {
        throw new Error("Failed to delete about subject.");
      }
    } catch (error) {
      console.error("Failed to delete about subject:", error);
      alert("Failed to delete the about subject. Please try again.");
    }
  };

  const handleVideoPlay = (videoUrl) => {
    setSelectedVideo(videoUrl);
  };

  const handleCloseVideo = () => {
    setSelectedVideo(null);
  };

  const filteredData =
    Array.isArray(subSubjectsData) && subSubjectsData.length > 0
      ? subSubjectsData.filter((item) => {
          const matchesSearch = item?.author
            ?.toLowerCase()
            .includes(search?.toLowerCase());

          const itemDate = new Date(item.created_date);
          const dateToAdjusted = dateTo ? new Date(dateTo) : null;

          // Add 1 day to dateToAdjusted to include the entire "to" day
          if (dateToAdjusted) {
            dateToAdjusted.setDate(dateToAdjusted.getDate() + 1);
          }

          const matchesDate =
            (!dateFrom || itemDate >= new Date(dateFrom)) &&
            (!dateToAdjusted || itemDate < dateToAdjusted); // Use < instead of <=

          return matchesSearch && matchesDate;
        })
      : [];

  const hanldeReload = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col ">
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

          <h1 className="text-black font-extrabold text-2xl capitalize">
            GIA SCHOOL
          </h1>

          <div className="flex justify-between items-center gap-x-4">
            <button
              onClick={hanldeReload}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 
              focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 
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
      <h1 className="text-2xl font-bold text-center mb-6">
        Upload Subject Details
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md mx-auto w-full lg:max-w-3xl"
      >
        <div className="mb-4">
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

        <div className="mb-4">
          <label className="block text-black font-semibold text-md">
            Class
          </label>
          <Select
            value={selectedClass}
            onChange={handleClassChange}
            styles={customStyles}
            options={classOption}
            placeholder="Select a Class"
            isDisabled={!selectedBoard}
          />
        </div>
        <div className="mb-4">
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
        <div className="mb-4">
          <label className="block text-black font-semibold text-md">
            Sub Subject
          </label>
          <Select
            value={selectedSubSubject}
            onChange={handleSubSubjectChange}
            options={subSubjectOption}
            styles={customStyles}
            placeholder="Select a Sub Subject"
            isDisabled={!selectedSubject} // Ensure this is only selectable if a subject is selected
          />
        </div>
        <div className="mb-4">
          <label className="bblock text-black font-semibold text-md mb-1">
            Video File (Current:{" "}
            <a
              href={formData.video_url}
              target="_blank"
              rel="noopener noreferrer"
            >
              View
            </a>
            )
          </label>

          <input
            type="file"
            accept="video/*" // Only allows video files
            name="video_url"
            onChange={handleChange}
            className="bg-gray-50 w-full border-[#92C7CF] shadow-3xl border-2 rounded-full p-2 mt-1"
          />
        </div>

        <div className="mb-4">
          <label className="block text-black font-semibold text-md mb-1">
            Notes File (Current:{" "}
            <a
              href={formData.notes_url}
              target="_blank"
              rel="noopener noreferrer"
            >
              View
            </a>
            )
          </label>
          <input
            type="file"
            name="notes_url"
            accept=".pdf,.doc,.docx,.txt,.ppt,.pptx,.jpg,.jpeg,.png,.gif"
            onChange={handleChange}
            className="bg-gray-50 w-full border-[#92C7CF] shadow-3xl border-2 rounded-full p-2 mt-1"
          />
        </div>

        <div className="mb-4">
          <label className="block text-black font-semibold text-md">
            Comments
          </label>
          <textarea
            name="comments"
            value={formData.comments}
            onChange={handleChange}
            className="bg-gray-50 border-[#92C7CF] shadow-3xl border-2 rounded-full p-2 mt-2 w-full"
          />
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-black font-semibold text-md">
              Author
            </label>
            <input
              type="text"
              name="author"
              value={formData.author}
              onChange={handleChange}
              className="bg-gray-50 w-full border-[#92C7CF] shadow-3xl border-2 rounded-full p-2 mt-2"
            />
          </div>

          <div>
            <label className="block text-black font-semibold text-md">
              Status
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="bg-gray-50 w-full border-[#92C7CF] shadow-3xl border-2 rounded-full p-2 mt-2"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-black font-semibold text-md">
              Language
            </label>
            <select
              name="language"
              value={formData.language}
              onChange={handleChange}
              className="bg-gray-50 w-full border-[#92C7CF] shadow-3xl border-2 rounded-full p-2 mt-2"
            >
              <option value="" disabled>
                Select a language
              </option>
              {/* Indian Languages */}
              <optgroup label="Indian Languages">
                <option value="hindi">Hindi</option>
                <option value="tamil">Tamil</option>
                <option value="telugu">Telugu</option>
                <option value="marathi">Marathi</option>
                <option value="bengali">Bengali</option>
                <option value="malayalam">Malayalam</option>
                <option value="punjabi">Punjabi</option>
                <option value="gujarati">Gujarati</option>
                <option value="kannada">Kannada</option>
                <option value="urdu">Urdu</option>
              </optgroup>

              {/* Global Languages */}
              <optgroup label="Global Languages">
                <option value="english">English</option>
                <option value="french">French</option>
                <option value="spanish">Spanish</option>
                <option value="german">German</option>
                <option value="italian">Italian</option>
                <option value="dutch">Dutch</option>
                <option value="portuguese">Portuguese</option>
                <option value="russian">Russian</option>
                <option value="japanese">Japanese</option>
                <option value="chinese">Chinese</option>
              </optgroup>
            </select>
          </div>

          {/* <div>
            <label className="block text-black font-semibold text-md">
              Sub Subject ID
            </label>
            <input
              type="text"
              name="sub_subject_id"
              value={formData.sub_subject_id}
              onChange={handleChange}
              className="bg-gray-50 w-full border-[#92C7CF] shadow-3xl border-2 rounded-full p-2 mt-2"
            />
          </div> */}
        </div>

        {/* <div className="mb-4">
          <label className="block text-black font-semibold text-md">
            Created By
          </label>
          <input
            type="text"
            name="created_by"
            value={formData.created_by}
            onChange={handleChange}
            className="bg-gray-50 w-full border-[#92C7CF] shadow-3xl border-2 rounded-full p-2 mt-2"
          />
        </div> */}

        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded-full hover:bg-blue-900 w-full font-semibold"
        >
          Submit
        </button>
        {/* <div>
          <img
            src={image}
            alt="form image "
            className="w-[200px] md:w-1/2 h-[40vh] md:h-auto mb-2 "
          />
        </div> */}
      </form>
      {/* Search Bar */}
      <div className="flex align-items-center justify-content-center">
        <div className="lg:flex gap-2 p-2 items-center mx-4">
          <h3 className="font-semibold">Filter By Author:</h3>
          <input
            type="text"
            className="bg-gray-50 border border-gray-300 rounded-md p-2 mt-2"
            placeholder="Search by author..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
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
      </div>

      {/* Data Table */}
      <section className="flex justify-center mx-5">
        <div className="bg-white p-4 rounded-lg shadow w-full">
          <div className="text-gray-600 font-bold text-lg mb-2 px-2">
            Sub-Subjects List
          </div>

          <div className="overflow-auto pb-10">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-200">
                  <th className="p-2 border">Sub-Subject </th>
                  <th className="p-2 border">Author</th>
                  <th className="p-2 border">Comments</th>
                  <th className="p-2 border">Language</th>
                  <th className="p-2 border">Status</th>
                  <th className="p-2 border">Created Date</th>
                  <th className="p-2 border">Play</th>
                  <th className="p-2 border">Notes</th>
                  <th className="p-2 border">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.length > 0 ? (
                  filteredData.map((record, index) => (
                    <tr key={index} className="border-b">
                      <td className="p-2 border">
                        {record?.sub_subject_name.toUpperCase() || "N/A"}
                      </td>
                      <td className="p-2 border">
                        {record?.author.toUpperCase() || "N/A"}
                      </td>
                      <td className="p-2 border">
                        {record?.comments || "N/A"}
                      </td>
                      <td className="p-2 border">
                        {record?.language.toUpperCase() || "N/A"}
                      </td>
                      <td className="p-2 border">
                        {record?.status.toUpperCase() || "N/A"}
                      </td>
                      <td className="p-2 border">
                        {new Date(
                          record?.sub_subject_created_date
                        ).toLocaleDateString() || "N/A"}
                      </td>
                      <td className="p-2 border ">
                        <button
                          onClick={() => handleVideoPlay(record.video_url)}
                          className="bg-blue-500 text-white py-1 px-2 rounded-md"
                        >
                          <FontAwesomeIcon icon={faPlay} />
                        </button>
                      </td>

                      <td className="p-2 border flex justify-center gap-2">
                        <a
                          href={record.notes_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-green-500 text-white py-1 px-2 rounded-md"
                        >
                          <FontAwesomeIcon icon={faEye} />
                        </a>
                      </td>

                      <td className="p-2 border ">
                        <button
                          onClick={() => handleEdit(record)}
                          className="bg-yellow-400 text-white py-1 px-2 rounded-md mr-5"
                        >
                          <FontAwesomeIcon icon={faEdit} />
                        </button>
                        <button
                          onClick={() => handleDelete(record.about_subject_id)}
                          className="bg-red-500 text-white py-1 px-2 rounded-md"
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center text-gray-500 py-4">
                      No Subjects Found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Video Modal */}
      {selectedVideo && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-4 shadow-lg max-w-xl w-full">
            <ReactPlayer
              url={selectedVideo}
              controls
              width="100%"
              height="100%"
            />
            <button
              onClick={handleCloseVideo}
              className="bg-red-500 text-white py-1 px-4 rounded-md mt-4"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
