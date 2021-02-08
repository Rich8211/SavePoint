import React from "react";

import "./textBubble.scss";

const TextBubble = ({ text }) => {
  return (
    <div className="bubble">
      <p>{text}</p>
    </div>
  );
};

export default TextBubble;
