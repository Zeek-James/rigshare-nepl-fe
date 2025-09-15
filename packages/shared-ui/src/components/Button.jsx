import React from "react";

const CustomButton = ({
  buttonText,
  textColor,
  className,
  onClick,
  buttonColor,
  radius,
  isLoading,
  type,
  loader,
  disabled,
  ...props
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${
        buttonColor ?? "bg-brandPurple"
      } py-[4px] md:py-[8px] px-[14px] md:px-[25px]  text-[11px] md:text-[16px] h-[38px] md:h-[40px] font-regular  hover:shadow-xl hover:scale-y-105 duration-300 ${
        !textColor ? "text-whiteColor" : textColor
      } rounded-${radius ?? "xl"} ${className}         ${
        disabled
          ? "bg-gray-400 cursor-not-allowed hover:shadow-none hover:scale-y-100"
          : ""
      }`}
      disabled={disabled}
      {...props}
    >
      {isLoading ? loader ?? "loading..." : buttonText}
    </button>
  );
};

export default CustomButton;