/**
 * Implements the Boyer-Moore-Horspool string searching algorithm.
 * This algorithm finds all occurrences of a pattern within a text.
 * It's generally faster than naive search for longer patterns, especially with larger alphabets.
 *
 * @param text The string to search within.
 * @param pattern The string to search for.
 * @returns An array of starting indices where the pattern is found in the text.
 *          Returns an empty array if the pattern is not found or is empty/invalid.
 */
export function boyerMooreHorspoolSearch(text: string, pattern: string): number[] {
    const results: number[] = [];
    const n = text.length;
    const m = pattern.length;

    // Handle edge cases
    if (m === 0) {
        // An empty pattern can be considered to match at every position before and after every character.
        // However, for practical string searching, it's usually handled as not found or a special case.
        // Returning an empty array is common for string search algorithms to indicate "no meaningful match".
        return [];
    }
    if (n === 0 || m > n) {
        return [];
    }

    // 1. Precomputation: Create the shift table (also known as bad character table)
    // The map stores the shift amount for each character that appears in the pattern
    // (excluding the last character). Characters not explicitly in the map will
    // implicitly have a shift of `m` (pattern length).
    const shiftTable = new Map<string, number>();

    // Initialize shift table: for characters within the pattern (excluding the last one),
    // calculate their shift. If a character appears multiple times, the rightmost
    // occurrence (before the last char) dictates the shift.
    for (let i = 0; i < m - 1; i++) {
        // The shift for char `pattern[i]` is `m - 1 - i`.
        // This aligns the character in the text with this occurrence of the character in the pattern.
        shiftTable.set(pattern[i], m - 1 - i);
    }

    // 2. Searching Phase
    let i = 0; // 'i' is the current alignment of the pattern's start in the text

    // Loop until the pattern's rightmost end extends beyond the text's end
    while (i <= n - m) {
        let j = m - 1; // 'j' is the current index in the pattern, starting from the rightmost character

        // Compare characters from right to left (pattern[j] with text[i + j])
        while (j >= 0 && text[i + j] === pattern[j]) {
            j--;
        }

        if (j < 0) {
            // Pattern found! All characters matched (j went below 0)
            results.push(i);

            // After a match, we need to shift the pattern to find subsequent occurrences.
            // The standard Horspool rule for shifting after a match is to use the shift
            // value associated with the last character of the pattern itself (`pattern[m-1]`).
            // If `pattern[m-1]` is in the shiftTable, use its value; otherwise, default to `m`.
            // This is effectively `m` if pattern[m-1] is unique or doesn't appear earlier,
            // or a smaller value if it does.
            i += shiftTable.get(pattern[m - 1]) ?? m;
        } else {
            // Mismatch occurred. Determine the shift amount.
            // Horspool's rule always considers the character in the text that aligns
            // with the *last character of the pattern* (`text[i + m - 1]`) to determine the shift.
            const charToShiftOn = text[i + m - 1];

            // Get the shift amount from the table.
            // If the character is not in the table (meaning it didn't appear in the pattern
            // before its last character), the default shift is `m` (pattern length).
            const shiftAmount = shiftTable.get(charToShiftOn) ?? m;
            i += shiftAmount;
        }
    }

    return results;
}

// --- Example Usage ---

console.log("--- Boyer-Moore-Horspool Search Examples ---");

// Example 1: Basic search
let text1 = "THIS IS A TEST TEXT";
let pattern1 = "TEST";
console.log(`Text: "${text1}" | Pattern: "${pattern1}"`);
console.log(`Occurrences at indices: ${boyerMooreHorspoolSearch(text1, pattern1)}`); // Expected: [10]

// Example 2: Multiple occurrences
let text2 = "ABCAABCAAB";
let pattern2 = "ABC";
console.log(`Text: "${text2}" | Pattern: "${pattern2}"`);
console.log(`Occurrences at indices: ${boyerMooreHorspoolSearch(text2, pattern2)}`); // Expected: [0, 4]

// Example 3: Pattern not found
let text3 = "HELLO WORLD";
let pattern3 = "XYZ";
console.log(`Text: "${text3}" | Pattern: "${pattern3}"`);
console.log(`Occurrences at indices: ${boyerMooreHorspoolSearch(text3, pattern3)}`); // Expected: []

// Example 4: Pattern at the beginning
let text4 = "APPLE BANANA ORANGE";
let pattern4 = "APPLE";
console.log(`Text: "${text4}" | Pattern: "${pattern4}"`);
console.log(`Occurrences at indices: ${boyerMooreHorspoolSearch(text4, pattern4)}`); // Expected: [0]

// Example 5: Pattern at the end
let text5 = "APPLE BANANA ORANGE";
let pattern5 = "ORANGE";
console.log(`Text: "${text5}" | Pattern: "${pattern5}"`);
console.log(`Occurrences at indices: ${boyerMooreHorspoolSearch(text5, pattern5)}`); // Expected: [13]

// Example 6: Pattern with repeated characters
let text6 = "AAAAAA";
let pattern6 = "AA";
console.log(`Text: "${text6}" | Pattern: "${pattern6}"`);
console.log(`Occurrences at indices: ${boyerMooreHorspoolSearch(text6, pattern6)}`); // Expected: [0, 1, 2, 3, 4]

// Example 7: Longer pattern than text
let text7 = "SHORT";
let pattern7 = "LONGER";
console.log(`Text: "${text7}" | Pattern: "${pattern7}"`);
console.log(`Occurrences at indices: ${boyerMooreHorspoolSearch(text7, pattern7)}`); // Expected: []

// Example 8: Empty text
let text8 = "";
let pattern8 = "ANY";
console.log(`Text: "${text8}" | Pattern: "${pattern8}"`);
console.log(`Occurrences at indices: ${boyerMooreHorspoolSearch(text8, pattern8)}`); // Expected: []

// Example 9: Empty pattern (as per current implementation, returns [])
let text9 = "SOME TEXT";
let pattern9 = "";
console.log(`Text: "${text9}" | Pattern: "${pattern9}"`);
console.log(`Occurrences at indices: ${boyerMooreHorspoolSearch(text9, pattern9)}`); // Expected: []

// Example 10: From Wikipedia (AABAACAADAABAABA) with pattern AABA
let text10 = "AABAACAADAABAABA";
let pattern10 = "AABA";
console.log(`Text: "${text10}" | Pattern: "${pattern10}"`);
console.log(`Occurrences at indices: ${boyerMooreHorspoolSearch(text10, pattern10)}`); // Expected: [0, 7, 12]
