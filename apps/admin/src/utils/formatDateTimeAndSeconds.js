export function formatDateTimeAndSeconds(inputDate) {
    const dateOptions = { day: "numeric", month: "short", year: "numeric" };
    const timeOptions = { hour: "numeric", minute: "numeric", second: "numeric", hour12: false };
    
    const date = new Date(inputDate);
    
    // Check for valid date
    if (isNaN(date.getTime())) {
      return null; // Return null for invalid date
    }
  
    const formattedDate = date.toLocaleDateString("en-GB", dateOptions);
    const formattedTime = date.toLocaleTimeString("en-GB", timeOptions);
  
    return `${formattedDate}, ${formattedTime}`;
  }
  