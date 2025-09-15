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

const DashboardPage = () => {
  // Enhanced dashboard metrics with trend indicators
  const dashboardMetrics = [
    {
      title: "My Equipment",
      count: "12",
      trend: "+2",
      trendType: "up",
      icon: inventoryIcon,
    },
    {
      title: "Incoming Requests", 
      count: "3",
      trend: "+2",
      trendType: "up",
      icon: borrowIncomingCardIcon,
    },
    {
      title: "Active Leases",
      count: "2",
      trend: "+2",
      trendType: "up", 
      icon: transactionsIcon,
    },
    {
      title: "Well Programs",
      count: "5",
      trend: "+2",
      trendType: "up",
      icon: suiteCaseIcon,
    },
    {
      title: "Payments Due",
      count: "1",
      trend: "+2",
      trendType: "down",
      icon: walletMoney,
    },
    {
      title: "Unread Chats",
      count: "4",
      trend: "+2",
      trendType: "up",
      icon: chatIcon,
    }
  ];

  // Well Programs data
  const wellPrograms = [
    {
      id: 1,
      title: "Offshore Drilling Phase 1",
      linkedEquipment: "Rig Alpha",
      timeframe: "Jan 2024 - Dec 2025",
      status: "Active",
      statusColor: "bg-green-100 text-green-800"
    },
    {
      id: 2, 
      title: "Deepwater Exploration 2023",
      linkedEquipment: "Drillship Titan",
      timeframe: "Mar 2023 - Dec 2023",
      status: "Completed",
      statusColor: "bg-blue-100 text-blue-800"
    }
  ];

  // Equipment suggestions data
  const equipmentSuggestions = [
    {
      id: 1,
      name: "Compressor X200",
      image: "/api/placeholder/150/120",
      availableFrom: "Chevron",
      location: "Warri"
    },
    {
      id: 2,
      name: "Storage Tank ST-45", 
      image: "/api/placeholder/150/120",
      availableFrom: "OilPro Nigeria",
      location: "Warri"
    }
  ];

  const MetricCard = ({ title, count, trend, trendType, icon }) => (
    <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center">
            <img src={icon} alt={title} className="w-6 h-6" />
          </div>
          <span className="text-sm font-medium text-gray-600">{title}</span>
        </div>
      </div>
      <div className="flex items-end justify-between">
        <span className="text-3xl font-bold text-gray-900">{count}</span>
        <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
          trendType === 'up' 
            ? 'bg-green-100 text-green-700' 
            : 'bg-red-100 text-red-700'
        }`}>
          <span className="text-xs">
            {trendType === 'up' ? '↗️' : '↘️'}
          </span>
          <span>{trend}</span>
        </div>
      </div>
    </div>
  );

  const WellProgramCard = ({ program }) => (
    <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
      <div className="space-y-4">
        <h3 className="font-semibold text-gray-900">{program.title}</h3>
        <div className="space-y-2 text-sm text-gray-600">
          <div className="flex justify-between">
            <span>Linked Equipment</span>
            <span className="text-gray-900">{program.linkedEquipment}</span>
          </div>
          <div className="flex justify-between">
            <span>Timeframe:</span>
            <span className="text-gray-900">{program.timeframe}</span>
          </div>
          <div className="flex justify-between">
            <span>Status:</span>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${program.statusColor}`}>
              {program.status}
            </span>
          </div>
        </div>
        <button className="w-full text-center text-brandPurple font-medium text-sm border-t pt-4 mt-4 hover:text-purple-700 transition-colors">
          View PDF
        </button>
      </div>
    </div>
  );

  const EquipmentSuggestionCard = ({ equipment }) => (
    <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex gap-4">
        <div className="w-20 h-16 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
          <div className="text-gray-400 text-xs text-center">Equipment<br/>Image</div>
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900 text-base mb-1">{equipment.name}</h3>
          <p className="text-sm text-gray-600 mb-2">Available from {equipment.availableFrom}</p>
          <div className="flex items-center gap-1 text-sm text-gray-600">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>{equipment.location}</span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <BaseDashboardNavigation title="Dashboard">
      <div className="space-y-8">
        {/* Welcome Section */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Welcome back, Ahmed!</h1>
          <p className="text-gray-600">Here's a quick snapshot of your operations.</p>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dashboardMetrics.map((metric, index) => (
            <MetricCard
              key={index}
              title={metric.title}
              count={metric.count}
              trend={metric.trend}
              trendType={metric.trendType}
              icon={metric.icon}
            />
          ))}
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Well Programs */}
          <div className="bg-gray-50 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Recent Well Programs</h2>
              <div className="flex gap-3">
                <CustomButton
                  buttonText="Upload New Well Program"
                  buttonColor="bg-white"
                  className="border border-brandPurple text-sm py-2 px-4"
                  textColor="text-brandPurple"
                />
                <button className="text-brandPurple font-medium text-sm hover:text-purple-700 transition-colors">
                  View All
                </button>
              </div>
            </div>
            <div className="space-y-4">
              {wellPrograms.map((program) => (
                <WellProgramCard key={program.id} program={program} />
              ))}
            </div>
          </div>

          {/* Equipment Suggestions */}
          <div className="bg-gray-50 rounded-2xl p-6">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Equipment Suggestions</h2>
              <p className="text-gray-600 text-sm">Based on your latest well program, here are suitable equipment options:</p>
            </div>
            <div className="space-y-4">
              {equipmentSuggestions.map((equipment) => (
                <EquipmentSuggestionCard key={equipment.id} equipment={equipment} />
              ))}
            </div>
          </div>
        </div>

        {/* Equipment Usage Timeline - Gantt Chart */}
        <GanttChart />

        {/* Bottom Section - Equipment Status and Lease Requests */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <EquipmentStatusTable />
          <PendingLeaseRequests />
        </div>

        {/* Lease Management Sections */}
        <LeaseActivitySummary />
        <OngoingLeases />
        <EquipmentOverview />
      </div>
    </BaseDashboardNavigation>
  );
};

export default DashboardPage;