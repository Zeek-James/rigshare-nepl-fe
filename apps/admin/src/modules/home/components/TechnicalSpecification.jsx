import React from "react";

export const TechnicalSpecification = ({ equipment }) => {
  return (
    <div className='grid grid-cols-3 gap-8'>
      <div className='space-y-4'>
        <div>
          <span className='text-gray-600'>Rig Name:</span>
          <span className='ml-4 font-medium'>
            {equipment.technicalSpecs.rigName}
          </span>
        </div>
        <div>
          <span className='text-gray-600'>Rig Type:</span>
          <span className='ml-4 font-medium'>
            {equipment.technicalSpecs.rigType}
          </span>
        </div>
        <div>
          <span className='text-gray-600'>Rig Location:</span>
          <span className='ml-4 font-medium'>
            {equipment.technicalSpecs.rigLocation}
          </span>
        </div>
        <div>
          <span className='text-gray-600'>Water Depth:</span>
          <span className='ml-4 font-medium'>
            {equipment.technicalSpecs.waterDepth}
          </span>
        </div>
        <div>
          <span className='text-gray-600'>Load Capacity:</span>
          <span className='ml-4 font-medium'>
            {equipment.technicalSpecs.loadCapacity}
          </span>
        </div>
        <div>
          <span className='text-gray-600'>Longitude:</span>
          <span className='ml-4 font-medium'>
            {equipment.technicalSpecs.longitude}
          </span>
        </div>
      </div>

      <div className='space-y-4'>
        <div>
          <span className='text-gray-600'>No. of Engines:</span>
          <span className='ml-4 font-medium'>
            {equipment.technicalSpecs.noOfEngines}
          </span>
        </div>
        <div>
          <span className='text-gray-600'>No. of Pumps/HP:</span>
          <span className='ml-4 font-medium'>
            {equipment.technicalSpecs.noOfPumps}
          </span>
        </div>
        <div>
          <span className='text-gray-600'>Top Drive HP:</span>
          <span className='ml-4 font-medium'>
            {equipment.technicalSpecs.topDriveHP}
          </span>
        </div>
        <div>
          <span className='text-gray-600'>Drill Pipe:</span>
          <span className='ml-4 font-medium'>
            {equipment.technicalSpecs.drillPipe}
          </span>
        </div>
        <div>
          <span className='text-gray-600'>Mud Tank:</span>
          <span className='ml-4 font-medium'>
            {equipment.technicalSpecs.mudTank}
          </span>
        </div>
        <div>
          <span className='text-gray-600'>Latitude:</span>
          <span className='ml-4 font-medium'>
            {equipment.technicalSpecs.latitude}
          </span>
        </div>
      </div>

      <div className='space-y-4'>
        <div>
          <span className='text-gray-600'>Mast:</span>
          <span className='ml-4 font-medium'>
            {equipment.technicalSpecs.mast}
          </span>
        </div>
        <div>
          <span className='text-gray-600'>Draw Works:</span>
          <span className='ml-4 font-medium'>
            {equipment.technicalSpecs.drawWorks}
          </span>
        </div>
        <div>
          <span className='text-gray-600'>Accommodation:</span>
          <span className='ml-4 font-medium'>
            {equipment.technicalSpecs.accommodation}
          </span>
        </div>
        <div>
          <span className='text-gray-600'>BOP:</span>
          <span className='ml-4 font-medium'>
            {equipment.technicalSpecs.bop}
          </span>
        </div>
        <div>
          <span className='text-gray-600'>SCR:</span>
          <span className='ml-4 font-medium'>
            {equipment.technicalSpecs.scr}
          </span>
        </div>
        <div>
          <span className='text-gray-600'>Share Rate:</span>
          <span className='ml-4 font-medium'>
            {equipment.technicalSpecs.shareRate}
          </span>
        </div>
      </div>
    </div>
  );
};
