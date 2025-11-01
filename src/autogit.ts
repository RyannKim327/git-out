function removeAllWhitespace(inputString: string): string {
  return inputString.replace(/\s/g, '');
}

const originalString1 = "  Hello   World!\nThis is a test.\t";
const cleanedString1 = removeAllWhitespace(originalString1);

console.log("Original 1:", JSON.stringify(originalString1)); // Use JSON.stringify to show hidden whitespace
console.log("Cleaned 1:", JSON.stringify(cleanedString1));
// Output:
// Original 1: "  Hello   World!\nThis is a test.\t"
// Cleaned 1: "HelloWorld!Thisisatest."

const originalString2 = "NoWhitespaceHere";
const cleanedString2 = removeAllWhitespace(originalString2);
console.log("Original 2:", JSON.stringify(originalString2));
console.log("Cleaned 2:", JSON.stringify(cleanedString2));
// Output:
// Original 2: "NoWhitespaceHere"
// Cleaned 2: "NoWhitespaceHere"
function trimString(inputString: string): string {
  return inputString.trim();
}

const originalString = "   Hello   World!   ";
const trimmedString = trimString(originalString);

console.log("Original:", JSON.stringify(originalString));
console.log("Trimmed:", JSON.stringify(trimmedString));
// Output:
// Original: "   Hello   World!   "
// Trimmed: "Hello   World!"

const trimmedStart = originalString.trimStart();
console.log("Trimmed Start:", JSON.stringify(trimmedStart));
// Output: "Hello   World!   "

const trimmedEnd = originalString.trimEnd();
console.log("Trimmed End:", JSON.stringify(trimmedEnd));
// Output: "   Hello   World!"
function normalizeWhitespace(inputString: string): string {
  return inputString.replace(/\s+/g, ' ').trim();
}

const originalString = "   Hello   Big     World!   This is   a  test.\n  ";
const normalizedString = normalizeWhitespace(originalString);

console.log("Original:", JSON.stringify(originalString));
console.log("Normalized:", JSON.stringify(normalizedString));
// Output:
// Original: "   Hello   Big     World!   This is   a  test.\n  "
// Normalized: "Hello Big World! This is a test."
function removeSpacesAndTabs(inputString: string): string {
  return inputString.replace(/[ \t]/g, ''); // Removes only spaces and tabs
}

const originalString = "  Hello   World!\nThis is a test.\t";
const noSpacesOrTabs = removeSpacesAndTabs(originalString);

console.log("Original:", JSON.stringify(originalString));
console.log("No Spaces/Tabs:", JSON.stringify(noSpacesOrTabs));
// Output:
// Original: "  Hello   World!\nThis is a test.\t"
// No Spaces/Tabs: "HelloWorld!\nThisisatest."

function removeNewlines(inputString: string): string {
  return inputString.replace(/[\n\r]/g, ''); // Removes newlines and carriage returns
}

const stringWithNewlines = "Line 1\nLine 2\r\nLine 3";
const noNewlines = removeNewlines(stringWithNewlines);

console.log("With Newlines:", JSON.stringify(stringWithNewlines));
console.log("No Newlines:", JSON.stringify(noNewlines));
// Output:
// With Newlines: "Line 1\nLine 2\r\nLine 3"
// No Newlines: "Line 1Line 2Line 3"
