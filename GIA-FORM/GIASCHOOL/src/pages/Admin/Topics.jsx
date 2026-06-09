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
  faPlay,
  faEye,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import photo from "../../Images/logoImage.jpeg";
import image from "../../Images/FormImage.jpeg";
import { useSelector } from "react-redux";
import ReactPlayer from "react-player";

function Topics() {
  // For displaying sub-subjects
  const BASEURL = import.meta.env.VITE_API_URL_ADMIN;
  const accessToken = window.sessionStorage.getItem("accessToken");
  const navigate = useNavigate();
  const [selectedVideo, setSelectedVideo] = useState(null);

  const [username, setUsername] = useState("");

  const date = new Date("7/1/2025"); // Parses the date
  const formattedDate = date.toISOString().split("T")[0];
  const [formData, setFormData] = useState({
    topic_id: "",
    topic_name: "",
    topic_created_by: username,
    chapter_id: "",
    qna: "",
    video_url: "",
    notes_url: "",
    comments: "",
    author: "",
    status: "Active",
    language: "english",
    free_to_watch: "1",
    description: "",
    created_date: formattedDate,
  });
  console.log(formData);

  const [editMode, setEditMode] = useState(false);
  const [SavingMode, setSavingMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState("");
  const [Chapters, setChapters] = useState([]);
  const [subSearch, setSubSearch] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [TopicName, setTopicName] = useState([]);
  const [SelectedChapterName, setSelectedChapterName] = useState(null);
  const [selectedFilterSubject, setSelectedFilterSubject] = useState(null);
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
    fetchChapterName();
    fetchTopicName();
  }, []);
  const fetchChapterName = () => {
    axios
      .get(`${BASEURL}/data/getChapters`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        if (response.data) {
          setChapters(response.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching sub-subjects data:", error);
      });
  };

  const fetchTopicName = () => {
    axios
      .get(`${BASEURL}/data/getTopics`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        if (response.data) {
          setTopicName(response.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching sub-subjects data:", error);
      });
  };

  const subjectOption = Chapters?.map((sub) => ({
    value: sub.chapter_id,
    label: sub.chapter_name,
  }));

  const handleSubjectChange = (selectedOption) => {
    setSelectedChapterName(selectedOption);
    setFormData((prevData) => ({
      ...prevData,
      chapter_id: selectedOption.value, // Ensure this is correctly assigning the value
    }));
  };

  const hanldeReload = () => {
    window.location.reload();
  };

  const handleLogout = () => {
    if (window.confirm("Are you really want to logout")) {
      window.localStorage.removeItem("accessToken");
      navigate("/");
    }
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
    if (type === 'checkbox') {
      setFormData(prevFormData => ({
        ...prevFormData,
        [name]: checked
      }));
    } else if (type === 'file') {
      setFormData(prevFormData => ({
        ...prevFormData,
        [name]: files[0]
      }));
    } else {
      setFormData(prevFormData => ({
        ...prevFormData,
        [name]: value
      }));
    }
  };

  const filteredData = TopicName.map((topic) => {
    // Check if the qna object matches the filtering conditions
    const matchesSubject = selectedFilterSubject
      ? topic.qna.subject_name?.toLowerCase() ===
        selectedFilterSubject.label?.toLowerCase()
      : true;

    const matchesSubSearch = subSearch
      ? topic.qna?.subject_name?.toLowerCase().includes(subSearch.toLowerCase())
      : true;

    const matchesSearch = search
      ? topic.qna?.sub_subject_name
          ?.toLowerCase()
          .includes(search.toLowerCase())
      : true;

    const itemDate = new Date(topic.qna.sub_subject_created_date);
    const dateFromValid = dateFrom ? new Date(dateFrom) : null;
    const dateToValid = dateTo ? new Date(dateTo) : null;

    const matchesDate =
      (!dateFromValid || itemDate >= dateFromValid) &&
      (!dateToValid || itemDate <= dateToValid);

    // Return the topic if it matches the filter, otherwise return null
    return matchesSubject && matchesSearch && matchesDate && matchesSubSearch
      ? topic
      : null;
  }).filter((topic) => topic !== null); // Filter out null values from the result

  const FilterSubjectOptions = Chapters.map((sub) => ({
    value: sub.subject_id,
    label: sub.subject_name,
  }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !window.confirm(
        `Are you sure you want to ${editMode ? "update" : "submit"} the Topic?`
      )
    ) {
      return;
    }
    setSavingMode(true);

    const video_url_pass = await uploadFile(formData.video_url);
    const notes_url_pass = await uploadFile(formData.notes_url);
    const uploadedFileUrl = await uploadFile(formData.image_url);

    const finalData = {
      topic_name: formData.topic_name,
      topic_created_by: formData.topic_created_by,
      chapter_id: formData.chapter_id,
      qna: "",
      video_url: video_url_pass,
      notes_url: notes_url_pass,
      image_url: uploadedFileUrl,
      comments: "",
      author: formData.author,
      status: formData.status,
      language: formData.language,
      free_to_watch: formData.free_to_watch,
      created_date: formData.created_date,
    };
    console.log(formData);

    // if (!topic_name || !chapter_id || !description || !topic_id) {
    //   alert("All fields are required.");
    //   return;
    // }

    try {
      if (editMode) {
        const payloadEdit = { ...finalData, topic_id: editId };

        const response = await axios.post(
          `${BASEURL}/data/updateTopics`,
          payloadEdit,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        console.log("Topic updated successfully:", response.data.message);
        alert(response.data.message);
        window.location.reload();

        setSavingMode(false);
      } else {
        const response = await axios.post(
          `${BASEURL}/data/insertTopics`,
          finalData,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        console.log("Topic added successfully:", response.data.message);
        alert(response.data.message);
        window.location.reload();
        setSavingMode(false);
      }

      // Reset form data and state
      setFormData({
        topic_id: "",
        topic_name: "",
        topic_created_by: "",
        chapter_id: "",
        chapter_name: "",
        qna: "",
        video_url: "",
        notes_url: "",
        comments: "",
        author: "",
        status: "",
        language: "",
        free_to_watch: "",
        created_date: "",
      });

      setEditMode(false);
      fetchChapterName();
      fetchTopicName();
    } catch (error) {
      setSavingMode(false);

      console.error(
        `${editMode ? "Error updating" : "Error adding"} Topic:`,
        error
      );
      alert(
        error.response?.data?.message ||
          `An error occurred while ${
            editMode ? "updating" : "adding"
          } the Topic.`
      );
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
      setSavingMode(false);

      return null;
    }
  };
  const deleteSubSubject = async (chapterid) => {
    console.log(chapterid);
    if (!window.confirm(`Are you sure you want to delete?`)) {
      return;
    }
    try {
      const deleteResponse = await axios.delete(
        `${BASEURL}/data/deleteTopics/${chapterid}`,
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
        fetchTopicName();
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

  const handleEdit = (record) => {
    console.log(record, "Record");

    setEditMode(true);
    setEditId(record.topic_id);

    const subsubjecttoSelect = Chapters.find(
      (cls) =>
        cls.chapter_id === record.chapter_id &&
        cls.chapter_name === record.chapter_name
    );
    if (subsubjecttoSelect) {
      setSelectedChapterName({
        value: subsubjecttoSelect.chapter_id,
        label: subsubjecttoSelect.chapter_name,
      });
    } else {
      setSelectedChapterName(null);
    }

    // const subjectToSelect = subjects.find(
    //   (subject) =>
    //     subject.subject_name === record.subject_name &&
    //     subject.subject_id === record.subject_id
    // );
    // if (subjectToSelect) {
    //   console.log("Seletced Subject", subjectToSelect);
    //   setSelectedSubject({
    //     value: subjectToSelect.subject_id,
    //     label: subjectToSelect.subject_name,
    //   });
    // } else {
    //   setSelectedSubject(null);
    // }

    setFormData({
      topic_id: record?.topic_id,
      topic_name: record?.topic_name,
      topic_created_by: username,
      chapter_id: record?.chapter_id,
      chapter_name: record?.chapter_name,
      qna: record?.qna,
      video_url: record?.video_url,
      notes_url: record?.notes_url,
      comments: record?.comments,
      author: record?.author,
      status: record?.status,
      language: record?.language,
      free_to_watch: record?.free_to_watch,
      description: record?.topic_description,
      image_url: record?.image_url,
      created_date: formattedDate,
      free_course: record?.free_course,
    });
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  const handleVideoPlay = (videoUrl) => {
    setSelectedVideo(videoUrl);
  };

  const handleCloseVideo = () => {
    setSelectedVideo(null);
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
          {editMode ? "Edit Topic" : "Add New Topic"}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-black font-semibold text-md">
              Chapter
            </label>
            <Select
              value={SelectedChapterName}
              onChange={handleSubjectChange}
              styles={customStyles}
              options={subjectOption}
              required
              placeholder="Select a Chapter"
            />
          </div>
          <div>
            <label className="block text-black font-semibold text-md">
              Topic name
            </label>
            <input
              type="text"
              name="topic_name"
              value={formData.topic_name}
              onChange={handleChange}
              className="bg-gray-50 w-full border-[#92C7CF] shadow-3xl border-2 rounded-full p-2 mt-1"
              placeholder="Topic Name"
              disabled={!SelectedChapterName}
              required
            />
          </div>
          <div>
            <label className="block text-black font-semibold text-md">
              Upload Video
            </label>
            <input
              type="file"
              accept="video/*" // Only allows video files
              name="video_url"
              onChange={handleChange}
              className="bg-gray-50 w-full border-[#92C7CF] shadow-3xl border-2 rounded-full p-2 mt-1"
            />
          </div>
          <div>
            <label className="block text-black font-semibold text-md">
              Notes
            </label>
            <input
              type="file"
              name="notes_url"
              accept=".pdf,.doc,.docx,.txt,.ppt,.pptx,.jpg,.jpeg,.png,.gif"
              onChange={handleChange}
              className="bg-gray-50 w-full border-[#92C7CF] shadow-3xl border-2 rounded-full p-2 mt-1"
            />
          </div>
          <div>
            <label className="block text-black font-semibold text-md">
              Author
            </label>
            <input
              type="text"
              name="author"
              value={formData.author}
              onChange={handleChange}
              className="bg-gray-50 w-full border-[#92C7CF] shadow-3xl border-2 rounded-full p-2 mt-1"
              placeholder="Author"
              required
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
          </div>
          <div>
            <label className="block text-black font-semibold text-md">
              Watch Free
            </label>

            <select
              name="free_to_watch"
              value={formData.free_to_watch}
              onChange={handleChange}
              className="bg-gray-50 w-full border-[#92C7CF] shadow-3xl border-2 rounded-full p-2 mt-1"
            >
              <option value="">Select an option</option>
              <option value="1">Yes</option>
              <option value="2">No</option>
            </select>
          </div>
          {/* <div>
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
          </div> */}
        </div>
        <div className="flex justify-center gap-4 mt-6">
          {SavingMode ? (
            <p className="bg-blue-600 text-white py-2 px-6 rounded-full hover:bg-blue-900 font-semibold">
              Saving...
            </p>
          ) : (
            <button
              type="submit"
              className="bg-blue-600 text-white py-2 px-4 rounded-full hover:bg-blue-900 font-semibold"
            >
              {editMode ? "Update Topic" : "Add Topic"}
            </button>
          )}
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
          <div>
            {" "}
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
        </div>
        <div className="lg:flex gap-2 p-2 items-center mx-4">
          <div>
            {" "}
            <h3 className="font-semibold">Filter By Sub-Subject Name:</h3>
            <input
              type="text"
              className="bg-gray-50 border border-gray-300 rounded-md p-2 mt-2"
              placeholder="Search for a Sub-Subject..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
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

      <section className="flex justify-center mx-5">
        <div className="bg-white p-4 rounded-lg shadow w-full">
          <div className="text-gray-600 font-bold text-lg mb-2 px-2">
            List Of Topics
          </div>

          <div className="overflow-auto pb-10">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-200">
                  <th className="p-2">Chapter</th>
                  <th className="p-2">Topic Name</th>
                  <th className="p-2">Language</th>
                  <th className="p-2">Author</th>
                  <th className="p-2">Status</th>{" "}
                  <th className="p-2 ">Image</th>
                  <th className="p-2">Free Course</th>
                  <th className="p-2">Play</th>
                  <th className="p-2">Notes</th>
                  {/* <th className="p-2">description</th> */}
                  <th className="p-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.length > 0 ? (
                  filteredData.map((record, index) => (
                    <tr key={index} className="border-b">
                      <td className="p-2">
                        {record?.chapter_name.toUpperCase() || "N/A"}
                      </td>
                      <td className="p-2">
                        {record?.topic_name.toUpperCase() || "N/A"}
                      </td>
                      <td className="p-2">{record?.language.toUpperCase() || "N/A"}</td>
                      <td className="p-2">{record?.author || "N/A"}</td>
                      <td className="p-2">{record?.status || "N/A"}</td>{" "}
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
                      <td className="p-2 border ">
                        <button
                          onClick={() => {
                            handleVideoPlay(record.video_url);
                            console.log(record.video_url);
                          }}
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
                      <td>
                        {" "}
                        <button
                          onClick={() => handleEdit(record)}
                          className="bg-yellow-400 text-white py-1 px-2 rounded-md"
                        >
                          <FontAwesomeIcon icon={faEdit} />
                        </button>{" "}
                        <button
                          onClick={() => deleteSubSubject(record?.topic_id)}
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
                      No Topics Found.
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

export default Topics;
