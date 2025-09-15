import { Badge } from "@mui/material";
import React from "react";
import CustomButton from "../../../generalComponents/Button";

export const InfoCard = ({ item, handleLeaseEquipment }) => {
  return (
    <div className='w-full px-14 py-5 items-center justify-between flex flex-col gap-20'>
      <h2 className='text-2xl font-semibold'>
        Hydraulic Drilling Rig - HD-3000{" "}
        <span>
          {" "}
          <Badge
            variant='outline'
            className={`rounded-2xl border-none text-xs font-medium px-2 py-1 w-fit ${
              item?.status === "Available"
                ? "bg-[#0D750D2B] text-[#006600]"
                : item?.status === "Scheduled"
                ? "bg-[#E98F351A] text-[#E98F35]"
                : item?.status === "Under Maintenance"
                ? "bg-[#F9EAB8B2] text-[#97770C]"
                : "bg-[#FFDEDB] text-[#FF1100CC]"
            }`}
          >
            In use
          </Badge>
        </span>
      </h2>
      <div className='px-14 flex flex-col gap-5 w-full'>
        <div className='flex justify-between text-md text-md'>
          <p className='text-[#666]'>Status:</p>
          <p className='font-medium'>Available</p>
        </div>
        <div className='flex justify-between text-md'>
          <p className='text-[#666]'>Manufacturer:</p>
          <p className='font-medium'>Schlumberger</p>
        </div>{" "}
        <div className='flex justify-between text-md'>
          <p className='text-[#666]'>Model Number:</p>
          <p className='font-medium'>HD-3000</p>
        </div>{" "}
        <div className='flex justify-between text-md'>
          <p className='text-[#666]'>Year of Manufacture:</p>
          <p className='font-medium'>2019</p>
        </div>{" "}
        <div className='flex justify-between text-md'>
          <p className='text-[#666]'>Category</p>
          <p className='font-medium'>Drilling Equipment</p>
        </div>{" "}
        <div className='flex justify-between text-md'>
          <p className='text-[#666]'>Equipment Owner:</p>
          <p className='font-medium'>Chevron Nigeria Ltd</p>
        </div>{" "}
        <div className='flex justify-between text-md'>
          <p className='text-[#666]'>Location:</p>
          <p className='font-medium'>Port Harcourt, Nigeria</p>
        </div>{" "}
        <div className='flex justify-between text-md'>
          <p className='text-[#666]'>Last Maintenance Date:</p>
          <p className='font-medium'>February 10, 2024</p>
        </div>{" "}
        <div className='flex justify-between text-md'>
          <p className='text-[#666]'>Compliance Status</p>
          <p className='font-medium'>✔ Verified</p>
        </div>{" "}
      </div>
      <CustomButton
        buttonText={"Lease Equipment"}
        buttonColor={"bg-white"}
        className={"border border-brandPurple rounded-xl w-full"}
        textColor={"text-brandPurple"}
        onClick={handleLeaseEquipment}
      />
    </div>
  );
};
