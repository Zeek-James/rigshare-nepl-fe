import React from "react";
import { capitalizeFirstLetter } from "../utils/capitalizeFirstLetter";

const StatusButton = ({ status }) => {
  let styles = {};

  switch (status?.toLowerCase()) {
    case "pending validation":
    case "pending":
      styles = {
        backgroundColor: "#FFF9E5",
        color: "#FFC107",
        text: capitalizeFirstLetter(status),
        borderColor: "#FFE494",
      };
      break;
    case "declared":
      styles = {
        backgroundColor: "#ECFDF3",
        color: "#358619",
        text: "Declared",
      };
      break;
    case "approved":
      styles = {
        backgroundColor: "#EFFAF5",
        color: "#206645",
        text: "Approved",
        borderColor: "#38B379",
      };
      break;
    case "completed":
      styles = {
        backgroundColor: "#358619",
        color: "#ffffff",
        text: "Completed",
      };
      break;
    case "complete":
      styles = {
        backgroundColor: "#358619",
        color: "#ffffff",
        text: "Completed",
      };
      break;
    case "purchased":
      styles = {
        backgroundColor: "#358619",
        color: "#ffffff",
        text: "Purchased",
      };
      break;
    case "sold":
      styles = {
        backgroundColor: "#358619",
        color: "#ffffff",
        text: "Sold",
      };
      break;
    case "in progress":
      styles = {
        backgroundColor: "#FFF3CD",
        color: "#856404",
        text: "In Progress",
      };
      break;
    case "active":
      styles = {
        backgroundColor: "#E7F6EC",
        color: "#036B26",
        text: "Active",
      };
      break;
    case "suspended":
      styles = {
        backgroundColor: "#F7EEEE",
        color: "#DC3545",
        borderColor: "#F59F9F",
        text: "Suspended",
      };
      break;
    case "cancelled":
      styles = {
        backgroundColor: "#F8D7DA",
        color: "#721C24",
        text: "Cancelled",
      };
      break;
    case "open":
      styles = {
        backgroundColor: "#ECFDF3",
        color: "#358619",
        text: "Open",
      };
      break;
    case "closed":
      styles = {
        backgroundColor: "#F8D7DA",
        color: "#721C24",
        text: "Closed",
      };
      break;
    case "medium":
      styles = {
        backgroundColor: "#ECFDF3",
        color: "#358619",
        text: "Medium",
      };
      break;
    case "high":
      styles = {
        backgroundColor: "#F8D7DA",
        color: "#721C24",
        text: "High",
      };
      break;
    case "accepted":
      styles = {
        backgroundColor: "#E7F6EC",
        color: "#036B26",
        text: "Accepted",
      };
      break;
    case "rejected":
      styles = {
        backgroundColor: "#F8D7DA",
        color: "#721C24",
        text: "Rejected",
      };
      break;
    case "inactive":
      styles = {
        backgroundColor: "#F8D7DA",
        color: "#721C24",
        text: "Inactive",
      };
      break;
    case "awaiting approval":
    case "pending approval":
      styles = {
        backgroundColor: "#FAF5EF",
        color: "#E1C19E",
        text: capitalizeFirstLetter(status),
        borderColor: "#E1C19E",
      };
      break;

    case "Awating Inspection":
      styles = {
        backgroundColor: "#FFF3CD",
        color: "#856404",
        text: "Awaiting Inspection",
      };
      break;
    case "level_three_approved":
      styles = {
        backgroundColor: "#ECFDF3",
        color: "#358619",
        text: "Approved for Auction",
      };
      break;
    case "level_two_approved":
      styles = {
        backgroundColor: "#FFF3CD",
        color: "#856404",
        text: "Awaiting CUIO's Approval",
      };
      break;
    case "level_one_approved":
      styles = {
        backgroundColor: "#FFF3CD",
        color: "#856404",
        text: "Awaiting Head's Approval",
      };
      break;
    case "paid":
      styles = {
        backgroundColor: "#FFF3CD",
        color: "#856404",
        text: "Awaiting Confirmation",
      };
      break;
    case "confirmed":
      styles = {
        backgroundColor: "#ECFDF3",
        color: "#358619",
        text: "Confirmed",
      };
      break;
    case "reported":
      styles = {
        backgroundColor: "#358619",
        color: "#ffffff",
        text: "Reported",
      };
      break;
    case "processing":
      styles = {
        backgroundColor: "#FFF3CD",
        color: "#856404",
        text: "Processing",
      };
      break;
    case "awaiting confirmation":
      styles = {
        backgroundColor: "#FFF3CD",
        color: "#856404",
        text: "Awaiting Confirmation",
      };
      break;
    default:
      styles = {
        backgroundColor: "#E2E3E5",
        color: "#383D41",
        text: capitalizeFirstLetter(status),
      };

      break;
  }

  return (
    <button
      className='text-12px rounded-[20px] px-5 py-1 border whitespace-nowrap'
      style={{
        backgroundColor: styles.backgroundColor,
        color: styles.color,
        borderColor: styles.borderColor,
      }}
    >
      {styles.text}
    </button>
  );
};

export default StatusButton;
