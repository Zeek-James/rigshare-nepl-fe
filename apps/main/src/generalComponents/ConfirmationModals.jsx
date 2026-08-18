import React from 'react'
import ModalManagement from './ModalManagement'
import CustomButton from './Button'
import { failedIcon, successCheck } from '../assets/icons'

export const SuccessModal = ({activityName, activityDescription}) => {
  return (
    <ModalManagement id={`success_modal`}>
      <div className="w-[517px] h-[311px] rounded-md relative bg-white flex flex-col justify-center items-center p-6">
        <div className="flex flex-col items-center justify-center h-full">
          <img src={successCheck} alt={"Icon"} className="w-[154px] h-[154px] my-3" />
          <h3 className="text-18px font-semibold mb-4">
             {activityName} Successfully
          </h3>
          <p className="text=[14px]">
            {activityDescription}
          </p>
        </div>
      </div>
    </ModalManagement>
  )
}


export const FailedModal = ({activityName, activityDescription}) => {
  return (
    <ModalManagement id={`failed_modal`}>
      <div className="w-[517px] h-[311px] rounded-md relative bg-white flex flex-col justify-center items-center p-6">
        <div className="flex flex-col items-center justify-center h-full">
          <img src={failedIcon} alt={"Icon"} className="w-[154px] h-[154px] my-3" />
          <h3 className="text-18px font-semibold mb-4">
             {activityName} Failed
          </h3>
          <p className="text=[14px]">
            {activityDescription}
          </p>
        </div>
      </div>
    </ModalManagement>
  )
}

export const DeleteModal = ({itemName, onDelete}) => {
  return (
    <ModalManagement id={`delete_modal`} title={`Delete ${itemName}?`}>
      <div className="w-[456px] h-auto rounded-[6px] relative bg-white flex flex-col py-6">
          <p className="text=[14px]">
            Are you sure you want to delete this {itemName}?
          </p>
          <div className="flex justify-end space-x-2 mt-4 w-full">
            <CustomButton
              buttonText={"Cancel"}
              textColor={"#344054"}
              className="bg-white border border-gray-600 h-[55px] w-[187px]"
              onClick={() => {
                document.getElementById("delete_modal").close()
              }}
            />
            <CustomButton
              buttonText={"Create"}
              className="h-[55px] w-[187px]"
              onClick={onDelete}
            />
          </div>
        </div>
    </ModalManagement>
  )
}

export const DeactivateModal = ({itemName}) => {
  return (
    <ModalManagement id={`deactivate_modal`} title={`Deactivate ${itemName}`}>
      <div className="w-[456px] h-auto rounded-[6px] relative bg-white flex flex-col py-6">
          <p className="text=[14px]">
            Are you sure you want to deactivate this {itemName}?
          </p>
          <div className="flex justify-end space-x-2 mt-4 w-full">
            <CustomButton
              buttonText={"Cancel"}
              textColor={"#344054"}
              className="bg-white border border-gray-600 h-[55px] w-[187px]"
            />
            <CustomButton
              buttonText={"Create"}
              className="h-[55px] w-[187px]"
            />
          </div>
        </div>
    </ModalManagement>
  )
}