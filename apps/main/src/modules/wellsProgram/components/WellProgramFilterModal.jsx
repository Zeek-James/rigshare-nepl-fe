import React, { useState } from 'react';
import ModalManagement from '../../../generalComponents/ModalManagement';
import CustomButton from '../../../generalComponents/Button';

const WellProgramFilterModal = ({ modalId = "well_program_filter", onApplyFilter, currentFilters = {} }) => {
  const [filters, setFilters] = useState({
    dateFrom: currentFilters.dateFrom || '',
    dateTo: currentFilters.dateTo || '',
    equipment: currentFilters.equipment || [],
    status: currentFilters.status || []
  });

  const equipmentOptions = [
    'Drilling Rigs',
    'Compressors',
    'Cranes',
    'Well Control Equipment'
  ];

  const statusOptions = [
    'In Progress',
    'Awaiting Review'
  ];

  const handleEquipmentChange = (equipment) => {
    setFilters(prev => ({
      ...prev,
      equipment: prev.equipment.includes(equipment)
        ? prev.equipment.filter(e => e !== equipment)
        : [...prev.equipment, equipment]
    }));
  };

  const handleStatusChange = (status) => {
    setFilters(prev => ({
      ...prev,
      status: prev.status.includes(status)
        ? prev.status.filter(s => s !== status)
        : [...prev.status, status]
    }));
  };

  const handleDateChange = (field, value) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleReset = () => {
    setFilters({
      dateFrom: '',
      dateTo: '',
      equipment: [],
      status: []
    });
  };

  const handleApply = () => {
    onApplyFilter(filters);
    document.getElementById(modalId).close();
  };

  const handleClose = () => {
    document.getElementById(modalId).close();
  };

  return (
    <ModalManagement
      id={modalId}
      title=""
      onClose={() => {}}
      className="rounded-2xl max-w-md p-0"
    >
      <div className="bg-white rounded-2xl p-6 w-full max-w-md">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900">Active Well Programs</h2>
          <div className="flex items-center gap-4">
            <button 
              onClick={handleReset}
              className="text-green-600 font-medium text-sm hover:text-green-700"
            >
              Reset all
            </button>
            <button 
              onClick={handleClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Date Range */}
        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-700 mb-3">Date</h3>
          <div className="flex gap-3">
            <div className="flex-1">
              <input
                type="date"
                value={filters.dateFrom}
                onChange={(e) => handleDateChange('dateFrom', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brandPurple focus:border-brandPurple text-sm"
                placeholder="from"
              />
            </div>
            <div className="flex-1">
              <input
                type="date"
                value={filters.dateTo}
                onChange={(e) => handleDateChange('dateTo', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brandPurple focus:border-brandPurple text-sm"
                placeholder="to"
              />
            </div>
          </div>
        </div>

        {/* Equipment */}
        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-700 mb-3">Equipment</h3>
          <div className="grid grid-cols-2 gap-3">
            {equipmentOptions.map((equipment) => (
              <label key={equipment} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.equipment.includes(equipment)}
                  onChange={() => handleEquipmentChange(equipment)}
                  className="w-4 h-4 text-brandPurple border-gray-300 rounded focus:ring-brandPurple focus:ring-2"
                />
                <span className="text-sm text-gray-700">{equipment}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Status */}
        <div className="mb-8">
          <h3 className="text-sm font-medium text-gray-700 mb-3">Status</h3>
          <div className="grid grid-cols-2 gap-3">
            {statusOptions.map((status) => (
              <label key={status} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.status.includes(status)}
                  onChange={() => handleStatusChange(status)}
                  className="w-4 h-4 text-brandPurple border-gray-300 rounded focus:ring-brandPurple focus:ring-2"
                />
                <span className="text-sm text-gray-700">{status}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Apply Button */}
        <CustomButton
          buttonText="Done"
          buttonColor="bg-gray-100"
          className="text-gray-700 w-full py-3 rounded-lg font-medium"
          textColor="text-gray-700"
          onClick={handleApply}
        />
      </div>
    </ModalManagement>
  );
};

export default WellProgramFilterModal;