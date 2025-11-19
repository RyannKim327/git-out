function firstNonRepeatingCharacter(str: string): string | null {
  const charCount: { [key: string]: number } = {};
  
  // Count frequency of each character
  for (const char of str) {
    charCount[char] = (charCount[char] || 0) + 1;
  }
  
  // Find first character with count 1
  for (const char of str) {
    if (charCount[char] === 1) {
      return char;
    }
  }
  
  return null; // Return null if no non-repeating character found
}

// Usage
console.log(firstNonRepeatingCharacter("swiss")); // "w"
console.log(firstNonRepeatingCharacter("aabb")); // null
console.log(firstNonRepeatingCharacter("hello")); // "h"
function firstNonRepeatingCharacterMap(str: string): string | null {
  const charMap = new Map<string, number>();
  
  // Count character frequencies
  for (const char of str) {
    charMap.set(char, (charMap.get(char) || 0) + 1);
  }
  
  // Find first non-repeating character
  for (const char of str) {
    if (charMap.get(char) === 1) {
      return char;
    }
  }
  
  return null;
}
function firstNonRepeatingCharacterOptimized(str: string): string | null {
  const charCount = new Map<string, number>();
  const charOrder: string[] = [];
  
  for (const char of str) {
    if (!charCount.has(char)) {
      charCount.set(char, 1);
      charOrder.push(char);
    } else {
      charCount.set(char, charCount.get(char)! + 1);
    }
  }
  
  // Find first character in order with count 1
  for (const char of charOrder) {
    if (charCount.get(char) === 1) {
      return char;
    }
  }
  
  return null;
}
function firstNonRepeatingCharacterCaseSensitive(str: string): string | null {
  const charCount = new Map<string, number>();
  
  // Count frequencies (case-sensitive)
  for (const char of str) {
    charCount.set(char, (charCount.get(char) || 0) + 1);
  }
  
  // Find first non-repeating character
  for (const char of str) {
    if (charCount.get(char) === 1 && char !== ' ') {
      return char;
    }
  }
  
  return null;
}
function firstNonRepeatingCharacterFunctional(str: string): string | null {
  const chars = str.split('');
  const charCount = chars.reduce((acc, char) => {
    acc[char] = (acc[char] || 0) + 1;
    return acc;
  }, {} as { [key: string]: number });
  
  const result = chars.find(char => charCount[char] === 1);
  return result || null;
}
// Main function
function findFirstNonRepeatingChar(input: string): string | null {
  const charMap = new Map<string, number>();
  
  // First pass: count character frequencies
  for (const char of input) {
    charMap.set(char, (charMap.get(char) || 0) + 1);
  }
  
  // Second pass: find first character with count 1
  for (const char of input) {
    if (charMap.get(char) === 1) {
      return char;
    }
  }
  
  return null;
}

// Test cases
const testCases = [
  { input: "swiss", expected: "w" },
  { input: "hello", expected: "h" },
  { input: "aabb", expected: null },
  { input: "programming", expected: "p" },
  { input: "aabbccd", expected: "d" },
  { input: "", expected: null },
];

// Run tests
testCases.forEach(({ input, expected }) => {
  const result = findFirstNonRepeatingChar(input);
  console.log(`Input: "${input}" -> Output: "${result}" (Expected: "${expected}")`);
});
