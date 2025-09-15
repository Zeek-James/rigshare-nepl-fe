import React from "react";

const TabManager = ({ currentView, setCurrentView, list }) => {
  return (
    <div className="flex items-center w-full justify-start relative gap-0 mt-5">
      {list.map((el, i) => (
        <p
          key={i}
          role="button"
          onClick={() => setCurrentView(i)}
          className={`text-13px pb-2 px-10 ${
            currentView === i
              ? "font-medium text-brandBlack border border-transparent border-b-2 border-b-brandBlack"
              : "text-textGrey2"
          }`}
        >
          {el}
        </p>
      ))}
      <div className="divider divider-[#E4E7EC] inset-y-0 absolute top-1.5 w-full md:w-[400px]"></div>
    </div>
  );
};

export default TabManager;
