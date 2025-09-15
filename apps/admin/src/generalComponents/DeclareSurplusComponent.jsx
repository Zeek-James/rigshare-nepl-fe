import React from "react";
import CustomButton from "./Button";
import { uploadIcon } from "../assets/icons";
import InputWithFullBoarder from "./InputWithFullBoarder";
import CustomCheckBox from "./CustomCheckBox";
import ModalManagement from "./ModalManagement";

const DeclareSurplusComponent = () => {
  return (
    <ModalManagement id={"declare_surplus"} title={"Declare as Surplus"}>
    <div className="md:w-[599px] h-auto rounded-[6px] relative bg-white flex flex-col pt-6">
      <div className="flex space-x-4">
        <div className="flex-1">
          <InputWithFullBoarder label={"Quantity"} placeholder={"Period in Marketplace"} />
        </div>
        <div className="flex-1">
          <InputWithFullBoarder label={"Period in Marketplace"} placeholder={"Select Period"} />
        </div>
      </div>
      <div className="flex space-x-4">
        <div className="flex-1">
          <InputWithFullBoarder label={"Contact First Name"} placeholder={"Input First Name"} />
        </div>
        <div className="flex-1">
          <InputWithFullBoarder label={"Contact Last Name"} placeholder={"Input Last Name"} />
        </div>
      </div>
      <div className="flex space-x-4">
        <div className="flex-1">
          <InputWithFullBoarder label={"Contact Phone Number"} placeholder={"Input Phone Number"} />
        </div>
        <div className="flex-1">
          <InputWithFullBoarder label={"Contact Email"} placeholder={"Input Email Address"} />
        </div>
      </div>
      <div className="flex space-x-4">
        <div className="flex-1">
          <CustomCheckBox text={"Reverse After Deadline"}  />
        </div>
        <div className="flex-1">
          <CustomCheckBox text={"Declare for Disposal"} />
        </div>
      </div>
      <div className="flex justify-end space-x-2 mt-4 w-full">
        <CustomButton
          buttonText={"Cancel"}
          textColor={"#344054"}
          className="bg-white border border-gray-600"
        />
        <CustomButton buttonText={"Declare"} />
      </div>
    </div>
    </ModalManagement>
  );
};

export default DeclareSurplusComponent;