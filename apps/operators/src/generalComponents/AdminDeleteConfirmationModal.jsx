import { PiWarningCircleLight } from "react-icons/pi";
import React from "react";
import ModalManagement from "./ModalManagement";

import CustomButton from "./Button";

const AdminDeleteConfirmationModal = ({
  title,
  body,
  onClick,
  isLoading,
  buttonText,
  id = "admin_delete",
}) => {
  return (
    <ModalManagement id={id}>
      <div className='flex flex-col items-center w-[320px] h-fit gap-5 justify-center'>
        <div className='flex flex-col w-full items-start text-left'>
          <div className='flex items-center gap-1 text-brandBlack text-12px font-medium'>
            {" "}
            <PiWarningCircleLight />
            <p>{title}</p>
          </div>
          <p className='text-12px text-textSecondary'>{body}</p>
        </div>
        <div className='flex justify-end gap-3 w-full'>
          <CustomButton
            buttonText={buttonText}
            buttonColor={"bg-brandRed"}
            className={`w-fit`}
            onClick={onClick}
            isLoading={isLoading}
          />
          <CustomButton
            buttonText={`Cancel`}
            buttonColor={"transparent"}
            textColor={`text-brandBlack`}
            onClick={() => {
              document.getElementById(id).close();
            }}
            className={`w-fit border border-lightGrey`}
          />
        </div>
      </div>
    </ModalManagement>
  );
};

export default AdminDeleteConfirmationModal;
