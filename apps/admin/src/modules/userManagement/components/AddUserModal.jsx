import React, { useState } from "react";
import CustomButton from "../../../generalComponents/Button";
import InputWithFullBoarder from "../../../generalComponents/InputWithFullBoarder";
import SelectWithFullBorder from "../../../generalComponents/SelectWithFullBorder";

const AddUserModal = ({ modalId = "add_user_modal" }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    role: '',
    department: '',
    status: 'Active'
  });

  const roleOptions = [
    { value: 'admin', label: 'Admin' },
    { value: 'inspection_officer', label: 'Inspection Officer' },
    { value: 'operations_lead', label: 'Operations Lead' },
    { value: 'project_manager', label: 'Project Manager' },
    { value: 'safety_officer', label: 'Safety Officer' },
    { value: 'quality_assurance', label: 'Quality Assurance' },
    { value: 'supervisor', label: 'Supervisor' },
    { value: 'technician', label: 'Technician' }
  ];

  const departmentOptions = [
    { value: 'operations', label: 'Operations' },
    { value: 'safety', label: 'Safety' },
    { value: 'quality', label: 'Quality Assurance' },
    { value: 'maintenance', label: 'Maintenance' },
    { value: 'administration', label: 'Administration' },
    { value: 'engineering', label: 'Engineering' }
  ];

  const statusOptions = [
    { value: 'Active', label: 'Active' },
    { value: 'Inactive', label: 'Inactive' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = () => {
    const userData = {
      ...formData,
      fullName: `${formData.firstName} ${formData.lastName}`,
      id: Date.now(), // Simple ID generation for demo
      lastLogin: 'Never',
      createdAt: new Date().toISOString()
    };

    console.log('User created:', userData);
    
    // Close modal and show success message
    document.getElementById(modalId).close();
    alert('User created successfully!');
    
    // Reset form
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      role: '',
      department: '',
      status: 'Active'
    });
  };

  const handleCancel = () => {
    document.getElementById(modalId).close();
    // Reset form on cancel
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      role: '',
      department: '',
      status: 'Active'
    });
  };

  const isFormValid = () => {
    return formData.firstName && 
           formData.lastName && 
           formData.email && 
           formData.role &&
           formData.department;
  };

  return (
    <dialog id={modalId} className="modal">
      <div className="modal-box max-w-2xl bg-white rounded-2xl p-6">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </form>
        
        <div className="space-y-6">
          {/* Header */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Add New User</h2>
            <p className="text-gray-600">Create a new user account for your organization.</p>
          </div>

          {/* Form Fields */}
          <div className="space-y-4">
            {/* Name Fields */}
            <div className="grid grid-cols-2 gap-4">
              <InputWithFullBoarder
                label="First Name"
                type="text"
                value={formData.firstName}
                onChange={(e) => handleInputChange('firstName', e.target.value)}
                placeholder="Enter first name"
                required
              />
              <InputWithFullBoarder
                label="Last Name"
                type="text"
                value={formData.lastName}
                onChange={(e) => handleInputChange('lastName', e.target.value)}
                placeholder="Enter last name"
                required
              />
            </div>

            {/* Email and Phone */}
            <div className="grid grid-cols-2 gap-4">
              <InputWithFullBoarder
                label="Email Address"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="Enter email address"
                required
              />
              <InputWithFullBoarder
                label="Phone Number"
                type="tel"
                value={formData.phoneNumber}
                onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                placeholder="Enter phone number"
              />
            </div>

            {/* Role and Department */}
            <div className="grid grid-cols-2 gap-4">
              <SelectWithFullBorder
                label="Role"
                selectOptions={roleOptions}
                value={formData.role}
                onChange={(e) => handleInputChange('role', e.target.value)}
                placeholder="Select role"
                required
              />
              <SelectWithFullBorder
                label="Department"
                selectOptions={departmentOptions}
                value={formData.department}
                onChange={(e) => handleInputChange('department', e.target.value)}
                placeholder="Select department"
                required
              />
            </div>

            {/* Status */}
            <div className="grid grid-cols-2 gap-4">
              <SelectWithFullBorder
                label="Status"
                selectOptions={statusOptions}
                value={formData.status}
                onChange={(e) => handleInputChange('status', e.target.value)}
                placeholder="Select status"
              />
              <div></div> {/* Empty div for spacing */}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <CustomButton
              buttonText="Create User"
              buttonColor="bg-brandPurple"
              className="flex-1 py-3 rounded-lg"
              textColor="text-white"
              onClick={handleSubmit}
              disabled={!isFormValid()}
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

export default AddUserModal;