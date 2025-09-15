import React, { useState, useEffect } from "react";
import * as XLSX from "xlsx";
import useGetStockHeadersManager from "../modules/inventory/headerMapping/controllers/getStockHeadersController";
import { formatName } from "../utils/formatName";
import Loader from "./Loader";

export default function FileValidator({ file, onValidationComplete }) {
  const [isValidating, setIsValidating] = useState(false);
  const [errors, setErrors] = useState([]);

  const { data: headersList, isSuccess: isHeadersLoaded } =
    useGetStockHeadersManager();

  useEffect(() => {
    if (!file || !isHeadersLoaded) {
      setErrors([]);
      onValidationComplete([]);
      return;
    }

    const validateFile = async () => {
      setIsValidating(true);
      setErrors([]);

      const reader = new FileReader();

      reader.onload = async (e) => {
        try {
          const data = new Uint8Array(e.target.result);
          const workbook = XLSX.read(data, { type: "array" });
          const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
          const jsonData = XLSX.utils.sheet_to_json(firstSheet, {
            raw: true,
            defval: "",
          });

          if (!jsonData || jsonData.length === 0) {
            throw new Error("No data found in sheet");
          }

          const validationErrors = [];
          const uploadedHeaders = Object.keys(jsonData[0]);
          const backendHeaders =
            headersList.data.results?.map((result) => ({
              name: result?.name,
              type: result?.header?.type, // Include type from backend
            })) || [];

          const backendHeaderNames = backendHeaders.map((h) => h.name);

          // Check for unrecognized columns
          uploadedHeaders.forEach((uploadedHeader) => {
            if (!backendHeaderNames.includes(uploadedHeader)) {
              validationErrors.push({
                row: 1,
                column: uploadedHeader,
                value: "Unrecognized Header",
                expectedType: "",
              });
            }
          });

          // Validate each row
          jsonData.forEach((row, idx) => {
            uploadedHeaders.forEach((header) => {
              const backendHeader = backendHeaders.find(
                (h) => h.name === header
              );

              if (backendHeader) {
                const value = row[header];
                const expectedType = backendHeader.type;

                // Validate data type
                if (!validateDataType(value, expectedType)) {
                  validationErrors.push({
                    row: idx + 2,
                    column: header,
                    value,
                    expectedType,
                  });
                }
              }
            });
          });

          setErrors(validationErrors);
          onValidationComplete(validationErrors);
        } catch (err) {
          console.error("Error processing file:", err);
          const processingErrors = [
            {
              row: 1,
              column: "File",
              value: err.message,
              expectedType: "Valid Excel file",
            },
          ];
          setErrors(processingErrors);
          onValidationComplete(processingErrors);
        } finally {
          setIsValidating(false);
        }
      };

      reader.onerror = (error) => {
        console.error("FileReader error:", error);
        const readerErrors = [
          {
            row: 1,
            column: "File",
            value: "Error reading file",
            expectedType: "Valid file",
          },
        ];
        setIsValidating(false);
        setErrors(readerErrors);
        onValidationComplete(readerErrors);
      };

      reader.readAsArrayBuffer(file);
    };

    validateFile();
  }, [file, onValidationComplete, isHeadersLoaded, headersList]);

  // Helper function to validate data type
  const validateDataType = (value, expectedType) => {
    // Allow empty values
    if (value === "" || value === null || value === undefined) {
      return true;
    }

    switch (expectedType) {
      case "integer":
        return Number.isInteger(Number(value));
      case "decimal":
        return (
          !isNaN(value) &&
          (value.toString().includes(".") || Number(value) === parseInt(value))
        );
      case "text":
        return typeof value === "string" || !isNaN(value);
      case "date":
        return !isNaN(Date.parse(value));
      case "image":
        return (
          typeof value === "string" && /\.(jpeg|jpg|png|gif)$/i.test(value)
        );
      default:
        return true; // If type is unknown, assume valid
    }
  };

  // Render error table or success message
  if (errors.length > 0) {
    return (
      <div>
        {isValidating && (
          <div className='mt-4 text-brandPurple'>
            <Loader />
          </div>
        )}
        <div className='w-full mt-4'>
          <h3 className='text-red-600 font-medium mb-4'>
            Your sheet has the following validation errors. Kindly fix the
            errors and upload again
          </h3>
          <table className='w-full border border-gray-300 text-sm text-left'>
            <thead>
              <tr>
                <th className='border px-2 py-1'>Row</th>
                <th className='border px-2 py-1'>Column</th>
                <th className='border px-2 py-1'>Value</th>
                <th className='border px-2 py-1'>Expected Value</th>
              </tr>
            </thead>
            <tbody>
              {errors.map((error, index) => {
                // Check if expectedType is integer or decimal and modify it
                const displayExpectedType =
                  error.expectedType === "integer" ||
                  error.expectedType === "decimal"
                    ? "Number"
                    : error.expectedType;
                return (
                  <tr key={index}>
                    <td className='border px-2 py-1'>{error.row}</td>
                    <td className='border px-2 py-1'>{error.column}</td>
                    <td className='border px-2 py-1'>{error.value}</td>
                    <td className='border px-2 py-1'>
                      {formatName(displayExpectedType)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  // Render success message if no errors
  // if (file && isHeadersLoaded) {
  //   return (
  //     <div className="mt-4 text-brandPurple">File validated successfully!</div>
  //   );
  // }

  // Render loading message if headers are not yet loaded
  if (!isHeadersLoaded) {
    return (
      <div className='mt-4 text-brandPurple'>
        <Loader />{" "}
      </div>
    );
  }

  // Render nothing if no file
  return null;
}
