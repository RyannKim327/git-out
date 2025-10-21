function reverseWords(str: string): string {
  return str.split(' ').reverse().join(' ');
}

// Example usage
const original = "Hello World TypeScript";
const reversed = reverseWords(original);
console.log(reversed); // "TypeScript World Hello"
function reverseWords(str: string): string {
  return str
    .trim() // Remove leading/trailing spaces
    .split(/\s+/) // Split on one or more whitespace characters
    .reverse()
    .join(' ');
}

// Example usage
const withMultipleSpaces = "  Hello   World  TypeScript  ";
const reversed = reverseWords(withMultipleSpaces);
console.log(reversed); // "TypeScript World Hello"
function reverseWords(str: string): string {
  const words = str.trim().split(/\s+/);
  const reversed: string[] = [];
  
  for (let i = words.length - 1; i >= 0; i--) {
    reversed.push(words[i]);
  }
  
  return reversed.join(' ');
}
function reverseWords(str: string): string {
  return str
    .trim()
    .split(/\s+/)
    .reduce((acc, word) => [word, ...acc], [] as string[])
    .join(' ');
}
function reverseWords(input: string): string {
  if (typeof input !== 'string') {
    throw new Error('Input must be a string');
  }
  
  return input
    .trim()
    .split(/\s+/)
    .reverse()
    .join(' ');
}

// Test cases
const testCases = [
  "Hello World",
  "  Multiple   Spaces  ",
  "SingleWord",
  "",
  " "
];

testCases.forEach(test => {
  console.log(`Original: "${test}" -> Reversed: "${reverseWords(test)}"`);
});
