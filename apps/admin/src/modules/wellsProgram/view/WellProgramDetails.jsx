import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import BaseDashboardNavigation from '../../../generalComponents/BaseDashboardNavigation';
import CustomButton from '../../../generalComponents/Button';

const WellProgramDetails = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data - in real app this would come from API
  const wellProgram = {
    id: id,
    title: 'Offshore Drilling Phase 1',
    linkedEquipment: 'Rig Alpha',
    timeframe: 'Jan 2024 - Dec 2025',
    status: 'Active',
    statusColor: 'bg-green-100 text-green-800',
    location: 'Niger Delta',
    operator: 'Shell',
    completionDate: 'Dec 2025',
    progress: 65,
    description: 'Offshore drilling operations in the Niger Delta region focusing on deep-water exploration and production optimization.',
    wellName: 'ND-001',
    programType: 'Exploration',
    programActivity: 'Drilling & Completion',
    terrain: 'Offshore',
    waterDepth: '1,200m',
    capacity: 'High Performance',
    contactName: 'John Doe',
    contactEmail: 'john.doe@shell.com',
    companyName: 'Shell Nigeria',
    attachments: [
      { name: 'Program_Overview.pdf', size: '2.5 MB', type: 'PDF' },
      { name: 'Technical_Specifications.docx', size: '1.8 MB', type: 'Word' },
      { name: 'Safety_Protocol.pdf', size: '3.2 MB', type: 'PDF' }
    ]
  };

  const milestones = [
    { 
      id: 1, 
      title: 'Site Preparation', 
      status: 'Completed', 
      date: 'Jan 15, 2024',
      description: 'Site survey and preparation activities completed successfully'
    },
    { 
      id: 2, 
      title: 'Rig Mobilization', 
      status: 'Completed', 
      date: 'Feb 10, 2024',
      description: 'Drilling rig successfully mobilized to location'
    },
    { 
      id: 3, 
      title: 'Spud-in & Initial Drilling', 
      status: 'In Progress', 
      date: 'Mar 5, 2024',
      description: 'Currently drilling at 2,500m depth'
    },
    { 
      id: 4, 
      title: 'Intermediate Casing', 
      status: 'Pending', 
      date: 'Jun 15, 2024',
      description: 'Installation of intermediate casing section'
    },
    { 
      id: 5, 
      title: 'Production Testing', 
      status: 'Pending', 
      date: 'Oct 20, 2024',
      description: 'Well testing and production evaluation'
    }
  ];

  const equipmentSchedule = [
    { equipment: 'Rig Alpha', startDate: 'Jan 2024', endDate: 'Dec 2025', status: 'In Use' },
    { equipment: 'BOP Stack', startDate: 'Mar 2024', endDate: 'Nov 2024', status: 'Scheduled' },
    { equipment: 'Completion Tools', startDate: 'Sep 2024', endDate: 'Dec 2024', status: 'Scheduled' }
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Completed':
        return <div className="w-3 h-3 bg-green-500 rounded-full"></div>;
      case 'In Progress':
        return <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>;
      default:
        return <div className="w-3 h-3 bg-gray-300 rounded-full"></div>;
    }
  };

  const TabButton = ({ tabId, label, isActive, onClick }) => (
    <button
      onClick={() => onClick(tabId)}
      className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
        isActive 
          ? 'bg-brandPurple text-white' 
          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
      }`}
    >
      {label}
    </button>
  );

  return (
    <BaseDashboardNavigation 
      title="Well Program Details"
      breadcrumbs={[
        { label: 'Home', path: '/' },
        { label: 'Wells Program', path: '/wells-program' },
        { label: wellProgram.title, path: `/wells-program/${id}` }
      ]}
    >
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">{wellProgram.title}</h1>
              <p className="text-gray-600 mb-4">{wellProgram.description}</p>
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${wellProgram.statusColor}`}>
                {wellProgram.status}
              </span>
            </div>
            <div className="flex gap-3">
              <CustomButton
                buttonText="Edit Program"
                buttonColor="bg-white"
                className="border border-brandPurple text-sm py-2 px-4"
                textColor="text-brandPurple"
              />
              <CustomButton
                buttonText="Download PDF"
                buttonColor="bg-brandPurple"
                className="text-white text-sm py-2 px-4"
                textColor="text-white"
              />
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700">Overall Progress</span>
              <span className="text-sm text-gray-600">{wellProgram.progress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-brandPurple h-3 rounded-full transition-all duration-300" 
                style={{ width: `${wellProgram.progress}%` }}
              ></div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">{wellProgram.operator}</p>
              <p className="text-sm text-gray-600">Operator</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">{wellProgram.location}</p>
              <p className="text-sm text-gray-600">Location</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">{wellProgram.waterDepth}</p>
              <p className="text-sm text-gray-600">Water Depth</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">{wellProgram.completionDate}</p>
              <p className="text-sm text-gray-600">Target Completion</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl border border-gray-200">
          <div className="flex gap-2 p-6 border-b border-gray-200">
            <TabButton 
              tabId="overview" 
              label="Overview" 
              isActive={activeTab === 'overview'} 
              onClick={setActiveTab} 
            />
            <TabButton 
              tabId="milestones" 
              label="Milestones" 
              isActive={activeTab === 'milestones'} 
              onClick={setActiveTab} 
            />
            <TabButton 
              tabId="equipment" 
              label="Equipment Schedule" 
              isActive={activeTab === 'equipment'} 
              onClick={setActiveTab} 
            />
            <TabButton 
              tabId="documents" 
              label="Documents" 
              isActive={activeTab === 'documents'} 
              onClick={setActiveTab} 
            />
          </div>

          <div className="p-6">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg text-gray-900">Program Information</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Well Name:</span>
                        <span className="font-medium">{wellProgram.wellName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Program Type:</span>
                        <span className="font-medium">{wellProgram.programType}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Activity:</span>
                        <span className="font-medium">{wellProgram.programActivity}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Terrain:</span>
                        <span className="font-medium">{wellProgram.terrain}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Capacity:</span>
                        <span className="font-medium">{wellProgram.capacity}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg text-gray-900">Contact Information</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Contact Name:</span>
                        <span className="font-medium">{wellProgram.contactName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Email:</span>
                        <span className="font-medium">{wellProgram.contactEmail}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Company:</span>
                        <span className="font-medium">{wellProgram.companyName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Timeframe:</span>
                        <span className="font-medium">{wellProgram.timeframe}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Milestones Tab */}
            {activeTab === 'milestones' && (
              <div className="space-y-4">
                <h3 className="font-semibold text-lg text-gray-900">Project Milestones</h3>
                <div className="space-y-4">
                  {milestones.map((milestone) => (
                    <div key={milestone.id} className="flex items-start gap-4 p-4 border border-gray-200 rounded-lg">
                      <div className="flex-shrink-0 mt-1">
                        {getStatusIcon(milestone.status)}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-medium text-gray-900">{milestone.title}</h4>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            milestone.status === 'Completed' ? 'bg-green-100 text-green-800' :
                            milestone.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {milestone.status}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-1">{milestone.description}</p>
                        <p className="text-xs text-gray-500">{milestone.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Equipment Schedule Tab */}
            {activeTab === 'equipment' && (
              <div className="space-y-4">
                <h3 className="font-semibold text-lg text-gray-900">Equipment Schedule</h3>
                <div className="overflow-hidden border border-gray-200 rounded-lg">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Equipment</th>
                        <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Start Date</th>
                        <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">End Date</th>
                        <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Status</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {equipmentSchedule.map((item, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{item.equipment}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-gray-900">{item.startDate}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-gray-900">{item.endDate}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              item.status === 'In Use' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {item.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Documents Tab */}
            {activeTab === 'documents' && (
              <div className="space-y-4">
                <h3 className="font-semibold text-lg text-gray-900">Supporting Documents</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {wellProgram.attachments.map((attachment, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900 text-sm">{attachment.name}</h4>
                          <p className="text-xs text-gray-500">{attachment.size} • {attachment.type}</p>
                        </div>
                        <button className="text-brandPurple hover:text-purple-700">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </BaseDashboardNavigation>
  );
};

export default WellProgramDetails;