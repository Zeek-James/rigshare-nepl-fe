import React, { useState } from "react";
import BaseDashboardNavigation from "../../../generalComponents/BaseDashboardNavigation";
import Section from "../../../generalComponents/CustomSection";
import CustomButton from "../../../generalComponents/Button";
import CustomFilter from "../../../generalComponents/CustomFilter";
import { SwitchWithIcon } from "../../../generalComponents/SwitchWithIcon";
import { Equipment } from "../../home/components/Equipment";
import { EquipmentList } from "../../home/components/EquipmentList";
import AdminDeleteConfirmationModal from "../../../generalComponents/AdminDeleteConfirmationModal";

const MyEquipments = () => {
  const [isGridView, setIsGridView] = useState(true);
  const [selected, setSelected] = useState(null);

  // Mock data for my equipments - matching home page structure
  const myEquipments = [
    { id: 1, name: "Hydraulic Drilling Rig HD-3000", status: "Available", location: "Lagos, Nigeria" },
    { id: 2, name: "Compressor X200", status: "In Use", location: "Warri, Nigeria" },
    { id: 3, name: "Crawler Excavator EX75", status: "Scheduled", location: "Port Harcourt, Nigeria" },
    { id: 4, name: "Storage Tank ST-45", status: "Available", location: "Delta, Nigeria" },
    { id: 5, name: "Fire Suppression Unit FSU-15", status: "Under Maintenance", location: "Lagos, Nigeria" },
    { id: 6, name: "BOP System - BOP-850", status: "Available", location: "Lagos, Nigeria" },
    { id: 7, name: "Generator GEN-200KVA", status: "In Use", location: "Lagos, Nigeria" },
    { id: 8, name: "Well Logging Truck WLT-07", status: "Available", location: "Lagos, Nigeria" },
    { id: 9, name: "Hydraulic Power Unit HPU-650", status: "Under Maintenance", location: "Lagos, Nigeria" },
  ];

  const handleDelete = (equipment) => {
    console.log("Delete equipment:", equipment);
  };

  return (
    <BaseDashboardNavigation title={"My Equipment"}>
      <div className='flex flex-col gap-6'>
        <Section
          title="My Equipment"
          subTitle="Manage your listed equipment, update status, or add new machines to Rigshare."
          rightContent={
            <div className='flex gap-2'>
              <CustomButton
                buttonText={"Add New Equipment"}
                buttonColor="bg-brandPurple"
                className="text-white"
                textColor="text-white"
                onClick={() => {
                  document.getElementById("add_equipment").showModal();
                }}
              />
              <CustomButton
                buttonText={"Upload New Equipment"}
                buttonColor={"bg-white"}
                className={"border border-brandPurple"}
                textColor={"text-brandPurple"}
                onClick={() => {
                  document.getElementById("upload_equipment").showModal();
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
                    {myEquipments.map((equipment) => (
                      <Equipment key={equipment.id} item={equipment} />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </Section>

        {/* Modals */}
        <AdminDeleteConfirmationModal
          body="Deleting this equipment is irreversible!"
          title="Delete Equipment"
          buttonText="Delete Equipment"
          onClick={() => handleDelete(selected)}
        />
      </div>
    </BaseDashboardNavigation>
  );
};

export default MyEquipments;