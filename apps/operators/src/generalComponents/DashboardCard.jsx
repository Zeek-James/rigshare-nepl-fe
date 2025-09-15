import React from "react";

const DashboardCard = ({ cardDetails, cardTitle, cardIcon }) => {
  return (
    <div className="w-full  relative mt-3 mr-3 ">
      <div className="w-full h-[149px] flex flex-col card w-96 bg-base-100 border border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center pt-2 pl-3">
          <img
                src={cardIcon}
              />
            <h2 className="card-title text-[16px] ml-2">{cardTitle}</h2>
          </div>
        </div>
        <div className="w-full card-body items-center text-center">
          <div className="w-full flex items-center space-x-8">
            {cardDetails?.map((card) => (
              <div className="w-full ">
                <h2 className="text-[18px] font-bold">{card?.count}</h2>
                <p className="text-[12px] text-[#667185]">{card?.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardCard;
