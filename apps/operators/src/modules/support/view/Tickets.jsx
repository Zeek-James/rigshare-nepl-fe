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
import ButtonWithIcon from "../../../generalComponents/ButtonWithIcon";
import { BiPlusCircle } from "react-icons/bi";

const Tickets = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [showMyTickets, setShowMyTickets] = useState(false);
  const navigate = useNavigate();

  const { data, isLoading } = useGetTicketsManager({
    page: currentPage,
    // status: "open",
    // is_mine: showMyTickets,
    enabled: true,
  });

  const { startItem, endItem } = calculatePaginationRange(
    data?.data?.pagination
  );

  const headers = [
    "Ticket Title",
    "User Name",
    "Priority",
    "Last Updated",
    "Status",
    "Action",
  ];

  const getFormattedValue = (el, index) => {
    return [
      <span>{el?.title}</span>,
      el?.sender,

      <StatusButton status={el?.priority} />,
      <span>{new Date(el?.created_datetime).toLocaleDateString()}</span>,
      <StatusButton status={el?.status} />,
    ];
  };

  // const handleToggleChange = (newValue) => {
  //   setShowMyTickets(newValue);
  //   setCurrentPage(1);
  // };

  return (
    <div className='mt-2 md:mt-6 flex flex-col w-full gap-4'>
      <div className='flex flex-col md:flex-row justify-between items-center'>
        <div className='flex items-center'>
          <SearchField />
        </div>
        <div
          className={`${
            hasPermissions(["add_ticket"])
              ? "flex items-center space-x-[10px] mt-1 md:mt-0"
              : "hidden"
          } `}
        >
          <ButtonWithIcon
            buttonText={"Create New Ticket"}
            radius={"md"}
            icon={BiPlusCircle}
            onClick={() => {
              document.getElementById("create_ticket").showModal();
            }}
          />
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

export default Tickets;
