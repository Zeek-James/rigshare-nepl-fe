import { useState } from "react";
import useDebounce from "../../../utils/UseDebounce";
import { calculatePaginationRange } from "../../../utils/calculatePaginationRange";
import SearchField from "../../../generalComponents/SearchField";
import { hasPermissions } from "../../../constants/permissions";
import ButtonWithIcon from "../../../generalComponents/ButtonWithIcon";
import { BiUpload } from "react-icons/bi";
import { IoFilter } from "react-icons/io5";
import { IoChevronDown } from "react-icons/io5";
import TablesComponent from "../../../generalComponents/TablesComponent";
import PaginationRounded from "../../../generalComponents/Pagination";
import AuditDataModal from "./AuditDataModal";
import useFinancialDataManager from "../controllers/useGetAuditLogsController";
import DataUploadModal from "../../../generalComponents/DataUploadModal";
import { UploadFinancialDataManager } from "../controllers/uploadAuditLogController";
import useGetAuditLogManager from "../controllers/useGetAuditLogsController";

const AuditData = ({ status }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selected, setSelected] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  const [pageSize, setPageSize] = useState(20); // Default rows per page
  const debouncedSearchValue = useDebounce(`&search=${searchValue}`, 1000);

  const { data, isLoading } = useGetAuditLogManager({
    page: 1,
    enabled: true,
    searchQuery: searchValue && debouncedSearchValue,
    pageSize: pageSize,
  });

  const {
    uploadFinancialData,
    isSuccess,
    isLoading: uploading,
  } = UploadFinancialDataManager();

  const { startItem, endItem } = calculatePaginationRange(
    data?.data?.pagination
  );

  const handlePageSizeChange = (event) => {
    setPageSize(Number(event.target.value));
    setCurrentPage(1); // Reset to first page when page size changes
  };

  const headers = [
    "S/N",
    "User",
    "Activity",
    "Module",
    "Details",
    "Date",
    "Action",
  ];

  const options = [{ label: "View ", permissions: ["view_financial"] }];

  const getFormattedValue = (el, index) => {
    const user = el?.user;

    return [
      index + 1,
      <span>
        {user?.first_name}
        {"   "} {user?.last_name}
      </span>,
      el?.activity,

      el?.ebitda,
      el?.oil_revenue,
      <span>{new Date(el?.activity_datetime).toLocaleDateString()}</span>,
    ];
  };

  return (
    <div>
      <div>
        <div className='mt-2 md:mt-6 flex flex-col w-full gap-4'>
          <div className='flex flex-col md:flex-row justify-between items-center'>
            <div className='flex gap-2'>
              <SearchField
                onChange={(e) => setSearchValue(e.target.value)}
                value={searchValue}
              />{" "}
              <ButtonWithIcon
                buttonText={"Filter"}
                buttonColor={"bg-brandGray border"}
                textColor={"text-[#6C757D]"}
                radius={"md"}
                prefix={IoFilter}
                icon={IoChevronDown}
                onClick={() => {
                  // document.getElementById("add_financial").showModal();
                }}
              />
            </div>

            {/* <div
              className={`${
                hasPermissions(["view_financial"]) ? "" : "hidden"
              } `}
            >
              <div
                className={`transition-all duration-[300ms] ease-in-out flex items-center space-x-[10px] justify-end`}
              >
                <ButtonWithIcon
                  buttonText={"Upload Audit Log"}
                  icon={BiUpload}
                  radius={"md"}
                  buttonColor={"bg-brandGray border"}
                  textColor={"text-[#6C757D]"}
                  onClick={() => {
                    document.getElementById("audit_upload").showModal();
                  }}
                />
              </div>
            </div> */}
          </div>
          <div className='h-[67vh] w-full relative'>
            {
              <TablesComponent
                isLoading={isLoading}
                data={data?.data?.results}
                getFormattedValue={getFormattedValue}
                headers={headers}
                setSelectedRows={setSelectedRows}
                selectedRows={selectedRows}
                toggleRowFunction={() => {}}
                toggleSelectAllFunction={() => {}}
                options={options}
                popUpFunction={(option, index, val) => {
                  setSelected(val);
                  if (index === 0) {
                    setSelected(val);
                    document.getElementById("view_log").showModal();
                  }
                }}
                showCheckBox={true}
                cellClassName={"w-[243px]"}
              />
            }
          </div>
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
              defaultPage={data?.data?.pagination?.page}
              count={data?.data?.pagination?.total_pages}
              onChange={(page) => {
                setCurrentPage(page);
              }}
            />
            <p className='text-14px text-brandBlack'>
              {" "}
              {startItem} - {endItem} of {data?.data?.pagination?.count} row
              {data?.data?.pagination?.count > 1 && "s"}
            </p>
          </div>
        </div>
      </div>
      <AuditDataModal details={selected} />
      <DataUploadModal
        modalId={"finance_upload"}
        title={"Financial Data Upload"}
        uploadManager={uploadFinancialData}
        isSuccess={isSuccess}
        uploading={uploading}
      />
    </div>
  );
};

export default AuditData;
