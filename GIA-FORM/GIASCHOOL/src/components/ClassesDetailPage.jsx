import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";
import { Footer } from "./Footer";
import { Laoder } from "./Laoder";


const ClassesDetailPage = () => {
  const { classId } = useParams();
  const [classData, setClassData] = useState(null);
  const [subjects, setSubjects] = useState([]);
  const [topics, setTopics] = useState([]);
  const [openSubjectId, setOpenSubjectId] = useState(null);
  const BASEURL = import.meta.env.VITE_API_URL_USERS;
  const accessToken = window.sessionStorage.getItem("accessToken");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [classResponse, subjectsResponse, topicsResponse] = await Promise.all([
          axios.get(`${BASEURL}/data/getClasses_Byid/${classId}`, {
            headers: { Authorization: `Bearer ${accessToken}` },
          }),
          axios.get(`${BASEURL}/data/getSubjects`, {
            headers: { Authorization: `Bearer ${accessToken}` },
          }),
          axios.get(`${BASEURL}/data/getTopics`, {
            headers: { Authorization: `Bearer ${accessToken}` },
          }),
        ]);

        setClassData(classResponse.data);
        const classSubjects = subjectsResponse.data.filter(subject => subject.class_id === parseInt(classId));
        setSubjects(classSubjects);
        const classTopics = topicsResponse.data.filter(topic => classSubjects.some(subject => subject.subject_id === topic.subject_id));
        setTopics(classTopics);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [classId, BASEURL, accessToken]);

  const toggleSubject = (subjectId) => {
    setOpenSubjectId(openSubjectId === subjectId ? null : subjectId);
  };

  const hasFreeVideos = (subjectId) => {
    return topics.some(topic => topic.subject_id === subjectId && topic.free_to_watch);
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto my-8 p-4">
        {classData ? (
          <>
            <div className="mb-6">
              <img
                src={classData.image_url || "/default-class-image.png"}
                alt={classData.class_name}
                className="w-full object-cover"
                style={{ height: '400px' }}
              />
            </div>
            <div className="px-4">
              <h1 className="text-3xl font-bold mb-2">{classData.class_name}</h1>
              <p>{classData.description || "No description available."}</p>
            </div>
            {subjects.map(subject => (
              <div key={subject.subject_id} className={`mb-4 ${hasFreeVideos(subject.subject_id) ? "border-l-8 border-green-500" : ""}`}>
                <button
                  onClick={() => toggleSubject(subject.subject_id)}
                  className="flex justify-between items-center w-full text-left text-xl font-bold p-3 bg-gray-200 rounded-md hover:bg-gray-300 relative"
                >
                  {subject.subject_name}
                  {hasFreeVideos(subject.subject_id) && (
                    <div className="absolute right-0 top-0 bg-green-500 text-white py-1 px-3 rounded-bl-lg">FREE</div>
                  )}
                  <span>{openSubjectId === subject.subject_id ? '▲' : '▼'}</span>
                </button>
                {openSubjectId === subject.subject_id && (
                  <div className="mt-2 p-4 bg-white rounded-md shadow">
                    {topics.filter(topic => topic.subject_id === subject.subject_id).map(topic => (
                      <div key={topic.topic_id} className="mb-4 p-2 border-b last:border-b-0">
                        <h3 className="font-semibold">{topic.topic_name}</h3>
                        <p>{topic.topic_description || "No additional details available."}</p>
                        {topic.free_to_watch ? (
                          <>
                            <video controls src={topic.video_url} className="w-full mt-2" />
                            <p className="text-sm mt-2">Watch this video for free.</p>
                          </>
                        ) : (
                          <p className="text-sm mt-2">This video is part of a paid course.</p>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </>
        ) : (
          <p><Laoder /></p>
        )}
      </div>
      <Footer />
    </>
  );
};

export default ClassesDetailPage;
