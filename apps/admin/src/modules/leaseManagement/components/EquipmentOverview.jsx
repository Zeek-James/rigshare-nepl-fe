import React, { useState } from 'react';

const EquipmentOverview = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const equipmentData = [
    {
      id: 1,
      name: 'Rig Alpha',
      category: 'Drilling Rig',
      leaseExpiry: 'Jan 2025',
      location: 'Port Harcourt',
      status: 'In Use',
      statusColor: 'bg-blue-100 text-blue-800'
    },
    {
      id: 2,
      name: 'Compressor X200',
      category: 'Compressor',
      leaseExpiry: 'Jan 2025',
      location: 'Lagos',
      status: 'Available',
      statusColor: 'bg-green-100 text-green-800'
    },
    {
      id: 3,
      name: 'Crane L300',
      category: 'Lifting Equipment',
      leaseExpiry: 'Jan 2025',
      location: 'Warri',
      status: 'Under Maintenance',
      statusColor: 'bg-red-100 text-red-800'
    },
    {
      id: 4,
      name: 'Rig Alpha',
      category: 'Drilling Rig',
      leaseExpiry: 'Jan 2025',
      location: 'Port Harcourt',
      status: 'In Use',
      statusColor: 'bg-blue-100 text-blue-800'
    },
    {
      id: 5,
      name: 'Compressor X200',
      category: 'Compressor',
      leaseExpiry: 'Jan 2025',
      location: 'Lagos',
      status: 'Available',
      statusColor: 'bg-green-100 text-green-800'
    },
    {
      id: 6,
      name: 'Crane L300',
      category: 'Lifting Equipment',
      leaseExpiry: 'Jan 2025',
      location: 'Warri',
      status: 'Under Maintenance',
      statusColor: 'bg-red-100 text-red-800'
    }
  ];

  const filteredEquipment = equipmentData.filter(equipment =>
    equipment.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    equipment.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    equipment.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
    equipment.status.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-200">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Equipment Overview</h2>
        <p className="text-gray-600 text-sm">Easily track your equipment's status, location, and leasing history.</p>
      </div>

      {/* Search and Actions */}
      <div className="flex items-center justify-between mb-6">
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
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
        <button className="text-brandPurple font-medium text-sm hover:text-purple-700 transition-colors">
          View All
        </button>
      </div>

      {/* Table */}
      <div className="overflow-hidden border border-gray-200 rounded-lg">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Equipment Name</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Category</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Lease Expiry</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Location</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Status</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredEquipment.map((equipment) => (
              <tr key={equipment.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {equipment.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {equipment.category}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {equipment.leaseExpiry}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {equipment.location}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${equipment.statusColor}`}>
                    {equipment.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EquipmentOverview;