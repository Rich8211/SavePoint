import React, { useEffect, useState, useContext } from "react";
import { withRouter } from "react-router-dom";
import ModalContext from "../../../context/ModalContext";
import roomContext from "../../../context/roomContext";

import Modal from "../modal";

import Axios from "axios";

const EditDelete = () => {
  const handleDelete = () => {};

  return (
    <React.Fragment>
      <Modal>
        <button>Edit Request</button>
        <button onClick={handleDelete}>Delete Request</button>
      </Modal>
    </React.Fragment>
  );
};

export default EditDelete;
