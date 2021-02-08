import React, { useState } from "react";
const Tabs = (props) => {
  return (
    <div>
      <div style={{ width: "30%" }}>
        <ul className="nav nav-tabs">
          {props.tabs.map((tab) => {
            const active = tab === props.selected ? "active " : "";
            return (
              <li className="nav-item" key={tab}>
                <a
                  className={"nav-link " + active}
                  onClick={() => props.setSelected(tab)}
                >
                  {tab}
                </a>
              </li>
            );
          })}
        </ul>
        {props.children}
      </div>
    </div>
  );
};

export default Tabs;
