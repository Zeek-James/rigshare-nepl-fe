import React, { useState } from "react";
import TablesComponent from "./TablesComponent";
import { operatorsData } from "../data/operatorsData";
import PaginationRounded from "./Pagination";

const WarehouseTable = ({ buttonFunction }) => {
  const [ setCurrentPage] = useState(1);

  const headers = ["S/N", "Operator", "Warehouse", "Total Items", "Action"];

  const getFormattedValue = (el, index) => {
    return ["001", el?.operator, "Abuja", el?.totalItems];
  };

  // Use the fetched data as the 'data' prop for TableComponent
  return (
    <div className="mt-6 flex flex-col w-full gap-4">
      <div className="h-[67vh] w-full relative">
        {
          <TablesComponent
            // isLoading={isLoading}
            data={operatorsData}
            getFormattedValue={getFormattedValue}
            headers={headers}
            buttonFunction={buttonFunction}
            // Close popup function
          />
        }
      </div>
      <div className="flex items-center justify-between mt-4">
        <p className="text-14px text-brandBlack">1-10 of 195 items</p>
        <PaginationRounded
          defaultPage={1}
          count={100}
          onChange={(page) => {
            setCurrentPage(page);
          }}
        />
      </div>
    </div>
  );
};

export default WarehouseTable;
