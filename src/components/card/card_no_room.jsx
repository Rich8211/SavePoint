import React, {useContext} from "react";
import "./card_no_room.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { withRouter } from "react-router-dom";
import { faUserFriends, faComment } from "@fortawesome/free-solid-svg-icons";
import TextBubble from "../textbubble/textBubble";
import UserDataContext from "../../context/userDataContext";


const CardNoRoom = ({ event, history }) => {
  const {
    eventname,
    eventcity,
    eventstate,
    pref_check_in_date,
    pref_check_out_date,
    budget,
    max_roommates,
    address_line_1,
    address_line_2,
    zipcode,
    city,
    state,
    description,
    other_details,
    request_id
  } = event;

   const { dispatch } = useContext(UserDataContext);

   const handleClick = () => {

    const hasRoom = true;
    // sessionStorage.setItem("hasRoom", JSON.stringify(edit));

    dispatch({ type: "SET_EVENT", payload: request_id });
    dispatch({ type: "HAS_ROOM", payload: false });
    history.push("/event-details");
  };

  
  return (
    <div className="card" onClick={handleClick}>
      <div className="heading">
        <h1 className="title">{eventname}</h1>
        <h2 className="city">
          {eventcity}, {eventstate}
        </h2>
      </div>
      <div className="roommate-num">
        <p>
          <FontAwesomeIcon icon={faUserFriends} /> {max_roommates} Roommates Max
        </p>
      </div>

      <div className="price">${budget}</div>
      <div className="check-in-and-checkout">
        <div className="check-in">
          <TextBubble text="check in" />
          <div className="check-in-text">
            <p>{pref_check_in_date}</p>
          </div>
        </div>
        <div className="check-out">
          <TextBubble text="check out" />
          <div className="check-out-text">
            <p>{pref_check_out_date}</p>
          </div>
        </div>
      </div>
      <div className="hotel-info">
        <p>
          Once you have a room this is where you'll find the accomodation
          address and description
        </p>
      </div>
      <div className="matching-in-progress">
        <h4>MATCHING IN PROGRESS</h4>
        <p>(check back soon)</p>
      </div>

      <footer>Request Created 05.09.19</footer>
    </div>
  );
};

export default withRouter(CardNoRoom);
