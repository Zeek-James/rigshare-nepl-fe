import React from "react";

const ButtonWithIcon = ({
  buttonText,
  textColor,
  className,
  onClick,
  buttonColor,
  variant,
  radius,
  isLoading,
  type,
  loader,
  disabled,
  icon: IconComponent,
  prefix: IconPrefix,
  paddingX,
  ...props
}) => {
  // Define variant styles
  const getVariantStyles = () => {
    switch (variant) {
      case "grey":
        return "bg-gray-200 text-gray-600 hover:bg-gray-300";
      default:
        return `${buttonColor ?? "bg-brandPurple"} ${
          !textColor ? "text-whiteColor" : textColor
        }`;
    }
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${
        buttonColor ?? "bg-brandPurple"
      } flex items-center text-12px md:text-14px py-[8px] md:py-[8px] rounded-xl ${
        !paddingX ? "px-[16px] md:px-[25px]" : paddingX
      } 
       font-regular hover:shadow-xl hover:scale-y-105 duration-300 h-[36px] ${
         !textColor ? "text-whiteColor" : textColor
       } rounded-${radius ?? "md"} ${className} ${
        disabled
          ? "bg-[#F6F6F6] cursor-not-allowed text-[#D1D1D1] hover:shadow-none hover:scale-y-100"
          : ""
      }`}
      disabled={disabled}
      {...props}
    >
      {!IconPrefix ? (
        ""
      ) : (
        // <GoDownload className="mr-2" />
        <IconPrefix className='mr-2' />
      )}{" "}
      {isLoading ? loader ?? "loading..." : buttonText}
      {!IconComponent ? (
        ""
      ) : (
        // <GoDownload className="mr-2" />
        <IconComponent className='ml-2' />
      )}{" "}
      {/* Render the icon if provided */}
    </button>
  );
};

export default ButtonWithIcon;
