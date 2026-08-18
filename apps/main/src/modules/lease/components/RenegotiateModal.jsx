import React, { useState } from "react";
import CustomButton from "../../../generalComponents/Button";
import InputWithFullBoarder from "../../../generalComponents/InputWithFullBoarder";
import SelectWithFullBorder from "../../../generalComponents/SelectWithFullBorder";

const RenegotiateModal = ({ leaseRequest, modalId = "renegotiate_modal" }) => {
  const [formData, setFormData] = useState({
    startDate: leaseRequest?.requestedPeriod?.split(' - ')[0] || '',
    endDate: leaseRequest?.requestedPeriod?.split(' - ')[1] || '',
    dailyRate: leaseRequest?.dailyRate?.replace('$', '').replace(',', '') || '',
    deliveryLocation: leaseRequest?.location || '',
    specialRequirements: '',
    reasonForRenegotiation: ''
  });

  const renegotiationReasons = [
    { value: 'pricing', label: 'Pricing Adjustment' },
    { value: 'timeline', label: 'Timeline Changes' },
    { value: 'location', label: 'Location Changes' },
    { value: 'specifications', label: 'Technical Specifications' },
    { value: 'other', label: 'Other' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = () => {
    const renegotiationData = {
      equipmentId: leaseRequest?.id,
      equipmentName: leaseRequest?.equipmentName,
      owner: leaseRequest?.owner,
      proposedStartDate: formData.startDate,
      proposedEndDate: formData.endDate,
      proposedDailyRate: formData.dailyRate,
      proposedLocation: formData.deliveryLocation,
      specialRequirements: formData.specialRequirements,
      reasonForRenegotiation: formData.reasonForRenegotiation,
      submittedAt: new Date().toISOString()
    };

    console.log('Renegotiation submitted:', renegotiationData);
    
    // Close modal and show success message
    document.getElementById(modalId).close();
    
    // You can add API call here to submit renegotiation
    alert('Renegotiation request submitted successfully!');
  };

  const handleCancel = () => {
    document.getElementById(modalId).close();
  };

  if (!leaseRequest) return null;

  return (
    <dialog id={modalId} className="modal">
      <div className="modal-box max-w-2xl bg-white rounded-2xl p-6 max-h-[90vh] overflow-y-auto">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </form>
        
        <div className="space-y-6">
          {/* Header */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Renegotiate Contract</h2>
            <p className="text-gray-600">
              Equipment: <span className="font-medium text-gray-900">{leaseRequest?.equipmentName}</span> | 
              Owner: <span className="font-medium text-gray-900">{leaseRequest?.owner}</span>
            </p>
          </div>

          {/* Current Terms */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-3">Current Terms</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Period:</span>
                <p className="font-medium">{leaseRequest?.requestedPeriod}</p>
              </div>
              <div>
                <span className="text-gray-600">Daily Rate:</span>
                <p className="font-medium">{leaseRequest?.dailyRate}/day</p>
              </div>
              <div>
                <span className="text-gray-600">Location:</span>
                <p className="font-medium">{leaseRequest?.location}</p>
              </div>
              <div>
                <span className="text-gray-600">Status:</span>
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${leaseRequest?.statusColor}`}>
                  {leaseRequest?.status}
                </span>
              </div>
            </div>
          </div>

          {/* Proposed Terms */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900">Proposed New Terms</h3>
            
            {/* Date Range */}
            <div className="grid grid-cols-2 gap-4">
              <InputWithFullBoarder
                label="Start Date"
                type="date"
                value={formData.startDate}
                onChange={(e) => handleInputChange('startDate', e.target.value)}
                required
              />
              <InputWithFullBoarder
                label="End Date"
                type="date"
                value={formData.endDate}
                onChange={(e) => handleInputChange('endDate', e.target.value)}
                required
              />
            </div>

            {/* Daily Rate */}
            <InputWithFullBoarder
              label="Proposed Daily Rate ($)"
              type="number"
              value={formData.dailyRate}
              onChange={(e) => handleInputChange('dailyRate', e.target.value)}
              placeholder="Enter daily rate"
              required
            />

            {/* Delivery Location */}
            <InputWithFullBoarder
              label="Delivery Location"
              type="text"
              value={formData.deliveryLocation}
              onChange={(e) => handleInputChange('deliveryLocation', e.target.value)}
              placeholder="Enter delivery location"
              required
            />

            {/* Reason for Renegotiation */}
            <SelectWithFullBorder
              label="Reason for Renegotiation"
              selectOptions={renegotiationReasons}
              value={formData.reasonForRenegotiation}
              onChange={(e) => handleInputChange('reasonForRenegotiation', e.target.value)}
              placeholder="Select reason"
              required
            />

            {/* Special Requirements */}
            <InputWithFullBoarder
              label="Special Requirements/Notes"
              type="text"
              value={formData.specialRequirements}
              onChange={(e) => handleInputChange('specialRequirements', e.target.value)}
              placeholder="Any special requirements or additional notes"
              isTextArea
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <CustomButton
              buttonText="Submit Renegotiation"
              buttonColor="bg-brandPurple"
              className="flex-1 py-3 rounded-lg"
              textColor="text-white"
              onClick={handleSubmit}
            />
            <CustomButton
              buttonText="Cancel"
              buttonColor="bg-white"
              className="flex-1 py-3 border border-gray-300 rounded-lg"
              textColor="text-gray-700"
              onClick={handleCancel}
            />
          </div>
        </div>
      </div>
    </dialog>
  );
};

export default RenegotiateModal;