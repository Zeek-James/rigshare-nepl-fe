import React, { useState, useEffect } from "react";
import CustomButton from "../../../../generalComponents/Button";
import InputWithFullBoarder from "../../../../generalComponents/InputWithFullBoarder";
import ModalManagement from "../../../../generalComponents/ModalManagement";
import MultiSelectWithFullBorder from "../../../../generalComponents/MultiSelectWithFullBorder";
import useGetRolesManager from "../../roles/controllers/get_roles_controller";
import { UpdateStaffManager } from "../controllers/updateStaffController";
import useGetAssetGroupsManager from "../../assetgroups/controllers/getAssetGroupsController";
import useGetStaffById from "../controllers/getStaffByIdController";
import useDebounce from "../../../../utils/UseDebounce";
import { PostStaffManager } from "../controllers/postStaffController";
import Loader from "../../../../generalComponents/Loader";

const UserManagementModals = ({ details }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [roleOptions, setRoleOptions] = useState([]);
  const [selectedRoles, setSelectedRoles] = useState([]);
  const [assetGroupOptions, setAssetGroupOptions] = useState("");
  const [selectedAssetGroup, setSelectedAssetGroup] = useState([]);
  const [currentPage] = useState(1);
  const [searchValue] = useState("");
  const debouncedSearchValue = useDebounce(`&search=${searchValue}`, 1000);

  const { postStaff, isSuccess, isLoading } = PostStaffManager();
  const {
    updateStaff,
    isSuccess: isUpdateSuccess,
    isLoading: isUpdating,
  } = UpdateStaffManager({
    id: details,
  });

  const { data: staffDetails, isLoading: isFetching } = useGetStaffById({
    id: details,
  });

  const { data: rolesData } = useGetRolesManager({
    enabled: true,
    searchQuery: debouncedSearchValue,
    page: currentPage,
  });

  const { data: assetGroupData } = useGetAssetGroupsManager({
    enabled: true,
    page: currentPage,
  });

  //FETCH ROLES

  useEffect(() => {
    if (rolesData) {
      const options = rolesData?.data?.results?.map((role) => ({
        value: role.id,
        label: role.name,
        has_asset_group_perms: role.has_asset_group_perms,
      }));
      setRoleOptions(options);
    }
  }, [rolesData]);

  //FETCH ASSET GROUPS

  useEffect(() => {
    if (assetGroupData) {
      const options = assetGroupData?.data?.results?.map((ag) => ({
        value: ag.id,
        label: ag.name,
      }));
      setAssetGroupOptions(options);
    }
  }, [assetGroupData]);

  useEffect(() => {
    if (staffDetails) {
      setFirstName(staffDetails?.data?.user?.first_name);
      setLastName(staffDetails?.data?.user?.last_name);
      setEmail(staffDetails?.data?.user?.email);
      setMobileNumber(staffDetails?.data?.user?.mobile_number);
      setSelectedRoles(
        staffDetails?.data?.roles?.map((role) => ({
          value: role?.id,
          label: role?.name,
        }))
      );
      setSelectedAssetGroup(
        staffDetails?.data?.asset_groups?.map((ag) => ({
          value: ag?.id,
          label: ag?.name,
        })) || []
      );
    }
  }, [staffDetails]);

  const handleCreateOrUpdateUser = async () => {
    const userData = {
      first_name: firstName,
      last_name: lastName,
      email: email,
      mobile_number: mobileNumber,
      roles: selectedRoles?.map((role) => role?.value),
      asset_groups: selectedAssetGroup?.map((ag) => ag?.value) || [],
    };

    try {
      if (details) {
        await updateStaff(userData);
      } else {
        await postStaff(userData);
      }
    } catch (error) {
      console.error("Error creating or updating user:", error);
    }
  };

  const hasAssetGroupPerms = selectedRoles.some(
    (role) =>
      roleOptions.find((option) => option.value === role.value)
        ?.has_asset_group_perms
  );

  useEffect(() => {
    if (isSuccess || isUpdateSuccess) {
      setFirstName("");
      setLastName("");
      setEmail("");
      setMobileNumber("");
      setSelectedRoles([]);
      setSelectedAssetGroup("");

      document.getElementById("create_user").close();
    }
  }, [isSuccess, isUpdateSuccess]);

  return (
    <div>
      <ModalManagement
        id={"create_user"}
        title={details ? "Edit User" : "Create User"}
      >
        {isFetching && <Loader />}

        <div className="md:w-[599px] h-auto rounded-[6px] relative bg-white flex flex-col pt-6">
          <div className="flex flex-col md:flex-row md:space-x-2">
            <div className="flex-1">
              <InputWithFullBoarder
                label={"First Name"}
                placeholder={"Enter First Name"}
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                type={"text"}
                required
              />
            </div>
            <div className="flex-1">
              <InputWithFullBoarder
                label={"Last Name"}
                placeholder={"Enter Last Name"}
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                type={"text"}
                required
              />
            </div>
          </div>
          <div className="flex flex-col md:flex-row md:space-x-2">
            <div className="flex-1">
              <InputWithFullBoarder
                label={"Email"}
                placeholder={"Enter Email Address"}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type={"email"}
                required
              />
            </div>
          </div>
          <div className="flex flex-col md:flex-row md:space-x-2">
            <div className="flex-1">
              <InputWithFullBoarder
                label={"Mobile Number"}
                placeholder={"Enter Mobile Number"}
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
                type={"phone"}
                required
                maxLength={12}
              />
            </div>
          </div>
          <div className="flex-1">
            <MultiSelectWithFullBorder
              label={"Roles"}
              selectOptions={roleOptions}
              value={selectedRoles}
              onChange={setSelectedRoles}
              placeholder="Select Roles"
              required
            />
          </div>
          {hasAssetGroupPerms && (
            <div className="flex-1">
              <MultiSelectWithFullBorder
                label={"Asset Group"}
                selectOptions={assetGroupOptions}
                value={selectedAssetGroup}
                onChange={setSelectedAssetGroup}
                placeholder="Select Asset Group"
              />
            </div>
          )}

          <div className="flex justify-end space-x-2 mt-4 w-full">
            <CustomButton
              buttonText={"Cancel"}
              textColor={"#344054"}
              className="bg-white border border-gray-600"
              onClick={() => {
                document.getElementById("create_user").close();
              }}
            />
            <CustomButton
              buttonText={details ? "Update User" : "Create User"}
              onClick={handleCreateOrUpdateUser}
              isLoading={isLoading || isUpdating}
            />
          </div>
        </div>
      </ModalManagement>
    </div>
  );
};

export default UserManagementModals;
