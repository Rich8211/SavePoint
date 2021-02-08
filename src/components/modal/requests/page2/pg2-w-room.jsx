import React, { useEffect, useState, useContext } from "react";
import { withRouter } from "react-router-dom";
import ModalContext from "../../../../context/ModalContext";
import UserContext from "../../../../context/UserContext";
import UserDataContext from "../../../../context/userDataContext";
import roomContext from "../../../../context/roomContext";
import FormInput from "../../form-input/form-input";
import formatDate from "../../../../functions/formatDate";
import Modal from "../../modal";

import Axios from "axios";

const PgTwoRoom = ({ history }) => {
  const { toggleModal, editRequest, eventID, dispatch, reducer } = useContext(
    UserDataContext
  );

  // const { toggleModal, setToggleModal } = useContext(ModalContext);
  const { userData, setUserData } = useContext(UserContext);
  const [form, setForm] = useState({
    check_in_date: "",
    check_out_date: "",
    price_total: 0,
    accommodation_name: "",
    address_line_1: "",
    address_line_2: "",
    zipcode: 0,
    events: [],
    eventname: "",
    city: "",
    state: "",
    other_details: "",
    user_id: userData.user.user_id,
  });

  useEffect(() => {
    const getEvents = async () => {
      const events = await Axios.post("http://localhost:4000/events/get");
      setForm({ ...form, events: events.data });
    };
    getEvents();

    const EditRequest = async () => {
      const foundEvent = await Axios.post(
        "http://localhost:4000/users/get-requests-has-room-by-id",
        {
          request_id: eventID,
        }
      );

      setForm((prevForm) => ({
        ...prevForm,
        eventname: foundEvent.data["eventname"],
        check_in_date: foundEvent.data["check_in_date"].slice(0, 10),
        check_out_date: foundEvent.data["check_out_date"].slice(0, 10),
        price_total: foundEvent.data["price_total"],
        accommodation_name: foundEvent.data["accommodation_name"],
        address_line_1: foundEvent.data["address_line_1"],
        address_line_2: foundEvent.data["address_line_2"],
        zipcode: foundEvent.data["zipcode"],
        city: foundEvent.data["city"],
        state: foundEvent.data["state"],
        other_details:foundEvent.data["other_details"]
      }));
    };

    editRequest && EditRequest();
  }, []);

  const eventsList = form.events.map((event) => ({
    title: `${event.name}`,
    type: "eventname",
    key: `${event.name}`,
  }));

  const updateField = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const toggleSelected = (item) => {
    setForm({
      ...form,
      [item.type]: item.title,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {
      eventname,
      check_in_date,
      check_out_date,
      price_total,
      accommodation_name,
      address_line_1,
      address_line_2,
      zipcode,
      city,
      state,
      other_details,
    } = form;

    const foundEvent = await Axios.post("http://localhost:4000/events/", {
      name: eventname,
    });

    const eventcity = foundEvent.data.city;

    const eventstate = foundEvent.data.state;

    editRequest
      ? await Axios.post("http://localhost:4000/users/update_has_room", {
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
          other_details,
          request_id: eventID,
        })
      : await Axios.post("http://localhost:4000/users/requests-has-room", {
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
          other_details,
          user_id: userData.user.user_id,
        });
    dispatch({ type: "SET_MODAL", payload: "" });
    const edit = true;
    // sessionStorage.setItem("editRequest", JSON.stringify(false));
    history.push("/dashboard");
  };

  const inputs = [
    {
      for: "event",
      upperLabel: "Event",
      bottomLabel: "Please select the event",
      name: "event",
      handleChange: toggleSelected,
      inputType: "dropdown",
      value: form.eventname,
      data: eventsList,
      key: "event",
    },
    {
      for: "check_in_date",
      upperLabel: "Check in date*",
      bottomLabel: "Please enter a check in date",
      name: "check_in_date",
      handleChange: updateField,
      value: form.check_in_date,
      type: "text",
      inputType: "input",
      key: "check_in",
    },
    {
      for: "check_out_date",
      upperLabel: "Check out date*",
      bottomLabel: "Please enter a check out date",
      name: "check_out_date",
      handleChange: updateField,
      value: form.check_out_date,
      type: "text",
      inputType: "input",
      key: "check_out",
    },
    {
      for: "price_total",
      upperLabel: "Total Price",
      bottomLabel: "Please enter the total price",
      name: "price_total",
      handleChange: updateField,
      value: form.price_total,
      type: "text",
      inputType: "input",
      key: "price",
    },
    {
      for: "accommodation_name",
      upperLabel: "Accomodation Name",
      name: "accommodation_name",
      handleChange: updateField,
      value: form.accommodation_name,
      type: "text",
      inputType: "input",
      key: "accomodation_name",
    },
    {
      for: "address_line_1",
      upperLabel: "Address 1",
      name: "address_line_1",
      handleChange: updateField,
      value: form.address_line_1,
      type: "text",
      inputType: "input",
      key: "address_1",
    },
    {
      for: "address_line_2",
      upperLabel: "Address 2",
      name: "address_line_2",
      handleChange: updateField,
      value: form.address_line_2,
      type: "text",
      inputType: "input",
      key: "address_2",
    },
    {
      for: "zipcode",
      upperLabel: "Zip Code",
      name: "zipcode",
      handleChange: updateField,
      value: form.zipcode,
      type: "text",
      inputType: "input",
      key: "zip",
    },
    {
      for: "city",
      upperLabel: "City",
      name: "city",
      handleChange: updateField,
      value: form.city,
      type: "text",
      inputType: "input",
      key: "city",
    },
    {
      for: "state",
      upperLabel: "State",
      name: "state",
      handleChange: updateField,
      value: form.state,
      type: "text",
      inputType: "input",
      key: "state",
    },
    {
      for: "other_details",
      upperLabel: "Other Details",
      name: "other_details",
      handleChange: updateField,
      type: "text",
      inputType: "input",
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

export default withRouter(PgTwoRoom);
