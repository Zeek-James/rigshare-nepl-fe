import React from "react";

const CustomToggle = ({ enabled, onChange, label }) => {
  return (
    <div className='flex justify-start items-center space-x-3'>
      <button
        type='button'
        role='switch'
        aria-checked={enabled}
        onClick={() => onChange(!enabled)}
        className={`
          relative inline-flex h-6 w-11 mb-4 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent 
          transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-brandPurple focus:ring-offset-2 
          ${enabled ? "bg-brandPurple" : "bg-gray-200"}
        `}
      >
        <span
          className={`
            pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 
            transition duration-200 ease-in-out
            ${enabled ? "translate-x-5" : "translate-x-0"}
          `}
        />
      </button>
      {label && (
        <span className='text-sm font-medium text-gray-900'>{label}</span>
      )}
    </div>
  );
};

export default CustomToggle;
