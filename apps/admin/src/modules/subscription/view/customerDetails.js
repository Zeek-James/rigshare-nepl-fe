import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const CustomerDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedPlan: planFromState, billingCycle: cycleFromState } = location.state || {};
  
  const [formData, setFormData] = useState({
    companyName: "",
    companyAddress: "",
    billingContactName: "",
    billingContactEmail: "",
    phoneNumber: "",
    rcNumber: "",
    companyTaxId: "",
    invoiceReference: "RS-2025-001239",
    sameAsRegistration: false,
  });

  // Use data from navigation state or fallback to mock data
  const selectedPlan = planFromState ? {
    type: planFromState.type,
    billingCycle: cycleFromState === "yearly" ? "Annually" : "Monthly",
    subtotal: planFromState.type === "Basic" ? 0 : (cycleFromState === "yearly" ? 348000 : 29000),
    discount: planFromState.type === "Premium" && cycleFromState === "yearly" ? 20000 : 0,
    total: planFromState.type === "Basic" ? 0 : (cycleFromState === "yearly" ? 328000 : 29000),
  } : {
    type: "Premium",
    billingCycle: "Annually", 
    subtotal: 348000,
    discount: 20000,
    total: 328000,
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Handle form submission
  };

  const handleProceedToPayment = () => {
    // In a real app, you'd validate the form first
    if (planFromState) {
      navigate('/subscription/payment', {
        state: {
          selectedPlan: planFromState,
          billingCycle: cycleFromState,
          customerDetails: formData
        }
      });
    }
  };

  return (
    <div className='max-w-7xl mx-auto px-4 py-10'>
      {/* Header */}
      <div className='flex items-center justify-between mb-10'>
        <h1 className='text-2xl font-bold'>Subscription</h1>
        <div className='text-sm text-gray-500 space-x-1'>
          <span>Plans</span>
          <span>→</span>
          <span className='font-semibold text-black'>Customer Details</span>
          <span>→</span>
          <span>Payment</span>
        </div>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
        {/* Left Column - Form */}
        <div className='lg:col-span-2'>
          <div className='mb-6'>
            <h2 className='text-xl font-semibold mb-2'>Enter Billing Details</h2>
            <p className='text-gray-600 text-sm'>
              This information will appear on your invoice and subscription receipt
            </p>
          </div>

          <form onSubmit={handleSubmit} className='space-y-6'>
            {/* Company Name */}
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                Company Name
              </label>
              <div className='relative'>
                <span className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400'>
                  🏢
                </span>
                <input
                  type='text'
                  name='companyName'
                  value={formData.companyName}
                  onChange={handleInputChange}
                  placeholder='ExxonMobil'
                  className='w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition'
                />
              </div>
            </div>

            {/* Company Address */}
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                Company Address
              </label>
              <div className='relative'>
                <span className='absolute left-3 top-4 text-gray-400'>
                  ✉️
                </span>
                <textarea
                  name='companyAddress'
                  value={formData.companyAddress}
                  onChange={handleInputChange}
                  placeholder='Enter your company address'
                  rows={3}
                  className='w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition resize-none'
                />
              </div>
            </div>

            {/* Billing Contact Name */}
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                Billing Contact Name
              </label>
              <div className='relative'>
                <span className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400'>
                  ✉️
                </span>
                <input
                  type='text'
                  name='billingContactName'
                  value={formData.billingContactName}
                  onChange={handleInputChange}
                  placeholder='Enter your name'
                  className='w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition'
                />
              </div>
            </div>

            {/* Billing Contact Email */}
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                Billing Contact Email
              </label>
              <div className='relative'>
                <span className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400'>
                  ✉️
                </span>
                <input
                  type='email'
                  name='billingContactEmail'
                  value={formData.billingContactEmail}
                  onChange={handleInputChange}
                  placeholder='Enter your company email address'
                  className='w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition'
                />
              </div>
            </div>

            {/* Phone Number */}
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                Phone Number
              </label>
              <div className='relative'>
                <span className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400'>
                  📞
                </span>
                <input
                  type='tel'
                  name='phoneNumber'
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  placeholder='Enter your phone number'
                  className='w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition'
                />
              </div>
            </div>

            {/* RC Number */}
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                RC Number <span className='text-gray-500 font-normal'>(Optional)</span>
              </label>
              <div className='relative'>
                <span className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400'>
                  📞
                </span>
                <input
                  type='text'
                  name='rcNumber'
                  value={formData.rcNumber}
                  onChange={handleInputChange}
                  placeholder='Enter your phone number'
                  className='w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition'
                />
              </div>
            </div>

            {/* Company Tax ID */}
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                Company Tax ID (TIN)
              </label>
              <div className='relative'>
                <span className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400'>
                  📞
                </span>
                <input
                  type='text'
                  name='companyTaxId'
                  value={formData.companyTaxId}
                  onChange={handleInputChange}
                  placeholder='Enter your phone number'
                  className='w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition'
                />
              </div>
            </div>

            {/* Invoice Reference */}
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                Invoice Reference
              </label>
              <div className='relative'>
                <span className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400'>
                  📞
                </span>
                <input
                  type='text'
                  name='invoiceReference'
                  value={formData.invoiceReference}
                  onChange={handleInputChange}
                  className='w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition bg-gray-50'
                  readOnly
                />
              </div>
            </div>

            {/* Checkbox */}
            <div className='flex items-center'>
              <input
                type='checkbox'
                name='sameAsRegistration'
                id='sameAsRegistration'
                checked={formData.sameAsRegistration}
                onChange={handleInputChange}
                className='h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded'
              />
              <label htmlFor='sameAsRegistration' className='ml-2 text-sm text-gray-600'>
                Same as registration details
              </label>
            </div>
          </form>
        </div>

        {/* Right Column - Billing Summary */}
        <div className='lg:col-span-1'>
          <div className='bg-gray-50 rounded-lg p-6 sticky top-8'>
            <h3 className='text-lg font-semibold mb-6'>Billing Summary</h3>
            
            <div className='space-y-4 text-sm'>
              <div className='flex justify-between'>
                <span className='text-gray-600'>Plan</span>
                <span className='font-medium'>{selectedPlan.type} Plan</span>
              </div>
              
              <div className='flex justify-between'>
                <span className='text-gray-600'>Billing Cycle</span>
                <span className='font-medium'>{selectedPlan.billingCycle}</span>
              </div>
              
              <div className='flex justify-between'>
                <span className='text-gray-600'>Subtotal</span>
                <span className='font-medium'>₦{selectedPlan.subtotal.toLocaleString()}</span>
              </div>
              
              <div className='flex justify-between'>
                <span className='text-gray-600'>Discount</span>
                <span className='font-medium text-green-600'>-₦{selectedPlan.discount.toLocaleString()}</span>
              </div>
              
              <hr className='my-4' />
              
              <div className='flex justify-between text-base font-semibold'>
                <span>Total</span>
                <span>₦{selectedPlan.total.toLocaleString()}</span>
              </div>
            </div>

            <button
              onClick={handleProceedToPayment}
              type='button'
              className='w-full mt-6 bg-slate-800 text-white py-3 rounded-lg hover:bg-slate-900 font-medium transition'
            >
              Proceed to Payment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerDetails;
