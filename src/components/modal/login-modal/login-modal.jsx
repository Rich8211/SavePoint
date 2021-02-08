import React, { useEffect, useState, useContext } from "react";
import { withRouter } from "react-router-dom";
import UserContext from "../../../context/UserContext";
import ModalContext from "../../../context/ModalContext";
import UserDataContext from "../../../context/userDataContext";
import FormInput from "../form-input/form-input";
import Modal from "../modal";

import Axios from "axios";

import "./login-modal.scss";

const LoginModal = ({ history }) => {
  const [form, setState] = useState({
    username: "",
    password: "",
  });

  // const { setToggleModal } = useContext(ModalContext);
  const { setUserData } = useContext(UserContext);
  const { toggleModal, dispatch, reducer } = useContext(UserDataContext);

  const updateField = (e) => {
    setState({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { username, password } = form;
    const loginRes = await Axios.post("http://localhost:4000/users/login", {
      username,
      password,
    });

    setUserData({
      token: loginRes.data.token,
      user: loginRes.data.user,
    });
    localStorage.setItem("token", loginRes.data.token);
    dispatch({ type: "SET_MODAL", payload: "" });
    history.push("/dashboard");
  };

  const Inputs = [
    {
      for: "username",
      upperLabel: "Username*",
      bottomLabel: "Please enter username",
      name: "username",
      handleChange: updateField,
      type: "text",
      inputType: "input",
    },
    {
      for: "password",
      upperLabel: "Password*",
      bottomLabel: "Please enter password",
      name: "password",
      handleChange: updateField,
      type: "password",
      inputType: "input",
    },
  ];

  return (
    <React.Fragment>
      <Modal buttonText="Login" clickHandler={handleSubmit}>
        {Inputs.map((input) => (
          <FormInput {...input} />
        ))}
      </Modal>
    </React.Fragment>
  );
};

export default withRouter(LoginModal);
