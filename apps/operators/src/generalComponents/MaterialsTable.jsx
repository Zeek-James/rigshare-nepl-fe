import React, { useState } from "react";
import { arrowDown, arrowUp } from "../assets/icons";
import AvatarWithName from "./AvatarWithName";
import TitleAndSubtitle from "./TitleAndSubtitle";
import TablesComponent from "./TablesComponent";
import { operatorsData } from "../data/operatorsData";
import PaginationRounded from "./Pagination";

const MaterialsTable = ({
  buttonFunction,
  toggleRowFunction,
  toggleSelectAllFunction,
}) => {
  const [ setCurrentPage] = useState(1);
  const [selectedRows, setSelectedRows] = useState([]);

  const headers = [
    "Material Name",
    "Quantity",
    "Total Value",
    "Total + Freight Value",
    "Action",
  ];

  const [expandedIndex, setExpandedIndex] = useState(0);

  const getFormattedValue = (el, index) => {
    return [
      <div className="flex items-start gap-3">
        <img
          onClick={() => {
            setExpandedIndex(index);
          }}
          src={expandedIndex === index ? arrowDown : arrowUp}
          className="cursor-pointer"
          alt="Item"
        />
        <div className="w-full flex flex-col gap-4 relative max-w-[200px]">
          <AvatarWithName title={el?.materialName} subtitle={el?.material} />
          {expandedIndex === index && (
            <div className="flex items-center gap-8 max-w-max w-full justify-between">
              <TitleAndSubtitle title={"Component"} subtitle={el?.component} />
              <TitleAndSubtitle
                title={"Batch Number"}
                subtitle={el?.batchNumber}
              />
            </div>
          )}
        </div>
      </div>,
      <div className="w-full flex flex-col gap-4">
        <TitleAndSubtitle title={"Total Quantity"} subtitle={el?.quantity} />
        {expandedIndex === index && (
          <TitleAndSubtitle title={"Dimension"} subtitle={el?.dimension} />
        )}
      </div>,
      <div className="w-full flex flex-col gap-4">
        <div className="flex items-center gap-3 max-w-max w-full">
          <TitleAndSubtitle title={"NGN(₦)"} subtitle={el?.totalValue?.NGN} />
          <TitleAndSubtitle title={"USD($)"} subtitle={el?.totalValue?.USD} />
        </div>
        {expandedIndex === index && (
          <div className="flex items-center gap-8 max-w-max w-full justify-between">
            <TitleAndSubtitle
              title={"Classification"}
              subtitle={el?.classification}
            />
            <TitleAndSubtitle
              title={"Connection Type"}
              subtitle={el?.connectionType}
            />
          </div>
        )}
      </div>,
      <div className="w-full flex flex-col gap-4">
        <div className="flex items-center gap-3 max-w-max w-full">
          <TitleAndSubtitle
            title={"NGN(₦)"}
            subtitle={el?.totalFreightValue?.NGN}
          />
          <TitleAndSubtitle
            title={"USD($)"}
            subtitle={el?.totalFreightValue?.USD}
          />
        </div>
        {expandedIndex === index && (
          <div className="flex items-center gap-3 max-w-max w-full">
            <TitleAndSubtitle title={"Material"} subtitle={el?.material} />
            <TitleAndSubtitle title={"Capacity"} subtitle={el?.capacity} />
          </div>
        )}
      </div>,
    ];
  };
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
            toggleRowFunction={toggleRowFunction}
            toggleSelectAllFunction={toggleSelectAllFunction}
            setSelectedRows={setSelectedRows}
            selectedRows={selectedRows}
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

export default MaterialsTable;
