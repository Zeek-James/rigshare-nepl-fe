import React, { useState } from 'react';
import CustomButton from '../../../generalComponents/Button';

const LeaseActivitySummary = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const leaseData = [
    {
      leaseId: 'LEASE-0382',
      equipment: 'Compressor X200',
      from: 'You',
      to: 'Chevron',
      status: 'Accepted',
      statusColor: 'bg-green-100 text-green-800'
    },
    {
      leaseId: 'LEASE-0386',
      equipment: 'Rig JU-550',
      from: 'ExxonMobil',
      to: 'You',
      status: 'Pending',
      statusColor: 'bg-yellow-100 text-yellow-800'
    },
    {
      leaseId: 'LEASE-0452',
      equipment: 'Rig GZ-220',
      from: 'Chevron',
      to: 'You',
      status: 'Pending',
      statusColor: 'bg-yellow-100 text-yellow-800'
    },
    {
      leaseId: 'LEASE-0529',
      equipment: 'Rig DT-410',
      from: 'Shell',
      to: 'You',
      status: 'Active',
      statusColor: 'bg-blue-100 text-blue-800'
    },
    {
      leaseId: 'LEASE-0611',
      equipment: 'Rig QW-770',
      from: 'BP',
      to: 'You',
      status: 'Rejected',
      statusColor: 'bg-red-100 text-red-800'
    }
  ];

  const filteredLeases = leaseData.filter(lease =>
    lease.leaseId.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lease.equipment.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lease.from.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lease.to.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-white rounded-2xl border-2 border-blue-400 border-dashed p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Lease Activity Summary</h2>
        <CustomButton
          buttonText="Go to Lease Management"
          buttonColor="bg-brandPurple"
          className="text-white px-4 py-2 text-sm"
          textColor="text-white"
        />
      </div>

      {/* Search and Filter */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brandPurple focus:border-brandPurple"
            />
            <svg className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.707A1 1 0 013 7V4z" />
            </svg>
            Filter
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden border border-gray-200 rounded-lg">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Lease ID</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Equipment</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">From</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">To</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Status</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">More</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredLeases.map((lease) => (
              <tr key={lease.leaseId} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {lease.leaseId}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {lease.equipment}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {lease.from}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {lease.to}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${lease.statusColor}`}>
                    {lease.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <button className="hover:text-gray-700">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeaseActivitySummary;