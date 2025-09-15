import React from "react";
import Select from "react-select";

const SearchableDropdown = ({
  id,
  value,
  onChange,
  label,
  className,
  placeholder,
  selectOptions = [],
  required,
  isDisabled = false,
}) => {
  // Convert options to react-select format if they're strings
  const options = selectOptions.map((option) =>
    typeof option === "string" ? { value: option, label: option } : option
  );

  return (
    <div className="flex flex-col mb-4">
      {label && (
        <label className="text-13px md:text-14px font-medium mb-2">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <Select
        id={id}
        value={value}
        onChange={onChange}
        options={options}
        placeholder={placeholder}
        className={`bg-lightGrey/30 rounded-md ${className} outline-none focus:outline-none`}
        classNamePrefix="react-select"
        isDisabled={isDisabled}
        isClearable
      />
    </div>
  );
};

export default SearchableDropdown;
