import React from "react";
import { defaultProfilePicture } from "../constants/GlobalVariables";

const AvatarWithName = ({
  image,
  title,
  subtitle,
  titleClassName,
  SubtitleClassName,
  imgClassName,
}) => {
  return (
    <div className="h-[40px] w-full  relative flex items-center gap-3">
      <img
        src={image ? image : defaultProfilePicture}
        className={imgClassName ?? "h-full w-[40px] rounded-full object-cover"}
        alt="Item"
      />
      <div className="flex flex-col items-start">
        <p className={titleClassName ?? "text-14px md:text-16px font-medium"}>{title}</p>
        <p className={SubtitleClassName ?? "text-12px"}>{subtitle}</p>
      </div>
    </div>
  );
};

export default AvatarWithName;
