import { useState } from "react";
import BaseDashboardNavigation from "../../../generalComponents/BaseDashboardNavigation";
import CustomButton from "../../../generalComponents/Button";
import AdminDeleteConfirmationModal from "../../../generalComponents/AdminDeleteConfirmationModal";
import Tabs from "../../../generalComponents/Tabs";
import OutgoingRequests from "../components/OutgoingRequests";
import IncomingRequests from "../components/IncomingRequests";
import ContractDetailsModal from "../components/ContractDetailsModal";
import RenegotiateModal from "../components/RenegotiateModal";
import LeaseRequestModal from "../components/LeaseRequestModal";

const LeaseRequests = () => {
  const [selected, setSelected] = useState(null);

  // Mock data for lease requests
  const leaseRequestsData = [
    {
      id: 1,
      equipmentName: "Rig HD-3000",
      owner: "Chevron",
      requestedPeriod: "May 15 - June 10",
      lastUpdated: "May 7, 2025",
      status: "Pending",
      statusColor: "bg-yellow-100 text-yellow-800",
      type: "outgoing",
      dailyRate: "$15,000",
      location: "Lagos, Nigeria",
      description: "Heavy-duty drilling rig for offshore operations",
    },
    {
      id: 2,
      equipmentName: "Compressor X200",
      owner: "Shell",
      requestedPeriod: "Apr 28 - May 15",
      lastUpdated: "Apr 22, 2025",
      status: "Rejected",
      statusColor: "bg-red-100 text-red-800",
      type: "outgoing",
      dailyRate: "$8,500",
      location: "Port Harcourt, Nigeria",
      description: "High-pressure compressor unit",
    },
    {
      id: 3,
      equipmentName: "Tank ST-90",
      owner: "OilPro",
      requestedPeriod: "Mar 1 - Mar 20",
      lastUpdated: "Mar 1, 2025",
      status: "Accepted",
      statusColor: "bg-green-100 text-green-800",
      type: "outgoing",
      dailyRate: "$3,200",
      location: "Warri, Nigeria",
      description: "Storage tank for crude oil",
    },
    {
      id: 4,
      equipmentName: "Drilling Equipment DE-450",
      owner: "TotalEnergies",
      requestedPeriod: "June 1 - July 15",
      lastUpdated: "May 10, 2025",
      status: "Pending",
      statusColor: "bg-yellow-100 text-yellow-800",
      type: "incoming",
      dailyRate: "$22,000",
      location: "Abuja, Nigeria",
      description: "Complete drilling equipment package",
    },
    {
      id: 5,
      equipmentName: "Mobile Crane MC-200",
      owner: "ExxonMobil",
      requestedPeriod: "May 20 - June 5",
      lastUpdated: "May 8, 2025",
      status: "Under Review",
      statusColor: "bg-blue-100 text-blue-800",
      type: "incoming",
      dailyRate: "$5,800",
      location: "Lagos, Nigeria",
      description: "Heavy-lift mobile crane",
    },
    {
      id: 6,
      equipmentName: "Well Control System WCS-100",
      owner: "Schlumberger",
      requestedPeriod: "Apr 15 - May 10",
      lastUpdated: "Apr 20, 2025",
      status: "Accepted",
      statusColor: "bg-green-100 text-green-800",
      type: "incoming",
      dailyRate: "$18,500",
      location: "Delta, Nigeria",
      description: "Advanced well control system",
    },
  ];

  const handleAction = (index, val) => {
    console.log({ index, val });

    setSelected(val);
    switch (index) {
      case 0: // View Details
        document.getElementById("lease_detail").showModal();
        break;
      case 1: // Accept Request / Update Request
        document.getElementById("renegotiate_modal").showModal();
        break;
      // case 2: // Reject Request
      //   document.getElementById("reject_request").showModal();
      //   break;
      // case 3: // Negotiate Terms
      //   document.getElementById("renegotiate_modal").showModal();
      //   break;
      // case 4: // Cancel Request / Request More Info
      //   document.getElementById("admin_delete").showModal();
      //   break;
      default:
        break;
    }
  };

  const handleDelete = (request) => {
    console.log("Cancel request:", request);
  };

  const getTabStats = (type) => {
    return leaseRequestsData.filter((item) => item.type === type).length;
  };

  // Create tab data for the Tabs component
  const tabsData = [
    {
      label: `Outgoing Lease Requests (${getTabStats("outgoing")})`,
      component: (
        <OutgoingRequests
          leaseRequestsData={leaseRequestsData}
          onAction={handleAction}
        />
      ),
    },
    {
      label: `Incoming Lease Requests (${getTabStats("incoming")})`,
      component: (
        <IncomingRequests
          leaseRequestsData={leaseRequestsData}
          onAction={handleAction}
        />
      ),
    },
  ];

  return (
    <BaseDashboardNavigation
      title='Lease Requests'
      breadcrumbs={[
        { label: "Home", path: "/" },
        { label: "Lease", path: "#" },
        { label: "Lease Requests", path: "/lease-requests" },
      ]}
    >
      <div className='space-y-6'>
        {/* Header */}
        <div className='flex justify-between items-start'>
          <div>
            <h1 className='text-2xl font-bold text-gray-900 mb-2'>
              Lease Requests & Contracts
            </h1>
            <p className='text-gray-600'>
              Manage all your lease activities — from requests to active
              contracts and completed operations.
            </p>
          </div>
          <div className='flex gap-3'>
            <CustomButton
              buttonText='New Request'
              buttonColor='bg-brandPurple'
              className='text-white text-sm py-2 px-4 rounded-lg'
              textColor='text-white'
              onClick={() => {
                document.getElementById("new_lease_request").showModal();
              }}
            />
            {/* <CustomButton
              buttonText='Export Data'
              buttonColor='bg-white'
              className='border border-gray-300 text-sm py-2 px-4 rounded-lg'
              textColor='text-gray-700'
              onClick={() => {
                console.log("Export lease requests data");
              }}
            /> */}
          </div>
        </div>

        {/* Lease Requests Tabs */}
        <Tabs tabsData={tabsData} />
      </div>

      {/* Modals */}
      <LeaseRequestModal modalId='new_lease_request' />
      <ContractDetailsModal leaseRequest={selected} modalId='lease_detail' />
      <RenegotiateModal leaseRequest={selected} modalId='renegotiate_modal' />
      <AdminDeleteConfirmationModal
        body='Canceling this lease request is irreversible!'
        title='Cancel Lease Request'
        buttonText='Cancel Request'
        onClick={() => handleDelete(selected)}
      />
    </BaseDashboardNavigation>
  );
};

export default LeaseRequests;
