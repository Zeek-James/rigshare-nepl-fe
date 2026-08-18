import React from "react";

const CalendarPicker = ({ title, selectedDate, onDateChange, placeholder }) => {
  return (
    <div className="m">
      <h3 className="text-[14px] text-black">{title}</h3>
      <div className="h-[36px] min-w-[136px] max-w-max w-full flex flex-row justify-between items-center border border-[#667185] bg-white p-2 rounded-md placeholder:text-[14px] focus:outline-none">
        <input
          type="date"
          onChange={onDateChange}
          value={selectedDate}
          placeholder={placeholder}
          className="w-full text-left text-[14px] text-black h-[22.91px] flex justify-between items-center bg-transparent outline-none"
        />
      </div>
    </div>
  );
};

export default CalendarPicker;
