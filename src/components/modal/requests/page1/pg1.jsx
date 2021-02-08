import React, { useEffect, useState, useContext } from "react";
import { withRouter } from "react-router-dom";
import ModalContext from "../../../../context/ModalContext";
import UserDataContext from "../../../../context/userDataContext";
import roomContext from "../../../../context/roomContext";
import FormInput from "../../form-input/form-input";
import Modal from "../../modal";

import Axios from "axios";

import "./pg1.scss";

const PgOneRequest = () => {
  // const { hasRoom, setHasRoom } = useContext(roomContext);
  
  // const {setToggleModal} = useContext(ModalContext);

  const {toggleModal, dispatch, reducer} = useContext(UserDataContext);
  const Next = () => {};

  const handleYes = () => {
    // setHasRoom(true);
    // setToggleModal("RequestWRoom");
    dispatch({type:"SET_ROOM", payload:true});
    dispatch({type:"SET_MODAL", payload:"RequestWRoom"});
  };

  const handleNo = () => {
    // setHasRoom(false);
    // setToggleModal("RequestNoRoom");
    dispatch({type:"SET_ROOM", payload:false});
    dispatch({type:"SET_MODAL", payload:"RequestNoRoom"});
  };


  return (
    <React.Fragment>
      <Modal>
        <h4>Do you have a room?</h4>
        <button onClick={handleYes}>Yes</button>
        <button onClick={handleNo}>No</button>
      </Modal>
    </React.Fragment>
  );
};

export default withRouter(PgOneRequest);
