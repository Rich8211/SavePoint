import React from "react";
import "./input.scss";

import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

const Input = ({ title, id, placeholder, type }) => {
  return (
    <div className="input">
      <label htmlFor={id}>{title}</label>
       <input  id={id} name={id} type={type} placeholder={placeholder} />
    </div>
  );
};

export default Input;
