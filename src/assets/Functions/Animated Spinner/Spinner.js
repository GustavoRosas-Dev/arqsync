import React from "react";
import "react-toastify/dist/ReactToastify.css";
import "./Spinner.css";

const Spinner = ({ loadingAuth, buttonText, buttonId }) => {
  return (
    <button type="submit" disabled={loadingAuth} id={buttonId}>
      {loadingAuth ? (
        <div className="spinner-container">
          <div className="spinner"></div>
        </div>
      ) : (
        buttonText
      )}
    </button>
  );
};

export { Spinner };
