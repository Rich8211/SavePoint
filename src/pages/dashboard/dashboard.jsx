import React, { useContext, useEffect, useState } from "react";

import "./dashboard.scss";
import UserContext from "../../context/UserContext";
import ModalContext from "../../context/ModalContext";
import Axios from "axios";
import Card from "../../components/card/card";
import CardNoRoom from "../../components/card/card_no_room";
import city from "../../assets/city.png";
import orange from "../../assets/OrangBg.png";
import CustomButton from "../../components/button/button";
import UserDataContext from "../../context/userDataContext";

const DashBoard = () => {
  // const { setToggleModal } = useContext(ModalContext);
  const { userData, setUserData } = useContext(UserContext);
  const { toggleModal, dispatch, reducer } = useContext(UserDataContext);

  const [userEventsWRoom, setUserEventsWRoom] = useState([]);
  const [userEventsNoRoom, setUserEventsNoRoom] = useState([]);

  const requestHandler = () => {
    //
    dispatch({ type: "SET_MODAL", payload: "Request" });
  };

  const toggleEditDelete = (e) => {
    console.log(e.target);
    // setToggleModal("EditDelete");
  };

  useEffect(() => {
    if (userData.user) {
      const fetchData = async () => {
        const requestsHasRoom = await Axios.post(
          "http://localhost:4000/users/get-requests-has-room",
          { user_id: userData.user.user_id }
        );
        setUserEventsWRoom(requestsHasRoom.data);
        const requestsNoRoom = await Axios.post(
          "http://localhost:4000/users/get-requests-no-room",
          { user_id: userData.user.user_id }
        );
        setUserEventsNoRoom(requestsNoRoom.data);
      };

      fetchData();
    }
  }, [userData]);

  // console.log(userEventsNoRoom);

  return (
    <div className="dashboard">
      <div className="dashboard-img">
        <img className="city-pic" src={city} alt="city" />
        <img className="orange" src={orange} alt="orange overflow" />
      </div>
      <div className="card-pics">
        {userEventsWRoom ? (
          userEventsWRoom.map((event) => (
            <Card
              onClick={toggleEditDelete}
              event={event}
              key={event.request_id}
            />
          ))
        ) : (
          <h1>You don't have any Savepoints planned!</h1>
        )}
        {userEventsNoRoom ? (
          userEventsNoRoom.map((event) => (
            <CardNoRoom className="card" event={event} key={event.request_id} />
          ))
        ) : (
          <h1>You don't have any Savepoints planned!</h1>
        )}
      </div>
      <CustomButton
        styles={{
          position: "absolute",
          top: "70%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          borderColor: "rgba(102, 212, 127, 0.5)",
          backgroundColor: "rgba(102, 212, 127, 0.8)",
        }}
        text="REQUEST ROOM"
        clickHandler={requestHandler}
      />
      {/* {userData.user.events ?  userData.user.events.map((dataPoint) => (
        <Card
          className="card"
           key={Math.floor(Math.random() * 10000)}
          {...dataPoint}
        />
      )): <h1>You don't have any Savepoints planned!</h1>} */}
    </div>
  );
};

export default DashBoard;
