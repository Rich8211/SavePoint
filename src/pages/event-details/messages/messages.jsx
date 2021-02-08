import React from "react";
import io from "socket.io-client";

const endpoint = "localhost:5000";
let socket;

const Messages = () => {
  return (
    <div>
      <h1>Jet</h1>
    </div>
  );
};

export default Messages;
