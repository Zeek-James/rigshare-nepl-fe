import React from "react";

const TabsManagement = ({
  setCurrentView,
  currentView,
  options,
  w = "w-full",
}) => {
  return (
    <div className={`${w} overflow-x-scroll scrollbar-hide`}>
      <div className='flex items-center w-full justify-between relative gap-0 my-3 bg-[#E0E0E0] rounded-lg p-[2px]'>
        {options.map((el, i) => (
          <p
            key={i}
            role='button'
            onClick={() => setCurrentView(i)}
            className={`text-base py-2 whitespace-nowrap w-full text-center  transition-all duration-300 ease-in-out ${
              currentView === i
                ? "font-medium bg-white rounded-lg shadow-md"
                : ""
            }`}
          >
            {el}
          </p>
        ))}
      </div>
    </div>
  );
};

export default TabsManagement;
