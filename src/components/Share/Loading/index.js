import React from "react";
import Loader from "react-loader-spinner";
import "./index.css";
const Loading = () => {
  return (
    <div className="loading">
      <Loader type="Bars" color="red" height={200} width={200} />
    </div>
  );
};

export default Loading;
