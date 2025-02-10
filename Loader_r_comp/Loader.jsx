import React from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import "./Loader.css";  

function Loader() {
  return (
    <div className="loader-container">
      <div className="loader-box" role="status" aria-live="polite">
        <AiOutlineLoading3Quarters className="loader-icon" />
        <span className="loader-text">Loading...</span>
      </div>
    </div>
  );
}

export default Loader;
