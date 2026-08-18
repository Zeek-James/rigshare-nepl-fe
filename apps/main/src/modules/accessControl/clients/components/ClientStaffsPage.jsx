import React, { useState } from "react";
import BaseDashboardNavigation from "../../../../generalComponents/BaseDashboardNavigation";
import ButtonWithIcon from "../../../../generalComponents/ButtonWithIcon";
import { GoDownload } from "react-icons/go";
import TablesComponent from "../../../../generalComponents/TablesComponent";
import PaginationRounded from "../../../../generalComponents/Pagination";
import SearchField from "../../../../generalComponents/SearchField";
import { BiPlusCircle } from "react-icons/bi";
import { useParams } from "react-router-dom";
import useGetClientsStaffManager from "../controllers/getClientsStaffController";

const ClientStaffsPage = () => {
  const { id } = useParams();
  const [setCurrentPage] = useState(1);
  const { data: clientStaffData, isLoading } = useGetClientsStaffManager({
    id: id,
  });

  const headers = ["Client Name", "Created By", "Date Created", "Actions"];

  const options = [
    "View Client",
    "Edit Client",
    "Login as Client",
    "Deactivate Client",
  ];

  const getFormattedValue = (client, index) => {
    const firstName = client?.created_by?.first_name || "";
    const lastName = client?.created_by?.last_name || "";
    const createdBy = `${firstName} ${lastName}`;

    return [
      <span>{client?.name}</span>,
      <span>{new Date(client?.created_datetime).toLocaleDateString()}</span>,
      <span>{createdBy}</span>,
    ];
  };

  return (
    <BaseDashboardNavigation>
      <div className="flex flex-col w-full gap-7">
        <h3 className="text-[24px] font-bold my-0">Clients Staff</h3>
        <div className="w-full flex flex-col gap-7 sticky top-0 bg-[#F8F9FC]">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-3">
              <SearchField />
            </div>
            <div className="flex items-center space-x-[10px] md:mt-0 mt-3">
              <ButtonWithIcon
                buttonText={"Create New"}
                radius={"md"}
                icon={BiPlusCircle}
                onClick={() => {
                  document.getElementById("create_client").showModal();
                }}
              />
              <ButtonWithIcon
                buttonText={"Export"}
                radius={"md"}
                icon={GoDownload}
              />
            </div>
          </div>
        </div>
        <div className="h-[67vh] w-full relative">
          {
            <TablesComponent
              isLoading={isLoading}
              data={clientStaffData?.data?.results}
              getFormattedValue={getFormattedValue}
              headers={headers}
              buttonFunction={(val) => {
                console.log(val);
              }}
              popUpFunction={(option, index, val) => {
                console.log(option, index, val);
                if (index === 0) {
                  document.getElementById("create_client").showModal();
                }
                if (index === 1) {
                  document.getElementById("create_client").showModal();
                }
                if (index === 3) {
                  document.getElementById("deactivate_modal").showModal();
                }
              }}
              options={options}
              // Close popup function
            />
          }
        </div>
        <div className="flex items-center justify-between mt-4">
          <p className="text-14px text-brandBlack">1-10 of 195 items</p>
          <PaginationRounded
            defaultPage={1}
            count={100}
            onChange={(page) => {
              setCurrentPage(page);
            }}
          />
        </div>
      </div>
      {/* <ClientsModals selectedClient={selectedClient} /> */}
    </BaseDashboardNavigation>
  );
};

export default ClientStaffsPage;
