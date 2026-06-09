import React, { useState, useEffect } from "react";
import NavbarSignIn from "../../components/NavbarSignIn";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { IoMdCloseCircleOutline } from "react-icons/io";
import axios from "axios";
import Loading from "../../components/Loading";
import image from "../../Images/excel-profile.png"

const Profile = () => {
  const [userData, setUserdata] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [show, setShow] = useState(false);
  const [newData, setNewData] = useState({
    user_mobile: "",
    user_name: "",
    email: "",
    dob: "",
    course_of_study: "",
    profile_image: null,
  });
  const BASEURL = import.meta.env.VITE_API_URL_USERS;
  const accessToken = window.sessionStorage.getItem("accessToken");
  const { isAuthenticated, userPhone } = useSelector((state) => state.auth);

  const getuser = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${BASEURL}/data/getclass_users?user_id=${userPhone.user.empid}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setUserdata(response.data[0]);
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getuser();
  }, []);

  const handleEdit = () => {
    setNewData({
      user_mobile: userData.user_mobile || "",
      user_name: userData.user_name || "",
      email: userData.email || "",
      dob: userData.dob || "",
      course_of_study: userData.course_of_study || "",
      profile_image: null,
    });
    setShow(true);
  };

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setNewData((prev) =>
      type === "file"
        ? { ...prev, [name]: files[0] }
        : { ...prev, [name]: value }
    );
  };

  const handleSubmit = async () => {
    const userConfirmed = window.confirm("Are you sure you want to change?");
    if (!userConfirmed) {
      return;
    }
    try {
      setLoading(true);
      const requiredFields = [
        "user_mobile",
        "user_name",
        "email",
        "dob",
        "course_of_study",
        "profile_image",
      ];

      for (let field of requiredFields) {
        const value = newData[field];
        if (!value || (typeof value === "string" && value.trim() === "")) {
          alert(`${field} is required!`);
          setLoading(false);
          return;
        }
      }

      const profile_url = await uploadFile(newData.profile_image);

      const PostData = {
        user_id: userData.user_id,
        user_mobile: newData.user_mobile,
        user_name: newData.user_name,
        is_verified: userData.is_verified,
        email: newData.email,
        password: userData.password,
        dob: newData.dob.endsWith("Z")
          ? newData.dob.replace(/Z$/, "")
          : newData.dob,
        course_of_study: newData.course_of_study,
        profile_image: profile_url,
      };

      const response = await axios.put(
        `${BASEURL}/data/updateclass_users`,
        PostData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      setUserdata(PostData);
      alert("Profile Updated Successfully");
      setShow(false);
    } catch (error) {
      alert("Error updating data");
    } finally {
      setLoading(false);
    }
  };

  const uploadFile = async (file) => {
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
      return null;
    }
  };

  if (loading) {
    return (
      <>
        <NavbarSignIn />
        <div>
          <Loading />
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <NavbarSignIn />
        <div
          className="flex justify-center items-center"
          style={{ minHeight: "calc(100vh - 10vh)" }}
        >
          <div className="text-center p-6 bg-white rounded-lg shadow-lg max-w-md w-full">
            <span className="text-red-500 text-xl font-semibold mb-4 block">
              Something went wrong..
            </span>
            <button
              className="bg-[#0455BF] py-3 px-8 text-white font-bold rounded-lg hover:bg-blue-600"
              onClick={getuser}
            >
              Please Try Again
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <NavbarSignIn />
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-Montserrat text-center font-bold mb-8 bg-blue-600 text-white py-3 rounded-lg shadow-lg">
          User Profile
        </h1>
        <div>
          <div className="flex flex-col lg:flex-row lg:justify-between items-start mx-10 p-5">
            <img
              src={userData.profile_image}
              alt="No user image available"
              className="h-36 w-32 mb-4 lg:mb-0"
            />
            <div className="flex lg:block lg:mt-auto">
              <button
                className="bg-[#0455BF] text-white py-2 px-5 rounded-md hidden lg:block"
                onClick={handleEdit}
              >
                Edit
              </button>
            </div>
          </div>

          <div className="lg:grid lg:grid-cols-3 gap-4 mb-4 bg-white mx-10 p-5 rounded-lg">
            <div className="mb-4">
              <label>User Name</label>
              <input
                type="text"
                value={userData.user_name ? userData.user_name : "Anonyms"}
                readOnly={true}
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label>Mobile</label>
              <input
                type="text"
                readOnly={true}
                value={
                  userData.user_mobile ? userData.user_mobile : "Not Available"
                }
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label>Email</label>
              <input
                type="text"
                readOnly={true}
                value={userData.email ? userData.email : "Not Available"}
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label>Date of Birth</label>
              <input
                type="text"
                readOnly={true}
                value={
                  userData.dob
                    ? new Date(userData.dob).toLocaleDateString("en-GB")
                    : "Not Available"
                }
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label>Cousrse of Study</label>
              <input
                type="text"
                readOnly={true}
                value={
                  userData.course_of_study
                    ? userData.course_of_study
                    : "Not Available"
                }
                className="w-full p-2 border rounded"
              />
            </div>
          </div>
          <button
            className="bg-[#0455BF] w-full mx-auto text-white py-2 px-5 rounded-md block lg:hidden"
            onClick={handleEdit}
          >
            Edit
          </button>
        </div>
      </div>
      {show && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="container mx-auto p-6 bg-white">
            <h1 className="text-3xl font-Montserrat text-center font-bold mb-8 bg-blue-600 text-white py-3 rounded-lg shadow-lg">
              Update Profile
            </h1>
            <div className="lg:grid lg:grid-cols-3 gap-4 mb-4 bg-white mx-10 p-5 rounded-lg">
              <div className="mb-4">
                <label>Upload Image</label>
                <input
                  type="file"
                  name="profile_image"
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label>User Name</label>
                <input
                  type="text"
                  name="user_name"
                  value={newData.user_name}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label>Mobile</label>
                <input
                  type="tel"
                  name="user_mobile"
                  value={newData.user_mobile}
                  onChange={(e) => {
                    const { value } = e.target;
                    if (/^\d*$/.test(value)) {
                      handleChange(e);
                    }
                  }}
                  maxLength={10}
                  placeholder="Enter 10-digit mobile number"
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={newData.email}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label>Date of Birth</label>
                <input
                  type="date"
                  name="dob"
                  value={newData.dob ? newData.dob.split("T")[0] : ""}
                  onChange={handleChange}
                  max={new Date().toISOString().split("T")[0]}
                  placeholder="Select your date of birth"
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label>Cousrse of Study</label>
                <input
                  type="text"
                  name="course_of_study"
                  value={newData.course_of_study}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                />
              </div>
            </div>
            <div className="flex items-center gap-5">
              <button
                className="bg-[#0455BF] text-white p-2 rounded-md "
                onClick={handleSubmit}
              >
                Update
              </button>
              <button
                className="bg-[#D70040] text-white p-2 rounded-md "
                onClick={() => {
                  setShow(false);
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
