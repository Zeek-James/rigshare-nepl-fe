import React, { useState } from 'react';
import ModalManagement from '../../../generalComponents/ModalManagement';
import CustomButton from '../../../generalComponents/Button';

const StatusUpdateModal = ({ modalId = "status_update", programDetails, onUpdateStatus }) => {
  const [formData, setFormData] = useState({
    status: 'Not started',
    startDate: '',
    endDate: '',
    comment: '',
    uploadedFile: null
  });

  const statusOptions = [
    'Not started',
    'In Progress', 
    'Awaiting Review',
    'Under Review',
    'Completed',
    'On Hold',
    'Cancelled'
  ];

  const handleClose = () => {
    document.getElementById(modalId).close();
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        uploadedFile: file
      }));
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        uploadedFile: file
      }));
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleUpdateStatus = () => {
    if (onUpdateStatus) {
      onUpdateStatus({
        ...programDetails,
        ...formData
      });
    }
    console.log('Status updated:', formData);
    handleClose();
  };

  const handleCancel = () => {
    setFormData({
      status: 'Not started',
      startDate: '',
      endDate: '',
      comment: '',
      uploadedFile: null
    });
    handleClose();
  };

  return (
    <ModalManagement
      id={modalId}
      title=""
      onClose={() => {}}
      className="rounded-2xl max-w-lg p-0"
    >
      <div className="bg-white rounded-2xl p-6 w-full max-w-lg">
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900 border-2 border-dashed border-gray-300 p-3 rounded-lg">
            Status Update
          </h2>
        </div>

        <div className="space-y-6">
          {/* Status Selection */}
          <div className="border-2 border-dashed border-gray-300 p-4 rounded-lg">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Status
            </label>
            <div className="relative">
              <select
                value={formData.status}
                onChange={(e) => handleInputChange('status', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brandPurple focus:border-brandPurple bg-gray-50 appearance-none"
              >
                {statusOptions.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Start Date */}
          <div className="border-2 border-dashed border-gray-300 p-4 rounded-lg">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Start Date
            </label>
            <div className="relative">
              <input
                type="date"
                value={formData.startDate}
                onChange={(e) => handleInputChange('startDate', e.target.value)}
                placeholder="Select the start date"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brandPurple focus:border-brandPurple bg-gray-50"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
          </div>

          {/* End Date */}
          <div className="border-2 border-dashed border-gray-300 p-4 rounded-lg">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              End Date
            </label>
            <div className="relative">
              <input
                type="date"
                value={formData.endDate}
                onChange={(e) => handleInputChange('endDate', e.target.value)}
                placeholder="Select the end date"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brandPurple focus:border-brandPurple bg-gray-50"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Upload New Doc */}
          <div className="border-2 border-dashed border-gray-300 p-4 rounded-lg">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Upload New Doc
            </label>
            <div 
              className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center bg-gray-50"
              onDrop={handleDrop}
              onDragOver={handleDragOver}
            >
              {formData.uploadedFile ? (
                <div className="space-y-2">
                  <svg className="mx-auto h-8 w-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-sm text-gray-700 font-medium">{formData.uploadedFile.name}</p>
                  <p className="text-xs text-gray-500">
                    {(formData.uploadedFile.size / (1024 * 1024)).toFixed(2)} MB
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  <svg className="mx-auto h-8 w-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  <div>
                    <p className="text-sm text-gray-600">Choose a file or drag and drop it here (2MB)</p>
                    <p className="text-xs text-gray-500 mt-1">PDF, DOCX, XLSX</p>
                  </div>
                  <input
                    type="file"
                    id="file-upload"
                    className="hidden"
                    accept=".pdf,.docx,.xlsx"
                    onChange={handleFileUpload}
                  />
                  <CustomButton
                    buttonText="Select File"
                    buttonColor="bg-gray-100"
                    className="text-gray-700 text-sm py-2 px-4 rounded-lg border border-gray-300"
                    textColor="text-gray-700"
                    onClick={() => document.getElementById('file-upload').click()}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Add Comment */}
          <div className="border-2 border-dashed border-gray-300 p-4 rounded-lg">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Add Comment
            </label>
            <textarea
              value={formData.comment}
              onChange={(e) => handleInputChange('comment', e.target.value)}
              placeholder="Add comments"
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brandPurple focus:border-brandPurple bg-gray-50 resize-none"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 space-y-3">
          <CustomButton
            buttonText="Update Status"
            buttonColor="bg-brandPurple"
            className="text-white w-full py-3 rounded-lg font-medium"
            textColor="text-white"
            onClick={handleUpdateStatus}
          />
          <CustomButton
            buttonText="Cancel"
            buttonColor="bg-white"
            className="text-gray-700 w-full py-3 rounded-lg font-medium border border-gray-300"
            textColor="text-gray-700"
            onClick={handleCancel}
          />
        </div>
      </div>
    </ModalManagement>
  );
};

export default StatusUpdateModal;