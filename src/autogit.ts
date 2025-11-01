/**
 * Computes the Longest Proper Prefix which is also a Suffix (LPS) array
 * for a given pattern string.
 *
 * The LPS array helps in efficiently shifting the pattern when a mismatch occurs
 * during the KMP search. lps[i] stores the length of the longest proper prefix
 * of pattern[0...i] that is also a suffix of pattern[0...i].
 *
 * @param pattern The pattern string to compute the LPS array for.
 * @returns An array of numbers representing the LPS array.
 */
function computeLPSArray(pattern: string): number[] {
    const m = pattern.length;
    const lps: number[] = new Array(m).fill(0);

    let len = 0; // Length of the previous longest prefix suffix
    let i = 1;   // Pointer for iterating through the pattern

    // lps[0] is always 0, so we start from i = 1
    while (i < m) {
        if (pattern[i] === pattern[len]) {
            len++;
            lps[i] = len;
            i++;
        } else {
            // This is the crucial part:
            // If there's a mismatch (pattern[i] !== pattern[len])
            // and len is not 0, we fall back to the LPS value of the
            // previous prefix. This means we are trying to find a shorter
            // prefix that could also be a suffix.
            if (len !== 0) {
                len = lps[len - 1];
            } else {
                // If len is 0, it means no prefix matches a suffix for
                // pattern[0...i-1]. So, lps[i] remains 0, and we just
                // move to the next character in the pattern.
                lps[i] = 0;
                i++;
            }
        }
    }
    return lps;
}

/**
 * Implements the Knuth-Morris-Pratt (KMP) string searching algorithm.
 * It finds all occurrences of a pattern string within a text string.
 *
 * @param text The text string to search within.
 * @param pattern The pattern string to search for.
 * @returns An array of starting indices where the pattern is found in the text.
 *          Returns an empty array if no matches are found or if the pattern is invalid.
 */
function kmpSearch(text: string, pattern: string): number[] {
    const n = text.length;
    const m = pattern.length;

    const matches: number[] = [];

    // Edge cases
    if (m === 0) {
        // An empty pattern conceptually matches at index 0 in any text.
        // For finding all occurrences, it can be considered to match before every character
        // and at the end (n+1 matches). For simplicity, we'll return [0] if text is not empty,
        // or an empty array if both are empty (no meaningful search).
        // Or, more robustly, throw an error for an invalid pattern.
        // For this implementation, we'll return an empty array for an empty pattern,
        // as it's often treated as an invalid search input in practice.
        console.warn("KMP search: Pattern cannot be empty. Returning empty array.");
        return [];
    }
    if (n === 0) {
        return []; // Empty text, no pattern can be found
    }
    if (m > n) {
        return []; // Pattern is longer than text, cannot be found
    }

    const lps = computeLPSArray(pattern);

    let i = 0; // Pointer for text (N)
    let j = 0; // Pointer for pattern (M)

    while (i < n) {
        // If characters match, advance both pointers
        if (pattern[j] === text[i]) {
            i++;
            j++;
        }

        // If pattern is fully matched (j reaches m), a match is found
        if (j === m) {
            // Record the starting index of the match
            // The match starts at text[i - j]
            matches.push(i - j);

            // After finding a match, we don't restart pattern comparison
            // from j=0. Instead, we use the LPS array to determine
            // where to continue searching in the pattern.
            // lps[j-1] tells us the length of the longest proper prefix
            // of the matched pattern that is also a suffix. This means
            // we can shift the pattern to align this prefix.
            j = lps[j - 1];
        } else if (i < n && pattern[j] !== text[i]) {
            // Mismatch case:
            // If j is not 0, it means we have matched some characters
            // of the pattern (pattern[0...j-1]) before the mismatch.
            // We use the LPS array to "shift" the pattern by setting
            // j to lps[j-1]. This effectively aligns the next best
            // matching prefix of the pattern with the current text position.
            if (j !== 0) {
                j = lps[j - 1];
            } else {
                // If j is 0, it means the first character of the pattern
                // itself didn't match. So, we simply move to the next
                // character in the text.
                i++;
            }
        }
    }
    return matches;
}

// --- Usage Examples ---

console.log("--- Example 1: Basic Search ---");
const text1 = "ABABDABACDABABCABAB";
const pattern1 = "ABABCABAB";
const result1 = kmpSearch(text1, pattern1);
console.log(`Text: "${text1}"`);
console.log(`Pattern: "${pattern1}"`);
console.log(`Matches found at indices: ${result1}`); // Expected: [10]

console.log("\n--- Example 2: Multiple Matches ---");
const text2 = "AAAAA";
const pattern2 = "AAA";
const result2 = kmpSearch(text2, pattern2);
console.log(`Text: "${text2}"`);
console.log(`Pattern: "${pattern2}"`);
console.log(`Matches found at indices: ${result2}`); // Expected: [0, 1, 2]

console.log("\n--- Example 3: No Match ---");
const text3 = "ABCDEFG";
const pattern3 = "XYZ";
const result3 = kmpSearch(text3, pattern3);
console.log(`Text: "${text3}"`);
console.log(`Pattern: "${pattern3}"`);
console.log(`Matches found at indices: ${result3}`); // Expected: []

console.log("\n--- Example 4: Pattern at start and end ---");
const text4 = "ABCABCA";
const pattern4 = "BCA";
const result4 = kmpSearch(text4, pattern4);
console.log(`Text: "${text4}"`);
console.log(`Pattern: "${pattern4}"`);
console.log(`Matches found at indices: ${result4}`); // Expected: [1, 4]

console.log("\n--- Example 5: Pattern longer than text ---");
const text5 = "SHORT";
const pattern5 = "LONGER_PATTERN";
const result5 = kmpSearch(text5, pattern5);
console.log(`Text: "${text5}"`);
console.log(`Pattern: "${pattern5}"`);
console.log(`Matches found at indices: ${result5}`); // Expected: []

console.log("\n--- Example 6: Empty Text ---");
const text6 = "";
const pattern6 = "ANY";
const result6 = kmpSearch(text6, pattern6);
console.log(`Text: "${text6}"`);
console.log(`Pattern: "${pattern6}"`);
console.log(`Matches found at indices: ${result6}`); // Expected: []

console.log("\n--- Example 7: Empty Pattern (handled as warning/empty result) ---");
const text7 = "SOMETHING";
const pattern7 = "";
const result7 = kmpSearch(text7, pattern7);
console.log(`Text: "${text7}"`);
console.log(`Pattern: "${pattern7}"`);
console.log(`Matches found at indices: ${result7}`); // Expected: []
