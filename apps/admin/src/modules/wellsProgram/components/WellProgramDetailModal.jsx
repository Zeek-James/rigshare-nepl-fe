import React from 'react';
import ModalManagement from '../../../generalComponents/ModalManagement';
import CustomButton from '../../../generalComponents/Button';

const WellProgramDetailModal = ({ modalId = "well_program_detail", programDetails }) => {
  const handleClose = () => {
    document.getElementById(modalId).close();
  };

  const handleDownload = () => {
    // Handle document download
    console.log('Downloading document...');
  };

  const utilizedEquipment = [
    {
      id: 1,
      equipment: 'Drilling Rig',
      owner: 'Sahara',
      location: 'Kano',
      startDate: 'Aug 15, 2024',
      endDate: 'Aug 31, 2024',
      status: 'Active',
      statusColor: 'bg-blue-100 text-blue-800'
    },
    {
      id: 2,
      equipment: 'Compressor Unit',
      owner: 'Total',
      location: 'Lagos',
      startDate: 'Aug 20, 2024',
      endDate: 'Sept 5, 2024',
      status: 'Active',
      statusColor: 'bg-blue-100 text-blue-800'
    },
    {
      id: 3,
      equipment: 'Crane',
      owner: 'Shell',
      location: 'Port Harcourt',
      startDate: 'Sept 1, 2024',
      endDate: 'Sept 15, 2024',
      status: 'Scheduled',
      statusColor: 'bg-yellow-100 text-yellow-800'
    }
  ];

  const suggestedEquipment = [
    {
      id: 1,
      equipment: 'Well Control Equipment',
      owner: 'Chevron',
      location: 'Warri',
      availability: 'Available',
      match: '95%'
    },
    {
      id: 2,
      equipment: 'Mud Pumps',
      owner: 'ExxonMobil',
      location: 'Bonny',
      availability: 'Available',
      match: '88%'
    }
  ];

  if (!programDetails) return null;

  return (
    <ModalManagement
      id={modalId}
      title=""
      onClose={() => {}}
      className="rounded-2xl max-w-4xl p-0"
    >
      <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Well Program Detail</h2>
          <button 
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-6">
          {/* Program Information Grid */}
          <div className="grid grid-cols-2 gap-6 mb-8">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">Program Name</label>
                <p className="text-gray-900 font-medium">{programDetails.programName}</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">Project Location</label>
                <p className="text-gray-900">{programDetails.field}</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">Drilling Type</label>
                <p className="text-gray-900">Vertical Exploration</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">Well Count</label>
                <p className="text-gray-900">3</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">Est Well Date</label>
                <p className="text-gray-900">{programDetails.endDate}</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">Reporting Date</label>
                <p className="text-gray-900">{programDetails.startDate}</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">Expiration</label>
                <p className="text-gray-900">31/12/2024</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">Owner</label>
                <p className="text-gray-900">Offshore Exploration Inc.</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">Well Type</label>
                <p className="text-gray-900">Exploration</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">Status</label>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${programDetails.statusColor}`}>
                  {programDetails.status}
                </span>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">Description</label>
                <p className="text-gray-900 text-sm leading-relaxed">
                  Comprehensive offshore drilling program targeting multiple gas prospects in the specified field area. Includes advanced exploration techniques and environmental compliance measures.
                </p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">Documents</label>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
                    </svg>
                    Well Program Plan.pdf
                  </div>
                  <button 
                    onClick={handleDownload}
                    className="text-brandPurple hover:text-purple-700 text-sm font-medium"
                  >
                    Download
                  </button>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">Safety Information</label>
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Safety Compliant
                  </span>
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    Environmental Cleared
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Utilized Equipment Section */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Utilized Equipment</h3>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">Total: {utilizedEquipment.length} equipment</span>
                <button className="text-brandPurple hover:text-purple-700 text-sm font-medium">
                  View All
                </button>
              </div>
            </div>
            
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Equipment</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Owner</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Location</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Start Date</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">End Date</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">More</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {utilizedEquipment.map((equipment) => (
                    <tr key={equipment.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">{equipment.equipment}</td>
                      <td className="px-4 py-3 text-sm text-gray-900">{equipment.owner}</td>
                      <td className="px-4 py-3 text-sm text-gray-900">{equipment.location}</td>
                      <td className="px-4 py-3 text-sm text-gray-900">{equipment.startDate}</td>
                      <td className="px-4 py-3 text-sm text-gray-900">{equipment.endDate}</td>
                      <td className="px-4 py-3 text-sm">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${equipment.statusColor}`}>
                          {equipment.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-500">
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

          {/* Suggested Equipment Section */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Suggested Equipment</h3>
              <span className="text-sm text-gray-500">AI-powered recommendations</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {suggestedEquipment.map((equipment) => (
                <div key={equipment.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-900">{equipment.equipment}</h4>
                    <span className="text-sm font-medium text-green-600">{equipment.match} match</span>
                  </div>
                  <div className="space-y-1 text-sm text-gray-600">
                    <div className="flex justify-between">
                      <span>Owner:</span>
                      <span className="text-gray-900">{equipment.owner}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Location:</span>
                      <span className="text-gray-900">{equipment.location}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Status:</span>
                      <span className="text-green-600 font-medium">{equipment.availability}</span>
                    </div>
                  </div>
                  <div className="mt-3 flex gap-2">
                    <CustomButton
                      buttonText="Request"
                      buttonColor="bg-brandPurple"
                      className="text-white text-xs py-1.5 px-3 rounded-md flex-1"
                      textColor="text-white"
                      onClick={() => console.log('Request equipment:', equipment.equipment)}
                    />
                    <CustomButton
                      buttonText="View Details"
                      buttonColor="bg-gray-100"
                      className="text-gray-700 text-xs py-1.5 px-3 rounded-md flex-1"
                      textColor="text-gray-700"
                      onClick={() => console.log('View details:', equipment.equipment)}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </ModalManagement>
  );
};

export default WellProgramDetailModal;