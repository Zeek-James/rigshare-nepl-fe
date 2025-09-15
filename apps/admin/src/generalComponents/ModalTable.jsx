import React from 'react';
import ModalManagement from './ModalManagement';

const ModalTable = ({ columns, data }) => {
  return (
    <ModalManagement
    id={`show_item`}
    title={"Offcut, Conductor Pipe"}
    subtitle={"PO908UTY"}
  >
    <table className="min-w-full border-collapse border border-gray-200 mt-4">
      <thead>
        <tr>
          {columns.map((column, index) => (
            <th key={index} className="border border-gray-200 p-4">
              <h3 className="text-[14px] text-[#475367] font-medium">{column}</h3>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {columns.map((column, colIndex) => (
              <td key={colIndex} className="border border-gray-200 p-4">
                <h3 className="text-[14px] text-[#181918] font-medium">{row[column]}</h3>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
    </ModalManagement>
  );
};

export default ModalTable;