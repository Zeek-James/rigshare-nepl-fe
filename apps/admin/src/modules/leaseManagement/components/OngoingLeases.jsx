import React, { useState } from 'react';

const OngoingLeases = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const ongoingLeasesData = [
    {
      id: 1,
      lessee: 'Chevron',
      equipment: 'Crane L300',
      leaseStart: 'May 2023',
      leaseEnd: 'Apr 2024'
    },
    {
      id: 2,
      lessee: 'Total Energies',
      equipment: 'Rig Alpha',
      leaseStart: 'Jan 2022',
      leaseEnd: 'Dec 2025'
    },
    {
      id: 3,
      lessee: 'Chevron',
      equipment: 'Crane L300',
      leaseStart: 'May 2023',
      leaseEnd: 'Apr 2024'
    },
    {
      id: 4,
      lessee: 'Total Energies',
      equipment: 'Rig Alpha',
      leaseStart: 'Jan 2022',
      leaseEnd: 'Dec 2025'
    }
  ];

  const filteredLeases = ongoingLeasesData.filter(lease =>
    lease.lessee.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lease.equipment.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lease.leaseStart.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lease.leaseEnd.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-200">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Ongoing Leases</h2>
        <button className="text-brandPurple font-medium text-sm hover:text-purple-700 transition-colors">
          View All
        </button>
      </div>

      {/* Search and Filter */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brandPurple focus:border-brandPurple w-72"
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
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden border border-gray-200 rounded-lg">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Lessee</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Equipment</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Lease Start</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Lease End</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">More</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredLeases.map((lease) => (
              <tr key={lease.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {lease.lessee}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {lease.equipment}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {lease.leaseStart}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {lease.leaseEnd}
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

      {/* Empty State */}
      {filteredLeases.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">No ongoing leases found matching your search criteria.</p>
        </div>
      )}
    </div>
  );
};

export default OngoingLeases;