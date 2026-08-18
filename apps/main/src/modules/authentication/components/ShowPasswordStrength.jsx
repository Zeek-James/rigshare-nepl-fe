import React from "react";

const ShowPasswordStrength = ({ strength }) => {
  const { id, value } = strength;
  const colors = [
    "bg-red-500",
    "bg-orange-500",
    "bg-yellow-500",
    "bg-green-500",
  ];
  const textColors = [
    "text-red-500",
    "text-orange-500",
    "text-yellow-500",
    "text-green-500",
  ];

  return (
    <div className='mb-5'>
      <div className='flex gap-2'>
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className={`h-[5px] w-32 rounded-md ${
              index <= id ? colors[id] : "bg-gray-300"
            }`}
          ></div>
        ))}
      </div>
      <p className={`text-[10px] ${textColors[id]}`}>{value}</p>
    </div>
  );
};

export default ShowPasswordStrength;
