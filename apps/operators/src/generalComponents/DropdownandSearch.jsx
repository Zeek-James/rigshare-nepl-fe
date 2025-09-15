import React from "react";
import { searchIcon } from "../assets/icons";

const DropdownandSearch = ({
  options,
  onChange,
  title,
  value = "",
  placeholder,
  onSelect,
  selectedOption,
  dropdownplaceholder,
}) => {
  return (
    <div className="flex flex-row">
      {/* Dropdown */}
      <div className="">
        <h3 className="text-[14px] text-black">{title}</h3>
        <div className="h-[36px] min-w-[119px] max-w-max w-full flex flex-row justify-between items-center border border-[#667185] bg-white p-2 rounded-l-md placeholder:text-[12px] focus:outline-none">
          <select
            onChange={onSelect}
            value={selectedOption}
            className="w-full text-left text-[14px] text-black h-[22.91px] flex justify-between items-center bg-transparent outline-none"
          >
            <option value="" disabled hidden>
              {dropdownplaceholder}
            </option>
            {options.map((option, i) => (
              <option key={i} value={option.value}>
                {option.label || option}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <span className="absolute inset-y-0 left-0 flex items-center justify-center pl-2">
          <img src={searchIcon} alt="Search Icon" />
        </span>
        <input
          value={value}
          onChange={onChange}
          type="text"
          placeholder={placeholder ? placeholder : "Type here"}
          className="pl-8 h-[36px] text-[14px] font-[#8A919E] md:w-[254px] w-[175px] max-w-xs border border-[#667185] rounded-r-md"
        />
      </div>
    </div>
  );
};

export default DropdownandSearch;
