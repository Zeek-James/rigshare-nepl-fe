import React, { useState } from "react";
import BaseDashboardNavigation from "../../../generalComponents/BaseDashboardNavigation";
import CustomButton from "../../../generalComponents/Button";
import PaginationRounded from "../../../generalComponents/Pagination";
import TablesComponent from "../../../generalComponents/TablesComponent";
import AdminDeleteConfirmationModal from "../../../generalComponents/AdminDeleteConfirmationModal";
import LeaseDetailModal from "../components/LeaseDetailModal";

const ActiveLease = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [pageSize, setPageSize] = useState(20);
  const [currentPage, setCurrentPage] = useState(1);
  const [selected, setSelected] = useState(null);
  const [activeFilter, setActiveFilter] = useState("all"); // 'all', 'leasing', 'renting'

  // Mock data for active leases
  const activeLeaseData = [
    {
      id: 1,
      leaseId: "LEASE-0392",
      equipmentName: "Rig HD-3000",
      counterparty: "Shell",
      role: "Lessor",
      period: "May 15 - Jun 10",
      status: "Active",
      statusColor: "bg-green-100 text-green-800",
    },
    {
      id: 2,
      leaseId: "LEASE-0387",
      equipmentName: "Compressor X200",
      counterparty: "Chevron",
      role: "Lessee",
      period: "May 5 - May 19",
      status: "Active",
      statusColor: "bg-green-100 text-green-800",
    },
    {
      id: 3,
      leaseId: "LEASE-0453",
      equipmentName: "Generator Y300",
      counterparty: "ExxonMobil",
      role: "Lessor",
      period: "June 1 - June 15",
      status: "Active",
      statusColor: "bg-green-100 text-green-800",
    },
    {
      id: 4,
      leaseId: "LEASE-0521",
      equipmentName: "Excavator Z150",
      counterparty: "Shell",
      role: "Lessee",
      period: "July 10 - July 24",
      status: "Active",
      statusColor: "bg-green-100 text-green-800",
    },
    {
      id: 5,
      leaseId: "LEASE-0612",
      equipmentName: "Backhoe A400",
      counterparty: "BP",
      role: "Lessor",
      period: "Aug 15 - Aug 29",
      status: "Active",
      statusColor: "bg-green-100 text-green-800",
    },
    {
      id: 6,
      leaseId: "LEASE-0704",
      equipmentName: "Forklift B600",
      counterparty: "Total",
      role: "Lessee",
      period: "Sep 5 - Sep 19",
      status: "Active",
      statusColor: "bg-green-100 text-green-800",
    },
  ];

  const headers = [
    "Lease ID",
    "Equipment",
    "Counterparty",
    "Role",
    "Period",
    "Status",
    "More",
  ];

  const options = [
    { label: "View Contract" },
    { label: "Update Terms", permissions: ["change_lease"] },
    { label: "Payment History", permissions: ["view_lease"] },
    { label: "Extend Lease", permissions: ["change_lease"] },
    { label: "Terminate Early", permissions: ["delete_lease"] },
  ];

  const filteredData = activeLeaseData.filter((item) => {
    const matchesSearch =
      item.equipmentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.counterparty.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.leaseId.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesSearch;
  });

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
      <span className='font-medium text-gray-900'>{el?.leaseId}</span>,
      <span className='font-medium text-gray-900'>{el?.equipmentName}</span>,
      <span className='text-gray-900'>{el?.counterparty}</span>,
      <span className='text-gray-900'>{el?.role}</span>,
      <span className='text-gray-900'>{el?.period}</span>,
      <span
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${el?.statusColor}`}
      >
        {el?.status}
      </span>,
    ];
  };

  const handleAction = (index, val) => {
    setSelected(val);
    switch (index) {
      case 0: // View Contract
        document.getElementById("lease_detail_modal").showModal();
        break;
      case 1: // Update Terms
        document.getElementById("update_terms").showModal();
        break;
      case 2: // Payment History
        document.getElementById("payment_history").showModal();
        break;
      case 3: // Extend Lease
        document.getElementById("extend_lease").showModal();
        break;
      case 4: // Terminate Early
        document.getElementById("admin_delete").showModal();
        break;
      default:
        break;
    }
  };

  const handleDelete = (lease) => {
    console.log("Terminate lease:", lease);
  };

  return (
    <BaseDashboardNavigation
      title='Active Lease'
      breadcrumbs={[
        { label: "Home", path: "/" },
        { label: "Lease", path: "#" },
        { label: "Active Lease", path: "/active-lease" },
      ]}
    >
      <div className='space-y-6'>
        {/* Header */}
        <div className='flex justify-between items-start'>
          <div>
            <h1 className='text-2xl font-bold text-gray-900 mb-2'>
              Active Leases
            </h1>
            <p className='text-gray-600'>
              View and manage all lease contracts currently in effect.
            </p>
          </div>
          <div className='flex gap-3'>
            <span className='text-sm text-brandPurple cursor-pointer hover:text-brandPurple/80'>
              View All
            </span>
          </div>
        </div>

        {/* Search and Filter Bar */}
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-4'>
            <div className='relative'>
              <input
                type='text'
                placeholder='Equipment Name / Lease ID'
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
            <div className='flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg'>
              <svg
                className='w-4 h-4 text-gray-400'
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
              <span className='text-sm text-gray-600'>Filter</span>
            </div>
          </div>
          <div className='flex items-center gap-2'>
            <span className='text-sm text-brandPurple cursor-pointer hover:text-brandPurple/80'>
              View All
            </span>
          </div>
        </div>

        {/* Active Lease Table */}
        <div className='h-[67vh] w-full relative'>
          <TablesComponent
            data={filteredData}
            getFormattedValue={getFormattedValue}
            headers={headers}
            toggleRowFunction={() => {}}
            toggleSelectAllFunction={() => {}}
            options={options}
            popUpFunction={(_, index, val) => handleAction(index, val)}
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

      {/* Modals */}
      <LeaseDetailModal leaseData={selected} modalId='lease_detail_modal' />
      <AdminDeleteConfirmationModal
        body='Terminating this lease contract early may incur penalties!'
        title='Terminate Lease Contract'
        buttonText='Terminate Contract'
        onClick={() => handleDelete(selected)}
      />
    </BaseDashboardNavigation>
  );
};

export default ActiveLease;
