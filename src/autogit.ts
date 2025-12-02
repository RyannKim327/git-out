function reverseWords(str: string): string {
  return str.split(' ').reverse().join(' ');
}

// Example usage
const input = "Hello World TypeScript";
const result = reverseWords(input); // "TypeScript World Hello"
function reverseWordsAdvanced(str: string): string {
  return str
    .trim() // Remove leading/trailing spaces
    .split(/\s+/) // Split on one or more whitespace characters
    .reverse()
    .join(' ');
}

// Examples
reverseWordsAdvanced("  Hello   World  "); // "World Hello"
reverseWordsAdvanced("One"); // "One"
reverseWordsAdvanced(""); // ""
function reverseWordsReduce(str: string): string {
  return str.split(' ').reduce((acc, word) => word + ' ' + acc, '').trim();
}
function safeReverseWords(input: string | null | undefined): string {
  if (!input) return '';
  
  return input
    .trim()
    .split(/\s+/)
    .filter(word => word.length > 0) // Remove empty strings
    .reverse()
    .join(' ');
}

// Handles edge cases
safeReverseWords(null); // ""
safeReverseWords(undefined); // ""
safeReverseWords("   "); // ""
function reverseWords(str: string): string {
  return str.split(' ').reverse().join(' ');
}

// Test cases
const testCases = [
  { input: "Hello World", expected: "World Hello" },
  { input: "TypeScript is awesome", expected: "awesome is TypeScript" },
  { input: "a b c", expected: "c b a" },
  { input: "Single", expected: "Single" },
  { input: "", expected: "" },
  { input: "  Hello   World  ", expected: "  World   Hello  " }
];

testCases.forEach(({ input, expected }) => {
  const result = reverseWords(input);
  console.log(`Input: "${input}" -> Output: "${result}" (Expected: "${expected}")`);
});
