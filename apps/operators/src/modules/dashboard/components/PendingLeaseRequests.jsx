import React from 'react';

const PendingLeaseRequests = () => {
  const leaseRequests = [
    {
      id: 1,
      company: 'Total Energies',
      logo: '⭕',
      equipment: 'Rig Alpha',
      leasePeriod: 'Jan 2024 - Dec 2025',
      status: 'Pending Approval',
      statusColor: 'bg-yellow-100 text-yellow-800'
    },
    {
      id: 2,
      company: 'Shell',
      logo: '🐚',
      equipment: 'Compressor X200',
      leasePeriod: 'Mar 2024 - Aug 2024',
      status: 'Pending Approval',
      statusColor: 'bg-yellow-100 text-yellow-800'
    }
  ];

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Pending Lease Requests</h2>
        <button className="text-brandPurple font-medium text-sm hover:text-purple-700 transition-colors">
          View All
        </button>
      </div>

      <div className="space-y-4">
        {leaseRequests.map((request) => (
          <div key={request.id} className="border border-gray-200 rounded-xl p-4 hover:shadow-sm transition-shadow">
            {/* Company Header */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                <span className="text-sm">{request.logo}</span>
              </div>
              <span className="font-semibold text-gray-900">{request.company}</span>
            </div>

            {/* Request Details */}
            <div className="space-y-3 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Equipment:</span>
                <span className="font-medium text-gray-900">{request.equipment}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Lease Period:</span>
                <span className="font-medium text-gray-900">{request.leasePeriod}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Status:</span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${request.statusColor}`}>
                  {request.status}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-3 border-t border-gray-100">
              <button className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors">
                Accept
              </button>
              <button className="flex-1 bg-red-600 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-red-700 transition-colors">
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PendingLeaseRequests;