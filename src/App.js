import React, { useState, useEffect, useReducer } from "react";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import Axios from "axios";

import reducer from "./reducer/reducer";

import Navbar from "./components/navbar/navbar";
import Footer from "./components/footer/footer";
import LandingPage from "./pages/landingpage/landingpage";
import Dashboard from "./pages/dashboard/dashboard";
import CreateParty from "./components/forms/CreateParty/createParty";
import AboutUs from "./pages/about-us/about-us";
import Login from "./pages/Login/login";
import EventDetails from "./pages/event-details/eventDetails";

import LoginModal from "./components/modal/login-modal/login-modal";
import SignUpModal from "./components/modal/sign-up-modal/sign-up-modal";
import PgOneRequest from "./components/modal/requests/page1/pg1";
import PgTwoWRoom from "./components/modal/requests/page2/pg2-w-room";
import PgTwoNoRoom from "./components/modal/requests/page2/pg2-no-room";
import EditDelete from "./components/modal/edit_delete/edit_delete";
import UserContext from "./context/UserContext";
import UserDataContext from "./context/userDataContext";
// import ModalContext from "./context/ModalContext";
// import RoomContext from "./context/roomContext";

import "./App.scss";
const App = () => {
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined,
  });

  const [
    { toggleModal, hasRoom, editRequest, eventHasRoom, eventID },
    dispatch,
  ] = useReducer(reducer, {
    toggleModal: "",
    hasRoom: "",
    editRequest: "",
    eventHasRoom: "",
    eventID: "",
  });

  useEffect(() => {
    const checkLoggedIn = async () => {
      const token = localStorage.getItem("token");
      if (token === null) {
        localStorage.setItem("token", "");
        token = "";
      }
      const tokenRes = await Axios.get(
        "http://localhost:4000/users/is-verify",
        {
          headers: {
            token: token,
          },
        }
      );

      if (tokenRes.data) {
        const userRes = await Axios.get("http://localhost:4000/users/", {
          headers: {
            token: token,
          },
        });
        setUserData({
          token,
          user: userRes.data,
        });
      }
    };

    checkLoggedIn();
  }, []);
  // return <Card />;
  return (
    <BrowserRouter>
      <div className="App">
        <UserContext.Provider
          value={{
            userData,
            setUserData,
          }}
        >
          <UserDataContext.Provider
            value={{
              toggleModal,
              hasRoom,
              eventHasRoom,
              editRequest,
              eventID,
              dispatch,
              reducer,
            }}
          >
            {toggleModal ? (
              <div className="overlay">
                {" "}
                {
                  {
                    EditDelete: <EditDelete />,
                    RequestWRoom: <PgTwoWRoom />,
                    RequestNoRoom: <PgTwoNoRoom />,
                    Request: <PgOneRequest />,
                    Login: <LoginModal />,
                    SignUp: <SignUpModal />,
                  }[toggleModal]
                }{" "}
              </div>
            ) : null}{" "}
            <Navbar className="sticky-nav" />
            <main>
              <Switch>
                <Route exact path="/" component={LandingPage} />{" "}
                <Route path="/create-party" component={CreateParty} />{" "}
                <Route path="/about-us" component={AboutUs} />{" "}
                <Route path="/login" component={Login} />{" "}
                <Route path="/dashboard" component={Dashboard} />{" "}
                <Route path="/event-details" component={EventDetails} />
              </Switch>{" "}
            </main>{" "}
            <Footer />
          </UserDataContext.Provider>
        </UserContext.Provider>{" "}
      </div>{" "}
    </BrowserRouter>
  );
};

export default App;
