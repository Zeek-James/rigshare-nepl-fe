import React, { useState } from "react";
import BaseDashboardNavigation from "../../../generalComponents/BaseDashboardNavigation";
import CustomButton from "../../../generalComponents/Button";
import PaginationRounded from "../../../generalComponents/Pagination";
import TablesComponent from "../../../generalComponents/TablesComponent";

const CompletedLease = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [pageSize, setPageSize] = useState(20);
  const [currentPage, setCurrentPage] = useState(1);
  const [selected, setSelected] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all'); // 'all', 'leasing', 'renting'
  const [statusFilter, setStatusFilter] = useState('all'); // 'all', 'completed', 'terminated', 'expired'

  // Mock data for completed leases
  const completedLeaseData = [
    {
      id: 1,
      leaseId: "LEASE-0392",
      equipmentName: "Rig HD-3000",
      counterparty: "Shell",
      role: "Lessor",
      period: "May 15 - Jun 10",
      completionDate: "Apr 11, 2025"
    },
    {
      id: 2,
      leaseId: "LEASE-0359",
      equipmentName: "Tank ST-90",
      counterparty: "OilPro",
      role: "Lessee",
      period: "Feb 1 - Feb 20",
      completionDate: "Feb 20, 2025"
    },
    {
      id: 3,
      leaseId: "LEASE-0360",
      equipmentName: "Pump XR-22",
      counterparty: "AquaFlow",
      role: "Lessor",
      period: "Mar 10 - Mar 30",
      completionDate: "Mar 30, 2025"
    },
    {
      id: 4,
      leaseId: "LEASE-0361",
      equipmentName: "Reactor RX-75",
      counterparty: "ChemCorp",
      role: "Lessee",
      period: "Apr 5 - Apr 25",
      completionDate: "Apr 25, 2025"
    },
    {
      id: 5,
      leaseId: "LEASE-0362",
      equipmentName: "Compressor C-45",
      counterparty: "GasTech",
      role: "Lessor",
      period: "May 15 - Jun 5",
      completionDate: "Jun 5, 2025"
    },
    {
      id: 6,
      leaseId: "LEASE-0363",
      equipmentName: "Separator SE-80",
      counterparty: "PetroMax",
      role: "Lessee",
      period: "Jul 1 - Jul 21",
      completionDate: "Jul 21, 2025"
    }
  ];

  const headers = [
    "Lease ID",
    "Equipment",
    "Counterparty",
    "Role",
    "Period",
    "Completion Date",
    "More"
  ];

  const options = [
    { label: "View Details", permissions: ["view_lease"] },
    { label: "Download Contract", permissions: ["view_lease"] },
    { label: "Payment Records", permissions: ["view_lease"] },
    { label: "Performance Report", permissions: ["view_lease"] },
    { label: "Archive Record", permissions: ["change_lease"] }
  ];

  const filteredData = completedLeaseData.filter(item => {
    const matchesSearch = item.equipmentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
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
      <span className="font-medium text-gray-900">{el?.leaseId}</span>,
      <span className="font-medium text-gray-900">{el?.equipmentName}</span>,
      <span className="text-gray-900">{el?.counterparty}</span>,
      <span className="text-gray-900">{el?.role}</span>,
      <span className="text-gray-900">{el?.period}</span>,
      <span className="text-gray-900">{el?.completionDate}</span>
    ];
  };

  const handleAction = (index, val) => {
    setSelected(val);
    switch (index) {
      case 0: // View Details
        document.getElementById("completed_lease_detail").showModal();
        break;
      case 1: // Download Contract
        console.log("Download contract for:", val);
        break;
      case 2: // Payment Records
        document.getElementById("payment_records").showModal();
        break;
      case 3: // Performance Report
        document.getElementById("performance_report").showModal();
        break;
      case 4: // Archive Record
        document.getElementById("archive_record").showModal();
        break;
      default:
        break;
    }
  };


  return (
    <BaseDashboardNavigation
      title="Completed Lease"
      breadcrumbs={[
        { label: "Home", path: "/" },
        { label: "Lease", path: "#" },
        { label: "Completed Lease", path: "/completed-lease" }
      ]}
    >
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Completed Leases</h1>
            <p className="text-gray-600">
              View history of all finalized leases, including contracts and post-lease documentation.
            </p>
          </div>
          <div className="flex gap-3">
            <span className="text-sm text-brandPurple cursor-pointer hover:text-brandPurple/80">
              View All
            </span>
          </div>
        </div>

        {/* Search and Filter Bar */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Equipment Name / Lease ID"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 w-80 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brandPurple focus:border-brandPurple"
              />
              <svg
                className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.707A1 1 0 013 7V4z" />
              </svg>
              <span className="text-sm text-gray-600">Filter</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-brandPurple cursor-pointer hover:text-brandPurple/80">
              View All
            </span>
          </div>
        </div>

        {/* Completed Lease Table */}
        <div className="h-[67vh] w-full relative">
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
          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center gap-2">
              <label htmlFor="pageSize" className="text-sm">
                Rows per page
              </label>
              <select
                id="pageSize"
                className="border p-1 rounded"
                value={pageSize}
                onChange={handlePageSizeChange}
              >
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="50">50</option>
                <option value="100">100</option>
              </select>
            </div>

            <PaginationRounded
              defaultPage={currentPage}
              count={totalPages}
              onChange={(page) => {
                setCurrentPage(page);
              }}
            />

            <p className="text-14px text-brandBlack">
              {startItem} - {endItem} of {totalItems} row{totalItems > 1 && "s"}
            </p>
          </div>
        )}
      </div>
    </BaseDashboardNavigation>
  );
};

export default CompletedLease;