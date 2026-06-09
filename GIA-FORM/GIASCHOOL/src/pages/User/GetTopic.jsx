import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { GetData } from "../../Redux/store/authSlice";
import { FaRobot, FaRegWindowClose } from "react-icons/fa";
import NavbarSignIn from "../../components/NavbarSignIn";
import Review from "../../components/Review";
import QnAComp from "../../components/QnAComp";
import { FaArrowCircleLeft } from "react-icons/fa";
import { VscThreeBars } from "react-icons/vsc";
function GetTopic() {
  const [BoardDat, setBoardsData] = useState([]);
  const [activeTopic, setActiveTopic] = useState(null);
  const [showChat, setShowChat] = useState(false); // Controls chat popup
  const [prompt, setPrompt] = useState("");
  const [showBar, setshowBar] = useState(true);
  const [review, setReview] = useState([]);
  const [response, setResponse] = useState("");
  const [error, setError] = useState("");

  const BASEURL = import.meta.env.VITE_API_URL_USERS;
  const accessToken = window.sessionStorage.getItem("accessToken");
  const data = useSelector((state) => state.auth.data);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${BASEURL}/data/getTopics?chapter_id=${data?.chapter_id}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (response.data) {
          const sortedData = [...response.data].sort(
            (a, b) => a.serial_no - b.serial_no
          );
          setBoardsData(sortedData);
          setActiveTopic(sortedData[0]); // Set the first topic as the default active topic
        }
      } catch (error) {
        console.error("Error fetching boards data:", error);
      }
    };

    fetchData();
  }, [BASEURL, accessToken, data?.chapter_id]);

  const handleTopicClick = (topic) => {
    setActiveTopic(topic);
    dispatch(
      GetTopic({
        topic_id: topic.topic_id,
        topic_name: topic.topic_name,
        page_name: "GetTopic",
      })
    );
  };

  const toggleChat = () => setShowChat(!showChat);

  const handleSend = async () => {
    if (!prompt.trim()) {
      setError("Please provide a valid question.");
      return;
    }

    try {
      setError("");
      setResponse("Loading...");
      const res = await axios.post(
        `${BASEURL}/data/getAiResponse`,
        {
          messages: `You are a Chat AI subject teacher. The student is learning in class ${
            data?.class_name || "unknown"
          } and topic "${
            activeTopic?.topic_name || "unknown"
          }". Please answer related to this context: ${prompt}, if user ask any other question tell in respose that 'I am a chatbot dedicated to helping with the current topic of study. Please ask questions related to the topic.' don't ans the topic if its irralavent at all`,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const responseData = res.data;
      setResponse(responseData || "No response received.");
    } catch (err) {
      console.error("Error communicating with OpenAI:", err);
      setResponse("");
      setError(err.response?.data?.error?.message || err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-white to-indigo-50">
      {/* <Navbar /> */}
      <NavbarSignIn />
      <div className="flex min-h-screen">
        {/* Sidebar */}
        {showBar ? (
          <div className="w-[20%] bg-white shadow-lg overflow-y-auto">
            <div className="flex justify-between items-center pr-5">
              <h2 className="text-xl font-semibold  p-4 border-b">Topics</h2>
              <FaArrowCircleLeft
                className="text-3xl text-gray-400 cursor-pointer"
                onClick={() => {
                  setshowBar(false);
                }}
              />
            </div>
            <ul className="divide-y">
              {BoardDat.map((topic) => (
                <li
                  key={topic.topic_id}
                  className={`p-4 flex justify-between items-center cursor-pointer ${
                    activeTopic?.topic_id === topic.topic_id
                      ? "bg-indigo-100 text-indigo-600"
                      : "hover:bg-gray-100"
                  }`}
                  onClick={() => handleTopicClick(topic)}
                >
                  <span>
                    {topic.serial_no}. {topic.topic_name}
                  </span>
                  <button className="text-blue-500">
                    <i className="fas fa-play"></i>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div
            className="max-w-[5%] min-w-[50px]  cursor-pointer bg-white shadow-lg overflow-y-auto flex justify-center items-center h-16 rounded-lg hover:shadow-xl transition-all duration-300"
            onClick={() => {
              setshowBar(true);
            }}
          >
            <VscThreeBars
              className="text-4xl sm:text-5xl text-gray-800 cursor-pointer hover:text-blue-500 transition-transform duration-300"
              onClick={() => {
                setshowBar(true);
              }}
            />
          </div>
        )}
        {/* Main Content */}
        <div className="flex-1 p-6 relative ">
          {activeTopic ? (
            <>
              {/* Video Player */}
              <div className="mb-4">
                <video
                  src={activeTopic.video_url}
                  controls
                  className="w-full h-96 bg-black rounded-lg shadow-lg"
                />
              </div>

              {/* Topic Details */}
              <div className="p-4 bg-white rounded-lg shadow ">
                <h3 className="text-2xl font-semibold mb-2">
                  {activeTopic.topic_name}
                </h3>
                <p className="text-gray-700 mb-4">
                  {activeTopic.topic_description}
                </p>
                <aside className="flex justify-between">
                  <div className="text-gray-600 space-y-2">
                    <p>
                      <strong>Author:</strong> {activeTopic.author || "Unknown"}
                    </p>
                    <p>
                      <strong>Notes:</strong>{" "}
                      {activeTopic.notes_url ? (
                        <a
                          href={activeTopic.notes_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 underline"
                        >
                          View Notes
                        </a>
                      ) : (
                        "Not Available"
                      )}
                    </p>
                  </div>
                  <div className="text-gray-600 space-y-2 mr-12 mb-5">
                    <p>
                      <strong>Class:</strong> {activeTopic.class_name}
                    </p>
                    <p>
                      <strong>Language:</strong> {activeTopic.language}
                    </p>
                  </div>
                </aside>
              </div>

              <Review topic_id={activeTopic?.topic_id} />
              <QnAComp topic_id={activeTopic?.topic_id} />
            </>
          ) : (
            <p className="text-center text-gray-500">
              Please select a topic from the sidebar.
            </p>
          )}

          {/* Chat Popup */}
          <div
            className={`fixed bottom-6 outline border-1  border-slate-800 right-6 ${
              showChat ? "w-80 h-96" : "w-14 h-14"
            } bg-white shadow-lg  flex flex-col ${
              showChat ? "p-4" : "justify-center items-center"
            }`}
          >
            <button
              className="text-indigo-600 text-3xl rounded-[50%] "
              onClick={toggleChat}
              title={showChat ? "Close Chat" : "Ask AI"}
            >
              {showChat ? (
                <FaRegWindowClose className="text-2xl" />
              ) : (
                <FaRobot className="text-3xl " />
              )}
            </button>
            {showChat && (
              <div className="mt-2">
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Ask a question..."
                  className="w-full h-24 p-2 border rounded mb-2"
                ></textarea>
                <button
                  onClick={handleSend}
                  className="w-full bg-indigo-600 text-white py-2 rounded"
                >
                  Send
                </button>
                <div className="mt-2 overflow-auto h-[150px]">
                  <p className="text-gray-700">
                    <strong>Response:</strong> {response}
                  </p>
                  {error && <p className="text-red-500">{error}</p>}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default GetTopic;
