import React from "react";
import { rigShareBg } from "../../../assets/images";

export const RigShareAuthBg = () => {
  return (
    <div className='bg-muted relative hidden lg:block col-span-4'>
      <img
        src={rigShareBg}
        alt='authentication background'
        loading='lazy'
        className='absolute inset-0 h-full w-full object-cover'
      />
    </div>
  );
};
