import React, { useState } from "react";
import BaseDashboardNavigation from "../../../generalComponents/BaseDashboardNavigation";
import Section from "../../../generalComponents/CustomSection";
import CustomButton from "../../../generalComponents/Button";
import CustomFilter from "../../../generalComponents/CustomFilter";
import { SwitchWithIcon } from "../../../generalComponents/SwitchWithIcon";
import { Equipment } from "../../home/components/Equipment";
import { EquipmentList } from "../../home/components/EquipmentList";

const AvailableEquipments = () => {
  const [isGridView, setIsGridView] = useState(true);

  // Mock data for available equipments - matching home page structure
  const availableEquipments = [
    { id: 1, name: "Advanced Drilling Rig ADR-150", status: "Available", location: "Lagos, Nigeria" },
    { id: 2, name: "High-Pressure Compressor HPC-300", status: "Available", location: "Port Harcourt, Nigeria" },
    { id: 3, name: "Tower Crane TC-250", status: "Scheduled", location: "Warri, Nigeria" },
    { id: 4, name: "Well Control System WCS-Advanced", status: "Available", location: "Bonny, Nigeria" },
    { id: 5, name: "Triplex Mud Pumps TMP-1200", status: "Reserved", location: "Kano, Nigeria" },
    { id: 6, name: "ROV Deep Sea Explorer", status: "Available", location: "Lagos, Nigeria" },
    { id: 7, name: "Hydraulic Power Unit HPU-500", status: "Available", location: "Warri, Nigeria" },
    { id: 8, name: "Cementing Unit CU-850", status: "Available", location: "Delta, Nigeria" },
  ];

  return (
    <BaseDashboardNavigation title={"Available Equipments"}>
      <div className='flex flex-col gap-6'>
        <Section
          title="Available Equipments"
          subTitle="Browse and lease equipment from other companies across Nigeria."
          rightContent={
            <div className='flex gap-2'>
              <CustomButton
                buttonText={"Advanced Filters"}
                buttonColor={"bg-white"}
                className={"border border-brandPurple"}
                textColor={"text-brandPurple"}
                onClick={() => {
                  document.getElementById("advanced_filters").showModal();
                }}
              />
            </div>
          }
        >
          <div className='flex flex-col gap-6'>
            <div className='flex w-full justify-between items-center'>
              <div className='flex gap-3'>
                <CustomButton
                  buttonText={"Available Now"}
                  textColor={"text-[#344054]"}
                  className='bg-white border border-[#A0A0A0]'
                  buttonColor={"bg-white"}
                  onClick={() => {}}
                />
                <CustomButton
                  buttonText={"Near Me"}
                  textColor={"text-[#344054]"}
                  className='bg-white border border-[#A0A0A0]'
                  buttonColor={"bg-white"}
                  onClick={() => {}}
                />
                <CustomButton
                  buttonText={"Top Rated"}
                  textColor={"text-[#344054]"}
                  className='bg-white border border-[#A0A0A0]'
                  buttonColor={"bg-white"}
                  onClick={() => {}}
                />
              </div>
              <SwitchWithIcon
                isGridView={isGridView}
                setIsGridView={setIsGridView}
              />
            </div>
            <div className='flex gap-6'>
              <CustomFilter />
              <div className='w-full'>
                {!isGridView ? (
                  <EquipmentList />
                ) : (
                  <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4'>
                    {availableEquipments.map((equipment) => (
                      <Equipment key={equipment.id} item={equipment} />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </Section>
      </div>
    </BaseDashboardNavigation>
  );
};

export default AvailableEquipments;