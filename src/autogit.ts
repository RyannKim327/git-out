function cleanString(str: string): string {
  // Convert to lowercase and remove any non-alphanumeric characters
  return str.toLowerCase().replace(/[^a-z0-9]/g, '');
}

function areAnagramsSorting(str1: string, str2: string): boolean {
  const cleanStr1 = cleanString(str1);
  const cleanStr2 = cleanString(str2);

  // If the cleaned strings have different lengths, they cannot be anagrams
  if (cleanStr1.length !== cleanStr2.length) {
    return false;
  }

  // Sort the characters of both strings and compare them
  const sortedStr1 = cleanStr1.split('').sort().join('');
  const sortedStr2 = cleanStr2.split('').sort().join('');

  return sortedStr1 === sortedStr2;
}

// --- Example Usage ---
console.log("--- Sorting Method ---");
console.log(`"listen" and "silent": ${areAnagramsSorting("listen", "silent")}`); // true
console.log(`"hello" and "bello": ${areAnagramsSorting("hello", "bello")}`);     // false
console.log(`"Astronomer" and "Moon starer": ${areAnagramsSorting("Astronomer", "Moon starer")}`); // true
console.log(`"A gentleman" and "Elegant man": ${areAnagramsSorting("A gentleman", "Elegant man")}`); // true
console.log(`"" and "": ${areAnagramsSorting("", "")}`);                           // true
console.log(`"a" and "b": ${areAnagramsSorting("a", "b")}`);                         // false
console.log(`"Dormitory" and "Dirty room": ${areAnagramsSorting("Dormitory", "Dirty room")}`); // true
console.log(`"Debit card" and "Bad credit": ${areAnagramsSorting("Debit card", "Bad credit")}`); // true
console.log(`"rail safety" and "fairy tales": ${areAnagramsSorting("rail safety", "fairy tales")}`); // true
function cleanString(str: string): string {
  // Convert to lowercase and remove any non-alphanumeric characters
  return str.toLowerCase().replace(/[^a-z0-9]/g, '');
}

function areAnagramsCounting(str1: string, str2: string): boolean {
  const cleanStr1 = cleanString(str1);
  const cleanStr2 = cleanString(str2);

  // If the cleaned strings have different lengths, they cannot be anagrams
  if (cleanStr1.length !== cleanStr2.length) {
    return false;
  }

  // Handle empty strings explicitly if desired, though the loops will handle it
  if (cleanStr1.length === 0) {
    return true; // Both are empty strings, considered anagrams
  }

  const charCounts = new Map<string, number>();

  // Populate the map with character counts from cleanStr1
  for (const char of cleanStr1) {
    charCounts.set(char, (charCounts.get(char) || 0) + 1);
  }

  // Iterate through cleanStr2, decrementing counts
  for (const char of cleanStr2) {
    const count = charCounts.get(char);
    if (!count) {
      // Character not found or count is already 0
      return false;
    }
    charCounts.set(char, count - 1);
  }

  // At this point, all counts in charCounts should be 0 if they are anagrams.
  // We don't need to iterate through the map again because if str1.length === str2.length
  // and all characters in str2 were found and decremented without going below zero,
  // then all counts must necessarily be zero.
  return true;
}


// --- Example Usage ---
console.log("\n--- Character Counting Method ---");
console.log(`"listen" and "silent": ${areAnagramsCounting("listen", "silent")}`); // true
console.log(`"hello" and "bello": ${areAnagramsCounting("hello", "bello")}`);     // false
console.log(`"Astronomer" and "Moon starer": ${areAnagramsCounting("Astronomer", "Moon starer")}`); // true
console.log(`"A gentleman" and "Elegant man": ${areAnagramsCounting("A gentleman", "Elegant man")}`); // true
console.log(`"" and "": ${areAnagramsCounting("", "")}`);                           // true
console.log(`"a" and "b": ${areAnagramsCounting("a", "b")}`);                         // false
console.log(`"Dormitory" and "Dirty room": ${areAnagramsCounting("Dormitory", "Dirty room")}`); // true
console.log(`"Debit card" and "Bad credit": ${areAnagramsCounting("Debit card", "Bad credit")}`); // true
console.log(`"rail safety" and "fairy tales": ${areAnagramsCounting("rail safety", "fairy tales")}`); // true
