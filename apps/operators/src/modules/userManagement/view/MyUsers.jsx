import React, { useState } from "react";
import BaseDashboardNavigation from "../../../generalComponents/BaseDashboardNavigation";
import CustomButton from "../../../generalComponents/Button";
import TablesComponent from "../../../generalComponents/TablesComponent";
import PaginationRounded from "../../../generalComponents/Pagination";
import AddUserModal from "../components/AddUserModal";

const MyUsers = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [pageSize, setPageSize] = useState(20);
  const [currentPage, setCurrentPage] = useState(1);
  const [selected, setSelected] = useState(null);

  // Mock data for users
  const usersData = [
    {
      id: 1,
      name: "Engr. Chinyere A.",
      role: "Inspection Officer",
      email: "chinyere@shell.ng",
      lastLogin: "May 11",
      status: "Active",
      statusColor: "bg-green-100 text-green-800"
    },
    {
      id: 2,
      name: "Tunde Bayo",
      role: "Operations Lead",
      email: "tunde.bayo@shell.ng",
      lastLogin: "Apr 25",
      status: "Suspended",
      statusColor: "bg-red-100 text-red-800"
    },
    {
      id: 3,
      name: "Ngozi Kalu",
      role: "Admin",
      email: "ngozi.kalu@shell.ng",
      lastLogin: "May 12",
      status: "Active",
      statusColor: "bg-green-100 text-green-800"
    },
    {
      id: 4,
      name: "Adaeze Okafor",
      role: "Project Manager",
      email: "adaeze.okafor@shell.ng",
      lastLogin: "May 10",
      status: "Active",
      statusColor: "bg-green-100 text-green-800"
    },
    {
      id: 5,
      name: "Emeka Ugochukwu",
      role: "Safety Officer",
      email: "emeka.ugochukwu@shell.ng",
      lastLogin: "May 8",
      status: "Inactive",
      statusColor: "bg-gray-100 text-gray-800"
    },
    {
      id: 6,
      name: "Fatima Mohammed",
      role: "Quality Assurance",
      email: "fatima.mohammed@shell.ng",
      lastLogin: "May 9",
      status: "Active",
      statusColor: "bg-green-100 text-green-800"
    }
  ];

  const headers = [
    "Name",
    "Role", 
    "Email",
    "Last Login",
    "Status",
    "More"
  ];

  const options = [
    { label: "View Profile" },
    { label: "Edit User" },
    { label: "Change Role" },
    { label: "Suspend User" },
    { label: "Delete User" }
  ];

  const filteredData = usersData.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.role.toLowerCase().includes(searchQuery.toLowerCase());
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
      <span className="font-medium text-gray-900">{el?.name}</span>,
      <span className="text-gray-900">{el?.role}</span>,
      <span className="text-gray-900">{el?.email}</span>,
      <span className="text-gray-900">{el?.lastLogin}</span>,
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${el?.statusColor}`}>
        {el?.status}
      </span>
    ];
  };

  const handleAction = (index, val) => {
    setSelected(val);
    switch (index) {
      case 0: // View Profile
        console.log("View profile for:", val);
        break;
      case 1: // Edit User
        console.log("Edit user:", val);
        break;
      case 2: // Change Role
        console.log("Change role for:", val);
        break;
      case 3: // Suspend User
        console.log("Suspend user:", val);
        break;
      case 4: // Delete User
        console.log("Delete user:", val);
        break;
      default:
        break;
    }
  };

  const handleAddNewUser = () => {
    document.getElementById("add_user_modal").showModal();
  };

  const handleExportLog = () => {
    console.log("Export log clicked");
    // Add your export functionality here
  };

  return (
    <BaseDashboardNavigation
      title="My Users"
      breadcrumbs={[
        { label: "Dashboard", path: "/dashboard" },
        { label: "Reports and Analytics", path: "#" },
        { label: "My Users", path: "/my-users" }
      ]}
    >
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">My Users</h1>
            <p className="text-gray-600">
              Add and manage your internal users. Only authorized users can access your company dashboard on Rigshare.
            </p>
          </div>
          <div className="flex gap-3">
            <CustomButton
              buttonText="Export Log"
              buttonColor="bg-white"
              className="text-gray-700 text-sm py-2 px-4 rounded-lg border border-gray-300"
              textColor="text-gray-700"
              onClick={handleExportLog}
            />
            <CustomButton
              buttonText="+ Add New User"
              buttonColor="bg-brandPurple"
              className="text-white text-sm py-2 px-4 rounded-lg"
              textColor="text-white"
              onClick={handleAddNewUser}
            />
          </div>
        </div>

        {/* Search and Filter Bar */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Equipment name, owner name, location"
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
            <div className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg cursor-pointer">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.707A1 1 0 013 7V4z" />
              </svg>
              <span className="text-sm text-gray-600">Filter</span>
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        {/* Users Table */}
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
              {startItem} - {endItem} of {totalItems} user{totalItems > 1 && "s"}
            </p>
          </div>
        )}

        {/* Modals */}
        <AddUserModal modalId="add_user_modal" />
      </div>
    </BaseDashboardNavigation>
  );
};

export default MyUsers;