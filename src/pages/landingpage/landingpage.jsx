import React, { useState, useEffect, useContext } from "react";

import "./landingpage.scss";
import { featured_data } from "../../assets/featuredData";
import FeaturedCard from "../../components/featured-event-card/featured-event-card";
import city from "../../assets/city.png";
import orange from "../../assets/OrangBg.png";

import CustomButton from "../../components/button/button";
import ModalContext from "../../context/ModalContext";
import UserDataContext from "../../context/userDataContext";

const LandingPage = () => {
  // const { toggleModal, setToggleModal } = useContext(ModalContext);
  const {toggleModal, dispatch, reducer} = useContext(UserDataContext);
  // const handleSignUp = () => {
  //   setToggleModal("SignUp");
  // };

  useEffect(() => {});
  return (
    <div className="landing-page">
      <div className="landing-pg-img">
        <div className="heading-box">
          <h1>It's expensive to go alone. Split the cost!</h1>
          <p>
            For your next convention journey, find a room, your very own
            Savepoint, and share it with three other cool attendees like you!
          </p>
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
          />
        </div>
      </div>
      <div className="featured">
        <h2>Featured Events</h2>
        <img className="city-pic" src={city} alt="city" />
        <img className="orange" src={orange} alt="orange overflow" />
        <div className="events">
          {featured_data.map((con) => (
            <FeaturedCard
              title={con.title}
              date={con.date}
              location={con.location}
            />
          ))}
        </div>
        <div className="suggest-event">
          <h3>Don't see your event? Suggest it & we'll add it!</h3>
          <CustomButton
            text="SUGGEST EVENT"
            styles={{
              position: "absolute",
              top: "70%",
              left: "50%",
              transform: "translate(-50%,-70%)",
              backgroundColor: "rgba(232,145,94,0.8)",
              borderColor: "rgba(232,145,94,0.5)",
            }}
          />
        </div>
      </div>

      <div className="how-it-works">
        <h3>How It Works</h3>
        <div className="numbers">
          <div className="one">
            <h4>SIGN UP</h4>
            <p>Create a Savepoint account with Facebook.</p>
          </div>
          <div className="two">
            <h4>FIND AN EVENT </h4>
            <p>
              View out event list. Choose an old favorite or a new adventure.
            </p>
          </div>
          <div className="three">
            <h4>CREATE/JOIN A PARTY</h4>
            <p>Lead/join a small group of people to split costs & have fun!</p>
          </div>
        </div>
      </div>
      <div className="get-started">
        <p>
          Use Savepoint tools to manage/join a small group of other event
          attendees to enjoy your next convention adventure!{" "}
        </p>
        <CustomButton
          text="GET STARTED"
          styles={{
            position: "absolute",
            top: "70%",
            left: "50%",
            transform: "translate(-50%,-70%)",
            borderColor: "rgba(102, 212, 127, 0.5)",
            backgroundColor: "rgba(102, 212, 127, 0.8)",
          }}
          clickHandler={() => dispatch({type: "SET_MODAL", payload:"SignUp"})}
        />
        {/* <SignUpModal
          
          showModal={displayModal}
        /> */}
      </div>
    </div>
  );
};

export default LandingPage;
