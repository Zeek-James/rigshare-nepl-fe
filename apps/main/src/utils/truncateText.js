import React from "react";

const truncateWithTooltip = (text, maxLength = 30) => {
  if (!text) return null;

  const truncatedText =
    text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;

  return (
    <span
      title={text}
      className="block max-w-xs truncate cursor-pointer text-ellipsis overflow-hidden"
    >
      {truncatedText}
    </span>
  );
};

export default truncateWithTooltip;
