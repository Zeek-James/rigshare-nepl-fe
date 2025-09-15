import React from "react";

const GridComponent = ({ data }) => {
  return (
    <div className="collapse-content grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
      {data.map((item, index) => (
        <div key={index} className="flex flex-col">
          <h3 className="text-[12px] text-[#737474] font-medium">{item.label}</h3>
          <h3 className="text-[14px] font-medium text-[#181918] pt-3">{item.value}</h3>
        </div>
      ))}
    </div>
  );
};

export default GridComponent;
