export const formatNumber = (value) => {
  const number = parseFloat(value); // Convert the input to a float
  if (isNaN(number)) {
    return value; // Return as is if it's not a number
  }
  return number.toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });
};

export function formatLargeNumber(num) {
  num = Number(num);
  if (isNaN(num)) return "N/A";

  const abs = Math.abs(num);

  if (abs >= 1e15) return (num / 1e15).toFixed(2) + "Q";
  if (abs >= 1e12) return (num / 1e12).toFixed(2) + "T";
  if (abs >= 1e9) return (num / 1e9).toFixed(2) + "B";
  if (abs >= 1e6) return (num / 1e6).toFixed(2) + "M";
  if (abs >= 1e3) return (num / 1e3).toFixed(2) + "K";

  return num.toFixed(2);
}
