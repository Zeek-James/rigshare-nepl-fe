import { useState } from "react";
import TablesComponent from "../../../generalComponents/TablesComponent";
import PaginationRounded from "../../../generalComponents/Pagination";
import { Link } from "react-router-dom";

export const EquipmentList = (miniPageSize = 20) => {
  const [pageSize, setPageSize] = useState(miniPageSize); // Default rows per page
  const [currentPage, setCurrentPage] = useState(1);

  // Mock equipment data - same as grid view
  const mockEquipment = [
    {
      id: 1,
      name: "Hydraulic Drilling Rig HD-3000",
      category: "Mechanical",
      owner: "Chevron",
      location: "Lagos, Nigeria",
      status: "Available",
    },
    {
      id: 2,
      name: "Compressor X200",
      category: "Pressure Equipment",
      owner: "Shell",
      location: "Warri, Nigeria",
      status: "In Use",
    },
    {
      id: 3,
      name: "Crawler Excavator EX75",
      category: "Mining Equipment",
      owner: "OilPro",
      location: "Port Harcourt, Nigeria",
      status: "Scheduled",
    },
    {
      id: 4,
      name: "Storage Tank ST-45",
      category: "Stationary Equipment",
      owner: "ExxonMobil",
      location: "Delta, Nigeria",
      status: "Available",
    },
    {
      id: 5,
      name: "Fire Suppression Unit FSU-15",
      category: "Firefighting Equipment",
      owner: "NNPC",
      location: "Bayelsa, Nigeria",
      status: "Under Maintenance",
    },
  ];

  const handlePageSizeChange = (event) => {
    setPageSize(Number(event.target.value));
    setCurrentPage(1); // Reset to first page when page size changes
  };

  const headers = [
    "Image",
    "Equipment Name",
    "Category",
    "Owner",
    "Location",
    "Status",
    "More",
  ];

  // Transform data for table component
  const tableData = mockEquipment.map((equipment) => ({
    id: equipment.id,
    Image: (
      <div className='w-12 h-12 bg-gray-200 rounded flex items-center justify-center'>
        <span className='text-xs text-gray-500'>IMG</span>
      </div>
    ),
    "Equipment Name": (
      <Link
        to={`/equipment/${equipment.id}`}
        className='text-blue-600 hover:text-blue-800 hover:underline'
      >
        {equipment.name}
      </Link>
    ),
    Category: equipment.category,
    Owner: equipment.owner,
    Location: equipment.location,
    Status: (
      <span
        className={`px-2 py-1 rounded-full text-xs ${
          equipment.status === "Available"
            ? "bg-green-100 text-green-800"
            : equipment.status === "In Use"
            ? "bg-red-100 text-red-800"
            : equipment.status === "Scheduled"
            ? "bg-yellow-100 text-yellow-800"
            : equipment.status === "Under Maintenance"
            ? "bg-orange-100 text-orange-800"
            : "bg-gray-100 text-gray-800"
        }`}
      >
        {equipment.status}
      </span>
    ),
    More: <button className='text-gray-500 hover:text-gray-700'>•••</button>,
  }));

  return (
    <div className='w-full'>
      <div className='h-[67vh] w-full relative'>
        <TablesComponent
          data={[]}
          // data={tableData}
          // data={data?.data?.results}
          // getFormattedValue={getFormattedValue}
          headers={headers}
          // setSelectedRows={setSelectedRows}
          // selectedRows={selectedRows}
          toggleRowFunction={() => {}}
          toggleSelectAllFunction={() => {}}
          // options={options}
          // popUpFunction={(option, index, val) => {
          //   setSelected(val);
          //   if (index === 0) {
          //     setSelected(val);
          //     document.getElementById("view_analysis").showModal();
          //   }
          //   if (index === 2) {
          //     setSelected(val);
          //     document.getElementById("add_financial").showModal();
          //   }

          //   if (index === 1) {
          //     setSelected(val.id);
          //     document.getElementById("admin_delete").showModal();
          //   }
          // }}
          showCheckBox={true}
          cellClassName={"w-[243px]"}
        />
      </div>
      {pageSize > 5 && (
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
            // defaultPage={data?.data?.pagination?.page}
            // count={data?.data?.pagination?.total_pages}
            onChange={(page) => {
              setCurrentPage(page);
            }}
          />
          {/* <p className='text-14px text-brandBlack'>
            {" "}
            {startItem} - {endItem} of {data?.data?.pagination?.count} row
            {data?.data?.pagination?.count > 1 && "s"}
          </p> */}
        </div>
      )}
    </div>
  );
};
