import React from "react";
import CustomButton from "../../../generalComponents/Button";

const LeaseDetailModal = ({ leaseData, modalId = "lease_detail_modal" }) => {

  const documents = [
    { 
      name: "Lease Contract", 
      status: "available",
      hasViewIcon: true,
      hasDownloadIcon: true 
    },
    { 
      name: "Well Program", 
      status: "available",
      hasViewIcon: true,
      hasDownloadIcon: true 
    },
    { 
      name: "Site Access Letter", 
      status: "available",
      hasViewIcon: true,
      hasDownloadIcon: true 
    },
    { 
      name: "CAC Cert", 
      status: "available",
      hasViewIcon: true,
      hasDownloadIcon: true 
    },
    { 
      name: "NUPRC License", 
      status: "available",
      hasViewIcon: true,
      hasDownloadIcon: true 
    },
    { 
      name: "NCDMB Cert", 
      status: "pending",
      hasViewIcon: false,
      hasDownloadIcon: false,
      pendingText: "Pending"
    },
  ];

  const handleAcceptRequest = () => {
    console.log("Accept request:", leaseData);
    document.getElementById(modalId).close();
    alert("Request accepted successfully!");
  };

  const handleProposeRenegotiation = () => {
    document.getElementById(modalId).close();
    // Open renegotiation modal if it exists
    const renegotiateModal = document.getElementById("renegotiate_modal");
    if (renegotiateModal) {
      renegotiateModal.showModal();
    }
  };

  const handleRejectRequest = () => {
    console.log("Reject request:", leaseData);
    document.getElementById(modalId).close();
    alert("Request rejected!");
  };

  const handleClose = () => {
    document.getElementById(modalId).close();
  };

  return (
    <dialog id={modalId} className="modal">
      <div className="modal-box max-w-md bg-white rounded-2xl p-6">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </form>
        
        <div className="space-y-6">
          {/* Header */}
          <h2 className="text-2xl font-bold text-gray-900">Lease Detail</h2>

          {/* Lease Details */}
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700">Status:</label>
              <span className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium ${leaseData?.statusColor || 'bg-gray-100 text-gray-800'}`}>
                {leaseData?.status || 'N/A'}
              </span>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Lease ID:</label>
              <p className="text-gray-900 font-medium">{leaseData?.leaseId || 'N/A'}</p>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Equipment</label>
              <p className="text-gray-900 font-medium">{leaseData?.equipmentName || 'N/A'}</p>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Lessee:</label>
              <p className="text-gray-900 font-medium">{leaseData?.counterparty || 'N/A'}</p>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Period:</label>
              <p className="text-gray-900 font-medium">{leaseData?.period ? `${leaseData.period}, 2025` : 'N/A'}</p>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Purpose</label>
              <p className="text-gray-900 font-medium">Kolo Creek Phase II</p>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Usage:</label>
              <p className="text-gray-900 font-medium">12 hours/day</p>
            </div>
          </div>

          {/* Documents Section */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-3 block">Uploaded:</label>
            <div className="space-y-3">
              {documents.map((doc, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-gray-900">• {doc.name}</span>
                  <div className="flex items-center gap-2">
                    {doc.status === "available" ? (
                      <>
                        {doc.hasViewIcon && (
                          <button className="text-gray-600 hover:text-gray-800">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                          </button>
                        )}
                        {doc.hasDownloadIcon && (
                          <button className="text-gray-600 hover:text-gray-800">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                          </button>
                        )}
                      </>
                    ) : (
                      <span className="text-orange-600 text-sm font-medium">{doc.pendingText}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Notes Section */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Notes:</label>
            <p className="text-gray-900">Can you confirm early delivery by May 13?</p>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3 pt-4">
            <CustomButton
              buttonText="Accept Request"
              buttonColor="bg-brandPurple"
              className="w-full py-3 rounded-lg"
              textColor="text-white"
              onClick={handleAcceptRequest}
            />
            <CustomButton
              buttonText="Propose Renegotiation"
              buttonColor="bg-white"
              className="w-full py-3 border border-gray-300 rounded-lg"
              textColor="text-gray-700"
              onClick={handleProposeRenegotiation}
            />
            <CustomButton
              buttonText="Reject Request"
              buttonColor="bg-white"
              className="w-full py-3 border border-red-300 rounded-lg text-red-600 hover:bg-red-50"
              textColor="text-red-600"
              onClick={handleRejectRequest}
            />
          </div>
        </div>
      </div>
    </dialog>
  );
};

export default LeaseDetailModal;