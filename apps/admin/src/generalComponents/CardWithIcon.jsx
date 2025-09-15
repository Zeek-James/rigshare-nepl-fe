import React from "react";

const CardWithIcon = ({cardIcon, cardTitle, cardDescription}) => {
  return (
    <div>
        <div className="w-full md:w-[50%] order-2 md:order-none h-[450px] relative px-3">
          <div className="card w-96 bg-base-100 shadow-xl">
            <figure className="px-10 pt-10">
              <img
                src={cardIcon}
              />
            </figure>
            <div className="card-body items-center text-center">
              <h2 className="card-title">{cardTitle}</h2>
              <p>
                {cardDescription}
              </p>
            </div>
          </div>
        </div>
      </div>
  );
};

export default CardWithIcon;
