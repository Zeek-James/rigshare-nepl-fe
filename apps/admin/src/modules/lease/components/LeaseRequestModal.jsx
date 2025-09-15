import React, { useState, useEffect } from "react";
import CustomButton from "../../../generalComponents/Button";
import InputWithFullBoarder from "../../../generalComponents/InputWithFullBoarder";
import SelectWithFullBorder from "../../../generalComponents/SelectWithFullBorder";
import AttachmentUpload from "../../../generalComponents/AttachmentUpload";

const LeaseRequestModal = ({ modalId = "new_lease_request" }) => {
  const [formData, setFormData] = useState({
    equipmentName: '',
    startDate: '',
    endDate: '',
    leaseDuration: '',
    equipmentType: '',
    locationFrom: '',
    locationTo: '',
    paymentType: '',
    purposeOfLease: '',
    additionalNotes: ''
  });

  const [wellProgramFile, setWellProgramFile] = useState(null);
  const [paymentProofFile, setPaymentProofFile] = useState(null);

  const equipmentTypes = [
    { value: 'drilling_rig', label: 'Drilling Rig' },
    { value: 'compressor', label: 'Compressor' },
    { value: 'storage_tank', label: 'Storage Tank' },
    { value: 'crane', label: 'Mobile Crane' },
    { value: 'well_control', label: 'Well Control System' },
    { value: 'other', label: 'Other' }
  ];

  const paymentTypes = [
    { value: 'bank_transfer', label: 'Bank Transfer' },
    { value: 'check', label: 'Check' },
    { value: 'credit', label: 'Credit Terms' },
    { value: 'escrow', label: 'Escrow' }
  ];

  // Calculate lease duration when dates change
  useEffect(() => {
    if (formData.startDate && formData.endDate) {
      const start = new Date(formData.startDate);
      const end = new Date(formData.endDate);
      const diffTime = Math.abs(end - start);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      setFormData(prev => ({
        ...prev,
        leaseDuration: `${diffDays} days`
      }));
    }
  }, [formData.startDate, formData.endDate]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFileUpload = (file, type) => {
    if (type === 'wellProgram') {
      setWellProgramFile(file);
    } else if (type === 'paymentProof') {
      setPaymentProofFile(file);
    }
  };

  const handleSubmit = () => {
    const leaseRequestData = {
      ...formData,
      wellProgramFile,
      paymentProofFile,
      submittedAt: new Date().toISOString(),
      status: 'Pending',
      id: Date.now() // Simple ID generation
    };

    console.log('Lease request submitted:', leaseRequestData);
    
    // Close modal and show success message
    document.getElementById(modalId).close();
    alert('Lease request submitted successfully!');
    
    // Reset form
    setFormData({
      equipmentName: '',
      startDate: '',
      endDate: '',
      leaseDuration: '',
      equipmentType: '',
      locationFrom: '',
      locationTo: '',
      paymentType: '',
      purposeOfLease: '',
      additionalNotes: ''
    });
    setWellProgramFile(null);
    setPaymentProofFile(null);
  };

  const handleCancel = () => {
    document.getElementById(modalId).close();
  };

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
          <h2 className="text-2xl font-bold text-gray-900">Lease Request Form</h2>

          {/* Equipment Name */}
          <InputWithFullBoarder
            label="Equipment Name"
            type="text"
            value={formData.equipmentName}
            onChange={(e) => handleInputChange('equipmentName', e.target.value)}
            placeholder="Enter equipment name"
            required
          />

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

          {/* Lease Duration & Equipment Type */}
          <div className="grid grid-cols-2 gap-4">
            <InputWithFullBoarder
              label="Lease Duration"
              type="text"
              value={formData.leaseDuration}
              placeholder="Calculated after dates have been selected"
              readOnly
              className="bg-gray-50"
            />
            <SelectWithFullBorder
              label="Equipment Type"
              selectOptions={equipmentTypes}
              value={formData.equipmentType}
              onChange={(e) => handleInputChange('equipmentType', e.target.value)}
              placeholder="Select equipment type"
              required
            />
          </div>

          {/* Location Fields */}
          <div className="grid grid-cols-2 gap-4">
            <InputWithFullBoarder
              label="Location from"
              type="text"
              value={formData.locationFrom}
              onChange={(e) => handleInputChange('locationFrom', e.target.value)}
              placeholder="Enter pickup location"
              required
            />
            <InputWithFullBoarder
              label="Location to"
              type="text"
              value={formData.locationTo}
              onChange={(e) => handleInputChange('locationTo', e.target.value)}
              placeholder="Enter destination location"
              required
            />
          </div>

          {/* Upload Well Program */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Upload Well Program</label>
            <AttachmentUpload
              onFileChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleFileUpload(file, 'wellProgram');
              }}
              fileName={wellProgramFile?.name}
              title="Choose a file or drag and drop it here"
              subtitle="JPEG, PNG"
            />
          </div>

          {/* Payment Type */}
          <SelectWithFullBorder
            label="Payment Type"
            selectOptions={paymentTypes}
            value={formData.paymentType}
            onChange={(e) => handleInputChange('paymentType', e.target.value)}
            placeholder="Select payment type"
            required
          />

          {/* Upload Payment Proof */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Upload Payment Proof</label>
            <AttachmentUpload
              onFileChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleFileUpload(file, 'paymentProof');
              }}
              fileName={paymentProofFile?.name}
              title="Choose a file or drag and drop it here"
              subtitle="JPEG, PNG"
            />
          </div>

          {/* Purpose of Lease */}
          <InputWithFullBoarder
            label="Purpose of Lease"
            type="text"
            value={formData.purposeOfLease}
            onChange={(e) => handleInputChange('purposeOfLease', e.target.value)}
            placeholder="State purpose of lease"
            isTextArea
            required
          />

          {/* Additional Notes */}
          <InputWithFullBoarder
            label="Additional Notes"
            type="text"
            value={formData.additionalNotes}
            onChange={(e) => handleInputChange('additionalNotes', e.target.value)}
            placeholder="Enter additional notes or special requests"
            isTextArea
          />

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <CustomButton
              buttonText="Submit Lease Request"
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

export default LeaseRequestModal;