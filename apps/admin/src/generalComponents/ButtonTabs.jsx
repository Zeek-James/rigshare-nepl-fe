import React, { useState } from "react";

const ButtonTabs = ({ options, activeIndex, setActiveIndex }) => {
  return (
    <div className="flex border border-gray-300 rounded-lg overflow-hidden">
      {options.map((option, index) => (
        <button
          key={index}
          onClick={() => setActiveIndex(index)}
          className={`px-4 py-2 font-medium text-14px ${
            activeIndex === index
              ? "bg-[#EEF7E7] text-[#358619] border border-[#C6E4AF]"
              : "bg-white text-[#9E9E9E] border border-[#E4E7EC]"
          } ${index === 0 ? "rounded-l-lg" : ""} ${
            index === options.length - 1 ? "rounded-r-lg" : ""
          }`}
        >
          {option}
        </button>
      ))}
    </div>
  );
};

export default ButtonTabs;
