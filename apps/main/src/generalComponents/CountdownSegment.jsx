import React from "react";

const CountdownSegment = ({ value, label }) => (
  <div className="flex flex-col">
    <h3 className="countdown font-bold text-[23px] text-black">
      <span style={{ "--value": value }}></span>
    </h3>
    <h3 className="text-12px font-medium"> {label}</h3>
  </div>
);

export default CountdownSegment;
