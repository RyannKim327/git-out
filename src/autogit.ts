/**
 * Finds the first character that repeats in a given string.
 *
 * @param str The input string to search.
 * @returns The first repeated character as a string, or null if no character repeats.
 *
 * @example
 * findFirstRepeatedCharacter("programming") // Returns "r"
 * findFirstRepeatedCharacter("banana")      // Returns "a"
 * findFirstRepeatedCharacter("abcde")       // Returns null
 * findFirstRepeatedCharacter("hello")       // Returns "l"
 * findFirstRepeatedCharacter("")            // Returns null
 * findFirstRepeatedCharacter("TypeScript")  // Returns "t" (case-sensitive)
 * findFirstRepeatedCharacter("😅👍😂😅") // Returns "😅" (handles Unicode/emojis)
 */
function findFirstRepeatedCharacter(str: string): string | null {
  // Use a Set to store characters we've seen so far.
  // Set.has() and Set.add() operations are very efficient (average O(1)).
  const seenCharacters = new Set<string>();

  // Iterate over the string character by character.
  // Using `for...of` ensures correct handling of Unicode characters (like emojis)
  // which might be represented by multiple JavaScript "characters" (code units).
  for (const char of str) {
    // If the character is already in our set, it means we've seen it before,
    // and this is its first repetition.
    if (seenCharacters.has(char)) {
      return char; // Return the repeated character
    }
    // If the character is not in the set, add it, as we've now seen it once.
    seenCharacters.add(char);
  }

  // If the loop completes, it means no character was repeated.
  return null;
}

// --- Examples ---
console.log(`"programming": ${findFirstRepeatedCharacter("programming")}`); // Output: "r"
console.log(`"banana": ${findFirstRepeatedCharacter("banana")}`);         // Output: "a"
console.log(`"abcde": ${findFirstRepeatedCharacter("abcde")}`);           // Output: null
console.log(`"hello": ${findFirstRepeatedCharacter("hello")}`);           // Output: "l"
console.log(`"": ${findFirstRepeatedCharacter("")}`);                     // Output: null
console.log(`"TypeScript": ${findFirstRepeatedCharacter("TypeScript")}`); // Output: "t" (case-sensitive)
console.log(`"😅👍😂😅": ${findFirstRepeatedCharacter("😅👍😂😅")}`);   // Output: "😅"
console.log(`"aAba": ${findFirstRepeatedCharacter("aAba")}`);             // Output: "a"
