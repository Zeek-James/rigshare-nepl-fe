import React from "react";
import { Link } from "react-router-dom";
import { noImage } from "../assets/images";

const MarketItemTile = ({ item, itemLink }) => {
  const details = [
    { label: "Asset Code", value: item.asset_code },
    { label: "Material", value: item.material },
    { label: "Dimensions", value: item.dimension },
    { label: "Classification", value: item.classification },
    { label: "Quantity", value: item.quantity },
    { label: "Storage Location", value: item.storage_location },
  ];

  return (
    <Link
      to={itemLink}
      className='max-w-[338.52px] bg-white border border-gray-200 rounded-lg shadow-md'
    >
      <img
        className='rounded-t-lg object-cover w-full h-[168px]'
        src={item.image || noImage}
        alt={item.name}
      />
      <div className='p-4 flex flex-col w-full gap-1'>
        <h5 className='text-xl font-semibold tracking-tight leading-[20px] text-brandPurple'>
          {item.asset_name}
        </h5>
        <p className='py-2 text-[14px] font-medium text-gray-500'>
          {item?.client_name}
        </p>
        <div className='w-full divider h-1'></div>
        {details.map((detail, index) => (
          <div
            key={index}
            className='flex items-center justify-between w-full text-[#344054]'
          >
            <p className=' text-14px text-gray-500'>{detail.label}:</p>
            <p className='font-medium text-14px text-black'>{detail.value}</p>
          </div>
        ))}
      </div>
    </Link>
  );
};

export default MarketItemTile;
