import React, { useState, useContext } from "react";
import CustomButton from "../../../components/button/button";
import UserDataContext from "../../../context/userDataContext";
import { withRouter } from "react-router-dom";
import { useEffect } from "react";
import Axios from "axios";

const PartyStats = ({ history }) => {
  const [eventInfo, setEventInfo] = useState({});
  const { eventID, eventHasRoom, editRequest, dispatch } = useContext(
    UserDataContext
  );

  const handleEdit = () => {
    dispatch({ type: "EDIT_REQUEST", payload: true });
    const edit = true;
    sessionStorage.setItem("editRequest", JSON.stringify(edit));

    eventHasRoom
      ? dispatch({ type: "SET_MODAL", payload: "RequestWRoom" })
      : dispatch({ type: "SET_MODAL", payload: "RequestNoRoom" });
  };

  const handleDelete = () => {
    eventHasRoom
      ? Axios.post("http://localhost:4000/users/delete-has-room", {
          request_id: eventID,
        })
      : Axios.post("http://localhost:4000/users/delete-no-room", {
          request_id: eventID,
        });
    history.push("/dashboard");
  };

  useEffect(() => {
    const getEvent = async () => {
      const foundRoom = eventHasRoom
        ? await Axios.post(
            "http://localhost:4000/users/get-requests-has-room-by-id",
            {
              request_id: eventID,
            }
          )
        : await Axios.post(
            "http://localhost:4000/users/get-requests-no-room-by-id",
            {
              request_id: eventID,
            }
          );
      setEventInfo(foundRoom.data);
    };
    getEvent();
  }, []);

  return (
    <div className="event-details">
      <div className="check-in-and-checkout">
        <div className="check-in"></div>
        <div className="check-out"> </div>
      </div>
      <div>
        <CustomButton
          styles={{
            position: "relative",
            top: "70%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            borderColor: "rgba(102, 212, 127, 0.5)",
            backgroundColor: "rgba(102, 212, 127, 0.8)",
          }}
          text="Edit Request"
          clickHandler={handleEdit}
        />
      </div>
      <div>
        <CustomButton
          styles={{
            position: "relative",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            borderColor: "rgba(102, 212, 127, 0.5)",
            backgroundColor: "rgba(102, 212, 127, 0.8)",
          }}
          text="Delete Request"
          clickHandler={handleDelete}
        />
      </div>
    </div>
  );
};

export default withRouter(PartyStats);
