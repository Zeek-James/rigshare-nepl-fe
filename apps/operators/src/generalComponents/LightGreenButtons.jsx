import React from "react";

const LightGreenButtons = ({ text, onClick }) => {
  return (
    <button
      onClick={onClick}
      className='bg-[#EEF7E7] rounded-[3px] h-[30px] text-brandPurple text-[14px] px-4 py-1.5'
    >
      {text}
    </button>
  );
};

export default LightGreenButtons;
