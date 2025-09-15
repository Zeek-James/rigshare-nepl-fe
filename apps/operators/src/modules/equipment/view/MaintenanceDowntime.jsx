import React, { useState } from "react";
import BaseDashboardNavigation from "../../../generalComponents/BaseDashboardNavigation";
import Section from "../../../generalComponents/CustomSection";
import CustomButton from "../../../generalComponents/Button";
import CustomFilter from "../../../generalComponents/CustomFilter";
import { SwitchWithIcon } from "../../../generalComponents/SwitchWithIcon";
import { Equipment } from "../../home/components/Equipment";
import { EquipmentList } from "../../home/components/EquipmentList";
import AdminDeleteConfirmationModal from "../../../generalComponents/AdminDeleteConfirmationModal";

const MaintenanceDowntime = () => {
  const [isGridView, setIsGridView] = useState(true);
  const [selected, setSelected] = useState(null);

  // Mock data for equipment under maintenance - matching home page structure
  const maintenanceEquipments = [
    { id: 1, name: "Drilling Rig DR-001", status: "Under Maintenance", location: "Lagos, Nigeria", nextService: "Mar 15, 2024" },
    { id: 2, name: "Compressor Unit CU-023", status: "Under Maintenance", location: "Port Harcourt, Nigeria", nextService: "Feb 28, 2024" },
    { id: 3, name: "Mobile Crane MC-045", status: "Scheduled", location: "Warri, Nigeria", nextService: "Mar 20, 2024" },
    { id: 4, name: "Well Control Package WCP-012", status: "Under Maintenance", location: "Bonny, Nigeria", nextService: "Mar 25, 2024" },
    { id: 5, name: "Mud Pumps MP-078", status: "Out of Service", location: "Kano, Nigeria", nextService: "Apr 1, 2024" },
    { id: 6, name: "BOP System BOP-850", status: "Scheduled", location: "Lagos, Nigeria", nextService: "Apr 5, 2024" },
    { id: 7, name: "Generator GEN-200KVA", status: "Under Maintenance", location: "Delta, Nigeria", nextService: "Apr 10, 2024" },
    { id: 8, name: "Well Logging Truck WLT-07", status: "Scheduled", location: "Lagos, Nigeria", nextService: "Apr 15, 2024" },
  ];

  const handleDelete = (equipment) => {
    console.log("Delete equipment:", equipment);
  };

  return (
    <BaseDashboardNavigation title={"Maintenance & Downtime"}>
      <div className='flex flex-col gap-6'>
        <Section
          title="Maintenance & Downtime"
          subTitle="Track equipment maintenance schedules, manage downtime, and monitor service history."
          rightContent={
            <div className='flex gap-2'>
              <CustomButton
                buttonText={"Schedule Maintenance"}
                buttonColor="bg-brandPurple"
                className="text-white"
                textColor="text-white"
                onClick={() => {
                  document.getElementById("schedule_maintenance").showModal();
                }}
              />
              <CustomButton
                buttonText={"Generate Report"}
                buttonColor={"bg-white"}
                className={"border border-brandPurple"}
                textColor={"text-brandPurple"}
                onClick={() => {
                  console.log("Generate maintenance report");
                }}
              />
            </div>
          }
        >
          <div className='flex flex-col gap-6'>
            <div className='flex w-full justify-between items-center'>
              <div className='flex gap-3'>
                <CustomButton
                  buttonText={"Scheduled"}
                  textColor={"text-[#344054]"}
                  className='bg-white border border-[#A0A0A0]'
                  buttonColor={"bg-white"}
                  onClick={() => {}}
                />
                <CustomButton
                  buttonText={"In Progress"}
                  textColor={"text-[#344054]"}
                  className='bg-white border border-[#A0A0A0]'
                  buttonColor={"bg-white"}
                  onClick={() => {}}
                />
                <CustomButton
                  buttonText={"Completed"}
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
                    {maintenanceEquipments.map((equipment) => (
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
          body="Canceling this maintenance schedule is irreversible!"
          title="Cancel Maintenance"
          buttonText="Cancel Maintenance"
          onClick={() => handleDelete(selected)}
        />
      </div>
    </BaseDashboardNavigation>
  );
};

export default MaintenanceDowntime;