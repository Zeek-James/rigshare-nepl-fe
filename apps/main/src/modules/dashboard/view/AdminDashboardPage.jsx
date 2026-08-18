import React from "react";
import BaseDashboardNavigation from "../../../generalComponents/BaseDashboardNavigation";
import CustomButton from "../../../generalComponents/Button";
import GanttChart from "../components/GanttChart";
import EquipmentStatusTable from "../components/EquipmentStatusTable";
import PendingLeaseRequests from "../components/PendingLeaseRequests";
import LeaseActivitySummary from "../../leaseManagement/components/LeaseActivitySummary";
import EquipmentOverview from "../../leaseManagement/components/EquipmentOverview";
import OngoingLeases from "../../leaseManagement/components/OngoingLeases";
import { 
  inventoryIcon, 
  borrowIncomingCardIcon, 
  transactionsIcon,
  suiteCaseIcon,
  walletMoney,
  chatIcon
} from "../../../assets/icons";

const AdminDashboardPage = () => {
  // Admin-specific dashboard metrics
  const adminDashboardMetrics = [
    {
      title: "Total Users",
      count: "245",
      trend: "+15",
      trendType: "up",
      icon: inventoryIcon,
    },
    {
      title: "Active Operators", 
      count: "89",
      trend: "+8",
      trendType: "up",
      icon: borrowIncomingCardIcon,
    },
    {
      title: "System Leases",
      count: "156",
      trend: "+23",
      trendType: "up", 
      icon: transactionsIcon,
    },
    {
      title: "Platform Revenue",
      count: "$127k",
      trend: "+12%",
      trendType: "up",
      icon: walletMoney,
    },
    {
      title: "Support Tickets",
      count: "12",
      trend: "-3",
      trendType: "down",
      icon: suiteCaseIcon,
    },
    {
      title: "System Alerts",
      count: "7",
      trend: "+2",
      trendType: "up",
      icon: chatIcon,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <BaseDashboardNavigation />
      
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {/* Admin Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Manage your RigShare platform and monitor system performance</p>
        </div>

        {/* Admin Metrics Grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 mb-8">
          {adminDashboardMetrics.map((metric, index) => (
            <div key={index} className="relative bg-white pt-5 px-4 pb-12 sm:pt-6 sm:px-6 shadow rounded-lg overflow-hidden">
              <dt>
                <div className="absolute bg-indigo-500 rounded-md p-3">
                  <img src={metric.icon} alt={metric.title} className="h-6 w-6 text-white" />
                </div>
                <p className="ml-16 text-sm font-medium text-gray-500 truncate">{metric.title}</p>
              </dt>
              <dd className="ml-16 pb-6 flex items-baseline sm:pb-7">
                <p className="text-2xl font-semibold text-gray-900">{metric.count}</p>
                <p className={`ml-2 flex items-baseline text-sm font-semibold ${
                  metric.trendType === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {metric.trend}
                  <span className="sr-only">
                    {metric.trendType === 'up' ? 'Increased' : 'Decreased'} by
                  </span>
                </p>
              </dd>
            </div>
          ))}
        </div>

        {/* Admin-specific sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* System Overview */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">System Overview</h3>
            <EquipmentOverview />
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Platform Activity</h3>
            <LeaseActivitySummary />
          </div>
        </div>

        {/* Admin Tables */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Equipment Status */}
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Platform Equipment Status</h3>
            </div>
            <div className="p-6">
              <EquipmentStatusTable />
            </div>
          </div>

          {/* System Requests */}
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Pending System Requests</h3>
            </div>
            <div className="p-6">
              <PendingLeaseRequests />
            </div>
          </div>
        </div>

        {/* Gantt Chart for System Timeline */}
        <div className="mt-8 bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">System Operations Timeline</h3>
          </div>
          <div className="p-6">
            <GanttChart />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;