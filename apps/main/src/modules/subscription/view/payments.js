import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Payments = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedPlan: planFromState, billingCycle: cycleFromState, customerDetails } = location.state || {};
  
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  const [cardDetails, setCardDetails] = useState({
    nameOnCard: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });

  // Use data from navigation state or fallback to mock data
  const selectedPlan = planFromState ? {
    type: planFromState.type,
    billingCycle: cycleFromState === "yearly" ? "Annually" : "Monthly",
    total: planFromState.type === "Basic" ? 0 : (cycleFromState === "yearly" ? 328000 : 29000),
  } : {
    type: "Premium",
    billingCycle: "Annually",
    total: 328000,
  };

  const paymentMethods = [
    { id: "card", label: "Card Payment" },
    { id: "bank", label: "Bank Transfer" },
    { id: "ussd", label: "USSD" },
    { id: "wallet", label: "Wallet" },
  ];

  const handlePaymentMethodChange = (methodId) => {
    setSelectedPaymentMethod(methodId);
  };

  const handleCardInputChange = (e) => {
    const { name, value } = e.target;
    setCardDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleProceedPayment = () => {
    if (selectedPaymentMethod) {
      if (selectedPaymentMethod === "card") {
        console.log("Processing card payment:", { selectedPlan, cardDetails });
      } else {
        console.log("Processing payment with method:", selectedPaymentMethod);
      }
      
      // Simulate payment processing and redirect to success page
      setTimeout(() => {
        navigate('/subscription/success', {
          state: {
            selectedPlan: planFromState,
            billingCycle: cycleFromState,
            customerDetails: customerDetails
          }
        });
      }, 1000); // Simulate 1 second processing time
      
    } else {
      alert("Please select a payment method");
    }
  };

  return (
    <div className='max-w-4xl mx-auto px-4 py-10'>
      {/* Header */}
      <div className='flex items-center justify-between mb-10'>
        <h1 className='text-2xl font-bold'>Subscription</h1>
        <div className='text-sm text-gray-500 space-x-1'>
          <span>Plans</span>
          <span>→</span>
          <span>Customer Details</span>
          <span>→</span>
          <span className='font-semibold text-black'>Payment</span>
        </div>
      </div>

      {/* Page Title */}
      <div className='mb-8'>
        <h2 className='text-xl font-semibold'>Secure Checkout – Subscription Payment</h2>
      </div>

      <div className='space-y-8'>
        {/* Summary Section */}
        <div className='bg-white border rounded-lg p-6'>
          <h3 className='text-lg font-semibold mb-6'>Summary</h3>
          
          <div className='space-y-4'>
            <div className='flex justify-between py-2'>
              <span className='text-gray-600'>Plan</span>
              <span className='font-medium'>{selectedPlan.type} Plan</span>
            </div>
            
            <div className='flex justify-between py-2'>
              <span className='text-gray-600'>Billing Cycle</span>
              <span className='font-medium'>{selectedPlan.billingCycle}</span>
            </div>
            
            <hr className='my-4' />
            
            <div className='flex justify-between py-2'>
              <span className='text-gray-600 font-medium'>Total</span>
              <span className='font-semibold text-lg'>₦{selectedPlan.total.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Payment Options Section */}
        <div className='bg-white border rounded-lg p-6'>
          <h3 className='text-lg font-semibold mb-6'>Payment Options</h3>
          
          <div className='space-y-4'>
            <div className='mb-4'>
              <span className='text-gray-700 text-sm font-medium'>
                Select Payment Method:
              </span>
            </div>
            
            {/* Card Payment Option */}
            <label className='flex items-center space-x-3 cursor-pointer hover:bg-gray-50 p-2 rounded'>
              <input
                type='radio'
                name='paymentMethod'
                value='card'
                checked={selectedPaymentMethod === 'card'}
                onChange={() => handlePaymentMethodChange('card')}
                className='h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300'
              />
              <span className='text-gray-700'>Card Payment</span>
            </label>

            {/* Card Payment Form */}
            {selectedPaymentMethod === 'card' && (
              <div className='ml-7 mt-4 space-y-4 p-4 bg-gray-50 rounded-lg'>
                {/* Name on Card */}
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    Name on Card
                  </label>
                  <div className='relative'>
                    <span className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400'>
                      💳
                    </span>
                    <input
                      type='text'
                      name='nameOnCard'
                      value={cardDetails.nameOnCard}
                      onChange={handleCardInputChange}
                      placeholder='Enter name on card'
                      className='w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition'
                    />
                  </div>
                </div>

                {/* Card Number */}
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    Card Number
                  </label>
                  <div className='relative'>
                    <span className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400'>
                      💳
                    </span>
                    <input
                      type='text'
                      name='cardNumber'
                      value={cardDetails.cardNumber}
                      onChange={handleCardInputChange}
                      placeholder='XXXX XXXX XXXX XXXX'
                      maxLength={19}
                      className='w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition'
                    />
                  </div>
                </div>

                {/* Expiry Date and CVV */}
                <div className='grid grid-cols-2 gap-4'>
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                      Expiry Date
                    </label>
                    <div className='relative'>
                      <span className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400'>
                        💳
                      </span>
                      <input
                        type='text'
                        name='expiryDate'
                        value={cardDetails.expiryDate}
                        onChange={handleCardInputChange}
                        placeholder='MM/YY'
                        maxLength={5}
                        className='w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition'
                      />
                    </div>
                  </div>
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                      CVV
                    </label>
                    <div className='relative'>
                      <span className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400'>
                        🔒
                      </span>
                      <input
                        type='text'
                        name='cvv'
                        value={cardDetails.cvv}
                        onChange={handleCardInputChange}
                        placeholder='•••'
                        maxLength={4}
                        className='w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition'
                      />
                    </div>
                  </div>
                </div>

                {/* Pay Button */}
                <button
                  onClick={handleProceedPayment}
                  className='w-full bg-slate-800 text-white py-3 rounded-lg hover:bg-slate-900 font-medium transition mt-6'
                >
                  Pay ₦{selectedPlan.total.toLocaleString()}
                </button>
              </div>
            )}
            
            {/* Other Payment Methods */}
            <div className='space-y-3'>
              {paymentMethods.slice(1).map((method) => (
                <label
                  key={method.id}
                  className='flex items-center space-x-3 cursor-pointer hover:bg-gray-50 p-2 rounded'
                >
                  <input
                    type='radio'
                    name='paymentMethod'
                    value={method.id}
                    checked={selectedPaymentMethod === method.id}
                    onChange={() => handlePaymentMethodChange(method.id)}
                    className='h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300'
                  />
                  <span className='text-gray-700'>{method.label}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Action Button for non-card payments */}
        {selectedPaymentMethod && selectedPaymentMethod !== 'card' && (
          <div className='flex justify-end'>
            <button
              onClick={handleProceedPayment}
              className='bg-slate-800 text-white px-8 py-3 rounded-lg hover:bg-slate-900 font-medium transition'
            >
              Proceed with {paymentMethods.find(m => m.id === selectedPaymentMethod)?.label}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Payments;
