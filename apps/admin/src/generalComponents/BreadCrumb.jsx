import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import GoBackButton from "./GoBackButton";

const Breadcrumb = ({ items }) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className='flex items-center gap-2'>
      <div className='max-w-max'>
        <GoBackButton />
      </div>
      {items.map((item, index) => (
        <span
          key={index}
          className='flex gap-1 items-center text-10px md:text-14px font-medium'
        >
          <span className='mx-0 text-[#98A2B3]'>/</span>
          <span
            className={`${
              location.pathname === item.path
                ? "text-brandPurple"
                : "text-[#98A2B3]"
            } cursor-pointer`}
            onClick={() => navigate(item.path)}
          >
            {item.name}
          </span>
        </span>
      ))}
    </div>
  );
};

export default Breadcrumb;
