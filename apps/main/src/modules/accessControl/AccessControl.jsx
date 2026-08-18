import React from "react";
import BaseDashboardNavigation from "../../generalComponents/BaseDashboardNavigation";
import Tabs from "../../generalComponents/Tabs";
import UserManagement from "./usermanagement/view/UserManagement";
import RolesAndPermission from "./roles/views/RolesAndPermission";

const AccessControl = () => {
  const tabsData = [
    { label: "User Management", component: <UserManagement /> },
    { label: "Roles and Permissions", component: <RolesAndPermission /> },
  ];

  return (
    <BaseDashboardNavigation
      title="Access Control"
      subtitle="Displays an overview of operation data and allows navigation to different actions."
      breadcrumbs={[
        { label: "Dashboard", path: "/dashboard" },
        { label: "Access Control", path: "/access-control" },
      ]}
    >
      <div>
        <Tabs tabsData={tabsData} />
      </div>
    </BaseDashboardNavigation>
  );
};
export default AccessControl;
