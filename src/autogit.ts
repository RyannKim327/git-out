/**
 * Computes the Longest Proper Prefix which is also a Suffix (LPS) array for the given pattern.
 * This array is crucial for the KMP algorithm to avoid redundant comparisons.
 *
 * @param pattern The string pattern for which to compute the LPS array.
 * @returns An array where lps[i] stores the length of the longest proper prefix
 *          of pattern[0...i] that is also a suffix of pattern[0...i].
 */
function computeLPSArray(pattern: string): number[] {
    const m = pattern.length;
    const lps: number[] = new Array(m).fill(0); // Initialize LPS array with zeros
    let len = 0; // Length of the previous longest prefix suffix

    // lps[0] is always 0, so we start from i = 1
    let i = 1;
    while (i < m) {
        if (pattern[i] === pattern[len]) {
            // Characters match, extend the current prefix/suffix
            len++;
            lps[i] = len;
            i++;
        } else {
            // Mismatch
            if (len !== 0) {
                // If there was a previous prefix/suffix, try a shorter one
                // We don't increment i here, as we try to match pattern[i]
                // with pattern[len] (the new len)
                len = lps[len - 1];
            } else {
                // No previous prefix/suffix, so lps[i] is 0
                lps[i] = 0;
                i++; // Move to the next character in pattern
            }
        }
    }
    return lps;
}

/**
 * Implements the Knuth-Morris-Pratt (KMP) string searching algorithm.
 * Finds all occurrences of a pattern in a given text.
 *
 * @param text The text string to search within.
 * @param pattern The pattern string to search for.
 * @returns An array of starting indices where the pattern is found in the text.
 *          Returns an empty array if the pattern is not found or is empty.
 */
function kmpSearch(text: string, pattern: string): number[] {
    const n = text.length;
    const m = pattern.length;
    const results: number[] = [];

    // Edge cases
    if (m === 0) {
        // An empty pattern is traditionally considered to match at every position before each character
        // and at the end. For practical purposes, returning an empty array is often preferred,
        // or you might return indices from 0 to n depending on exact requirements.
        // For string search, an empty pattern usually means no meaningful search.
        return [];
    }
    if (n === 0 || m > n) {
        return [];
    }

    // Preprocessing: Compute the LPS array for the pattern
    const lps = computeLPSArray(pattern);

    let i = 0; // Pointer for text (current character in text)
    let j = 0; // Pointer for pattern (current character in pattern)

    while (i < n) {
        if (pattern[j] === text[i]) {
            // Characters match, move both pointers forward
            i++;
            j++;
        }

        if (j === m) {
            // Pattern found!
            // Add the starting index of the match to results (i - j gives the starting index)
            results.push(i - j);

            // To find subsequent matches, use the LPS array to determine
            // where to restart the pattern pointer (j)
            j = lps[j - 1]; // Move j to the length of the longest proper prefix that is also a suffix of the matched pattern
        } else if (i < n && pattern[j] !== text[i]) {
            // Mismatch
            if (j !== 0) {
                // If j is not 0, it means we had some matching characters.
                // Use the LPS array to shift the pattern.
                j = lps[j - 1];
            } else {
                // If j is 0, it means the first character of the pattern didn't match.
                // Just move to the next character in the text.
                i++;
            }
        }
    }

    return results;
}

// --- Example Usage ---

// Test 1: Basic search
const text1 = "ABABDABACDABABCABAB";
const pattern1 = "ABABCABAB";
const matches1 = kmpSearch(text1, pattern1);
console.log(`Text: "${text1}"`);
console.log(`Pattern: "${pattern1}"`);
console.log(`Matches found at indices: ${matches1}`); // Expected: [10]

// Test 2: Multiple occurrences
const text2 = "AAAAA";
const pattern2 = "AA";
const matches2 = kmpSearch(text2, pattern2);
console.log(`\nText: "${text2}"`);
console.log(`Pattern: "${pattern2}"`);
console.log(`Matches found at indices: ${matches2}`); // Expected: [0, 1, 2, 3]

// Test 3: No match
const text3 = "ABCDEFG";
const pattern3 = "XYZ";
const matches3 = kmpSearch(text3, pattern3);
console.log(`\nText: "${text3}"`);
console.log(`Pattern: "${pattern3}"`);
console.log(`Matches found at indices: ${matches3}`); // Expected: []

// Test 4: Pattern at the beginning
const text4 = "KMPALGORITHM";
const pattern4 = "KMP";
const matches4 = kmpSearch(text4, pattern4);
console.log(`\nText: "${text4}"`);
console.log(`Pattern: "${pattern4}"`);
console.log(`Matches found at indices: ${matches4}`); // Expected: [0]

// Test 5: Pattern at the end
const text5 = "ALGORITHMKMP";
const pattern5 = "KMP";
const matches5 = kmpSearch(text5, pattern5);
console.log(`\nText: "${text5}"`);
console.log(`Pattern: "${pattern5}"`);
console.log(`Matches found at indices: ${matches5}`); // Expected: [9]

// Test 6: Pattern longer than text
const text6 = "short";
const pattern6 = "verylongpattern";
const matches6 = kmpSearch(text6, pattern6);
console.log(`\nText: "${text6}"`);
console.log(`Pattern: "${pattern6}"`);
console.log(`Matches found at indices: ${matches6}`); // Expected: []

// Test 7: Empty text
const text7 = "";
const pattern7 = "abc";
const matches7 = kmpSearch(text7, pattern7);
console.log(`\nText: "${text7}"`);
console.log(`Pattern: "${pattern7}"`);
console.log(`Matches found at indices: ${matches7}`); // Expected: []

// Test 8: Empty pattern (as per current implementation)
const text8 = "abcde";
const pattern8 = "";
const matches8 = kmpSearch(text8, pattern8);
console.log(`\nText: "${text8}"`);
console.log(`Pattern: "${pattern8}"`);
console.log(`Matches found at indices: ${matches8}`); // Expected: [] (can be modified to return all indices for specific cases)

// Test 9: Complex pattern
const text9 = "GEEKSFORGEEKS";
const pattern9 = "GEEK";
const matches9 = kmpSearch(text9, pattern9);
console.log(`\nText: "${text9}"`);
console.log(`Pattern: "${pattern9}"`);
console.log(`Matches found at indices: ${matches9}`); // Expected: [0, 8]
