import React, { useEffect, useState } from "react";
import TablesComponent from "../../../../generalComponents/TablesComponent";
import PaginationRounded from "../../../../generalComponents/Pagination";
import SearchField from "../../../../generalComponents/SearchField";
import { useNavigate } from "react-router-dom";
import useGetClientsManager from "../controllers/getClientsController";
import StatusButton from "../../../../generalComponents/StatusButton";
import { noImage } from "../../../../assets/images";
import { calculatePaginationRange } from "../../../../utils/calculatePaginationRange";
import useDebounce from "../../../../utils/UseDebounce";
import { DeactivateClientManager } from "../controllers/deactivateClientController";
import AdminDeleteConfirmationModal from "../../../../generalComponents/AdminDeleteConfirmationModal";
import { ActivateClientManager } from "../controllers/activateClientController";
// import useDownloadClientsManager from "../controllers/downloadClientsController";
// import ButtonWithIcon from "../../../../generalComponents/ButtonWithIcon";
// import { FaDownload } from "react-icons/fa";

const AllClients = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRows, setSelectedRows] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const debouncedSearchValue = useDebounce(`&search=${searchValue}`, 1000);
  const [clientId, setClientId] = useState("");
  const [clientName, setClientName] = useState("");
  const [isActivating, setIsActivating] = useState(false);

  const navigate = useNavigate();

  const { data, isLoading } = useGetClientsManager({
    type: "",
    enabled: true,
    searchQuery: debouncedSearchValue,
    page: currentPage,
  });

  const { startItem, endItem } = calculatePaginationRange(
    data?.data?.pagination
  );

  const {
    deactivateClient,
    isLoading: deactivating,
    isSuccess: deactivated,
  } = DeactivateClientManager({ id: clientId });

  const {
    activateClient,
    isLoading: activating,
    isSuccess: activated,
  } = ActivateClientManager({ id: clientId });

  const handleToggleActivation = async () => {
    if (isActivating) {
      await activateClient();
    } else {
      await deactivateClient();
    }
  };

  // const { data: clients, isLoading: lotsLoading } = useDownloadClientsManager({
  //   type: "",
  // });

  const options = [
    { label: "Edit Client", permissions: ["change_client"] },
    "View Client Dashboard",
    { label: "Deactivate Client", permissions: ["deactivate_client"] },
  ];

  // const getOptions = (client) => [
  //   "Edit Client",
  //   "View Client Dashboard",
  //   client.is_active ? "Deactivate Client" : "Activate Client",
  // ];

  const headers = [
    "Client Name",
    "Client Email",
    "Date Created",
    "Total Users",
    "Created By",
    "Status",
    "Actions",
  ];

  const getFormattedValue = (client, index) => {
    return [
      <span className='flex gap-x-2 items-center'>
        <img
          src={client?.logo || noImage}
          alt='Logo'
          className='w-10 h-10 rounded-full'
        />
        {client?.name}
      </span>,
      <span>{client?.email}</span>,
      <span>{new Date(client?.created_datetime).toLocaleDateString()}</span>,
      <span>{client?.total_users}</span>,
      <span>{client?.created_by_client?.name}</span>,
      <StatusButton status={client?.is_active ? "Active" : "Suspended"} />,
    ];
  };

  useEffect(() => {
    if (deactivated || activated) {
      document.getElementById("admin_delete").close();
    }
  }, [deactivated, activated]);

  // const handleDownload = () => {
  //   if (!clients) return;
  //   const url = window.URL.createObjectURL(new Blob([clients]));
  //   const link = document.createElement("a");
  //   link.href = url;
  //   link.download = "clients.xlsx";
  //   document.body.appendChild(link);
  //   link.click();
  //   document.body.removeChild(link);
  //   window.URL.revokeObjectURL(url);
  // };

  return (
    <div className='flex flex-col w-full gap-7'>
      <div className='w-full flex flex-col gap-7 sticky top-0 bg-[#F8F9FC]'>
        <div className='flex flex-col md:flex-row justify-between items-center'>
          <div className='flex items-center gap-3'>
            <SearchField
              onChange={(e) => setSearchValue(e.target.value)}
              value={searchValue}
            />{" "}
          </div>
          {/* <div>
            <ButtonWithIcon
              buttonText="Download Clients"
              icon={FaDownload}
              buttonColor={"transparent"}
              textColor={"text-brandGreen"}
              onClick={() => {
                handleDownload();
              }}
              className={
                "text-[8px] border border-brandGreen text-brandGreen my-2"
              }
            />
          </div> */}
        </div>
      </div>
      <div className='h-[67vh] w-full relative'>
        <TablesComponent
          isLoading={isLoading}
          data={data?.data?.results}
          getFormattedValue={getFormattedValue}
          headers={headers}
          setSelectedRows={setSelectedRows}
          selectedRows={selectedRows}
          toggleRowFunction={() => {}}
          toggleSelectAllFunction={() => {}}
          popUpFunction={(option, index, val) => {
            if (index === 0) {
              navigate(`/edit-client/${val?.id}`);
            }
            if (index === 2) {
              setClientId(val.id);
              setClientName(val?.name);
              setIsActivating(!val?.is_active);
              document.getElementById("admin_delete").showModal();
            }
          }}
          options={options}
          showCheckBox={true}
        />
      </div>
      <div className='flex items-center justify-between mt-4'>
        <p className='text-14px text-brandBlack'>
          {startItem} - {endItem} of {data?.data?.pagination?.count} users
        </p>
        <PaginationRounded
          defaultPage={data?.data?.pagination?.page}
          count={data?.data?.pagination?.total_pages}
          onChange={(page) => setCurrentPage(page)}
        />
      </div>

      <AdminDeleteConfirmationModal
        body={`Are you sure you want to ${
          isActivating ? "activate" : "deactivate"
        } ${clientName}?`}
        title={`${
          isActivating ? "Activate" : "Deactivate"
        } Client - ${clientName}`}
        buttonText={`Yes, ${isActivating ? "Activate" : "Deactivate"}`}
        isLoading={isActivating ? activating : deactivating}
        onClick={handleToggleActivation}
      />
    </div>
  );
};

export default AllClients;
