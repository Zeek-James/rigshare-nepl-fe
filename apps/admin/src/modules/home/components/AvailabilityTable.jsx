import { useState } from "react";
import TablesComponent from "../../../generalComponents/TablesComponent";
import PaginationRounded from "../../../generalComponents/Pagination";
import { EquipmentShareProgress } from "./EquipmentShareProgress";
import { NPTRecord } from "./NPTRecord";

export const AvailabilityTable = (miniPageSize = 20) => {
  const [pageSize, setPageSize] = useState(miniPageSize); // Default rows per page
  const [currentPage, setCurrentPage] = useState(1);
  console.log({ currentPage });

  const handlePageSizeChange = (event) => {
    setPageSize(Number(event.target.value));
    setCurrentPage(1); // Reset to first page when page size changes
  };
  const headers = ["Period", "Lease Tracker", "Booked By", "Notes", "Status"];
  return (
    <div className='flex flex-col gap-6'>
      <div className='w-full mt-6'>
        <div className='h-[67vh] w-full relative'>
          {
            <TablesComponent
              // isLoading={isLoading}
              data={[]}
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
          }
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
      <div className='flex justify-between gap-6'>
        <div className='flex-1'>
          <EquipmentShareProgress />
        </div>
        <div className='flex-1'>
          <NPTRecord />
        </div>
      </div>
    </div>
  );
};

// <tbody>
//   {equipment.availabilitySchedule.map((item, index) => (
//     <tr key={index} className='border-b'>
//       <td className='py-3 px-4'>{item.period}</td>
//       <td className='py-3 px-4'>
//         {item.leaseTracker !== "-" && (
//           <div className='w-full bg-gray-200 rounded-full h-2'>
//             <div
//               className='bg-green-600 h-2 rounded-full'
//               style={{ width: item.leaseTracker }}
//             ></div>
//           </div>
//         )}
//         {item.leaseTracker !== "-" && (
//           <span className='text-xs'>{item.leaseTracker}</span>
//         )}
//       </td>
//       <td className='py-3 px-4'>{item.bookedBy}</td>
//       <td className='py-3 px-4'>{item.notes}</td>
//       <td className='py-3 px-4'>
//         <span
//           className={`px-2 py-1 rounded-full text-xs ${
//             item.status === "Available"
//               ? "bg-green-100 text-green-800"
//               : item.status === "In Use"
//               ? "bg-red-100 text-red-800"
//               : item.status === "Under Maintenance"
//               ? "bg-yellow-100 text-yellow-800"
//               : "bg-gray-100 text-gray-800"
//           }`}
//         >
//           {item.status}
//         </span>
//       </td>
//     </tr>
//   ))}
// </tbody>;
