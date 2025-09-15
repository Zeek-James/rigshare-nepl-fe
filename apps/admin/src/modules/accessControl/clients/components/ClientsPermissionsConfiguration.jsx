import React, { useState, useEffect } from "react";
import CustomCheckBox from "../../../../generalComponents/CustomCheckBox";
import useGetPermissionsManager from "../../roles/controllers/get_permissions_controller";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { formatName } from "../../../../utils/formatName";
import { DEFAULT_CLIENT_PERMISSIONS } from "./DefaultClientPermissions";

const ClientsPermissionsConfiguration = ({
  selectedPermissions,
  setSelectedPermissions,
  clientType,
}) => {
  const { data: permissionData } = useGetPermissionsManager();

  // Handle client type changes
  useEffect(() => {
    if (permissionData?.data && clientType) {
      // Check if this client type has default permissions
      const hasDefaultPermissions = Object.keys(
        DEFAULT_CLIENT_PERMISSIONS
      ).includes(clientType);

      if (hasDefaultPermissions) {
        // Apply default permissions for OPERATOR or VENDOR
        const defaultPermissionCodenames =
          DEFAULT_CLIENT_PERMISSIONS[clientType] || [];

        // Convert default permission codenames to actual permission IDs
        const defaultPermissionIds = permissionData.data.flatMap((module) =>
          module.permissions
            .filter((perm) =>
              defaultPermissionCodenames.includes(perm.codename)
            )
            .map((perm) => perm.id)
        );

        setSelectedPermissions(defaultPermissionIds);
      } else {
        // Clear selections for other client types
        setSelectedPermissions([]);
      }
    }
  }, [clientType, permissionData, setSelectedPermissions]);

  return (
    <div className="flex flex-col gap-0 bg-white w-full p-2 rounded-[10px]">
      <h4 className="font-bold">
        Select Client Permissions
        {(clientType === "OPERATOR" || clientType === "VENDOR") && (
          <span className="text-sm text-green-600 ml-2">
            (Default {clientType} Permissions Applied)
          </span>
        )}
      </h4>
      <div className="grid grid-cols-1 md:grid-cols-1">
        {permissionData?.data?.map((module, index) => (
          <RolePermissions
            module={module}
            key={index}
            selectedPermissions={selectedPermissions}
            setSelectedPermissions={setSelectedPermissions}
            clientType={clientType}
          />
        ))}
      </div>
    </div>
  );
};

const RolePermissions = ({
  module,
  selectedPermissions,
  setSelectedPermissions,
}) => {
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);

  // Check if all module permissions are selected
  const areAllPermissionsSelected = module.permissions.every((perm) =>
    selectedPermissions.includes(perm.id)
  );

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
      const permissionsToAdd = module.permissions
        .map((perm) => perm.id)
        .filter((id) => !selectedPermissions.includes(id)); // Only add permissions not already selected

      setSelectedPermissions([...selectedPermissions, ...permissionsToAdd]);
    } else {
      // Remove all permissions of the module from selectedPermissions
      const permissionsToRemove = module.permissions.map((perm) => perm.id);
      setSelectedPermissions(
        selectedPermissions.filter(
          (perm) => !permissionsToRemove.includes(perm)
        )
      );
    }
  };

  const toggleAccordion = () => {
    setIsAccordionOpen((prev) => !prev);
  };

  return (
    <div className="w-full min-w-[269px]">
      <div className="flex flex-col py-4">
        <h3
          className="text-[16px] font-semibold my-2 border-b border-b-[#667185]/40 pb-2 flex items-center gap-2 cursor-pointer"
          onClick={toggleAccordion}
        >
          {formatName(module.module)}
          {isAccordionOpen ? (
            <MdKeyboardArrowUp className="ml-auto" />
          ) : (
            <MdKeyboardArrowDown className="ml-auto" />
          )}
        </h3>

        {isAccordionOpen && (
          <>
            <h4 className="text-[14px] font-medium my-4 text-brandGreen flex items-center gap-2">
              <CustomCheckBox
                checked={areAllPermissionsSelected}
                onChange={(e) => handleModuleChange(e?.target?.checked)}
              />
              Select All
            </h4>
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {module?.permissions?.map((permission, index) => (
                <li key={index} className="text-[#272727] flex items-center">
                  <CustomCheckBox
                    text={permission.name}
                    checked={selectedPermissions.includes(permission.id)}
                    onChange={() => handlePermissionChange(permission.id)}
                  />
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
};

export default ClientsPermissionsConfiguration;
