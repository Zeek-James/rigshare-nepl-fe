import React from "react";
import CustomButton from "./Button";
import { uploadIcon } from "../assets/icons";
import ModalManagement from "./ModalManagement";

const UploadMappingComponent = () => {
  return (
    <ModalManagement id={"header_map"} title={"Inventory Header Mapping"}>
      <div className='md:w-[599px] h-auto rounded-[6px] relative bg-white flex flex-col pt-6'>
        <div className='flex items-center justify-center mb-6 w-full'>
          <div className='flex items-center w-full justify-between'>
            <div className='flex flex-col items-center'>
              <div className='w-[15px] h-[15px] rounded-full bg-brandPurple'></div>
              <p className='text-[12px] text-brandPurple mt-2'>
                Upload Asset Sheet
              </p>
            </div>
            <div className='flex-grow h-[2px] bg-[#eef7e7] mx-2'></div>
            <div className='flex flex-col items-center'>
              <div className='w-[15px] h-[15px] rounded-full bg-[#eef7e7]'></div>
              <p className='text-[12px] text-[#101928] mt-2'>Asset Images</p>
            </div>
            <div className='flex-grow h-[2px] bg-[#eef7e7] mx-2'></div>
            <div className='flex flex-col items-center'>
              <div className='w-[15px] h-[15px] rounded-full bg-[#eef7e7]'></div>
              <p className='text-[12px] text-[#101928] mt-2'>Upload Progress</p>
            </div>
          </div>
        </div>
        <div className='flex flex-col items-center justify-center h-auto'>
          <div className='w-[473px] h-[264px] text-center border border-dashed border-gray-400 mb-4 rounded-md flex flex-col items-center justify-center'>
            <img src={uploadIcon} className='mb-4' alt='Upload Icon' />
            <p className='text-[14px]'>
              <span className='font-medium text-brandPurple'>
                Click to Upload
              </span>{" "}
              or drag and drop
            </p>
            <p className='text-[12px] text-[#98A2B3]'>
              File format: .jpg, .png, .pdf | Max size: 5MB
            </p>
            <div className='w-[90%] text-center border-t border-[#F0F2F5] relative my-6'>
              <span className='absolute top-[-10px] left-1/2 transform -translate-x-1/2 bg-white px-2 text-[#98A2B3] text-[14px] font-medium'>
                OR
              </span>
            </div>
            <CustomButton buttonText={"Browse Files"} />
          </div>
        </div>
        <div className='flex justify-end space-x-2 mt-4 w-full'>
          <CustomButton
            buttonText={"Back"}
            textColor={"#344054"}
            className='bg-white border border-gray-600'
          />
          <CustomButton buttonText={"Next"} />
        </div>
      </div>
    </ModalManagement>
  );
};

export default UploadMappingComponent;
