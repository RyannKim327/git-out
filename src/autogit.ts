/**
 * Implements the Boyer-Moore-Horspool string searching algorithm.
 * Finds all occurrences of a pattern in a text.
 *
 * @param text The text to search within.
 * @param pattern The pattern to search for.
 * @param caseSensitive Whether the search should be case-sensitive (default: true).
 * @returns An array of starting indices where the pattern is found in the text.
 */
function boyerMooreHorspoolSearch(
  text: string,
  pattern: string,
  caseSensitive: boolean = true
): number[] {
  const n = text.length;
  const m = pattern.length;
  const results: number[] = [];

  // Handle edge cases
  if (m === 0) {
    // Empty pattern matches at every position including after the text.
    // Or, depending on requirements, could return [0] or [0, ..., n].
    // For simplicity, we'll say an empty pattern has no meaningful match.
    return [];
  }
  if (n === 0 || m > n) {
    return [];
  }

  let processedText = caseSensitive ? text : text.toLowerCase();
  let processedPattern = caseSensitive ? pattern : pattern.toLowerCase();

  // 1. Preprocessing: Build the shift table
  // Map<character, shift_value>
  const shiftTable = new Map<string, number>();

  // Default shift for any character not in the pattern (or the last char of pattern)
  // is the length of the pattern.
  // We initialize the map with values for characters within the pattern
  // (excluding the last character).
  for (let i = 0; i < m - 1; i++) {
    shiftTable.set(processedPattern[i], m - 1 - i);
  }

  // 2. Searching
  let textIndex = 0; // Current alignment of the pattern's start with the text

  while (textIndex <= n - m) {
    let patternIndex = m - 1; // Start comparing from the end of the pattern

    // Compare characters from right to left
    while (
      patternIndex >= 0 &&
      processedPattern[patternIndex] ===
        processedText[textIndex + patternIndex]
    ) {
      patternIndex--;
    }

    // If patternIndex is -1, it means all characters matched (full match)
    if (patternIndex < 0) {
      results.push(textIndex);

      // After a match, we shift the pattern.
      // The shift is determined by the character in the text aligned with the
      // *last character of the pattern* in the current alignment.
      // This ensures we continue searching for potentially overlapping matches.
      const charToShiftOn = processedText[textIndex + m - 1];
      let shift = shiftTable.get(charToShiftOn) ?? m;
      
      // Ensure shift is at least 1 to avoid infinite loops, especially if
      // the character at (textIndex + m - 1) is the last char of pattern
      // and only appears there (e.g., pattern="A", text="AAAA", shift for 'A' would be 0 without this).
      textIndex += Math.max(1, shift);

    } else {
      // Mismatch occurred.
      // The shift is determined by the character in the text aligned with the
      // *last character of the pattern* in the current alignment.
      const charToShiftOn = processedText[textIndex + m - 1];
      const shift = shiftTable.get(charToShiftOn) ?? m; // Use pattern length if char not in table
      textIndex += shift;
    }
  }

  return results;
}

// --- Example Usage ---

const text1 = "HERE IS A SIMPLE EXAMPLE";
const pattern1 = "EXAMPLE";
console.log(`Text: "${text1}"`);
console.log(`Pattern: "${pattern1}"`);
console.log(
  `Matches (case-sensitive): ${boyerMooreHorspoolSearch(text1, pattern1)}`
); // Expected: [17]

const text2 = "ABCAABCDABCAABCD";
const pattern2 = "ABCD";
console.log(`\nText: "${text2}"`);
console.log(`Pattern: "${pattern2}"`);
console.log(
  `Matches (case-sensitive): ${boyerMooreHorspoolSearch(text2, pattern2)}`
); // Expected: [3, 11]

const text3 = "This is a test. TEST it well.";
const pattern3 = "test";
console.log(`\nText: "${text3}"`);
console.log(`Pattern: "${pattern3}"`);
console.log(
  `Matches (case-sensitive): ${boyerMooreHorspoolSearch(text3, pattern3)}`
); // Expected: [10]
console.log(
  `Matches (case-insensitive): ${boyerMooreHorspoolSearch(
    text3,
    pattern3,
    false
  )}`
); // Expected: [10, 16]

const text4 = "aaaaa";
const pattern4 = "aa";
console.log(`\nText: "${text4}"`);
console.log(`Pattern: "${pattern4}"`);
console.log(
  `Matches (case-sensitive): ${boyerMooreHorspoolSearch(text4, pattern4)}`
); // Expected: [0, 1, 2, 3]

const text5 = "apple";
const pattern5 = "banana";
console.log(`\nText: "${text5}"`);
console.log(`Pattern: "${pattern5}"`);
console.log(
  `Matches (case-sensitive): ${boyerMooreHorspoolSearch(text5, pattern5)}`
); // Expected: []

const text6 = "search";
const pattern6 = "s";
console.log(`\nText: "${text6}"`);
console.log(`Pattern: "${pattern6}"`);
console.log(
  `Matches (case-sensitive): ${boyerMooreHorspoolSearch(text6, pattern6)}`
); // Expected: [0]

const text7 = "ababab";
const pattern7 = "ab";
console.log(`\nText: "${text7}"`);
console.log(`Pattern: "${pattern7}"`);
console.log(
  `Matches (case-sensitive): ${boyerMooreHorspoolSearch(text7, pattern7)}`
); // Expected: [0, 2, 4]
