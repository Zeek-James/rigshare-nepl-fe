import React from "react";
import { Equipment } from "./Equipment";

export const EquipmentGridView = () => {
  // Mock equipment data - in real app this would come from API
  const mockEquipment = [
    { id: 1, name: "Hydraulic Drilling Rig HD-3000", status: "Available", location: "Lagos, Nigeria" },
    { id: 2, name: "Compressor X200", status: "In Use", location: "Warri, Nigeria" },
    { id: 3, name: "Crawler Excavator EX75", status: "Scheduled", location: "Port Harcourt, Nigeria" },
    { id: 4, name: "Storage Tank ST-45", status: "Available", location: "Delta, Nigeria" },
    { id: 5, name: "Fire Suppression Unit FSU-15", status: "Under Maintenance", location: "Bayelsa, Nigeria" },
    { id: 6, name: "BOP System - BOP-850", status: "Available", location: "Lagos, Nigeria" },
    { id: 7, name: "Generator GEN-200KVA", status: "In Use", location: "Lagos, Nigeria" },
    { id: 8, name: "Well Logging Truck WLT-07", status: "Available", location: "Lagos, Nigeria" },
    { id: 9, name: "Hydraulic Power Unit HPU-650", status: "Under Maintenance", location: "Lagos, Nigeria" },
  ];

  return (
    <div className='w-full'>
      <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4'>
        {mockEquipment.map((equipment) => (
          <Equipment key={equipment.id} item={equipment} />
        ))}
      </div>
    </div>
  );
};
