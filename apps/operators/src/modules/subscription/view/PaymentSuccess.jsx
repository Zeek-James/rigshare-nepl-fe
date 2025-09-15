import { useLocation, useNavigate } from "react-router-dom";

const PaymentSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { customerDetails, selectedPlan } = location.state || {};

  const handleLogin = () => {
    navigate('/login');
  };

  // Get email from customer details or use default
  const email = customerDetails?.billingContactEmail || 'operator@exxonmobil.com';
  const planType = selectedPlan?.type || 'Premium';

  return (
    <div className='min-h-screen bg-gray-50 flex items-center justify-center p-4'>
      <div className='bg-white rounded-lg shadow-lg p-8 max-w-md w-full'>
        {/* Success Header */}
        <div className='text-center mb-6'>
          <div className='mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4'>
            <svg 
              className='w-8 h-8 text-green-600' 
              fill='none' 
              stroke='currentColor' 
              viewBox='0 0 24 24'
            >
              <path 
                strokeLinecap='round' 
                strokeLinejoin='round' 
                strokeWidth={2} 
                d='M5 13l4 4L19 7' 
              />
            </svg>
          </div>
          <h1 className='text-xl font-semibold text-gray-900'>
            Payment Successful!
          </h1>
        </div>

        {/* Success Message */}
        <div className='text-center mb-8'>
          <p className='text-gray-600 leading-relaxed'>
            You are now subscribed to the {planType} Plan. A receipt has been sent to{' '}
            <span className='font-medium text-gray-900'>{email}</span>.
          </p>
        </div>

        {/* Login Button */}
        <button
          onClick={handleLogin}
          className='w-full bg-slate-800 text-white py-3 rounded-lg hover:bg-slate-900 font-medium transition'
        >
          Log In
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccess;