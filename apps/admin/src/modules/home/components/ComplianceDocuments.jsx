import React from "react";

export const ComplianceDocuments = ({ equipment }) => {
  return (
    <div className='space-y-4'>
      <table className='w-full border-collapse'>
        <thead>
          <tr className='border-b bg-gray-50'>
            <th className='text-left py-3 px-4 font-medium text-gray-700'>
              Document Name
            </th>
            <th className='text-left py-3 px-4 font-medium text-gray-700'>
              Status
            </th>
            <th className='text-left py-3 px-4 font-medium text-gray-700'>
              More
            </th>
          </tr>
        </thead>
        <tbody>
          {equipment.complianceDocuments.map((doc, index) => (
            <tr key={index} className='border-b'>
              <td className='py-3 px-4'>{doc.name}</td>
              <td className='py-3 px-4'>
                <span
                  className={`px-2 py-1 rounded-full text-xs ${
                    doc.status === "uploaded"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {doc.status === "uploaded" ? "Uploaded" : "Missing"}
                </span>
              </td>
              <td className='py-3 px-4'>
                <button className='text-gray-500 hover:text-gray-700'>
                  •••
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
