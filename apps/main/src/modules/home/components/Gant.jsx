import React from "react";
import { EquipmentShareProgress } from "./EquipmentShareProgress";
import { NPTRecord } from "./NPTRecord";
import { GanttChart } from "./GanttChart";
import { UpComingShares } from "./UpcomingShares";

export const GantComponent = () => {
  return (
    <div className='flex'>
      <div className='flex-1'>
        <GanttChart />
        <UpComingShares />
      </div>
      <div className='flex flex-col justify-between gap-6'>
        <div className='flex-1'>
          <EquipmentShareProgress />
        </div>
        <div className='flex-1'>
          <NPTRecord />
        </div>
      </div>
    </div>
  );
};
