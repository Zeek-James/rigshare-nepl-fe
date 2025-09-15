import React from "react";

const TitleAndSubtitle = ({
  title,
  subtitle,
  titleClassName,
  SubtitleClassName,
}) => {
  return (
    <div className="flex flex-col items-start w-full">
      <p className={titleClassName ?? "text-13px md:text-12px text-[#667185] font-normal"}>{title}</p>
      <p className={SubtitleClassName ?? "text-12px md:text-14px font-medium"}>{subtitle}</p>
    </div>
  );
};

export default TitleAndSubtitle;
