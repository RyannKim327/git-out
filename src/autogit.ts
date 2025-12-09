/**
 * Simplified Boyer-Moore string search algorithm using only the bad character rule.
 * Returns the index of the first occurrence of `pattern` in `text`, or -1 if not found.
 * @param text - The text to search within
 * @param pattern - The pattern to search for
 */
function boyerMooreSearch(text: string, pattern: string): number {
    // Edge case: empty pattern
    if (pattern.length === 0) return 0;
    // Edge case: pattern longer than text
    if (text.length < pattern.length) return -1;

    // Preprocess: Create bad character table
    // Records the last occurrence index of each character in the pattern
    const badCharTable: Record<string, number> = {};
    for (let i = 0; i < pattern.length; i++) {
        badCharTable[pattern[i]] = i;
    }

    const textLength = text.length;
    const patternLength = pattern.length;
    let shift = 0; // Current shift position

    while (shift <= textLength - patternLength) {
        let j = patternLength - 1;

        // Compare from end of pattern to start
        while (j >= 0 && pattern[j] === text[shift + j]) {
            j--;
        }

        // If all characters matched
        if (j < 0) {
            return shift;
        } else {
            // Calculate shift using bad character rule
            const char = text[shift + j]; // Mismatched character in text
            const badCharShift = j - (badCharTable[char] ?? -1);
            // Use shift if positive, otherwise shift by 1
            shift += Math.max(1, badCharShift);
        }
    }

    return -1; // Not found
}
// Example usage
const text = "ABAAABCD";
const pattern = "ABC";
console.log(boyerMooreSearch(text, pattern));  // Output: 4

const longText = "This is a test text for searching with Boyer-Moore";
const searchPattern = "Boyer-Moore";
console.log(boyerMooreSearch(longText, searchPattern));  // Output: 38
