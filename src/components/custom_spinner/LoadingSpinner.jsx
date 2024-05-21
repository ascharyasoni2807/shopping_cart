import React from "react";

const LoadingSpinner = () => {
  return (
    <div className={`d-flex justify-content-center loading-spinner `}>
      <div className="spinner-border" role="status"></div>
    </div>
  );
};

export default LoadingSpinner;
