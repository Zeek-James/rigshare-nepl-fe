import React from "react";
import { useLocation } from "react-router-dom";

const IconsWithText = ({
  icon,
  activeIcon,
  text,
  path,
  iconSize = "25px",
  textVisible = true,
  hasSub,
  className = "rounded-lg py-3 px-3 md:px-4 w-full",
}) => {
  const location = useLocation();

  const pathname = location.pathname;

  const isActive = path === pathname;

  return (
    <div
      className={`flex  group ${
        textVisible ? "justify-start" : "justify-center"
      } items-center gap-4 hover:bg-[#EFFAF5] ${
        isActive && !hasSub ? "bg-[#EFFAF5]" : ""
      }   transition-all duration-200 ${className}`}
    >
      <img
        src={isActive ? activeIcon || icon : icon}
        alt='icon'
        style={{ width: iconSize, height: iconSize }}
        className={`group-hover:hidden block`}
      />
      <img
        src={activeIcon}
        alt='icon'
        style={{ width: iconSize, height: iconSize }}
        className={`group-hover:block hidden`}
      />
      {textVisible && (
        <p
          className={`${
            isActive ? "text-brandPurple font-medium" : "text-white font-normal"
          } whitespace-nowrap text-[14px]  group-hover:text-brandPurple`}
        >
          {text}
        </p>
      )}
    </div>
  );
};

export default IconsWithText;
