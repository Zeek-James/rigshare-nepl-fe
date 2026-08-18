import React from "react";
import Tabs from "../../../generalComponents/Tabs";
import BaseDashboardNavigation from "../../../generalComponents/BaseDashboardNavigation";
import ModalManagement from "../../../generalComponents/ModalManagement";
import UploadComponent from "../../../generalComponents/UploadComponent";
import ProfileSettingsPage from "../components/ProfileSettingsPage";
import SecurityPage from "../components/SecurityPage";
import RateConfiguration from "../components/RateConfiguration";
import ClientSettings from "../components/ClientSettings";

const SettingsPage = () => {
  const tabsData = [
    { label: "Client Settings", component: <ClientSettings /> },
    { label: "Profile Settings", component: <ProfileSettingsPage /> },
    { label: "Security", component: <SecurityPage /> },
    { label: "Rate Configuration", component: <RateConfiguration /> },
  ];

  return (
    <BaseDashboardNavigation>
      <div>
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between w-full">
          <div className="flex items-center mb-2 md:mb-0">
            <h3 className="text-[24px] font-bold">Settings</h3>
          </div>
        </div>
        <Tabs tabsData={tabsData} />
      </div>
      <ModalManagement id={"show_item"} title={"Upload Inventory"}>
        <div>
          <UploadComponent />
        </div>
      </ModalManagement>
    </BaseDashboardNavigation>
  );
};

export default SettingsPage;
