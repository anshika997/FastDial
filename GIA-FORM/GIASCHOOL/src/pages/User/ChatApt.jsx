import React, { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
const ChatApt = () => {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [error, setError] = useState("");
  const BASEURL = import.meta.env.VITE_API_URL_USERS;
  const accessToken = window.sessionStorage.getItem("accessToken");
  const data = useSelector((state) => state.auth.data);
  console.log(data);
  const handleSend = async () => {
    if (!prompt.trim()) {
      setError("Please provide a valid prompt.");
      return;
    }

    try {
      setError("");
      setResponse("Loading...");

      const res = await axios.post(
        `${BASEURL}/data/getAiResponse`,
        { messages: prompt },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const data = res.data;

      if (data) {
        setResponse(data);
      } else {
        throw new Error("Failed to fetch a valid response.");
      }
    } catch (err) {
      console.error("Error communicating with OpenAI:", err);
      setResponse("");
      setError(err.response?.data?.error?.message || err.message);
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Chat with AI</h1>
      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Write your prompt here..."
        style={{
          width: "100%",
          height: "100px",
          padding: "10px",
          marginBottom: "10px",
          fontSize: "16px",
        }}
      ></textarea>
      <button
        onClick={handleSend}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          cursor: "pointer",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "5px",
        }}
      >
        Send
      </button>
      <div style={{ marginTop: "20px" }}>
        <h2>Response:</h2>
        {response && <p>{response}</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
    </div>
  );
};

export default ChatApt;
