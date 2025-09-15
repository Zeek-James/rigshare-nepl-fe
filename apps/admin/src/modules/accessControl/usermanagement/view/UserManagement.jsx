import React, { useEffect, useState } from "react";
import PaginationRounded from "../../../../generalComponents/Pagination";
import TablesComponent from "../../../../generalComponents/TablesComponent";
import DropdownandSearch from "../../../../generalComponents/DropdownandSearch";
import ButtonWithIcon from "../../../../generalComponents/ButtonWithIcon";
import UserManagementModals from "./UserManagementModals";
import { BiPlus } from "react-icons/bi";
import useGetStaffManager from "../controllers/getUsersController";
import AvatarWithName from "../../../../generalComponents/AvatarWithName";
import { auditTrailIcon } from "../../../../assets/icons";
import StatusButton from "../../../../generalComponents/StatusButton";
import AdminDeleteConfirmationModal from "../../../../generalComponents/AdminDeleteConfirmationModal";
import { DeleteUserManager } from "../controllers/deleteUserController";
import { calculatePaginationRange } from "../../../../utils/calculatePaginationRange";
import useDebounce from "../../../../utils/UseDebounce";
import useGetRolesManager from "../../roles/controllers/get_roles_controller";
import { hasPermissions } from "../../../../constants/permissions";

const UserManagement = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selected, setSelected] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const debouncedSearchValue = useDebounce(`&search=${searchValue}`, 1000);

  const { data, isLoading } = useGetStaffManager({
    enabled: true,
    searchQuery: debouncedSearchValue,
    page: currentPage,
    role: selectedRole,
  });

  const { data: roleData } = useGetRolesManager({
    enabled: true,
    page: currentPage,
  });

  const roles = [
    "All Roles",
    ...(roleData?.data?.results?.map((role) => role?.name) || []),
  ];

  const { startItem, endItem } = calculatePaginationRange(
    data?.data?.pagination
  );

  const headers = ["User", "Roles", "Date Created", "Audit Trail", "Action"];

  const getFormattedValue = (el, index) => {
    const user = el?.user;
    const roles = el?.roles;
    return [
      <span>
        <AvatarWithName
          title={user?.first_name + " " + user?.last_name}
          subtitle={user?.email}
        />
      </span>,
      <span className='flex gap-x-2'>
        {roles.map((role, index) => (
          <div key={index}>
            <StatusButton status={role} />
          </div>
        ))}
      </span>,
      <span>{new Date(user?.created_datetime).toLocaleDateString()}</span>,
      <span className='flex items-center gap-1 text-brandGreen'>
        <a href={`/logs/${user.id}`}>
          <img
            src={auditTrailIcon}
            alt='Audit Trail'
            className='inline-block'
          />{" "}
          View Activity Log
        </a>
      </span>,
    ];
  };

  const options = [
    { label: "Edit User", permissions: ["change_staff"] },
    { label: "Delete User", permissions: ["delete_staff"] },
  ];

  const {
    deleteUser,
    isLoading: deleting,
    isSuccess: deleted,
  } = DeleteUserManager({
    id: selected,
  });

  const handleDelete = async () => {
    await deleteUser();
  };

  useEffect(() => {
    if (deleted) {
      document.getElementById("admin_delete").close();
    }
  }, [deleted]);

  return (
    <div className='flex flex-col w-full gap-5'>
      <div className='flex flex-col md:flex-row mt-2 justify-between gap-y-5'>
        <div className='flex items-center gap-3'>
          <DropdownandSearch
            dropdownplaceholder={"Filter by Role"}
            options={roles}
            onChange={(e) => setSearchValue(e.target.value)}
            value={searchValue}
            selectedOption={selectedRole}
            onSelect={(e) => {
              const selectedValue = e.target.value;
              setSelectedRole(
                selectedValue === "All Roles" ? "" : selectedValue
              );
            }}
          />
        </div>
        <div
          className={`${
            hasPermissions(["add_staff"])
              ? "flex items-center space-x-[10px]"
              : "hidden"
          } `}
        >
          <ButtonWithIcon
            buttonText={"Create New User"}
            icon={BiPlus}
            radius={"md"}
            onClick={() => {
              document.getElementById("create_user").showModal();
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
              document?.getElementById("create_user")?.showModal();
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
      <UserManagementModals details={selected?.id} />
      <AdminDeleteConfirmationModal
        body={`Are you sure you want to delete this user?`}
        title={"Delete User"}
        buttonText={"Yes, Delete"}
        isLoading={deleting}
        onClick={handleDelete}
      />
    </div>
  );
};

export default UserManagement;
