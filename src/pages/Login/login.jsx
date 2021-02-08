import React, { useState } from "react";
import Modal from "../../components/modal/modal";

const Login = () => {
  const [greeting, setGreeting] = useState("");
  const handleChange = (e) => {
    setGreeting(e.target.value);
  };

  return (
    <div className>
      <input name="greeting" onChange={handleChange} type="text" />
    </div>
  );
};

export default Login;
