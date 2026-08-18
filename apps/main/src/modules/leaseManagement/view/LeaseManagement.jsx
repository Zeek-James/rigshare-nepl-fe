import React from 'react';
import BaseDashboardNavigation from '../../../generalComponents/BaseDashboardNavigation';
import LeaseActivitySummary from '../components/LeaseActivitySummary';
import EquipmentOverview from '../components/EquipmentOverview';
import OngoingLeases from '../components/OngoingLeases';

const LeaseManagement = () => {
  return (
    <BaseDashboardNavigation 
      title="Lease Management"
      breadcrumbs={[
        { label: 'Home', path: '/' },
        { label: 'Lease Management', path: '/lease-management' }
      ]}
    >
      <div className="space-y-8">
        {/* Lease Activity Summary */}
        <LeaseActivitySummary />
        
        {/* Ongoing Leases */}
        <OngoingLeases />
        
        {/* Equipment Overview */}
        <EquipmentOverview />
      </div>
    </BaseDashboardNavigation>
  );
};

export default LeaseManagement;