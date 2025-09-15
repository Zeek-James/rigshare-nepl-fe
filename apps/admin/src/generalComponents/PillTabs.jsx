import React, { useState } from "react";
import PillTabsManagement from "./PillTabsManagement";

const PillTabs = ({ tabsData }) => {
  const [activeTab, setActiveTab] = useState(0);

  const options = tabsData.map((el) => el.label);

  return (
    <div className="my-1 w-full flex flex-col">
      <PillTabsManagement
        currentView={activeTab}
        setCurrentView={setActiveTab}
        options={options}
      />
      <div className="w-full ">{tabsData[activeTab].component}</div>
    </div>
  );
};

export default PillTabs;
