export function extractTextFromHtml(htmlString) {
  // Remove HTML tags using a regular expression
  const textOnly = htmlString.replace(/<[^>]*>/g, "");

  // Return the cleaned text
  return textOnly.trim(); // Use trim() to remove any leading or trailing whitespace
}
