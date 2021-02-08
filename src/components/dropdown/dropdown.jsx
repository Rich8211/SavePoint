import React, { useState } from "react";
import "./dropdown.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleUp, faAngleDown } from "@fortawesome/free-solid-svg-icons";

const Dropdown = ({ id, listitems, toggleItem, value }) => {
  const [listOpen, setListOpen] = useState(false);
  const [selected, setSelected] = useState(false);

  const handleClickOutside = (props) => {
    setListOpen(false);
  };

  const toggleList = () => {
    setListOpen((prevState) => !prevState);
  };

  return (
    <div className="dd-wrapper">
      <div id={id} className="dd-header" onClick={() => toggleList()}>
        <div className="dd-header-title">{value}</div>
      </div>
      {listOpen && (
        <ul className="dd-list">
          {listitems.map((item) => (
            <li
              className="dd-list-item"
              key={item.key}
              onClick={() => {
                toggleItem(item);
                toggleList();
              }}
            >
              {item.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
