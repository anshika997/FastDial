import React from "react";
import loading from "../Images/loadingGif.gif";
import CircularProgress from "@mui/material/CircularProgress";
const Loading = () => {
  return (
    <div className="w-full min-h-[calc(100vh-220px)] flex justify-center items-center">
      {/* <img src={loading} alt=""  
     /> */}
      <CircularProgress />
    </div>
  );
};

export default Loading;
