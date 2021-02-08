import React from "react";
import "./cardPic.scss";

import conPic from "../../assets/conPic.jpg";
import MatchPending from "../../assets/MatchPending.png";

const CardPic = ({ type, matched }) => {
  const profilePic = matched ? conPic : MatchPending;


  const style = {};
  style.backgroundImage =
    type === "host"
      ? `linear-gradient(to top, rgb(74, 90, 170, 0) 25%, rgb(74, 90, 170, 1)), url(${profilePic}) `
      : `linear-gradient( to top, rgb(38, 127, 168, 0) 25%, rgb(38, 127, 168, 1)),url(${profilePic}) `;

  return <div className="card-pic" alt="con pic" style={style} />;
};

export default CardPic;
