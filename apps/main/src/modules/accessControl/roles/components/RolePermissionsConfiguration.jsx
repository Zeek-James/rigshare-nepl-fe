import React, { useState } from "react";
import CustomCheckBox from "../../../../generalComponents/CustomCheckBox";
import useGetPermissionsManager from "../controllers/get_permissions_controller";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { formatName } from "../../../../utils/formatName";

const RolePermissionsConfiguration = ({
  selectedPermissions,
  setSelectedPermissions,
}) => {
  const { data: permissionData } = useGetPermissionsManager();

  return (
    <div className="flex flex-col gap-10 bg-white w-full p-5 rounded-[10px]">
      <h3 className="font-bold">Select Role Permissions</h3>
      <div className="grid grid-cols-1 md:grid-cols-1">
        {permissionData?.data.map((module, index) => (
          <RolePermissions
            module={module}
            key={index}
            selectedPermissions={selectedPermissions}
            setSelectedPermissions={setSelectedPermissions}
          />
        ))}
      </div>
    </div>
  );
};

export default RolePermissionsConfiguration;

const RolePermissions = ({
  module,
  selectedPermissions,
  setSelectedPermissions,
}) => {
  const [isModuleSelected, setIsModuleSelected] = useState(false);
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);

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

  const toggleAccordion = () => {
    setIsAccordionOpen((prev) => !prev); // Toggle accordion open/close state
  };

  return (
    <div className="w-full min-w-[269px]">
      <div className="flex flex-col py-4">
        {/* Accordion Header */}
        <h3
          className="text-[16px] font-semibold my-2 border-b border-b-[#667185]/40 pb-2 flex items-center gap-2 cursor-pointer"
          onClick={toggleAccordion} // Toggle accordion on click
        >
          {formatName(module.module)}
          {isAccordionOpen ? (
            <MdKeyboardArrowUp className="ml-auto" />
          ) : (
            <MdKeyboardArrowDown className="ml-auto" />
          )}
        </h3>

        {/* Accordion content: only shown if the accordion is open */}
        {isAccordionOpen && (
          <>
            <h4 className="text-[14px] font-medium my-4 text-brandGreen flex items-center gap-2">
              <CustomCheckBox
                checked={isModuleSelected}
                onChange={(e) => handleModuleChange(e?.target?.checked)}
              />
              Select All
            </h4>
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {module?.permissions?.map((permission, index) => (
                <li key={index} className="text-[#272727] flex items-center">
                  <CustomCheckBox
                    text={permission.name}
                    checked={selectedPermissions?.includes(permission?.id)}
                    onChange={() => handlePermissionChange(permission?.id)}
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
