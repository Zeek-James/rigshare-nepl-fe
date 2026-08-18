import React, { useState } from "react";
import BaseDashboardNavigation from "../../../generalComponents/BaseDashboardNavigation";
import CustomButton from "../../../generalComponents/Button";
import CreateWellProgramModal from "../../home/components/CreateWellProgramModal";
import WellProgramFilterModal from "../components/WellProgramFilterModal";
import WellProgramDetailModal from "../components/WellProgramDetailModal";
import StatusUpdateModal from "../components/StatusUpdateModal";
import DataUploadModal from "../../../generalComponents/DataUploadModal";

import PaginationRounded from "../../../generalComponents/Pagination";
import TablesComponent from "../../../generalComponents/TablesComponent";
import AdminDeleteConfirmationModal from "../../../generalComponents/AdminDeleteConfirmationModal";

const WellsProgram = () => {
  const [selected, setSelected] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [pageSize, setPageSize] = useState(20); // Default rows per page
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    dateFrom: "",
    dateTo: "",
    equipment: [],
    status: [],
  });

  const wellPrograms = [
    {
      id: 1,
      programName: "Offshore Exploration PH1",
      field: "Ala Field - 1",
      startDate: "Mar 1, 2024",
      endDate: "Oct 30, 2024",
      status: "In Progress",
      statusColor: "bg-blue-100 text-blue-800",
    },
    {
      id: 2,
      programName: "Gas Extraction Plan B",
      field: "Ala Field - 1",
      startDate: "Feb 10, 2024",
      endDate: "July 15, 2024",
      status: "Awaiting Review",
      statusColor: "bg-yellow-100 text-yellow-800",
    },
    {
      id: 3,
      programName: "Well Integrity Test 4",
      field: "Ala Field - 1",
      startDate: "Apr 15, 2024",
      endDate: "Sept 1, 2024",
      status: "In Progress",
      statusColor: "bg-blue-100 text-blue-800",
    },
  ];

  const headers = [
    "Program Name",
    "Field",
    "Start Date",
    "End Date",
    "Status",
    "More",
  ];
  const options = [
    { label: "View", permissions: ["view_financial"] },
    { label: "Delete", permissions: ["delete_financial"] },
    {
      label: "Update",
      // permissions: ["change_financial"],
      disable: (el) => el?.status === "Approved",
      isDynamic: true,
    },
    {
      label: "Edit",
      permissions: ["change_financial"],
      disable: (el) => el?.status === "Approved",
      isDynamic: true,
    },
  ];

  const totalItems = wellPrograms.length;
  const totalPages = Math.ceil(totalItems / pageSize);
  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);

  const handlePageSizeChange = (event) => {
    setPageSize(Number(event.target.value));
    setCurrentPage(1); // Reset to first page when page size changes
  };

  const handleApplyFilter = (newFilters) => {
    setFilters(newFilters);
  };

  const handleDelete = (program) => {
    console.log("Delete program:", program);
    // Handle delete logic here - could show confirmation dialog
    const confirmDelete = window.confirm(
      `Are you sure you want to delete "${program.programName}"?`
    );
    if (confirmDelete) {
      // Add delete API call here
      console.log("Program deleted");
    }
  };

  const handleStatusUpdate = (updatedProgram) => {
    console.log("Program status updated:", updatedProgram);
    // Handle status update API call here
    // You can update the wellPrograms array state here when using real state management
  };

  const getFormattedValue = (el) => {
    return [
      <span className='font-medium text-gray-900'>
        {el?.programName || "N/A"}
      </span>,
      el?.field || "N/A",
      el?.startDate || "N/A",
      el?.endDate || "N/A",
      <span
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          el?.statusColor || "bg-gray-100 text-gray-800"
        }`}
      >
        {el?.status || "Unknown"}
      </span>,
    ];
  };

  return (
    <BaseDashboardNavigation
      title='Well Programs'
      breadcrumbs={[
        { label: "Home", path: "/" },
        { label: "Well Programs", path: "/wells-program" },
      ]}
    >
      <div className='space-y-6'>
        {/* Header */}
        <div className='flex justify-between items-start'>
          <div>
            <h1 className='text-2xl font-bold text-gray-900 mb-2'>
              Well Programs
            </h1>
            <p className='text-gray-600'>
              Upload and manage drilling well programs, and receive automated
              equipment suggestions.
            </p>
          </div>
          <div className='flex gap-3'>
            <CustomButton
              buttonText='Upload Well Program'
              buttonColor='bg-brandPurple'
              className='text-white text-sm py-2 px-4 rounded-lg'
              textColor='text-white'
              onClick={() => {
                document.getElementById("well_program_upload").showModal();
              }}
            />
            <CustomButton
              buttonText='Create Well Program'
              buttonColor='bg-white'
              className='border border-gray-300 text-sm py-2 px-4 rounded-lg'
              textColor='text-gray-700'
              onClick={() => {
                setSelected(null);
                document.getElementById("add_well_program").showModal();
              }}
            />
          </div>
        </div>

        {/* Search and Filter Bar */}
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-4'>
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
            <button
              className='flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50'
              onClick={() =>
                document.getElementById("well_program_filter").showModal()
              }
            >
              <svg
                className='w-4 h-4'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.707A1 1 0 013 7V4z'
                />
              </svg>
              Filter
              <svg
                className='w-4 h-4'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M19 9l-7 7-7-7'
                />
              </svg>
            </button>
          </div>
          <button className='text-brandPurple font-medium text-sm hover:text-purple-700 transition-colors'>
            View All
          </button>
        </div>

        {/* Well Programs Table */}

        <div className='h-[67vh] w-full relative'>
          <TablesComponent
            data={wellPrograms}
            getFormattedValue={getFormattedValue}
            headers={headers}
            // setSelectedRows={setSelectedRows}
            // selectedRows={selectedRows}
            toggleRowFunction={() => {}}
            toggleSelectAllFunction={() => {}}
            options={options}
            popUpFunction={(_, index, val) => {
              setSelected(val);
              if (index === 0) {
                setSelected(val);
                document.getElementById("well_program_detail").showModal();
              }
              if (index === 3) {
                setSelected(val);
                document.getElementById("add_well_program").showModal();
              }
              if (index === 2) {
                setSelected(val);
                document.getElementById("status_update").showModal();
              }

              if (index === 1) {
                setSelected(val.id);
                document.getElementById("admin_delete").showModal();
              }
            }}
            showCheckBox={true}
            cellClassName={"w-[243px]"}
          />
        </div>
        {totalItems > 5 && (
          <div className='flex items-center justify-between mt-4'>
            {/* Page Size Dropdown */}
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
              {" "}
              {startItem} - {endItem} of {totalItems} row
              {totalItems > 1 && "s"}
            </p>
          </div>
        )}
      </div>

      {/* Modals */}
      <DataUploadModal modalId='well_program_upload' />
      <CreateWellProgramModal details={selected} />
      <WellProgramFilterModal
        onApplyFilter={handleApplyFilter}
        currentFilters={filters}
      />
      <WellProgramDetailModal
        modalId='well_program_detail'
        programDetails={selected}
      />
      <StatusUpdateModal
        modalId='status_update'
        programDetails={selected}
        onUpdateStatus={handleStatusUpdate}
      />

      <AdminDeleteConfirmationModal
        body={`Deleting this analysis is irreversible!`}
        title={"Delete Analysis"}
        buttonText={"Delete Analysis"}
        // isLoading={deleting}
        onClick={handleDelete}
      />
    </BaseDashboardNavigation>
  );
};

export default WellsProgram;
