import React from "react";
import BaseDashboardNavigation from "../../../generalComponents/BaseDashboardNavigation";
import AuditData from "../components/AuditData";

const AuditTables = () => {
  return (
    <BaseDashboardNavigation
      title='Audit Log'
      subtitle='Display relevant data related to Audit Log. alongside the Audit Log table'
      breadcrumbs={[
        { label: "Dashboard", path: "/dashboard" },
        { label: "Audit Log", path: "/audit-log" },
      ]}
    >
      <AuditData />
    </BaseDashboardNavigation>
  );
};

export default AuditTables;
