import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import BaseDashboardNavigation from "../../../../generalComponents/BaseDashboardNavigation";
import PageHeading from "../../../../generalComponents/PageHeading";
import GoBackButton from "../../../../generalComponents/GoBackButton";
import CustomCheckBox from "../../../../generalComponents/CustomCheckBox";
import CustomButton from "../../../../generalComponents/Button";
import Loader from "../../../../generalComponents/Loader";
import { toast } from "react-toastify";
import useUpdateManager from "../../controllers/put_controller_template";
import useGetPermissionsManager from "../../controllers/get_permissions_controller";
import useGetRolePermissionsManager from "../../controllers/get_role_permissions_controller";
import { UpdateRolePermissionsManager } from "../../controllers/updateRolePermissionsController";

const RoleConfigurations = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedPermissions, setSelectedPermissions] = useState([]);

  const {
    data: rolesData,
    isLoading: isFetchingRoles,
    isError: isFetchingRolesError,
    error: fetchRolesError,
  } = useGetPermissionsManager();



  const {
    updateCaller,
    isLoading: isSaving,
    isSuccess,
    error: saveError,
  } = useUpdateManager({ id: id });

  // Fetch the current role data based on ID
  const {
    data: roleDetails,
    isLoading: isFetchingRole,
    isError: isFetchingRoleError,
  } = useGetRolePermissionsManager({ id: id });

  useEffect(() => {
    if (roleDetails) {
      const initialPermissions = roleDetails.data.permissions.flatMap(
        (module) => module.permissions.map((perm) => perm.id)
      );
      setSelectedPermissions(initialPermissions);
    }
  }, [roleDetails]);

  const {
    updateRolePermissions,
    isLoading,
    error,
  } = UpdateRolePermissionsManager({id: id});

  const roleName = roleDetails?.data?.name;
  const handleSaveRole = () => {
    const details = {
      name: roleName,
      permissions: selectedPermissions,
    };

    updateRolePermissions(details);
  };


  return (
    <BaseDashboardNavigation>
      <div className="w-full flex flex-col gap-5 pt-3">
        <GoBackButton />
        <PageHeading title={"Permissions"} />
        <div className="flex flex-col gap-10 bg-white w-full p-5 rounded-[10px]">
          <div className="grid grid-cols-1 md:grid-cols-3">
            {/* Ensure rolesData.data exists before mapping */}
            {rolesData?.data?.length > 0 ? (
              rolesData.data.map((module, index) => (
                <RolePermissions
                  module={module}
                  key={index}
                  selectedPermissions={selectedPermissions}
                  setSelectedPermissions={setSelectedPermissions}
                />
              ))
            ) : (
              <p>
                <Loader />
              </p>
            )}
          </div>
          <div className="w-full flex items-center justify-end gap-5">
            <CustomButton
              buttonText={"Cancel"}
              buttonColor={"bg-whiteColor"}
              textColor={"text-black"}
              className={"h-[55px] w-[187px] border border-[#344054]"}
            />
            <CustomButton
              buttonText={`${isSaving ? "Saving..." : "Save Role"}`}
              className={"h-[55px] w-[187px]"}
              onClick={handleSaveRole}
              disabled={isSaving}
            />
          </div>
        </div>
      </div>
    </BaseDashboardNavigation>
  );
};

export default RoleConfigurations;

const RolePermissions = ({
  module,
  selectedPermissions,
  setSelectedPermissions,
}) => {
  const [isModuleSelected, setIsModuleSelected] = useState(false);

  const handlePermissionChange = (permission) => {
    if (selectedPermissions.includes(permission)) {
      setSelectedPermissions(
        selectedPermissions.filter((perm) => perm !== permission)
      );
    } else {
      setSelectedPermissions([...selectedPermissions, permission]);
    }
  };

  const handleModuleChange = (isChecked) => {
    if (isChecked) {
      // Add all permissions of the module to selectedPermissions
      const permissionsToAdd = module.permissions.map((perm) => perm.id);
      setSelectedPermissions([...selectedPermissions, ...permissionsToAdd]);
      setIsModuleSelected(true);
    } else {
      // Remove all permissions of the module from selectedPermissions
      const permissionsToRemove = module.permissions.map((perm) => perm.id);
      setSelectedPermissions(
        selectedPermissions.filter(
          (perm) => !permissionsToRemove.includes(perm)
        )
      );
      setIsModuleSelected(false);
    }
  };

  return (
    <div className="p-4 w-full min-w-[269px]">
      <h3 className="font-semibold mb-4 border-b border-b-[#667185]/20 pb-3 flex items-center gap-2">
        <CustomCheckBox
          checked={isModuleSelected}
          onChange={(e) => handleModuleChange(e.target.checked)}
        />
        {module.module}
      </h3>
      <ul className="space-y-2">
        {module.permissions.map((permission, index) => (
          <li key={index} className="flex items-center">
            <CustomCheckBox
              text={permission.name}
              checked={selectedPermissions.includes(permission.id)}
              onChange={() => handlePermissionChange(permission.id)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};
