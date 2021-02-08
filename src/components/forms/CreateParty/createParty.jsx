import React from "react";
import axios from "axios";

import "./creatParty.scss";
import Input from "../../input/input";
import { useState } from "react";

const CreateParty = (props) => {
  const [PartyInfo, setPartyInfo] = useState({
    partyName: "",
    distance: 0,
    cost: 0,
    city: "",
    state: "",
    zip: "",
  });

  const handleChange = (e) => {
    setPartyInfo({
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newParty = {
      ...PartyInfo,
    };

    axios
      .post("/localhost:5000/events/add", newParty)
      .then((res) => console.log(res.data))
      .catch((error) => console.log(error.response));
  };

  return (
    <div className="party-form">
      <div className="heading">
        <h1>Your Party for PAX EAXT 2015</h1>
        <p className="required-fields">* indicates required fields</p>
      </div>
      <form className="form-inputs">
        <label htmlFor="party-name">Party Name*</label>
        <input id="party-name" type="text" />
        <div className="dist-cost-max">
          <div>
            <label htmlFor="distance">Distance from Event (miles)*</label>
            <input id="Distance" type="text" />
          </div>
          <div>
            <label htmlFor="cost">Cost Per Person (dollars)*</label>
            <input id="cost" type="text" />
          </div>
          <div>
            <label htmlFor="max-party-members">Maximum Party Members*</label>
            <select name="max-party-memberss" id="max-party-memberss">
              <option value="1">1</option>
              <option value="2">Saab</option>
              <option value="3">3</option>
              <option value="4">4</option>
            </select>
          </div>
        </div>
        <div className="name-address">
          <label htmlFor="accommodation-name">Accommodation Name*</label>
          <input id="accommodation-name" type="text" />
          <label htmlFor="accommodation-address">Accommodation Address*</label>
          <input id="accommodation-address" type="text" />
          <div className="city-state-zip">
            <div>
              <label htmlFor="city">City*</label>
              <input id="city" type="text" />
            </div>
            <div>
              <label htmlFor="state">State*</label>
              <input id="state" type="text" />
            </div>
            <div>
              <label htmlFor="zip">ZIP*</label>
              <input id="zip" type="text" />
            </div>
          </div>
        </div>
        <div className="party-info"></div>
        <div className="meeting-location">
          <label htmlFor="meeting-location">General Meeting Location*</label>
          <input type="text" name="meeting-location" id="meeting-location" />
        </div>
        <div className="party-discription">
          <label htmlFor="party-discription">Party Description*</label>
          <input type="text" name="party-discription" id="party-discription" />
        </div>
      </form>
    </div>
  );
};

export default CreateParty;
