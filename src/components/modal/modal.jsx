import React, { useContext } from "react";
import ModalContext from "../../context/ModalContext";
import UserDataContext from "../../context/userDataContext";
import CustomButton from "../button/button";

import "./modal.scss";

const Modal = (props) => {
  // const { setToggleModal } = useContext(ModalContext);
  const { toggleModal, dispatch, reducer } = useContext(UserDataContext);
  const handleClick = (e) => {
    if (!Node.contains(e.target)) handleClose();
  };

  const handleClose = () => {
    dispatch({ type: "SET_MODAL", payload: "" })
  };
  return (
    <div className="modal1">
      <button
        onClick={handleClose}
        className="close"
      >
        &times;
      </button>
      <div className="form">{props.children}</div>
      {props.buttonText ? (
        <button onClick={props.clickHandler} className="modal-button">
          {props.buttonText} <i className="fa fa-arrow-circle-right" />
        </button>
      ) : null}
    </div>
  );
};

export default Modal;
