function firstRepeatedCharacter(str: string): string | null {
  const seen = new Set<string>();
  
  for (const char of str) {
    if (seen.has(char)) {
      return char;
    }
    seen.add(char);
  }
  
  return null; // No repeated character found
}

// Usage
const result = firstRepeatedCharacter("typescript");
console.log(result); // "p" (first repeated character)
function firstRepeatedCharacter(str: string): string | null {
  for (let i = 0; i < str.length; i++) {
    const currentChar = str[i];
    if (str.indexOf(currentChar) !== i) {
      return currentChar;
    }
  }
  return null;
}
function firstRepeatedCharacter(str: string): string | null {
  const charMap: Record<string, boolean> = {};
  
  for (const char of str) {
    if (charMap[char]) {
      return char;
    }
    charMap[char] = true;
  }
  
  return null;
}
function firstRepeatedCharacter(str: string): string | null {
  const charCount: Record<string, number> = {};
  
  // Count occurrences
  for (const char of str) {
    charCount[char] = (charCount[char] || 0) + 1;
  }
  
  // Find first character with count > 1
  for (const char of str) {
    if (charCount[char] > 1) {
      return char;
    }
  }
  
  return null;
}
function firstRepeatedCharacter(str: string): string | null {
  if (!str || str.length === 0) return null;
  
  const seen = new Set<string>();
  
  for (const char of str) {
    if (seen.has(char)) {
      return char;
    }
    seen.add(char);
  }
  
  return null;
}

// Test cases
console.log(firstRepeatedCharacter("typescript"));    // "p"
console.log(firstRepeatedCharacter("hello"));         // "l"
console.log(firstRepeatedCharacter("world"));         // null
console.log(firstRepeatedCharacter(""));              // null
console.log(firstRepeatedCharacter("a"));             // null
console.log(firstRepeatedCharacter("aa"));            // "a"
function firstRepeatedCharacter(str: string): string | undefined {
  const seen = new Set<string>();
  
  for (const char of str) {
    if (seen.has(char)) {
      return char;
    }
    seen.add(char);
  }
  
  return undefined;
}
