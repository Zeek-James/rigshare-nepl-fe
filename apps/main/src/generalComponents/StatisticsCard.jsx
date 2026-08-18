import React from "react";
import { people } from "../assets/icons";

const StatisticsCard = ({ amount, title }) => {
  return (
    <div className="flex items-center justify-center h-[79px] w-[216px] rounded-[8px] bg-whiteColor gap-3 p-3">
      <img src={people} alt="Item" />
      <div className="flex flex-col items-start">
        <p className="text-16px font-semibold text-[#1D2739] leading-tight">
          {amount}
        </p>
        <p className="text-14px text-[#667185]">{title}</p>
      </div>
    </div>
  );
};

export default StatisticsCard;
