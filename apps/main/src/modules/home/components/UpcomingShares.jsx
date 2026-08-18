import { useState } from "react";
import TablesComponent from "../../../generalComponents/TablesComponent";
import PaginationRounded from "../../../generalComponents/Pagination";

export const UpComingShares = (miniPageSize = 20) => {
  const [pageSize, setPageSize] = useState(miniPageSize); // Default rows per page
  const [currentPage, setCurrentPage] = useState(1);
  console.log({ currentPage });

  const handlePageSizeChange = (event) => {
    setPageSize(Number(event.target.value));
    setCurrentPage(1); // Reset to first page when page size changes
  };
  const headers = [
    "Operator",
    "Lease Tracker",
    "Lease Start Date",
    "Lease End Date",
  ];
  return (
    <div className='flex flex-col gap-6'>
      <div className=' w-full mt-6'>
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
    </div>
  );
};
