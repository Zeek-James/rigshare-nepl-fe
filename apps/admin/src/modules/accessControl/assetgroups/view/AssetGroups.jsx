import React, { useEffect, useState } from "react";

import PaginationRounded from "../../../../generalComponents/Pagination";
import TablesComponent from "../../../../generalComponents/TablesComponent";
import ButtonWithIcon from "../../../../generalComponents/ButtonWithIcon";
import SearchField from "../../../../generalComponents/SearchField";
import { AiOutlinePlusCircle } from "react-icons/ai";
import AssetGroupModals from "./AssetGroupModals";
import useGetAssetGroupsManager from "../controllers/getAssetGroupsController";
import BaseDashboardNavigation from "../../../../generalComponents/BaseDashboardNavigation";
import { calculatePaginationRange } from "../../../../utils/calculatePaginationRange";
import useDebounce from "../../../../utils/UseDebounce";
import AdminDeleteConfirmationModal from "../../../../generalComponents/AdminDeleteConfirmationModal";
import { DeleteAssetGroupManager } from "../controllers/deleteAssetGroupController";
import { hasPermissions } from "../../../../constants/permissions";
const AssetGroups = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selected, setSelected] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const debouncedSearchValue = useDebounce(`&search=${searchValue}`, 1000);
  const { data, isLoading } = useGetAssetGroupsManager({
    enabled: true,
    searchQuery: debouncedSearchValue,
    page: currentPage,
  });

  const { startItem, endItem } = calculatePaginationRange(
    data?.data?.pagination
  );

  const headers = ["Name", "Funding", "Companies", "Action"];

  const getFormattedValue = (el) => {
    return [
      <span>{el?.name}</span>,
      <span>{el?.funding_tranche.toUpperCase()}</span>,
      <span className='flex gap-x-2'>{el?.clients_count}</span>,
    ];
  };

  const options = [
    { label: "Edit Asset Group", permissions: ["change_assetgroup"] },
    { label: "Delete Asset Group", permissions: ["delete_assetgroup"] },
  ];

  const {
    deleteAssetGroup,
    isLoading: deleting,
    isSuccess: deleted,
  } = DeleteAssetGroupManager({ id: selected });

  const handleDelete = async () => {
    await deleteAssetGroup();
  };

  useEffect(() => {
    if (deleted) {
      document.getElementById("admin_delete").close();
    }
  }, [deleted]);

  return (
    <BaseDashboardNavigation
      title='Asset Groups'
      subtitle='Displays an overview of operation data and allows navigation to different actions.'
      breadcrumbs={[
        { label: "Dashboard", path: "/dashboard" },
        { label: "Asset Groups", path: "/project" },
      ]}
    >
      <div className='flex flex-col w-full gap-5'>
        <div className='flex flex-col md:flex-row items-start md:items-center justify-between w-full'>
          <div className='flex items-center mb-2 md:mb-0'>
            <h3 className='text-[24px] font-bold'>Asset Groups</h3>
          </div>
        </div>
        <div className='flex flex-col md:flex-row mt-2 justify-between gap-y-5'>
          <div className='flex items-center gap-3'>
            <SearchField
              onChange={(e) => setSearchValue(e.target.value)}
              value={searchValue}
            />{" "}
          </div>
          <div
            className={`${
              hasPermissions(["add_assetgroup"])
                ? "flex items-center space-x-[10px]"
                : "hidden"
            } `}
          >
            <ButtonWithIcon
              buttonText={"Create Asset Group"}
              icon={AiOutlinePlusCircle}
              radius={"md"}
              onClick={() => {
                document.getElementById("create_asset_group").showModal();
              }}
            />
          </div>
        </div>
        <div className='h-[67vh] w-full relative'>
          <TablesComponent
            isLoading={isLoading}
            data={data?.data?.results}
            getFormattedValue={getFormattedValue}
            headers={headers}
            setSelectedRows={setSelectedRows}
            selectedRows={selectedRows}
            toggleRowFunction={() => {}}
            toggleSelectAllFunction={() => {}}
            buttonFunction={(val) => {
              console.log(val);
            }}
            options={options}
            popUpFunction={(option, index, val) => {
              console.log(option, index, val);
              setSelected(val);
              if (index === 0) {
                document.getElementById("create_asset_group").showModal();
              }
              if (index === 1) {
                setSelected(val.id);
                document.getElementById("admin_delete").showModal();
              }
            }}
            showCheckBox={true}
          />
        </div>
        <div className='flex items-center justify-between mt-4'>
          <p className='text-14px text-brandBlack'>
            {" "}
            {startItem} - {endItem} of {data?.data?.pagination?.count} users
          </p>
          <PaginationRounded
            defaultPage={data?.data?.pagination?.page}
            count={data?.data?.pagination?.total_pages}
            onChange={(page) => {
              setCurrentPage(page);
            }}
          />
        </div>
        <AdminDeleteConfirmationModal
          body={`Are you sure you want to delete this asset group?`}
          title={"Delete Asset Group"}
          buttonText={"Yes, Delete"}
          isLoading={deleting}
          onClick={handleDelete}
        />
        <AssetGroupModals details={selected} />
      </div>
    </BaseDashboardNavigation>
  );
};
export default AssetGroups;
