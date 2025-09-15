import { Badge } from "@mui/material";
import { equip_1 } from "../../../assets/images";
import { IoLocationOutline } from "react-icons/io5";
import CustomButton from "../../../generalComponents/Button";
import { Link } from "react-router-dom";

export const Equipment = ({ item }) => {
  return (
    <div
      key={item?.id}
      className='rounded-2xl p-4 gap-4 border-[#E4E7EC] flex flex-col items-center justify-center shadow-sm hover:shadow-md transition-shadow duration-200 hover:cursor-pointer border bg-white'
    >
      <div className='h-[200px] w-full bg-[#F9FAFB] rounded-xl flex items-center justify-center'>
        <img
          src={equip_1}
          alt={item?.name || "Equipment"}
          className='w-full h-full object-contain rounded-xl'
        />
      </div>
      <div className='w-full flex flex-col gap-4 px-2'>
        <div className='flex flex-col gap-3'>
          <p className='font-semibold text-gray-900 text-sm leading-tight'>
            {item?.name || "Hydraulic Drilling Rig HD-3000"}
          </p>
          <Badge
            variant='outline'
            className={`rounded-full border-none text-xs font-medium px-3 py-1 w-fit ${
              item?.status === "Available"
                ? "bg-[#ECFDF3] text-[#027A48]"
                : item?.status === "Scheduled"
                ? "bg-[#FFFAEB] text-[#B54708]"
                : item?.status === "Under Maintenance"
                ? "bg-[#FEF7CD] text-[#854D0E]"
                : "bg-[#FEF3F2] text-[#B42318]"
            }`}
          >
            {item?.status || "Available"}
          </Badge>
          <div className='flex items-center gap-1'>
            <IoLocationOutline className='h-4 w-4 text-gray-500' />
            <span className='text-sm text-gray-600'>
              {item?.location || "Lagos, Nigeria"}
            </span>
          </div>
        </div>
        <div className='flex flex-col gap-2'>
          <Link to={`/equipment/${item?.id || 1}`}>
            <CustomButton
              buttonText={"View Details"}
              buttonColor={"bg-white"}
              className={"border border-gray-300 rounded-lg w-full py-2 text-sm font-medium hover:border-brandPurple transition-colors"}
              textColor={"text-gray-700"}
            />
          </Link>
          <CustomButton
            buttonText={"Request Lease"}
            buttonColor={"bg-brandPurple"}
            className={"rounded-lg w-full py-2 text-sm font-medium hover:bg-purple-700 transition-colors"}
            textColor={"text-white"}
          />
        </div>
      </div>
    </div>
  );
};
