import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const plans = [
  {
    type: "Basic",
    description:
      "For smaller teams managing limited well and equipment operations",
    priceMonthly: "Free (₦0 / month)",
    priceYearly: "Free (₦0 / month)",
    yearlyAmount: 0,
    includedFeatures: [
      "Up to 3 equipment uploads",
      "Up to 2 well program uploads",
      "Basic analytics dashboard",
      "Email-only support",
    ],
    excludedFeatures: [
      "No equipment suggestion system",
      "No chat feature",
      "No document-based insights",
    ],
    buttonText: "Select Basic Plan",
  },
  {
    type: "Premium",
    description: "For scaling operators that need flexibility, deeper insights & faster support.",
    priceMonthly: "₦29,000 / month",
    priceYearly: "₦29,000 / month (billed annually)",
    yearlyAmount: 348000,
    discounted: true,
    discountAmount: 20000,
    finalYearly: 328000,
    includedFeatures: [
      "Unlimited equipment uploads",
      "Unlimited well programs",
      "Equipment suggestion engine",
      "Priority support (Live Chat + Email)",
      "Access to compliance insights",
      "In-platform messaging",
      "Reports export (PDF/Excel)",
    ],
    excludedFeatures: [],
    buttonText: "Select Premium Plan",
  },
];

const SubscriptionPlans = () => {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [billingCycle, setBillingCycle] = useState("yearly"); // 'monthly' or 'yearly'
  const navigate = useNavigate();

  const isPremium = selectedPlan?.type === "Premium";

  const handleContinueToCustomerDetails = () => {
    if (selectedPlan) {
      // In a real app, you'd pass the selected plan data via state or context
      navigate('/subscription/customer-details', { 
        state: { 
          selectedPlan, 
          billingCycle 
        } 
      });
    }
  };

  return (
    <div className='max-w-6xl mx-auto px-4 py-10 space-y-10 relative'>
      {/* Header */}
      <div className='flex items-center justify-between'>
        <h1 className='text-2xl font-bold'>Subscription</h1>
        <div className='text-sm text-gray-500 space-x-1'>
          <span className='font-semibold text-black'>Plans</span>
          <span>→</span>
          <span>Customer Details</span>
          <span>→</span>
          <span>Payment</span>
        </div>
      </div>

      {/* Intro Text */}
      <div className='space-y-2'>
        <h2 className='text-xl font-semibold'>
          Choose a Subscription Plan that Fits Your Operations
        </h2>
        <p className='text-gray-600'>
          Select a plan to get started. You can always upgrade later as your
          team grows.
        </p>
      </div>

      {/* Plan Cards */}
      <div className='space-y-6'>
        {plans.map((plan) => (
          <div
            key={plan.type}
            className={`border rounded-xl p-6 bg-white transition ${
              selectedPlan?.type === plan.type
                ? "border-blue-500"
                : "border-gray-200 hover:border-gray-300"
            }`}
          >
            <div className='flex justify-between items-start mb-4'>
              <div className='flex-1'>
                <h3 className='text-lg font-semibold mb-2'>{plan.type} Plan</h3>
                <p className='text-sm text-gray-600 mb-4'>{plan.description}</p>
                
                <div className='text-lg font-semibold mb-6'>
                  {billingCycle === "monthly" ? plan.priceMonthly : plan.priceYearly}
                </div>

                <div>
                  <h4 className='text-sm font-medium mb-3 text-gray-700'>
                    Includes:
                  </h4>
                  <ul className='space-y-2 text-sm'>
                    {plan.includedFeatures.map((feature) => (
                      <li key={feature} className='flex items-start gap-2'>
                        <span className='text-green-600 mt-0.5 flex-shrink-0'>✓</span>
                        <span className='text-gray-700'>{feature}</span>
                      </li>
                    ))}
                    {plan.excludedFeatures.map((feature) => (
                      <li key={feature} className='flex items-start gap-2'>
                        <span className='text-red-500 mt-0.5 flex-shrink-0'>✗</span>
                        <span className='text-gray-500'>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <button
                onClick={() => setSelectedPlan(plan)}
                className={`ml-6 px-6 py-2 rounded-lg text-sm font-medium transition ${
                  plan.type === "Premium"
                    ? "bg-slate-800 text-white hover:bg-slate-900"
                    : "border border-gray-300 text-gray-700 hover:border-gray-400"
                }`}
              >
                {plan.buttonText}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Help Section */}
      <div className='text-center text-sm text-gray-600 py-6 border-t border-gray-200'>
        <p className='mb-2'>
          Need help deciding? <a href="#" className='text-blue-600 underline hover:text-blue-700'>Contact our support team</a> to learn what plan works best for you.
        </p>
        <p>
          All payments are processed offline. You will receive invoice instructions after this step.
        </p>
      </div>

      {/* Slide-in Action Section */}
      {selectedPlan && (
        <div className='fixed right-0 top-0 h-full w-full md:w-[400px] bg-white border-l shadow-lg z-50 transition-transform duration-300'>
          <div className='p-6 flex flex-col justify-between h-full'>
            {/* Billing Toggle */}
            <div className='space-y-4'>
              <div className='flex justify-center gap-4'>
                <div
                  onClick={() => setBillingCycle("monthly")}
                  className={`cursor-pointer text-center border rounded-md px-4 py-2 w-1/2 ${
                    billingCycle === "monthly"
                      ? "border-blue-600 bg-blue-50"
                      : "border-gray-300"
                  }`}
                >
                  <div className='font-medium'>Pay Monthly</div>
                  <div className='text-xs text-gray-500'>Full Price</div>
                </div>
                <div
                  onClick={() => setBillingCycle("yearly")}
                  className={`cursor-pointer text-center border rounded-md px-4 py-2 w-1/2 ${
                    billingCycle === "yearly"
                      ? "border-blue-600 bg-blue-50"
                      : "border-gray-300"
                  }`}
                >
                  <div className='font-medium'>Pay Yearly</div>
                  <div className='text-xs text-green-600'>Save 15%</div>
                </div>
              </div>

              {/* Billing Summary */}
              <div className='mt-6'>
                <h3 className='font-semibold text-lg mb-4'>Billing Summary</h3>
                <div className='space-y-3 text-sm text-gray-700'>
                  <div className='flex justify-between'>
                    <span>1 x {selectedPlan.type}</span>
                    <span>
                      {selectedPlan.type === "Basic"
                        ? "₦0/month"
                        : billingCycle === "monthly"
                        ? "₦29,000/month"
                        : "₦348,000/year"}
                    </span>
                  </div>

                  {/* Premium discount line */}
                  {isPremium && billingCycle === "yearly" && (
                    <div className='flex justify-between text-gray-600'>
                      <div>
                        <div>1 x Discount</div>
                        <div className='text-xs text-gray-500'>
                          Early Operator Discount
                        </div>
                      </div>
                      <div>-₦20,000</div>
                    </div>
                  )}

                  <hr className='my-4' />

                  <div className='flex justify-between font-semibold text-lg'>
                    <span>Total due today</span>
                    <span>
                      {selectedPlan.type === "Basic"
                        ? "₦0"
                        : billingCycle === "monthly"
                        ? "₦29,000"
                        : "₦328,000"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Buttons */}
            <div className='mt-6 space-y-3'>
              <button 
                onClick={handleContinueToCustomerDetails}
                className='w-full bg-slate-800 text-white py-3 rounded-lg hover:bg-slate-900 font-medium'
              >
                Continue to Customer Details
              </button>
              {isPremium && (
                <button className='w-full border border-gray-300 text-gray-700 py-3 rounded-lg hover:border-gray-400 font-medium'>
                  Download Quote
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubscriptionPlans;
