function firstRepeatedCharacter(str: string): string | null {
  const seen = new Set<string>();
  
  for (const char of str) {
    if (seen.has(char)) {
      return char;
    }
    seen.add(char);
  }
  
  return null;
}

// Usage
console.log(firstRepeatedCharacter("hello")); // "l"
console.log(firstRepeatedCharacter("world")); // null
console.log(firstRepeatedCharacter("typescript")); // "t"
function firstRepeatedCharacter(str: string): string | null {
  const charCount: Record<string, number> = {};
  
  for (const char of str) {
    if (charCount[char]) {
      return char;
    }
    charCount[char] = 1;
  }
  
  return null;
}
function firstRepeatedCharacter(str: string): string | null {
  for (let i = 0; i < str.length; i++) {
    if (str.indexOf(str[i]) !== i) {
      return str[i];
    }
  }
  return null;
}
function firstRepeatedCharacter(str: string): string | null {
  return str.split('').find((char, index, array) => 
    array.indexOf(char) !== index
  ) || null;
}
function firstRepeatedCharacter(input: string): string | null {
  // Handle empty string
  if (!input) return null;
  
  const seen = new Set<string>();
  
  for (const char of input) {
    if (seen.has(char)) {
      return char;
    }
    seen.add(char);
  }
  
  return null;
}

// Test cases
const testCases = [
  { input: "hello", expected: "l" },
  { input: "world", expected: null },
  { input: "typescript", expected: "t" },
  { input: "aabbcc", expected: "a" },
  { input: "", expected: null },
  { input: "abcde", expected: null }
];

testCases.forEach(({ input, expected }) => {
  const result = firstRepeatedCharacter(input);
  console.log(`"${input}" -> ${result} (expected: ${expected})`);
});
