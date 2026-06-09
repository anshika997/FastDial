import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { GetData } from "../../Redux/store/authSlice";
import ReactPlayer from "react-player";
function UserPlayerVideo() {
  const [BoardDat, setBoardsData] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const BASEURL = import.meta.env.VITE_API_URL_USERS;
  const BASEURLADMIN = import.meta.env.VITE_API_URL_ADMIN;
  const accessToken = window.sessionStorage.getItem("accessToken");
  const data = useSelector((state) => state.auth.data);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  console.log(data);
  function fetchData() {
    axios
      .get(
        `${BASEURLADMIN}/data/getAboutSubjects?sub_subject_id=${data?.sub_subject_id}&subject_id=${data?.subject_id}&class_id=${data.class_id}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((response) => {
        if (response.data) {
          //   setBoardsData(response.data[0]);
          setSelectedVideo(response.data[0]?.video_url);
          console.log(response.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching boards data:", error);
      });
  }

  useEffect(() => {
    fetchData();
  }, []);

  const HandlePurchase = (board) => {
    dispatch(GetData(board));
    navigate("/UserPurchase");
  };

  const handleVideoPlay = (videoUrl) => {
    setSelectedVideo(videoUrl);
  };

  const handleCloseVideo = () => {
    setSelectedVideo(null);
    navigate("/GetSubSubject");
  };
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 ">
          {selectedVideo ? (
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
          ) : (
            <p className="text-center col-span-full text-gray-500">
              No boards available.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserPlayerVideo;
