import React from "react";
import { getInitials } from "../utils/getInitials";

const ChatTile = ({ chat }) => {
  return (
    <div className="flex items-center p-2 hover:bg-gray-200 rounded cursor-pointer">
      <div className="w-10 h-10 bg-[#EDF4EA] rounded-full flex items-center justify-center mr-2">
        {getInitials(chat.name)}
      </div>
      <div className="flex-1">
        <div className="font-semibold">{chat.name}</div>
        {chat.message && (
          <div className="text-sm text-gray-500 truncate">{chat.message}</div>
        )}
      </div>
      <div className="text-xs text-gray-400">{chat.time}</div>
    </div>
  );
};

export default ChatTile;
