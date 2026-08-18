import React from "react";
import CustomButton from "../../../generalComponents/Button";
import NavBar from "../../../generalComponents/NavBar";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <NavBar isLandingPage={true} />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-blue-50 to-white py-16 px-4">
        <div className="max-w-6xl mx-auto">

          {/* Hero Content */}
          <div className="text-center mb-8 md:mb-12">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 md:mb-6 leading-tight px-2">
              Seamless Equipment Leasing & Well Program Management for Oil & Gas Operators
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-6 md:mb-8 max-w-4xl mx-auto px-4">
              Rigshare helps operators and contractors lease, track, and manage oilfield equipment and well programs
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3 md:gap-4 mb-8 md:mb-16 px-4">
              <CustomButton
                buttonText="Start Free Trial"
                buttonColor="bg-purple-700"
                textColor="text-white"
                className="px-6 md:px-8 py-3 text-base md:text-lg w-full sm:w-auto"
                onClick={() => window.location.href = '/select-subscription'}
              />
              <CustomButton
                buttonText="Book a Demo"
                buttonColor="bg-gray-100"
                textColor="text-gray-700"
                className="border border-gray-300 px-6 md:px-8 py-3 text-base md:text-lg w-full sm:w-auto"
                onClick={() => window.location.href = '/contact-us'}
              />
            </div>
          </div>

          {/* Dashboard Preview Image */}
          <div className="bg-white rounded-lg shadow-2xl p-3 md:p-6 max-w-5xl mx-auto">
            <div className="bg-gray-50 rounded-lg p-4 md:p-8 min-h-64 md:min-h-96">
              {/* Mockup of dashboard interface */}
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 md:mb-6 gap-4">
                <div>
                  <h3 className="text-base md:text-lg font-semibold text-gray-900">Welcome back, Ahmed!</h3>
                  <p className="text-sm md:text-base text-gray-600">Let's find the right equipment for your next project</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 md:gap-3 w-full md:w-auto">
                  <CustomButton
                    buttonText="Upload Well Program"
                    buttonColor="bg-white"
                    className="border border-green-600 text-xs md:text-sm w-full sm:w-auto"
                    textColor="text-green-600"
                  />
                  <CustomButton
                    buttonText="Create Well Program"
                    buttonColor="bg-green-600"
                    textColor="text-white"
                    className="text-xs md:text-sm w-full sm:w-auto"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 mb-4 md:mb-6">
                <div className="bg-white p-2 md:p-4 rounded-lg">
                  <div className="text-lg md:text-2xl font-bold text-gray-900">12</div>
                  <div className="text-xs md:text-sm text-gray-600">My Equipment</div>
                </div>
                <div className="bg-white p-2 md:p-4 rounded-lg">
                  <div className="text-lg md:text-2xl font-bold text-gray-900">7</div>
                  <div className="text-xs md:text-sm text-gray-600">Available for Lease</div>
                </div>
                <div className="bg-white p-2 md:p-4 rounded-lg">
                  <div className="text-lg md:text-2xl font-bold text-gray-900">5</div>
                  <div className="text-xs md:text-sm text-gray-600">Active Leases</div>
                </div>
                <div className="bg-white p-2 md:p-4 rounded-lg">
                  <div className="text-lg md:text-2xl font-bold text-gray-900">2</div>
                  <div className="text-xs md:text-sm text-gray-600">Upcoming Shares</div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4">
                <div className="bg-white p-3 md:p-4 rounded-lg">
                  <div className="w-full h-24 md:h-32 bg-gray-200 rounded mb-2"></div>
                  <div className="text-xs md:text-sm font-medium">Hydraulic Drilling Rig HD-2000</div>
                </div>
                <div className="bg-white p-3 md:p-4 rounded-lg">
                  <div className="w-full h-24 md:h-32 bg-gray-200 rounded mb-2"></div>
                  <div className="text-xs md:text-sm font-medium">Compressor X250</div>
                </div>
                <div className="bg-white p-3 md:p-4 rounded-lg">
                  <div className="w-full h-24 md:h-32 bg-gray-200 rounded mb-2"></div>
                  <div className="text-xs md:text-sm font-medium">Crawler Excavator EX75</div>
                </div>
              </div>
            </div>
          </div>

          {/* Trusted Partnership */}
          <div className="text-center mt-16">
            <p className="text-gray-500 text-sm mb-6">Trusted Partnership with 100+ company's</p>
            <div className="flex justify-center items-center gap-8 opacity-60">
              <div className="text-gray-400 font-bold">zippo</div>
              <div className="text-gray-400 font-bold">grammarly</div>
              <div className="text-gray-400 font-bold">goodleap</div>
              <div className="text-gray-400 font-bold">Google</div>
              <div className="text-gray-400 font-bold">loom</div>
            </div>
          </div>
        </div>
      </div>

      {/* Why Rigshare Section */}
      <div id="features" className="py-12 md:py-16 px-4 bg-blue-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-8 md:mb-16">Why Rigshare?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {/* User Management */}
            <div className="bg-white rounded-lg p-6 md:p-8 shadow-sm">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4 md:mb-6">
                <svg className="w-5 h-5 md:w-6 md:h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                </svg>
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-3 md:mb-4">User Management</h3>
              <p className="text-sm md:text-base text-gray-600 mb-4 md:mb-6">
                Onboard your teams and partners with secure role-based permissions and multi-tenant support.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center text-gray-700">
                  <svg className="w-4 h-4 md:w-5 md:h-5 text-green-500 mr-2 md:mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-xs md:text-sm">Role-based permission</span>
                </li>
                <li className="flex items-center text-gray-700">
                  <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Multi-tenancy support
                </li>
                <li className="flex items-center text-gray-700">
                  <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Secure authentication (2FA, OTP)
                </li>
              </ul>
            </div>

            {/* Subscriptions */}
            <div className="bg-white rounded-lg p-8 shadow-sm">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Subscriptions</h3>
              <p className="text-gray-600 mb-6">
                Flexible Subscription tiers designed for startups to enterprises.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center text-gray-700">
                  <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Free Trial
                </li>
                <li className="flex items-center text-gray-700">
                  <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Basic
                </li>
                <li className="flex items-center text-gray-700">
                  <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Premium
                </li>
                <li className="flex items-center text-gray-700">
                  <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Enterprise
                </li>
              </ul>
            </div>

            {/* Payments & Billings */}
            <div className="bg-white rounded-lg p-8 shadow-sm">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Payments & Billings</h3>
              <p className="text-gray-600 mb-6">
                Integrated billing with multiple gateways and local currency supportfor seamless transactions.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center text-gray-700">
                  <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Multiple payment gateways (Stripe, Paystack, Flutterwave, etc)
                </li>
                <li className="flex items-center text-gray-700">
                  <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Support for NGN, USD, GBP
                </li>
                <li className="flex items-center text-gray-700">
                  <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Automated Invoices & Receipts
                </li>
              </ul>
            </div>

            {/* Oilfield Optimization */}
            <div className="bg-white rounded-lg p-8 shadow-sm">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Oilfield Optimization</h3>
              <p className="text-gray-600 mb-6">
                Purpose-built for equipment leasing, inspections and well program management.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center text-gray-700">
                  <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Upload & track well programs
                </li>
                <li className="flex items-center text-gray-700">
                  <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Get equipment suggestions instantly
                </li>
                <li className="flex items-center text-gray-700">
                  <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Lease request workflows
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Section */}
      <div className="py-12 md:py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-8 md:mb-16">Pricing Plan</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
            {/* Basic Plan */}
            <div className="bg-gray-50 rounded-lg p-6 md:p-8">
              <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-2">Basic Plan</h3>
              <p className="text-sm md:text-base text-gray-600 mb-4 md:mb-6">For smaller teams managing limited well and equipment operations</p>
              <CustomButton
                buttonText="Select Basic Plan"
                buttonColor="bg-white"
                className="border border-gray-300 w-full mb-4 md:mb-6 py-2 md:py-3"
                textColor="text-gray-700"
                onClick={() => window.location.href = '/subscription/plans'}
              />
              <div className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">Free <span className="text-base md:text-lg font-normal">(₦0 / month)</span></div>
              <div className="text-xs md:text-sm text-gray-600 mb-4 md:mb-6">Includes:</div>
              <ul className="space-y-2 md:space-y-3">
                <li className="flex items-center text-gray-700">
                  <svg className="w-4 h-4 md:w-5 md:h-5 text-green-500 mr-2 md:mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-xs md:text-sm">Up to 3 equipment uploads</span>
                </li>
                <li className="flex items-center text-gray-700">
                  <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Up to 2 well program uploads
                </li>
                <li className="flex items-center text-gray-700">
                  <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Basic analytics dashboard
                </li>
                <li className="flex items-center text-gray-700">
                  <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Email-only support
                </li>
                <li className="flex items-center text-gray-400">
                  <svg className="w-4 h-4 md:w-5 md:h-5 text-red-500 mr-2 md:mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  <span className="text-xs md:text-sm">No equipment suggestion system</span>
                </li>
                <li className="flex items-center text-gray-400">
                  <svg className="w-5 h-5 text-red-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  No chat feature
                </li>
                <li className="flex items-center text-gray-400">
                  <svg className="w-5 h-5 text-red-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  No document-based insights
                </li>
              </ul>
            </div>

            {/* Premium Plan */}
            <div className="bg-gray-50 rounded-lg p-8 border-2 border-purple-500 relative">
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="bg-purple-500 text-white px-4 py-1 rounded-full text-sm">Most Popular</div>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-2">Premium Plan</h3>
              <p className="text-gray-600 mb-6">For scaling operators that need flexibility, deeper insights & faster support.</p>
              <CustomButton
                buttonText="Select Premium Plan"
                buttonColor="bg-purple-700"
                className="w-full mb-6"
                textColor="text-white"
                onClick={() => window.location.href = '/subscription/plans'}
              />
              <div className="text-3xl font-bold text-gray-900 mb-1">₦29,000 / month <span className="text-lg font-normal">(billed annually)</span></div>
              <div className="text-xs md:text-sm text-gray-600 mb-4 md:mb-6">Includes:</div>
              <ul className="space-y-2 md:space-y-3">
                <li className="flex items-center text-gray-700">
                  <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Unlimited equipment uploads
                </li>
                <li className="flex items-center text-gray-700">
                  <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Unlimited well programs
                </li>
                <li className="flex items-center text-gray-700">
                  <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Equipment suggestion engine
                </li>
                <li className="flex items-center text-gray-700">
                  <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Priority support (Live Chat + Email)
                </li>
                <li className="flex items-center text-gray-700">
                  <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Access to compliance insights
                </li>
                <li className="flex items-center text-gray-700">
                  <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  In-platform messaging
                </li>
                <li className="flex items-center text-gray-700">
                  <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Reports export (PDF/Excel)
                </li>
              </ul>
            </div>

            {/* Enterprise Plan */}
            <div className="bg-gray-50 rounded-lg p-8">
              <h3 className="text-2xl font-semibold text-gray-900 mb-2">Enterprise Plan</h3>
              <p className="text-gray-600 mb-6">For scaling operators that need flexibility, deeper insights & faster support.</p>
              <CustomButton
                buttonText="Select Premium Plan"
                buttonColor="bg-purple-700"
                className="w-full mb-6"
                textColor="text-white"
                onClick={() => window.location.href = '/subscription/plans'}
              />
              <div className="text-3xl font-bold text-gray-900 mb-1">₦29,000 / month <span className="text-lg font-normal">(billed annually)</span></div>
              <div className="text-xs md:text-sm text-gray-600 mb-4 md:mb-6">Includes:</div>
              <ul className="space-y-2 md:space-y-3">
                <li className="flex items-center text-gray-700">
                  <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Unlimited equipment uploads
                </li>
                <li className="flex items-center text-gray-700">
                  <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Unlimited well programs
                </li>
                <li className="flex items-center text-gray-700">
                  <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Equipment suggestion engine
                </li>
                <li className="flex items-center text-gray-700">
                  <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Priority support (Live Chat + Email)
                </li>
                <li className="flex items-center text-gray-700">
                  <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Access to compliance insights
                </li>
                <li className="flex items-center text-gray-700">
                  <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  In-platform messaging
                </li>
                <li className="flex items-center text-gray-700">
                  <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Reports export (PDF/Excel)
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Free Trial CTA Section */}
      <div className="py-12 md:py-16 px-4 bg-gradient-to-r from-purple-900 via-purple-800 to-purple-900">
        <div className="max-w-4xl mx-auto text-center">
          <div className="relative">
            {/* Decorative dots */}
            <div className="absolute top-0 left-0 w-24 h-24 opacity-20">
              <div className="grid grid-cols-8 gap-1">
                {Array.from({ length: 64 }).map((_, i) => (
                  <div key={i} className="w-1 h-1 bg-white rounded-full"></div>
                ))}
              </div>
            </div>
            <div className="absolute top-0 right-0 w-24 h-24 opacity-20">
              <div className="grid grid-cols-8 gap-1">
                {Array.from({ length: 64 }).map((_, i) => (
                  <div key={i} className="w-1 h-1 bg-white rounded-full"></div>
                ))}
              </div>
            </div>
            <div className="absolute bottom-0 left-0 w-24 h-24 opacity-20">
              <div className="grid grid-cols-8 gap-1">
                {Array.from({ length: 64 }).map((_, i) => (
                  <div key={i} className="w-1 h-1 bg-white rounded-full"></div>
                ))}
              </div>
            </div>
            <div className="absolute bottom-0 right-0 w-24 h-24 opacity-20">
              <div className="grid grid-cols-8 gap-1">
                {Array.from({ length: 64 }).map((_, i) => (
                  <div key={i} className="w-1 h-1 bg-white rounded-full"></div>
                ))}
              </div>
            </div>

            <div className="border-2 border-blue-400 rounded-lg p-6 md:p-12 backdrop-blur-sm">
              <h2 className="text-2xl md:text-4xl font-bold text-white mb-4 md:mb-6 px-2">
                Ready to Simplify equipment leasing and well program management?
              </h2>
              <div className="flex flex-col sm:flex-row justify-center gap-3 md:gap-4">
                <CustomButton
                  buttonText="Start Free Trial →"
                  buttonColor="bg-white"
                  textColor="text-purple-900"
                  className="px-6 md:px-8 py-2 md:py-3 text-base md:text-lg font-semibold w-full sm:w-auto"
                  onClick={() => window.location.href = '/select-subscription'}
                />
                <CustomButton
                  buttonText="Book a Demo →"
                  buttonColor="bg-transparent"
                  textColor="text-white"
                  className="border-2 border-white px-6 md:px-8 py-2 md:py-3 text-base md:text-lg font-semibold w-full sm:w-auto"
                  onClick={() => window.location.href = '/contact-us'}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div id="about" className="bg-gray-900 text-white py-12 md:py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {/* Company Info */}
            <div className="md:col-span-2">
              <div className="flex items-center mb-4">
                <div className="w-6 h-6 md:w-8 md:h-8 bg-purple-600 rounded-lg mr-2 md:mr-3"></div>
                <div className="text-lg md:text-xl font-bold">RightClick</div>
              </div>
              <p className="text-sm md:text-base text-gray-400 mb-4 md:mb-6">
                Experience unified, efficient, and transparent material management with MatEx. Our cutting-edge solution provides 
                360-degree visibility into inventory across the oil and gas sector, ensuring seamless operations and optimal resource utilisation.
              </p>
            </div>

            {/* Company Links */}
            <div>
              <h3 className="text-base md:text-lg font-semibold mb-3 md:mb-4">Company</h3>
              <ul className="space-y-1 md:space-y-2">
                <li><a href="#" className="text-sm md:text-base text-gray-400 hover:text-white">About</a></li>
                <li><a href="#" className="text-sm md:text-base text-gray-400 hover:text-white">Press</a></li>
              </ul>
            </div>

            {/* Support Links */}
            <div>
              <h3 className="text-base md:text-lg font-semibold mb-3 md:mb-4">Support</h3>
              <ul className="space-y-1 md:space-y-2">
                <li><a href="#" className="text-sm md:text-base text-gray-400 hover:text-white">FAQs</a></li>
                <li><a href="#" className="text-sm md:text-base text-gray-400 hover:text-white">Privacy Policy</a></li>
                <li><a href="#" className="text-sm md:text-base text-gray-400 hover:text-white">Terms & Condition</a></li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-base md:text-lg font-semibold mb-3 md:mb-4">Contact Us</h3>
              <div className="space-y-1 md:space-y-2">
                <p className="text-xs md:text-sm text-gray-400">Email: customersupport@nipex.com.ng</p>
                <p className="text-xs md:text-sm text-gray-400">Address: 27b Oyinkan Abayomi, Ikoyi, Lagos Nigeria</p>
              </div>
            </div>
          </div>

          {/* Bottom Footer */}
          <div className="border-t border-gray-800 mt-8 md:mt-12 pt-6 md:pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-gray-400 text-xs md:text-sm order-2 md:order-1">
              © 2024 MatEx Inc. All Rights Reserved.
            </div>
            <div className="flex flex-wrap justify-center gap-4 md:gap-6 order-1 md:order-2">
              <a href="#" className="text-gray-400 hover:text-white text-xs md:text-sm">Terms & Condition</a>
              <span className="text-gray-600">•</span>
              <a href="#" className="text-gray-400 hover:text-white text-xs md:text-sm">Privacy Policy</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;