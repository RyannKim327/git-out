function areAnagramsSorting(s1: string, s2: string): boolean {
  // Helper function to clean and sort a string
  const cleanAndSort = (str: string): string => {
    return str
      .toLowerCase()        // Convert to lowercase
      .replace(/[^a-z0-9]/g, '') // Remove non-alphanumeric characters
      .split('')            // Split into an array of characters
      .sort()               // Sort the characters alphabetically
      .join('');            // Join back into a string
  };

  const cleanedS1 = cleanAndSort(s1);
  const cleanedS2 = cleanAndSort(s2);

  // Anagrams must have the same length after cleaning
  if (cleanedS1.length !== cleanedS2.length) {
    return false;
  }

  // If the sorted strings are identical, they are anagrams
  return cleanedS1 === cleanedS2;
}

// --- Examples ---
console.log("--- Sorting Approach ---");
console.log(areAnagramsSorting("listen", "silent"));              // true
console.log(areAnagramsSorting("Listen", "silent"));              // true (case-insensitive)
console.log(areAnagramsSorting("hello", "world"));                // false
console.log(areAnagramsSorting("Anagram", "Nag a ram"));          // true (ignores spaces and case)
console.log(areAnagramsSorting("A gentleman", "Elegant man"));    // true (ignores spaces and case)
console.log(areAnagramsSorting("Dormitory", "Dirty room"));       // true
console.log(areAnagramsSorting("The quick brown fox", "fox brown quick The")); // true
console.log(areAnagramsSorting("", ""));                           // true
console.log(areAnagramsSorting("a", "b"));                         // false
console.log(areAnagramsSorting("abc", "ab"));                      // false
function areAnagramsCounting(s1: string, s2: string): boolean {
  // Helper function to clean a string
  const cleanString = (str: string): string => {
    return str
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '');
  };

  const cleanedS1 = cleanString(s1);
  const cleanedS2 = cleanString(s2);

  // Anagrams must have the same length after cleaning
  if (cleanedS1.length !== cleanedS2.length) {
    return false;
  }

  // Use a Map to store character frequencies
  const charFrequencies = new Map<string, number>();

  // Count characters in the first string
  for (const char of cleanedS1) {
    charFrequencies.set(char, (charFrequencies.get(char) || 0) + 1);
  }

  // Decrement counts for characters in the second string
  for (const char of cleanedS2) {
    const count = charFrequencies.get(char);

    // If character is not found or its count is already zero, not an anagram
    if (count === undefined || count === 0) {
      return false;
    }

    charFrequencies.set(char, count - 1);
  }

  // If all counts are zero, they are anagrams.
  // We don't need to explicitly check if all map values are zero
  // because the initial length check and decrementing logic already cover it.
  // If the lengths were equal and we successfully decremented every char from s2,
  // then all counts must be zero.
  return true;
}

// --- Examples ---
console.log("\n--- Counting Approach ---");
console.log(areAnagramsCounting("listen", "silent"));              // true
console.log(areAnagramsCounting("Listen", "silent"));              // true
console.log(areAnagramsCounting("hello", "world"));                // false
console.log(areAnagramsCounting("Anagram", "Nag a ram"));          // true
console.log(areAnagramsCounting("A gentleman", "Elegant man"));    // true
console.log(areAnagramsCounting("Dormitory", "Dirty room"));       // true
console.log(areAnagramsCounting("The quick brown fox", "fox brown quick The")); // true
console.log(areAnagramsCounting("", ""));                           // true
console.log(areAnagramsCounting("a", "b"));                         // false
console.log(areAnagramsCounting("abc", "ab"));                      // false
