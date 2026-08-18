import React from "react";
import ModalManagement from "./ModalManagement";
import { check } from "../assets/images";

const SuccessModal = ({ details, body }) => {
  return (
    <ModalManagement
      id={"success_modal"}
      className='rounded-[20px] md:max-w-[420px] '
    >
      <div className='flex flex-col items-center justify-center gap-7'>
        <img
          src={check}
          alt='performance-dialogue Logo'
          className='mb-[5px] mx-auto h-[105px] w-auto object-contain mt-5'
        />
        <p className='text-[20px] font-medium'>{body}</p>
      </div>
    </ModalManagement>
  );
};

export default SuccessModal;
