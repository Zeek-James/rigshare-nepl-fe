import React, { useEffect, useState } from "react";
import PaginationRounded from "../../../../generalComponents/Pagination";
import TablesComponent from "../../../../generalComponents/TablesComponent";
import { useNavigate } from "react-router-dom";
import ButtonWithIcon from "../../../../generalComponents/ButtonWithIcon";
import { AiOutlinePlusCircle } from "react-icons/ai";
import useGetRolesManager from "../controllers/get_roles_controller";
import { DeleteRoleManager } from "../controllers/deleteRoleController";
import useDebounce from "../../../../utils/UseDebounce";
import SearchField from "../../../../generalComponents/SearchField";
import AdminDeleteConfirmationModal from "../../../../generalComponents/AdminDeleteConfirmationModal";
import { calculatePaginationRange } from "../../../../utils/calculatePaginationRange";
import { hasPermissions } from "../../../../constants/permissions";
const RolesAndPermission = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const debouncedSearchValue = useDebounce(`&search=${searchValue}`, 1000);

  const { data, isLoading } = useGetRolesManager({
    enabled: true,
    searchQuery: debouncedSearchValue,
    page: currentPage,
  });

  const { startItem, endItem } = calculatePaginationRange(
    data?.data?.pagination
  );

  const headers = ["Role Name", "No. of Users", "No. of Permissions", "Action"];

  const getFormattedValue = (role, index) => {
    return [
      <span>{role.name}</span>,
      <span>{role.total_users}</span>,
      <span>{role.total_permissions}</span>,
    ];
  };

  const options = [
    { label: "Edit Role", permissions: ["change_role"] },
    { label: "Delete Role", permissions: ["delete_role"] },
  ];

  const {
    deleteRole,
    isLoading: deleting,
    isSuccess: deleted,
  } = DeleteRoleManager({ id: selected });

  const handleDelete = async () => {
    await deleteRole();
  };

  useEffect(() => {
    if (deleted) {
      setTimeout(() => {
        document.getElementById("admin_delete").close();
      }, 1000);
    }
  }, [deleted]);

  return (
    <div className='flex flex-col w-full gap-5'>
      <div className='flex flex-col md:flex-row mt-2 justify-between gap-y-5'>
        <div className='flex items-center gap-3'>
          <SearchField
            onChange={(e) => setSearchValue(e.target.value)}
            value={searchValue}
          />
        </div>
        <div
          className={`${
            hasPermissions(["add_role"])
              ? "flex items-center space-x-[10px]"
              : "hidden"
          } `}
        >
          <ButtonWithIcon
            buttonText={"Create New Role"}
            icon={AiOutlinePlusCircle}
            radius={"md"}
            onClick={() => {
              navigate("/create-role");
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
          popUpFunction={(option, index, val) => {
            console.log(option, index, val);
            setSelected(val);
            if (index === 0) {
              navigate(`/edit-role/${val?.id}`);
            }
            if (index === 1) {
              setSelected(val.id);
              document.getElementById("admin_delete").showModal();
            }
          }}
          options={options}
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
        body={`Are you sure you want to delete this role?`}
        title={"Delete Role"}
        buttonText={"Yes, Delete"}
        isLoading={deleting}
        onClick={handleDelete}
      />
    </div>
  );
};
export default RolesAndPermission;
