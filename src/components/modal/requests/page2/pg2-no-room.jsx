import React, { useEffect, useState, useContext } from "react";
import { withRouter } from "react-router-dom";
import ModalContext from "../../../../context/ModalContext";
import UserDataContext from "../../../../context/userDataContext";
import UserContext from "../../../../context/UserContext";
import FormInput from "../../form-input/form-input";
import Modal from "../../modal";

import Axios from "axios";

const PgTwoNoRoom = () => {
  const { userData, setUserData } = useContext(UserContext);
  const { toggleModal, editRequest, eventID, dispatch, reducer } = useContext(
    UserDataContext
  );

  const [state, setForm] = useState({
    pref_check_in_date: "",
    pref_check_out_date: "",
    max_roommates: 0,
    budget: 0,
    noise: "Quiet",
    schedule: "Early Riser",
    other_details: "",
    events: [],
    eventname: "",
    user_id: userData.user.user_id,
  });

  const noise = [
    { title: "Quiet", type: "noise", key: "Quiet" },
    { title: "Social", type: "noise", key: "Social" },
  ];

  const schedule = [
    { title: "Early Riser", type: "schedule", key: "Early Riser" },
    { title: "Night Owl", type: "schedule", key: "Night Owl" },
  ];

  useEffect(() => {
    const getEvents = async () => {
      const events = await Axios.post("http://localhost:4000/events/get");
      setForm({ ...state, events: events.data });
    };
    getEvents();

    const EditRequest = async () => {
      const foundEvent = await Axios.post(
        "http://localhost:4000/users/get-requests-no-room-by-id",
        {
          request_id: eventID,
        }
      );

      setForm((prevForm) => ({
        ...prevForm,
        eventname: foundEvent.data["eventname"],
        pref_check_in_date: foundEvent.data["pref_check_in_date"].slice(0, 10),
        pref_check_out_date: foundEvent.data["pref_check_out_date"].slice(0, 10),
        max_roommates:foundEvent.data["max_roommates"],
        budget: foundEvent.data["budget"],
        noise:foundEvent.data["noise"],
        schedule:foundEvent.data["schedule"],
        other_details:foundEvent.data["other_details"]
      }));
    };

    editRequest && EditRequest();
  }, []);

  const eventsList = state.events.map((event) => ({
    title: `${event.name}`,
    type: "eventname",
    key: `${event.name}`,
  }));
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    const {
      eventname,
      pref_check_in_date,
      pref_check_out_date,
      max_roommates,
      budget,
      noise,
      schedule,
      other_details,
      user_id,
    } = state;

    const foundEvent = await Axios.post("http://localhost:4000/events/", {
      name: eventname,
    });

    const eventcity = foundEvent.data.city;

    const eventstate = foundEvent.data.state;

    console.log([eventcity, eventstate, max_roommates]);

    await Axios.post("http://localhost:4000/users/requests-no-room", {
      eventname,
      eventcity,
      eventstate,
      pref_check_in_date,
      pref_check_out_date,
      max_roommates,
      budget,
      noise,
      schedule,
      other_details,
      user_id,
    });

    dispatch({ type: "SET_MODAL", payload: "" });;
  };

  const updateField = (e) => {
    setForm({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const toggleSelected = (item) => {
    setForm({
      ...state,
      [item.type]: item.title,
    });
  };

  const inputs = [
    {
      for: "event",
      upperLabel: "Event",
      bottomLabel: "Please select the event",
      name: "event",
      handleChange: toggleSelected,
      inputType: "dropdown",
      value: state.eventname,
      data: eventsList,
      key: "event",
    },
    {
      for: "pref_check_in_date",
      upperLabel: "Preferred Check in date*",
      bottomLabel: "Please enter a preferred check in date",
      name: "pref_check_in_date",
      handleChange: updateField,
      type: "text",
      inputType: "input",
      key: "check_in",
    },
    {
      for: "pref_check_out_date",
      upperLabel: "Preferred Check out date*",
      bottomLabel: "Please enter a preferred check out date",
      name: "pref_check_out_date",
      handleChange: updateField,
      type: "text",
      inputType: "input",
      key: "check_out",
    },

    {
      for: "max_roommates",
      upperLabel: "Max. Number of Roommates*",
      bottomLabel: "Please Enter a Max number of Roommates",
      name: "max_roommates",
      handleChange: updateField,
      type: "number",
      inputType: "input",
      key: "roommates",
    },
    {
      for: "budget",
      upperLabel: "Budget*",
      bottomLabel: "Please enter your max budget",
      name: "budget",
      handleChange: updateField,
      type: "number",
      inputType: "input",
      key: "budget",
    },
    {
      for: "noise",
      upperLabel: "Noise Level",
      bottomLabel: "Please indicate preference for noise level",
      name: "noise",
      handleChange: toggleSelected,
      inputType: "dropdown",
      value: state.noise,
      data: noise,
      key: "noise",
    },
    {
      for: "schedule",
      upperLabel: "Sleep/Wake Schedule",
      bottomLabel: "Please indicate preference for sleep schedule",
      name: "schedule",
      handleChange: toggleSelected,
      inputType: "dropdown",
      value: state.schedule,
      data: schedule,
      key: "schedule",
    },

    {
      for: "other",
      upperLabel: "Other Details",
      name: "other",
      handleChange: updateField,
      type: "text",
      inputType: "textArea",
      key: "other",
    },
  ];

  return (
    <Modal buttonText="Submit" clickHandler={handleSubmit}>
      {inputs.map((input) => (
        <FormInput {...input} />
      ))}
    </Modal>
  );
};

export default withRouter(PgTwoNoRoom);
