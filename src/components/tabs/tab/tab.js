import React from "react";

const Tab = (props) => {
  return <div>{props.isSelected && props.children}</div>;
};

export default Tab;
