import React from "react";
import { hasPermissions } from "../constants/permissions";

const OptionsPopup = ({ options, popUpFunction, selectedItem }) => {
  return (
    <div className='relative'>
      <div className='w-[171px] inset-x-[-120px] absolute z-10 shadow-lg top-4 right-6 rounded-[4px] bg-whiteColor p-2 flex flex-col'>
        {options.map((option, inx) => {
          // Check if option is an object with permission requirements
          const isObject = typeof option === "object";
          const label = isObject
            ? option.isDynamic && typeof option.label === "function"
              ? option.label(selectedItem)
              : option.label
            : option;

          const permissions = isObject ? option.permissions : null;
          const isDisabled =
            isObject && typeof option.disable === "function"
              ? option.disable(selectedItem)
              : false;

          // If permissions are specified and user doesn't have them, don't render the option
          if (permissions && !hasPermissions(permissions)) {
            return null;
          }

          // If permissions are specified and user doesn't have them, don't render the option
          if (isDisabled) {
            return null;
          }
          return (
            <p
              role='button'
              onClick={() => popUpFunction(label, inx)}
              key={inx}
              className='text-14px p-2 hover:bg-mainLightGrey w-full flex items-start justify-start text-start text-brandBlack'
            >
              {label}
            </p>
          );
        })}
      </div>
    </div>
  );
};

export default OptionsPopup;
