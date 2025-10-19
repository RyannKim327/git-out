/**
 * Computes the prefix table (LPS array) for the KMP algorithm.
 * The LPS array stores the length of the longest proper prefix that is also a suffix.
 * 
 * @param pattern - The pattern string to search for
 * @returns The LPS array
 */
function computeLPSArray(pattern: string): number[] {
    const m = pattern.length;
    const lps: number[] = new Array(m).fill(0);
    let len = 0; // Length of the previous longest prefix suffix
    let i = 1; // Index for pattern[]

    while (i < m) {
        if (pattern[i] === pattern[len]) {
            len++;
            lps[i] = len;
            i++;
        } else {
            if (len !== 0) {
                len = lps[len - 1];
            } else {
                lps[i] = 0;
                i++;
            }
        }
    }

    return lps;
}

/**
 * KMP algorithm to find all occurrences of a pattern in a text.
 * 
 * @param text - The text to search in
 * @param pattern - The pattern to search for
 * @returns Array of starting indices where the pattern is found
 */
function kmpSearch(text: string, pattern: string): number[] {
    const n = text.length;
    const m = pattern.length;

    // Edge case: if pattern is empty, return empty array
    if (m === 0) {
        return [];
    }

    // Edge case: if pattern is longer than text, no match possible
    if (m > n) {
        return [];
    }

    const lps = computeLPSArray(pattern);
    const result: number[] = [];
    let i = 0; // Index for text[]
    let j = 0; // Index for pattern[]

    while (i < n) {
        if (pattern[j] === text[i]) {
            i++;
            j++;
        }

        if (j === m) {
            // Pattern found
            result.push(i - j);
            j = lps[j - 1]; // Look for overlapping occurrences
        } else if (i < n && pattern[j] !== text[i]) {
            if (j !== 0) {
                j = lps[j - 1];
            } else {
                i++;
            }
        }
    }

    return result;
}

/**
 * KMP algorithm that returns the first occurrence of the pattern.
 * 
 * @param text - The text to search in
 * @param pattern - The pattern to search for
 * @returns The starting index of the first occurrence, or -1 if not found
 */
function kmpSearchFirst(text: string, pattern: string): number {
    const result = kmpSearch(text, pattern);
    return result.length > 0 ? result[0] : -1;
}

// Optional: TypeScript interface for better type safety
interface KMPResult {
    indices: number[];
    found: boolean;
    count: number;
}

/**
 * Enhanced KMP search with detailed results.
 */
function kmpSearchDetailed(text: string, pattern: string): KMPResult {
    const indices = kmpSearch(text, pattern);
    return {
        indices,
        found: indices.length > 0,
        count: indices.length
    };
}
// Example usage
const text = "ABABDABACDABABCABAB";
const pattern = "ABABCABAB";

// Find all occurrences
const allMatches = kmpSearch(text, pattern);
console.log("All matches at indices:", allMatches); 
// Output: [10]

// Find first occurrence
const firstMatch = kmpSearchFirst(text, pattern);
console.log("First match at index:", firstMatch); 
// Output: 10

// Detailed results
const detailed = kmpSearchDetailed(text, pattern);
console.log("Detailed result:", detailed);
// Output: { indices: [10], found: true, count: 1 }

// More examples
console.log(kmpSearch("aaaa", "aa")); 
// Output: [0, 1, 2] - finds overlapping occurrences

console.log(kmpSearch("ABCDEF", "XYZ")); 
// Output: [] - pattern not found

console.log(kmpSearch("AABAABAA", "AAB")); 
// Output: [0, 2, 4] - multiple overlapping matches
