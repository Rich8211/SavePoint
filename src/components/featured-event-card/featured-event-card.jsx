import React from "react";
import "./featured-event-card.scss";
import bostonCon from "../../assets/hatch-pile.png";

const FeaturedCard = ({ title, date, location }) => {
  return (
    <div className="featured-card">
      {/* <div className="con-pic" /> */}
      <img src={bostonCon} />
      <div className="con-title">
        <h4>{title}</h4>
      </div>
      <div className="con-info">
        <h5>
          {/* {date} | {location} */}
        </h5>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nisi,
          ratione praesentium blanditiis similique placeat temporibus?
        </p>
      </div>
    </div>
  );
};

export default FeaturedCard;
