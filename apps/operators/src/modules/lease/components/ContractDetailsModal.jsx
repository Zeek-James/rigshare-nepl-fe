import React from "react";
import CustomButton from "../../../generalComponents/Button";

const ContractDetailsModal = ({ leaseRequest, modalId = "lease_detail" }) => {
  if (!leaseRequest) return null;

  const documents = [
    { 
      name: "Well Program", 
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

  const handleEditRequest = () => {
    document.getElementById(modalId).close();
    document.getElementById("renegotiate_modal").showModal();
  };

  const handleCancelRequest = () => {
    document.getElementById(modalId).close();
    document.getElementById("admin_delete").showModal();
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
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Contract Details</h2>

          {/* Equipment Info */}
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700">Equipment</label>
              <p className="text-gray-900 font-medium">{leaseRequest?.equipmentName}</p>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Owner:</label>
              <p className="text-gray-900 font-medium">{leaseRequest?.owner}</p>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Request Date:</label>
              <p className="text-gray-900 font-medium">{leaseRequest?.lastUpdated}</p>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Lease Period:</label>
              <p className="text-gray-900 font-medium">{leaseRequest?.requestedPeriod}</p>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Delivery Location:</label>
              <p className="text-gray-900 font-medium">{leaseRequest?.location}</p>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Status:</label>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium ${leaseRequest?.statusColor}`}>
                {leaseRequest?.status}
              </span>
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
            <label className="text-sm font-medium text-gray-700 mb-2 block">Notes from owner:</label>
            <p className="text-gray-900">Awaiting updated NCDMB certificate.</p>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3 pt-4">
            <CustomButton
              buttonText="Renegotiate"
              buttonColor="bg-brandPurple"
              className="w-full py-3 rounded-lg"
              textColor="text-white"
              onClick={handleEditRequest}
            />
            <CustomButton
              buttonText="Cancel Request"
              buttonColor="bg-white"
              className="w-full py-3 border border-gray-300 rounded-lg"
              textColor="text-gray-700"
              onClick={handleCancelRequest}
            />
          </div>
        </div>
      </div>
    </dialog>
  );
};

export default ContractDetailsModal;