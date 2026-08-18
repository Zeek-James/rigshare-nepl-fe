import React from "react";
import { hero } from "../../../assets/images";

const LeftSideComponent = ({ heading, text }) => {
  return (
    <div
      style={{ backgroundImage: `url(${hero})`, opacity: 0.9 }}
      className="relative w-full md:w-1/2 bg-cover bg-no-repeat flex flex-col items-center justify-center overflow-hidden p-8"
    >
      <div className="absolute inset-0 bg-green-950 opacity-70 w-full h-full"></div>
      <div className="relative z-10 text-white text-left max-w-[562px] w-full">
        <p className="text-[40px] md:text-[60px] font-semibold mb-4 leading-tight">
          Unlock Efficiency with EMMS Today!
        </p>
        <p className="text-18px font-light mb-8 max-w-[420px] text-white w-full">
          Take control of your asset management with e-MMS—your all-in-one
          solution for smarter inventory and asset disposal operations.
        </p>
      </div>
    </div>
  );
};

export default LeftSideComponent;
