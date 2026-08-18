export function formatDateAndTime(isoDate) {
  const date = new Date(isoDate);

  // Check for valid date
  if (isNaN(date.getTime())) {
    return null; // Return null for invalid date
  }

  const time = date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit", // Include seconds if needed
    hour12: true,
  });
  const formattedTime = time.replace(/^0/, "");

  const options = { day: "2-digit", month: "short", year: "numeric" }; // Added year for completeness
  const formattedDate = date.toLocaleDateString("en-GB", options);

  return `${formattedDate} • ${formattedTime.toLowerCase()}`;
}
