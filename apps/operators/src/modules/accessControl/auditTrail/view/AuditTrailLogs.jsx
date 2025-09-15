import React from "react";
import BaseDashboardNavigation from "../../../../generalComponents/BaseDashboardNavigation";
import Breadcrumb from "../../../../generalComponents/BreadCrumb";
import {  useParams } from "react-router-dom";
import TablesComponent from "../../../../generalComponents/TablesComponent";
import useGetAuditLogsById from "../controllers/getAuditLogsByIdController";

const AuditLogs = () => {
  const { id } = useParams();
  const items = [];

  const { data: auditLogs, isLoading } = useGetAuditLogsById({ id });

  const headers = ["Activity Log", "Date", ""];

  const getFormattedValue = (el, index) => {
    return [
      el?.activity,
      <span>
        {new Intl.DateTimeFormat("en-GB", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })
          .format(new Date(el?.activity_datetime))
          .replace(",", "")
          .toLowerCase()}
      </span>,
    ];
  };

  return (
    <BaseDashboardNavigation>
      <div className="mt-6 flex flex-col w-full gap-2">
        <Breadcrumb items={items} />
        <div className="flex justify-between items-center mt-5">
          <div className="flex flex-col gap-5 w-full">
            <div className="flex items-center justify-between w-full"></div>
          </div>
        </div>

        <TablesComponent
          isLoading={isLoading}
          data={auditLogs?.data?.results}
          getFormattedValue={getFormattedValue}
          headers={headers}
          buttonFunction={(val) => {
            console.log(val);
          }}
          hideActionButton={true}
        />
      </div>
    </BaseDashboardNavigation>
  );
};

export default AuditLogs;
