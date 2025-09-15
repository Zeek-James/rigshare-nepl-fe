import React from "react";
import BaseDashboardNavigation from "../../../../generalComponents/BaseDashboardNavigation";
import Tabs from "../../../../generalComponents/Tabs";
import PageHeading from "../../../../generalComponents/PageHeading";
import ClientsManagement from "../components/ClientsManagement";
import AllClients from "../components/AllClients";
import Operators from "../components/Operators";
import Vendors from "../components/Vendors";
import ThirdParties from "../components/ThirdParties";
import ButtonWithIcon from "../../../../generalComponents/ButtonWithIcon";
import { BiPlusCircle } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { hasPermissions } from "../../../../constants/permissions";

const Clients = () => {
  const navigate = useNavigate();

  const tabsData = [
    { label: "All", component: <AllClients /> },
    { label: "Clients", component: <ClientsManagement /> },
    { label: "Operators", component: <Operators /> },
    { label: "Vendors", component: <Vendors /> },
    { label: "Third-Parties", component: <ThirdParties /> },
  ];

  return (
    <BaseDashboardNavigation
      title="Clients Management"
      subtitle="Displays an overview of operation data and allows navigation to different actions."
      breadcrumbs={[
        { label: "Dashboard", path: "/dashboard" },
        { label: "Clients Management", path: "/clients" },
      ]}
    >
      <div>
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between w-full">
          <div className="flex justify-between items-center mb-2 md:mb-0">
            <PageHeading title={"Clients"} />
          </div>
          <div
            className={`${hasPermissions(["add_client"]) ? "flex" : "hidden"} `}
          >
            {" "}
            <ButtonWithIcon
              buttonText={"Create Client"}
              radius={"md"}
              icon={BiPlusCircle}
              onClick={() => {
                navigate("/create-client");
              }}
            />
          </div>
        </div>
        <Tabs tabsData={tabsData} />
      </div>
    </BaseDashboardNavigation>
  );
};
export default Clients;
