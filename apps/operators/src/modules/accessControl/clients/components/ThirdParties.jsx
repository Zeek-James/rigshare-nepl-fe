import React, { useState } from "react";
import TablesComponent from "../../../../generalComponents/TablesComponent";
import PaginationRounded from "../../../../generalComponents/Pagination";
import SearchField from "../../../../generalComponents/SearchField";
import { useNavigate } from "react-router-dom";
import useGetClientsManager from "../controllers/getClientsController";
import StatusButton from "../../../../generalComponents/StatusButton";
import { noImage } from "../../../../assets/images";
import { calculatePaginationRange } from "../../../../utils/calculatePaginationRange";
import useDebounce from "../../../../utils/UseDebounce";

const ThirdParties = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRows, setSelectedRows] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const debouncedSearchValue = useDebounce(`&search=${searchValue}`, 1000);

  const navigate = useNavigate();

  const { data, isLoading } = useGetClientsManager({
    type: "THIRD_PARTY_ORGANIZATION",
    enabled: true,
    searchQuery: debouncedSearchValue,
    page: currentPage,
  });

  const { startItem, endItem } = calculatePaginationRange(
    data?.data?.pagination
  );

  const options = [
    { label: "Edit Client", permissions: ["change_client"] },
    "View Client Dashboard",
    { label: "Deactivate Client", permissions: ["deactivate_client"] },
  ];
  const headers = [
    "Client Name",
    "Admin",
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
      <span>
        {client?.name}
        <br />
        {client?.email}
      </span>,
      <span>{new Date(client?.created_datetime).toLocaleDateString()}</span>,
      <span>{client?.total_users}</span>,
      <span>{client?.created_by_client?.name}</span>,
      <StatusButton status={client?.is_active ? "Active" : "Suspended"} />,
    ];
  };

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
        </div>
      </div>
      <div className='h-[67vh] w-full relative'>
        {
          <TablesComponent
            isLoading={isLoading}
            data={data?.data?.results}
            getFormattedValue={getFormattedValue}
            headers={headers}
            setSelectedRows={setSelectedRows}
            selectedRows={selectedRows}
            toggleRowFunction={() => {}}
            toggleSelectAllFunction={() => {}}
            buttonFunction={(val) => {
              console.log(val);
            }}
            popUpFunction={(option, index, val) => {
              console.log(option, index, val);
              if (index === 0) {
                navigate(`/edit-client/${val?.id}`);
              }
              // if (index === 3) {
              //   document.getElementById("deactivate_modal").showModal();
              // }
            }}
            options={options}
            showCheckBox={true}
            // Close popup function
          />
        }
      </div>
      <div className='flex items-center justify-between mt-4'>
        <p className='text-14px text-brandBlack'>
          {" "}
          {startItem} - {endItem} of {data?.data?.pagination?.count} users
        </p>
        <PaginationRounded
          defaultPage={data?.data?.pagination?.page}
          count={data?.data?.pagination?.total_pages}
          onChange={(page) => {
            setCurrentPage(page);
          }}
        />
      </div>
    </div>
  );
};

export default ThirdParties;
