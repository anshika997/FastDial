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
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import axios from "axios";
import image from "../../Images/FormImage.jpeg";
import photo from "../../Images/logoImage.jpeg";
import Select from "react-select";

export default function Testimonial() {
  const BASEURL = import.meta.env.VITE_API_URL_ADMIN;
  const accessToken = window.sessionStorage.getItem("accessToken");
  const [formData, setFormData] = useState({
    name: "",
    designation: "",
    description: "",
    image_url: "",
    created_at: new Date().toISOString().slice(0, 19).replace("T", " "),
  });
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [testimonialData, setTestimonialData] = useState([]);
  const [userName, setUsername] = useState([]); // All projects data

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

  const fetchTestimonial = async () => {
    await axios
      .get(`${BASEURL}/data/gettestimonial`, {
        headers: {
          Authorization: `Bearer ${accessToken}`, // Make sure to correctly format the Authorization header
        },
      })
      .then((response) => {
        if (response && response.data) {
          setTestimonialData(response.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching boards data:", error);
      });
  };

  useEffect(() => {
    fetchTestimonial();
  }, []);

  const handleLogout = () => {
    if (window.confirm("Are you really want to logout")) {
      window.localStorage.removeItem("accessToken");
      navigate("/");
    }
  };

  const handleEdit = (record) => {
    setEditMode(true);
    setEditId(record.id);
    setFormData({
      name: record.name,
      description: record.description,
      created_at: record.created_at,
      image_url: record.image_url,
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
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
      return response.data.url;
    } catch (err) {
      console.error("File upload failed", err);
      alert("File upload failed. Please try again.");
      return null;
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this testimonial?")) {
      return;
    }

    try {
      const url = `${BASEURL}/data/deletetestimonial/${id}`;
      const response = await axios.delete(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.status === 200 || response.status === 201) {
        alert("Testimonial has been successfully deleted.");
        // Remove the deleted item from state
        setTestimonialData((prevTest) =>
          prevTest.filter((testimonial) => testimonial.id !== id)
        );
      } else {
        throw new Error("Failed to delete about subject.");
      }
    } catch (error) {
      console.error("Failed to delete :", error);
      alert("Failed to delete testomonial. Please try again.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Ensure all fields are filled
    const { name, description, image_url } = formData;
    if (!name || !description || !image_url) {
      alert("All fields are required.");
      return;
    }

    // Prepare payload
    let payload = {
      name,
      description,
      image_url: formData.image_url,
    };

    // Handle file upload if new file is provided
    if (typeof image_url === "object") {
      const uploadedFileUrl = await uploadFile(image_url);
      payload.image_url = uploadedFileUrl;
    }

    try {
      let response;
      if (editMode) {
        const endpoint = `${BASEURL}/data/updatetestimonial`;
        response = await axios.post(endpoint, payload, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
      } else {
        const endpoint = `${BASEURL}/data/inserttestimonial`;
        response = await axios.post(endpoint, payload, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        payload.created_at = new Date()
          .toISOString()
          .slice(0, 19)
          .replace("T", " ");
      }

      if (response.data) {
        alert(
          `Testimonial ${editMode ? "updated" : "added"} successfully: ` +
            response.data.message
        );

        // Update local state
        if (editMode) {
          setTestimonialData(
            testimonialData.map((item) =>
              item.id === editId ? { ...item, ...payload } : item
            )
          );
        } else {
          setTestimonialData([
            ...testimonialData,
            { ...payload, id: response.data.id },
          ]);
        }

        // Reset form and exit edit mode
        setFormData({
          name: "",
          description: "",
          image_url: "",
          created_at: new Date().toISOString().slice(0, 19).replace("T", " "),
        });
        setEditMode(false);
        setEditId(null);
      } else {
        throw new Error("No data returned from the server.");
      }
    } catch (error) {
      console.error(
        `${editMode ? "Error updating" : "Error submitting"} testimonial:`,
        error
      );
      alert(
        error.response?.data?.message ||
          `An error occurred while ${
            editMode ? "updating" : "submitting"
          } the testimonial.`
      );
    }
  };

  const hanldeReload = () => {
    window.location.reload();
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
          {editMode ? "Edit Testimonial" : "Add Testimonial"}
        </h1>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md mx-auto w-full lg:max-w-3xl  mb-10"
      >
        <div className="lg:grid lg:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-black font-semibold text-md">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="bg-gray-50 w-full border-[#92C7CF] shadow-3xl border-2 rounded-full p-2 mt-1"
              placeholder="User Name"
            />
          </div>
          <div>
            <label className="block text-black font-semibold text-md">
              Image
            </label>
            {formData.image_url && (
              <img
                src={formData.image_url}
                alt="Uploaded"
                style={{ width: "100px", height: "100px" }}
              />
            )}
            <input
              type="file"
              name="image_url"
              accept=".jpg,.jpeg,.png,.gif"
              onChange={handleChange}
              className="bg-gray-50 w-full border-[#92C7CF] shadow-3xl border-2 rounded-full p-2 mt-1"
              placeholder="User Name"
            />
          </div>
          <div className="">
            <label className="block text-black font-semibold text-md">
              Description
            </label>
            <textarea
              type="text"
              value={formData.description}
              name="description"
              onChange={handleChange}
              className="bg-gray-50 w-full border-[#92C7CF] shadow-3xl border-2 rounded-full p-2 mt-1"
            />
          </div>
        </div>

        <div className="flex justify-between gap-4 mb-4 items-center">
          <button
            type="submit"
            className="bg-blue-600  text-white py-2 px-3 rounded-full hover:bg-blue-900 mt-6 font-semibold"
          >
            {editMode ? "Update" : "Add Testimonial"}
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

      <section className="flex justify-center mx-5">
        <div className="bg-white p-4 rounded-lg shadow w-full">
          <div className="text-gray-600 font-bold text-lg mb-2 px-2">
            Boards List
          </div>

          <div className="overflow-auto pb-10">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-200">
                  <th className="p-2">Testimonial Name</th>
                  <th className="p-2 ">Description</th>
                  <th className="p-2">Image</th>
                  <th className="p-2 text-center">Created At</th>
                  <th className="p-2 text-center">Edit</th>
                  <th className="p-2 text-center">Delete</th>
                </tr>
              </thead>
              <tbody>
                {testimonialData.length > 0 ? (
                  testimonialData.map((record, index) => (
                    <tr key={index} className="border-b">
                      <td className="p-2">{record.name}</td>
                      <td className="p-2">{record.description}</td>
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
                      <td className="p-2">
                        {new Date(record.created_at).toLocaleString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
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
                          onClick={() => handleDelete(record.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center p-4">
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
