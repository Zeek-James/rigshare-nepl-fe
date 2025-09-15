import React from "react";

const SelectWithFullBorder = ({
  id,
  value,
  onChange,
  label,
  className,
  wrapperClassName,
  placeholder,
  selectOptions = [],
  required,
  ...props
}) => {
  return (
    <div className={`flex flex-col mb-4 ${wrapperClassName}`}>
      <label className="text-13px md:text-14px font-medium mb-2" htmlFor={id}>
        {label}
        {required ? <span className="text-red-700 text-[14px]">*</span> : ""}
      </label>
      <div className="relative">
        <select
          id={id}
          value={value}
          onChange={onChange}
          className={`w-full border border-lightGrey bg-lightGrey/30 p-2 pr-10 rounded-md ${className} outline-none focus:outline-none appearance-none`}
          {...props}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {selectOptions?.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label || option}
            </option>
          ))}
        </select>
        {/* Chevron Icon */}
        <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default SelectWithFullBorder;
