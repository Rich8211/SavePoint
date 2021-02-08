import React, { useContext, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import Logo from "../../assets/savepoint.png";
import UserContext from "../../context/UserContext";
import UserDataContext from "../../context/userDataContext";
import ModalContext from "../../context/ModalContext";

import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import "font-awesome/css/font-awesome.min.css";

import "./navbar.scss";

const Navbar = ({ history }) => {
  const { toggleModal, dispatch, reducer } = useContext(UserDataContext);
  const { userData, setUserData } = useContext(UserContext);
  const signOut = () => {
    history.push("/");
    setUserData({
      token: undefined,
      user: undefined,
    });
    localStorage.setItem("token", "");
  };

  // const handleLogin = () => {
  //   setToggleModal("Login");
  // };

  return (
    <div className="navbar-container">
      <ul className="navbar-left">
        <li>
          <Link to="/">
            <img className="logo" src={Logo} alt="logo" />
          </Link>
        </li>
      </ul>
      <ul className="navbar-right">
        <li>
          <Link to="/about-us">Featured Events</Link>
        </li>
        <li>
          <Link to="/about-us">How It Works</Link>
        </li>
        <li>
          {userData.user ? (
            <button className="sign-out" onClick={signOut}>
              Sign Out
            </button>
          ) : (
            <button
              className="sign-out"
              onClick={() => dispatch({ type: "SET_MODAL", payload: "Login" })}
            >
              Sign In
            </button>
          )}
        </li>
        <li>{userData.user ? <img src={userData.user.img_url} /> : null}</li>
      </ul>
    </div>
  );
};

export default withRouter(Navbar);

{
  /* <li>
          <FacebookLogin
            appId="2750582941843185"
            autoLoad={true}
            fields="name,email,picture"
            scope="public_profile,user_friends"
            // icon="fa-facebook"
            // cssClass="my-facebook-button-class"
            render={(renderProps) => (
              <button
                className="my-facebook-button-class"
                onClick={renderProps.onClick}
              >
                <i className="fa fa-facebook"></i> &nbsp;
                LOGIN WITH FACEBOOK
              </button>
            )}
          />
        </li> */
}
