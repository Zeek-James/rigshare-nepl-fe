import React, { useEffect, useState } from "react";

import PaginationRounded from "../../../../generalComponents/Pagination";
import { operatorsData } from "../../../../data/operatorsData";
import TablesComponent from "../../../../generalComponents/TablesComponent";
import { useNavigate } from "react-router-dom";
import AvatarWithName from "../../../../generalComponents/AvatarWithName";
import DropdownandSearch from "../../../../generalComponents/DropdownandSearch";
const AuditTrail = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  const headers = ["User", "User Type", "Action"];

  const getFormattedValue = (el, index) => {
    return [
      <AvatarWithName
        title={"LORRA"}
        subtitle={"Last Login: 12 Jan, 2024 - 11:23pm"}
      />,
      "Operator",
    ];
  };

  return (
    <div className="flex flex-col w-full gap-5">
      <div className="flex flex-col md:flex-row mt-2 justify-between gap-y-5">
      <div className="flex items-center gap-3">
          <DropdownandSearch placeholder={"All Users"} options={[]} />
        </div>
      </div>
      <div className="h-[67vh] w-full relative">
        <TablesComponent
          // isLoading={isLoading}
          data={operatorsData}
          getFormattedValue={getFormattedValue}
          headers={headers}
          buttonFunction={(val) => {
            navigate("/audit-trail-list")
            console.log(val);
          }}
        />
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
export default AuditTrail;
