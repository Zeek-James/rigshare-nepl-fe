import React from "react";

const PillTabsManagement = ({
  setCurrentView,
  currentView,
  options,
  showDivider = true,
  divisionWidth,
}) => {
  return (
    <div className='w-full overflow-x-scroll scrollbar-hide'>
      <div className='flex items-center w-full justify-start relative gap-2 my-3'>
        {options.map((el, i) => (
          <p
            key={i}
            role='button'
            onClick={() => setCurrentView(i)}
            className={`text-12px py-1 px-2 md:px-4 rounded-full cursor-pointer transition-colors duration-300 whitespace-nowrap ${
              currentView === i
                ? "bg-brandPurple text-white font-medium"
                : "bg-gray-200 text-gray-600 hover:bg-gray-300"
            }`}
          >
            {el}
          </p>
        ))}
        {/* {showDivider && (
          <div
            className={`divider divider-[#E4E7EC] inset-y-0 absolute top-1.5 ${
              divisionWidth ?? "w-full"
            }`}
          ></div>
        )} */}
      </div>
    </div>
  );
};

export default PillTabsManagement;
