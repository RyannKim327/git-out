function firstNonRepeatingChar(str: string): string | null {
  const charCount: Record<string, number> = {};

  // First pass: count occurrences
  for (const char of str) {
    charCount[char] = (charCount[char] || 0) + 1;
  }

  // Second pass: find the first non-repeating character
  for (const char of str) {
    if (charCount[char] === 1) {
      return char;
    }
  }

  return null; // No non-repeating character found
}

// Example usage:
console.log(firstNonRepeatingChar("swiss")); // Output: "w"
