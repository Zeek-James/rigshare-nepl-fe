import React, { useState } from "react";
import CustomButton from "../../../generalComponents/Button";
import PaginationRounded from "../../../generalComponents/Pagination";
import TablesComponent from "../../../generalComponents/TablesComponent";

const OutgoingRequests = ({ leaseRequestsData, onAction }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [pageSize, setPageSize] = useState(20);
  const [currentPage, setCurrentPage] = useState(1);

  const headers = [
    "Equipment",
    "Owner",
    "Requested Period",
    "Last Updated",
    "Status",
    "Actions",
  ];

  const options = [
    // { label: "View Details", permissions: ["view_lease"] },
    // { label: "Update Request", permissions: ["change_lease"] },
    // { label: "Negotiate Terms", permissions: ["change_lease"] },
    // { label: "Cancel Request", permissions: ["delete_lease"] },
    { label: "View Contract Details" },
    // { label: "Update Request" },
    { label: "Renegotiate Terms" },
    // { label: "Cancel Request" },
  ];

  const outgoingData = leaseRequestsData.filter(
    (item) => item.type === "outgoing"
  );

  const filteredData = outgoingData.filter(
    (item) =>
      item.equipmentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.owner.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalItems = filteredData.length;
  const totalPages = Math.ceil(totalItems / pageSize);
  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);

  const handlePageSizeChange = (event) => {
    setPageSize(Number(event.target.value));
    setCurrentPage(1);
  };

  const getFormattedValue = (el) => {
    return [
      <div className='flex items-start gap-3'>
        <div className='w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0'>
          <svg
            className='w-6 h-6 text-white'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M12 19l9 2-9-18-9 18 9-2zm0 0v-8'
            />
          </svg>
        </div>
        <div className='flex-1 min-w-0'>
          <h3 className='font-semibold text-gray-900 truncate'>
            {el?.equipmentName}
          </h3>
          <p className='text-sm text-gray-600 mt-1 line-clamp-2'>
            {el?.description}
          </p>
          <div className='flex items-center gap-4 mt-2 text-xs text-gray-500'>
            <span>Rate: {el?.dailyRate}/day</span>
            <span>Location: {el?.location}</span>
          </div>
        </div>
      </div>,
      <div className='space-y-1'>
        <p className='font-medium text-gray-900'>{el?.owner}</p>
        <div className='flex items-center gap-1'>
          <div className='w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center'>
            <span className='text-xs font-medium text-gray-600'>
              {el?.owner
                ?.split(" ")
                .map((n) => n[0])
                .join("")
                .slice(0, 2)}
            </span>
          </div>
          <span className='text-xs text-gray-500'>Company</span>
        </div>
      </div>,
      <div className='space-y-1'>
        <p className='font-medium text-gray-900'>{el?.requestedPeriod}</p>
        <p className='text-sm text-gray-600'>
          Duration:{" "}
          {el?.requestedPeriod?.split(" - ").length === 2
            ? Math.ceil(
                (new Date(el?.requestedPeriod.split(" - ")[1]) -
                  new Date(el?.requestedPeriod.split(" - ")[0])) /
                  (1000 * 60 * 60 * 24)
              ) + " days"
            : "N/A"}
        </p>
      </div>,
      <span className='text-sm text-gray-600'>{el?.lastUpdated}</span>,
      <span
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${el?.statusColor}`}
      >
        {el?.status}
      </span>,
    ];
  };

  return (
    <div className='space-y-6'>
      {/* Search and Filter Bar */}
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-4 justify-between w-full'>
          <div className='relative'>
            <input
              type='text'
              placeholder='Equipment name, owner name, location'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className='pl-10 pr-4 py-2 w-80 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brandPurple focus:border-brandPurple'
            />
            <svg
              className='w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
              />
            </svg>
          </div>
          <CustomButton
            buttonText='Filter'
            buttonColor='bg-white'
            className='border border-gray-300 text-sm py-2 px-4 rounded-lg mr-auto'
            textColor='text-gray-700'
            onClick={() => {}}
          />
          <div className='text-sm text-gray-600'>View All</div>
        </div>
      </div>

      {/* Outgoing Requests Table */}
      <div className='h-[50vh] w-full relative'>
        <TablesComponent
          data={filteredData}
          getFormattedValue={getFormattedValue}
          headers={headers}
          toggleRowFunction={() => {}}
          toggleSelectAllFunction={() => {}}
          options={options}
          popUpFunction={(_, index, val) => onAction(index, val)}
          showCheckBox={false}
          cellClassName={"w-[200px]"}
        />
      </div>

      {/* Pagination */}
      {totalItems > 5 && (
        <div className='flex items-center justify-between mt-4'>
          <div className='flex items-center gap-2'>
            <label htmlFor='pageSize' className='text-sm'>
              Rows per page
            </label>
            <select
              id='pageSize'
              className='border p-1 rounded'
              value={pageSize}
              onChange={handlePageSizeChange}
            >
              <option value='10'>10</option>
              <option value='20'>20</option>
              <option value='50'>50</option>
              <option value='100'>100</option>
            </select>
          </div>

          <PaginationRounded
            defaultPage={currentPage}
            count={totalPages}
            onChange={(page) => {
              setCurrentPage(page);
            }}
          />

          <p className='text-14px text-brandBlack'>
            {startItem} - {endItem} of {totalItems} row{totalItems > 1 && "s"}
          </p>
        </div>
      )}
    </div>
  );
};

export default OutgoingRequests;
