import React from "react";
import { useSelector } from "react-redux";
import ChatApt from "./ChatApt";

function UserVideoPlayer() {
  const data = useSelector((state) => state.auth.data);

  console.log("Video URL:", data?.video_url);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      {data?.video_url ? (
        <video controls className="w-full max-w-4xl">
          <source src={data?.video_url} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ) : (
        <p className="text-gray-500">No video available to play.</p>
      )}
      <p>
        <ChatApt />
      </p>
    </div>
  );
}

export default UserVideoPlayer;
