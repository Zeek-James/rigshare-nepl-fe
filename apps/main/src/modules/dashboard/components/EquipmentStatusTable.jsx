import React from 'react';
import CustomButton from '../../../generalComponents/Button';

const EquipmentStatusTable = () => {
  const equipmentData = [
    {
      category: 'Drilling',
      available: 3,
      inUse: 2,
      underMaintenance: 1
    },
    {
      category: 'Excavating', 
      available: 5,
      inUse: 3,
      underMaintenance: 2
    },
    {
      category: 'Mechanical',
      available: 4,
      inUse: 2,
      underMaintenance: 1
    },
    {
      category: 'Excavating',
      available: 5,
      inUse: 3,
      underMaintenance: 2
    },
    {
      category: 'Drilling',
      available: 8,
      inUse: 5,
      underMaintenance: 4
    }
  ];

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">My Equipment Status</h2>
        <div className="flex gap-3">
          <CustomButton
            buttonText="Add Equipment"
            buttonColor="bg-white"
            className="border border-brandPurple text-sm py-2 px-4 rounded-lg"
            textColor="text-brandPurple"
          />
          <button className="text-brandPurple font-medium text-sm hover:text-purple-700 transition-colors">
            Edit
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 font-medium text-gray-700">Category</th>
              <th className="text-center py-3 px-4 font-medium text-gray-700">Available</th>
              <th className="text-center py-3 px-4 font-medium text-gray-700">In Use</th>
              <th className="text-center py-3 px-4 font-medium text-gray-700">Under Maintenance</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {equipmentData.map((row, index) => (
              <tr key={index} className="hover:bg-gray-50 transition-colors">
                <td className="py-4 px-4 font-medium text-gray-900">{row.category}</td>
                <td className="py-4 px-4 text-center">
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-green-100 text-green-800 font-medium text-sm">
                    {row.available}
                  </span>
                </td>
                <td className="py-4 px-4 text-center">
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-800 font-medium text-sm">
                    {row.inUse}
                  </span>
                </td>
                <td className="py-4 px-4 text-center">
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-orange-100 text-orange-800 font-medium text-sm">
                    {row.underMaintenance}
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

export default EquipmentStatusTable;