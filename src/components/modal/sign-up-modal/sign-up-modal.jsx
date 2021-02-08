import React, { useEffect, useState, useContext } from "react";
import { withRouter } from "react-router-dom";
import Axios from "axios";
import "./sign-up-modal.scss";
import FormInput from "../form-input/form-input";
import Modal from "../modal";
import UserContext from "../../../context/UserContext";
import UserDataContext from "../../../context/userDataContext";
import ModalContext from "../../../context/ModalContext";

const SignUpModal = ({ history }) => {
  const [form, setState] = useState({
    file: null,
    profilePic: "",
    username: "",
    password: "",
    passwordCheck: "",
    email: "",
    bio: "",
  });

  const {
    file,
    profilePic,
    username,
    password,
    passwordCheck,
    email,
    bio,
  } = form;

  // const { toggleModal, setToggleModal } = useContext(ModalContext);
  const { toggleModal, dispatch, reducer } = useContext(UserDataContext);

  const { setUserData } = useContext(UserContext);

  const updateField = (e) => {
    setState({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const updateProfilePic = (e) => {
    setState({
      ...form,
      profilePic: e.target.files[0],
      file: URL.createObjectURL(e.target.files[0]),
    });
  };

  const handleClick = (e) => {
    if (!Node.contains(e.target)) handleClose();
  };

  const handleClose = () => {
     dispatch({ type: "SET_MODAL", payload: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let formData = new FormData();
    formData.append("profilePic", profilePic);
    formData.append("username", username);
    formData.append("password", password);
    formData.append("passwordCheck", passwordCheck);
    formData.append("email", email);
    formData.append("bio", bio);
    formData.append("events");

    await Axios.post("http://localhost:4000/users/register", formData);
    const loginRes = await Axios.post("http://localhost:4000/users/login", {
      username,
      password,
    });
    setUserData({
      token: loginRes.data.token,
      user: loginRes.data.user,
    });
    localStorage.setItem("auth-token", loginRes.data.token);
    dispatch({type:"SET_MODAL", payload:""})
    history.push("/dashboard");
  };

  useEffect(() => {
    setState({
      ...form,
      file: null,
    });
  }, [toggleModal]);

  const Inputs = [
    {
      for: "profile-pic",
      upperLabel: "Profile Picture*",
      bottomLabel: "",
      name: "profilePic",
      handleChange: updateProfilePic,
      type: "file",
      inputType: "input",
    },
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
    {
      for: "passwordCheck",
      upperLabel: "Confirm Password*",
      bottomLabel: "Please enter password confirmation",
      name: "passwordCheck",
      handleChange: updateField,
      type: "password",
      inputType: "input",
    },
    {
      for: "email",
      upperLabel: "Email*",
      bottomLabel:
        "Savepoint needs this to help create a safe and responsive community. You can chang how often you hear from us in your settings once you login.",
      name: "email",
      handleChange: updateField,
      type: "email",
      inputType: "input",
    },
    {
      for: "bio",
      upperLabel: "Bio*",
      bottomLabel: `By clicking "Confirm", you confirm that you accept our Terms of
          Service and Privacy Policy`,
      name: "bio",
      handleChange: updateField,
      type: "email",
      inputType: "textArea",
    },
  ];

  return (
    <React.Fragment>
      <Modal buttonText="Confirm" clickHandler={handleSubmit}>
        {Inputs.map((input) => (
          <FormInput {...input} />
        ))}
      </Modal>
    </React.Fragment>
    
  );
};

export default withRouter(SignUpModal);
