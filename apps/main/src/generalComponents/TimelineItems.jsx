import React from "react";

const TimelineItem = ({ text, time }) => (
  <div className="flex justify-between items-center py-3 w-full  border-b border-gray-200">
    <div className="flex items-center">
      <div className="h-2 w-2 rounded-full bg-gray-300 mt-1 mr-2"></div>
      <h3 className="text-16px font-medium">{text}</h3>
    </div>
    <h3 className="text-gray-500 text-14px">{time}</h3>
  </div>
);

const Timeline = ({ items }) => (
  <div className="collapse-content">
    {items.map((item, index) => (
      <TimelineItem key={index} text={item.text} time={item.time} />
    ))}
  </div>
);

export default Timeline;
