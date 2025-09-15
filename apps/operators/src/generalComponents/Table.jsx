import React from "react";

const Table = ({ headers, data }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead>
          <tr>
          <th className="h-[45px] px-5 bg-[#F0F2F5] text-left text-[12px] font-medium text-[#344054] rounded-t">
          <input type="checkbox" />
          </th>
            {headers.map((header, index) => (
              <th
                key={index}
                className="h-[45px] px-5 bg-[#F0F2F5] text-left text-[12px] font-medium text-[#344054] rounded-t"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className="h-[60px] px-5 border-b border-[#E5E7EB]"
            >
              <td className="py-2 px-5 text-[14px] text-[#101928]">
                <input type="checkbox" />
              </td>
              {headers.map((header, colIndex) => (
                <td
                  key={colIndex}
                  className="py-2 px-5 text-[14px] text-[#101928]"
                >
                  {row[header]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
