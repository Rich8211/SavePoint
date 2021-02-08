import React, { useState } from "react";
import Tabs from "../../components/tabs/tabs";
import Tab from "../../components/tabs/tab/tab";
import PartyStats from "./party-stats/partyStats";
import Description from "./description/description";
import Messages from "./messages/messages";

const EventDetails = () => {
  const [selected, setSelected] = useState("Party Stats");

  return (
    <div className="event-details">
      <Tabs
        tabs={["Party Stats", "Description", "Messages"]}
        selected={selected}
        setSelected={setSelected}
      >
        <Tab isSelected={selected === "Party Stats"}>
          <PartyStats />
        </Tab>
        <Tab isSelected={selected === "Description"}>
          <Description />
        </Tab>
        <Tab isSelected={selected === "Messages"}>
          <Messages />
        </Tab>
      </Tabs>
    </div>
  );
};

export default EventDetails;
