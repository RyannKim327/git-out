function reverseWords(str: string): string {
  return str
    .split(' ')           // Split into array of words
    .reverse()            // Reverse the array order
    .join(' ');           // Join back into a string
}

// Example usage
const input = "Hello World TypeScript";
const reversed = reverseWords(input);
console.log(reversed); // "TypeScript World Hello"
function reverseWordsAdvanced(str: string): string {
  return str
    .trim()                    // Remove leading/trailing spaces
    .split(/\s+/)              // Split on one or more whitespace characters
    .reverse()
    .join(' ');
}

// Examples
console.log(reverseWordsAdvanced("  Hello   World  ")); // "World Hello"
console.log(reverseWordsAdvanced("TypeScript"));        // "TypeScript"
console.log(reverseWordsAdvanced(""));                  // ""
function reverseWordsRegex(str: string): string {
  return str
    .match(/\S+/g)             // Match all non-whitespace sequences
    ?.reverse()                // Reverse the array (optional chaining)
    .join(' ') || '';          // Handle null case
}

console.log(reverseWordsRegex("  Hello   World  ")); // "World Hello"
function reverseWordsReduce(str: string): string {
  return str
    .split(' ')
    .reduce((acc, word) => word ? [word, ...acc] : acc, [] as string[])
    .join(' ');
}
function reverseWordsSafe(str: string): string {
  if (!str || typeof str !== 'string') {
    return '';
  }
  
  return str
    .trim()
    .split(/\s+/)
    .filter(word => word.length > 0)  // Remove empty strings
    .reverse()
    .join(' ');
}

// Test cases
const testCases = [
  "Hello World TypeScript",
  "  Multiple   Spaces   ",
  "SingleWord",
  "",
  "   ",
  "a b c d e"
];

testCases.forEach(test => {
  console.log(`"${test}" -> "${reverseWordsSafe(test)}"`);
});
