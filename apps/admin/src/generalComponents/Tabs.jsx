import React, { useState } from "react";
import TabsManagement from "./TabsManagement";

const Tabs = ({ tabsData, w = "w-full" }) => {
  const [activeTab, setActiveTab] = useState(0);

  const options = tabsData.map((el) => el.label);

  return (
    <div className='my-2.5 w-full flex flex-col'>
      <TabsManagement
        currentView={activeTab}
        setCurrentView={setActiveTab}
        options={options}
        w={w}
      />
      <div className='w-full '>{tabsData[activeTab].component}</div>
    </div>
  );
};

export default Tabs;
