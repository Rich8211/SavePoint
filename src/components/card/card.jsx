import React, { useContext } from "react";
import "./card.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { withRouter } from "react-router-dom";
import UserDataContext from "../../context/userDataContext";
import { faUserFriends, faComment } from "@fortawesome/free-solid-svg-icons";
import formatDate from "../../functions/formatDate";

import CardPic from "../cardPic/cardPic";

import TextBubble from "../textbubble/textBubble";

const Card = ({ event, history }) => {
  const {
    eventname,
    eventcity,
    eventstate,
    check_in_date,
    check_out_date,
    price_total,
    accommodation_name,
    address_line_1,
    address_line_2,
    zipcode,
    city,
    state,
    description,
    other_details,
    request_id,
  } = event;

  const checkInFormatted = formatDate(check_in_date);
  const checkOutFormatted = formatDate(check_out_date);

   const { dispatch } = useContext(UserDataContext);


  const handleClick = () => {

    const hasRoom = true;
    // sessionStorage.setItem("hasRoom", JSON.stringify(edit));

    dispatch({ type: "SET_EVENT", payload: request_id });
    dispatch({ type: "HAS_ROOM", payload: true });
    history.push("/event-details");
  };

 
  const type = "host";
  const matched = false;
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
          <FontAwesomeIcon icon={faUserFriends} /> 2 Roommates Max
        </p>
      </div>

      <div className="price">${price_total}</div>
      <div className="check-in-and-checkout">
        <div className="check-in">
          <TextBubble text="check in" />
          <div className="check-in-text">
            <p>{checkInFormatted}</p>
          </div>
        </div>
        <div className="check-out">
          <TextBubble text="check out" />
          <div className="check-out-text">
            <p>{checkOutFormatted}</p>
          </div>
        </div>
      </div>
      <div className="hotel-info">
        <p>{accommodation_name}</p>
        <p></p>
      </div>
      <div className="hotel-address">
        <p>
          {address_line_1}, {city}
        </p>
      </div>
      <div className="request-info"></div>

      <footer>Request Created 05.09.19</footer>
    </div>
  );
};

export default withRouter(Card);

{
  /* <div className="message-bubble">
        23 <FontAwesomeIcon icon={faComment} />
      </div> */
}
{
  /* <div className="matching-pic">
        <CardPic type="host" matched={matched} />
      </div> */
}
