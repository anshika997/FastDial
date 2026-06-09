import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";
import CircularProgress from "@mui/material/CircularProgress";

const QnAComp = ({ topic_id }) => {
  const [qna, setQna] = useState([]);
  const [newQna, setNewQna] = useState({ question: "", answer: "" });
  const [qnaLoading, setQnaLoading] = useState(false);
  const BASEURL = import.meta.env.VITE_API_URL_USERS;
  const accessToken = window.sessionStorage.getItem("accessToken");
  const { isAuthenticated, userPhone } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getQna = async () => {
    if (!topic_id) {
      return;
    }
    try {
      const response = await axios.get(
        `${BASEURL}/data/getqna?topic_id=${topic_id}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setQna(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setNewQna((prev) => ({
      ...prev,
      question: e.target.value,
    }));
  };

  const handlePostQna = async () => {
    const userConfirmed = window.confirm(
      "Are you sure you want to post the question?"
    );
    if(!userConfirmed)
    {
      return;
    }
    const id = topic_id;
    if (newQna.question.length <= 0) {
      alert("Question cannot be empty !!");
      return;
    }
    setQnaLoading(true);
    const currentDate = new Date().toISOString().slice(0, -1);

    const topicExists = qna.some((qnaItem) => qnaItem.topic_id === id);

    if (topicExists) {
      const prevData = qna.find((qnaItem) => qnaItem.topic_id === id);
      const questionsArray = prevData.questionanswers;
      const newData = {
        question: newQna.question,
        answers: [],
      };
      questionsArray.push(newData);
      prevData.posted_date = currentDate;

      try {
        const response = await axios.post(
          `${BASEURL}/data/updateqna`,
          prevData,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        alert("Question posted successfully.");
      } catch (error) {
        console.log(error);
        alert("Question cannot be posted now, sorry.");
      } finally {
        setNewQna({ question: "", answer: "" });
        setQnaLoading(false);
      }
    } else {
      const PostData = {
        user_id: user.empid,
        topic_id: id,
        posted_date: currentDate,
        questionanswers: [
          {
            question: newQna.question,
            answer: [],
          },
        ],
      };

      try {
        const response = await axios.post(
          `${BASEURL}/data/insertqna`,
          PostData,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        alert("Question posted successfully.");
      } catch (error) {
        console.log(error);
        alert("Question cannot be posted now, sorry.");
      } finally {
        setNewQna({ question: "", answer: "" });
        setQnaLoading(false);
      }
    }
    return;
  };

  useEffect(() => {
    getQna();
  }, [topic_id]);

  if (qna.length === 0) {
    return (
      <p className="text-center text-lg md:text-xl text-gray-500">
        No data available
      </p>
    );
  }

  return (
    <div className="space-y-6 bg-white shadow-lg rounded-lg px-4 py-5 sm:px-6 md:py-6 my-5">
      <div>
        <span className="font-bold text-gray-800 text-lg sm:text-xl md:text-2xl">
          Questions asked related to topic:
        </span>
        {qna.map((item, index) => (
          <div key={index} className="mb-6">
            {item.questionanswers.length === 0 ? (
              <p className="text-center text-sm md:text-lg text-gray-500">
                No questions available
              </p>
            ) : (
              item.questionanswers.map((qa, qaIndex) => (
                <div
                  key={qaIndex}
                  className="mt-4 bg-gray-50 p-3 sm:p-4 rounded-lg"
                >
                  <span className="font-bold text-gray-800 text-sm sm:text-lg md:text-xl">
                    {qa.question}
                  </span>
                  {qa.answer && qa.answer.length > 0 ? (
                    qa.answer.map((answer, ansIndex) => (
                      <div key={ansIndex}>
                        <span className="text-gray-600 text-xs sm:text-md md:text-lg">
                          {answer}
                        </span>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 text-xs sm:text-sm">
                      No answers yet.
                    </p>
                  )}
                </div>
              ))
            )}
          </div>
        ))}
      </div>
      {qnaLoading ? (
        <div className="flex justify-center items-center my-2">
          <CircularProgress />
        </div>
      ) : (
        <div>
          <span className="font-bold text-gray-800 text-lg sm:text-xl md:text-2xl">
            Ask your Question:
          </span>
          <textarea
            rows={4}
            value={newQna.question}
            className="w-full px-3 py-2 mt-3 sm:mt-5 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none transition-transform duration-300"
            placeholder="Write your question here..."
            onChange={handleChange}
          ></textarea>
          <div className="flex justify-start mt-3">
            <button
              className="bg-blue-500 text-white text-sm sm:text-lg px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 hover:scale-105 transition-transform duration-300"
              onClick={handlePostQna}
            >
              Post Question
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default QnAComp;
