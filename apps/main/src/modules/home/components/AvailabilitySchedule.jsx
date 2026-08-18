import React from "react";
import { AvailabilityTable } from "./AvailabilityTable";
import { AvailabilityCalendar } from "./AvailabilityCalendar";
import Tabs from "../../../generalComponents/Tabs";

import { GantComponent } from "./Gant";

export const AvailabilitySchedule = () => {
  const tabsData = [
    { label: "Table", component: <AvailabilityTable /> },
    { label: "Gannt Chart", component: <GantComponent /> },
    { label: "Calendar", component: <AvailabilityCalendar /> },
  ];
  return (
    <div>
      {" "}
      <Tabs tabsData={tabsData} w='w-[300px]' />
    </div>
  );
};
