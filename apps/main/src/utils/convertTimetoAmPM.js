export const convertTimeFormatAMPM = (timeString) => {
  // Convert time string to AM/PM format
  const time = new Date("2000-01-01 " + timeString).toLocaleTimeString([], {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
  return time;
};
