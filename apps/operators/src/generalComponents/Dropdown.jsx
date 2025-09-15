import React from "react";

const Dropdown = ({
  options = [],
  onChange,
  title,
  value = "",
  placeholder,
  className,
}) => {
  return (
    <div className={className}>
      <h3 className="text-[14px] text-black">{title}</h3>
      <div className="h-[36px] min-w-[136px] max-w-max w-full flex flex-row justify-between items-center border border-[#667185] bg-white p-2 rounded-md placeholder:text-[14px]  focus:outline-none">
        <select
          onChange={onChange}
          value={value}
          className="w-full text-left text-[14px] text-black h-[22.91px] flex justify-between items-center bg-transparent outline-none"
        >
          <option value="" disabled hidden>
            {placeholder}
          </option>
          {options.map((option, i) => (
            <option key={i} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Dropdown;
