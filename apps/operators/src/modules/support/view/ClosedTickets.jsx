import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TablesComponent from "../../../generalComponents/TablesComponent";
import PaginationRounded from "../../../generalComponents/Pagination";
import StatusButton from "../../../generalComponents/StatusButton";
import SearchField from "../../../generalComponents/SearchField";
import useGetTicketsManager from "../controllers/getTicketsController";
import { calculatePaginationRange } from "../../../utils/calculatePaginationRange";
import CustomToggle from "../../../generalComponents/CustomToggle";
import { hasPermissions } from "../../../constants/permissions";

const OpenTickets = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [showMyTickets, setShowMyTickets] = useState(false);
  const navigate = useNavigate();

  const { data, isLoading } = useGetTicketsManager({
    page: currentPage,
    status: "closed",
    is_mine: showMyTickets,
    enabled: true,
  });

  const { startItem, endItem } = calculatePaginationRange(
    data?.data?.pagination
  );

  const headers = ["Sender", "Subject", "Date", "Status", "Action"];

  const getFormattedValue = (el, index) => {
    return [
      <span>
        {el?.created_by?.first_name} {el?.created_by?.last_name}
      </span>,
      el?.subject,
      <span>{new Date(el?.created_datetime).toLocaleDateString()}</span>,
      <StatusButton status={el?.status} />,
    ];
  };

  const handleToggleChange = (newValue) => {
    setShowMyTickets(newValue);
    setCurrentPage(1);
  };

  return (
    <div className='mt-2 md:mt-6 flex flex-col w-full gap-4'>
      <div className='flex flex-col md:flex-row justify-between items-center'>
        <div className='flex items-center'>
          <SearchField />
        </div>
        <div
          className={`${hasPermissions(["close_ticket"]) ? "flex" : "hidden"} `}
        >
          <span className='ml-4 items-center'>
            <CustomToggle
              label={"Show My Tickets"}
              enabled={showMyTickets}
              onChange={handleToggleChange}
            />
          </span>
        </div>
      </div>
      <div className='h-[67vh] w-full relative'>
        {
          <TablesComponent
            data={data?.data?.results}
            getFormattedValue={getFormattedValue}
            headers={headers}
            isLoading={isLoading}
            buttonFunction={(val) => {
              navigate(`/support/ticket/${val.id}`);
              console.log(val);
            }}
            showCheckBox={true}
            // Close popup function
          />
        }
      </div>
      <div className='flex items-center justify-between mt-4'>
        <p className='text-14px text-brandBlack'>
          {" "}
          {startItem} - {endItem} of {data?.data?.pagination?.count}
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

export default OpenTickets;
