import React from "react";

import "./button.scss";

import "font-awesome/css/font-awesome.min.css";

const CustomButton = ({ text, styles, clickHandler }) => {
  
  return (
    <div>
      <button onClick={clickHandler} id="custom-button" style={styles}>
        {text} <i className="fa fa-arrow-circle-right" />
      </button>
    </div>
  );
};

export default CustomButton;
