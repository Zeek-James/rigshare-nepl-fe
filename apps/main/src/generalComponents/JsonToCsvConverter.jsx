import React, { useState } from "react";
import CustomButton from "./Button";

const JsonToCsvConverter = () => {
  const [jsonInput, setJsonInput] = useState("");
  const [error, setError] = useState("");

  // Header mapping from V1 to V2
  const headerMapping = {
    transaction_id: "Request ID",
    // item_id: "Asset ID",
    item__name: "Asset Name",
    item__code: "Asset Code",
    // item__category__name: "Asset Category Name",
    batch_number: "Batch Number",
    component: "Component",
    dimension: "Dimension",
    classification: "Classification",
    connection_type: "Connection Type",
    material: "Material",
    capacity: "Capacity",
    erp_number: "ERP Number",
    warehouse: "Warehouse",
    geo_location: "Storage Location",
    row: "Row",
    slot: "Slot",
    bin_number: "Bin Number",
    item_class: "Asset Class",
    quantity: "Quantity",
    // disposable_quantity: "Disposable Quantity",
    unit_cost: "Unit",
    unit_value_usd: "Unit Cost Dollar",
    unit_value_ngn: "Unit Cost Naira",
    // total_value_ngn: "Total Value Naira",
    // total_value_usd: "Total Value Dollar",
    // total_value_plus_freight_ngn: "Total Value Plus Freight Naira",
    // total_value_plus_freight_usd: "Total Value Plus Freight Dollar",
    // remark: "Remark",
    image: "Image",
    date_of_purchase: "Purchase Date",
    original_cost_of_purchase: "Original Purchase Cost",
    book_value: "Book Value",
    tax_written_down_value: "Tax Stated Value",
    reason_for_disposal: "Disposal Reason",
    status_of_material: "Material Condition",
    estimated_savage_value: "Estimated Salvage Value",
    proposed_method_of_disposal: "Disposal Method",
    project_name: "Project",
    asset_type: "Asset Type",
    asset_code: "Asset Code",
    owner: "Ownership",
    // upload_batch_id: "Upload Batch ID",
    nuims_quantity: "NUIMS Quantity",
    total_quantity: "Operator Quantity",
    // status: "Status",
    description: "Description",
    model_number: "Model Number",
    declaration_type: "Declaration Type",
    serial_number: "Serial Number",
    manufacturer: "Manufacturer",
  };

  const validateAndParseJSON = (input) => {
    try {
      const parsed = JSON.parse(input);
      if (!parsed.inventory || !Array.isArray(parsed.inventory)) {
        throw new Error(
          "Invalid data structure. Expected an object with an inventory array."
        );
      }
      return parsed;
    } catch (e) {
      throw new Error("Invalid JSON format. Please check your input.");
    }
  };

  const convertToCSV = (data) => {
    try {
      // Only use headers that exist in our mapping
      const mappedHeaders = Object.keys(headerMapping);

      // Create header row with V2 headers
      const headerRow = mappedHeaders
        .map((header) => headerMapping[header])
        .join(",");

      // Convert each inventory item to CSV row
      const rows = data.inventory.map((item) => {
        return mappedHeaders
          .map((header) => {
            const value = item[header];

            // Handle different value types
            if (value === null || value === undefined) {
              return "";
            }
            // Special handling for image arrays
            if (header === "image" && Array.isArray(value)) {
              return `"${value.join(",")}"`;
            }
            // Handle other arrays
            if (Array.isArray(value)) {
              return `"${value.join("; ")}"`;
            }
            if (typeof value === "object") {
              return `"${JSON.stringify(value)}"`;
            }
            if (typeof value === "string") {
              return `"${value.replace(/"/g, '""')}"`;
            }
            return value;
          })
          .join(",");
      });

      // Combine header and rows
      return [headerRow, ...rows].join("\n");
    } catch (error) {
      throw new Error("Error converting data to CSV: " + error.message);
    }
  };

  const handleDownload = () => {
    try {
      setError("");

      // Validate and parse JSON
      const data = validateAndParseJSON(jsonInput);

      // Get transaction ID from the first inventory item
      const transactionId =
        data.inventory[0]?.transaction_id || "inventory_data";

      // Convert to CSV
      const csv = convertToCSV(data);

      // Create blob and trigger download
      const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${transactionId}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 space-y-4">
      <div className="space-y-2">
        <label
          htmlFor="jsonInput"
          className="block text-sm font-medium text-gray-700"
        >
          Paste JSON Response
        </label>
        <textarea
          id="jsonInput"
          value={jsonInput}
          onChange={(e) => setJsonInput(e.target.value)}
          className="w-full h-64 p-2 border rounded-md font-mono text-sm"
          placeholder="Paste your JSON data here..."
        />
      </div>

      {error && <span>{error}</span>}

      <CustomButton
        onClick={handleDownload}
        disabled={!jsonInput.trim()}
        className="flex items-center gap-2"
        buttonText={"Download CSV"}
      />
    </div>
  );
};

export default JsonToCsvConverter;
