import React from "react";
import "./ShinyEffect.css";

const ShinyEffect = ({ children }) => {
  return (
    <div className="shiny-effect">
      {children}
      <i></i>
    </div>
  );
};

export default ShinyEffect;
