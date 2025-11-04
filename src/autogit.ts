/**
 * Computes the prefix table (LPS array) for the pattern string.
 * The LPS array stores the length of the longest proper prefix 
 * that is also a suffix for each substring of the pattern.
 * 
 * @param pattern - The pattern string to compute LPS for
 * @returns The LPS array
 */
function computeLPSArray(pattern: string): number[] {
    const m = pattern.length;
    const lps: number[] = new Array(m).fill(0);
    let len = 0; // Length of the previous longest prefix suffix
    let i = 1;   // Index for pattern[]

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
 * KMP algorithm to search for a pattern in text.
 * Returns all starting indices where the pattern is found.
 * 
 * @param text - The text to search in
 * @param pattern - The pattern to search for
 * @returns Array of starting indices where pattern is found
 */
function kmpSearch(text: string, pattern: string): number[] {
    const n = text.length;
    const m = pattern.length;
    
    // If pattern is longer than text or pattern is empty
    if (m === 0) return [];
    if (n < m) return [];

    // Preprocess the pattern (compute LPS array)
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
            // Mismatch
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
 * Alternative version that returns the first occurrence index or -1 if not found.
 * 
 * @param text - The text to search in
 * @param pattern - The pattern to search for
 * @returns Index of first occurrence or -1 if not found
 */
function kmpSearchFirst(text: string, pattern: string): number {
    const indices = kmpSearch(text, pattern);
    return indices.length > 0 ? indices[0] : -1;
}

// Example usage and test cases
function demonstrateKMP() {
    const text = "ABABDABACDABABCABAB";
    const pattern = "ABABCABAB";
    
    console.log(`Text:    ${text}`);
    console.log(`Pattern: ${pattern}`);
    console.log(`Found at indices: ${kmpSearch(text, pattern)}`);
    
    // Test cases
    const testCases = [
        { text: "hello world", pattern: "world", expected: [6] },
        { text: "aaaaa", pattern: "aa", expected: [0, 1, 2, 3] },
        { text: "ABC", pattern: "DEF", expected: [] },
        { text: "mississippi", pattern: "issip", expected: [1, 4] },
    ];

    testCases.forEach((test, index) => {
        const result = kmpSearch(test.text, test.pattern);
        console.log(`\nTest ${index + 1}:`);
        console.log(`Text: "${test.text}"`);
        console.log(`Pattern: "${test.pattern}"`);
        console.log(`Found at: ${result}`);
        console.log(`Expected: ${test.expected}`);
        console.log(`Match: ${JSON.stringify(result) === JSON.stringify(test.expected)}`);
    });
}

// Run the demonstration
demonstrateKMP();
// Find all occurrences
const text = "banana";
const pattern = "ana";
const positions = kmpSearch(text, pattern);
console.log(positions); // [1, 3]

// Find first occurrence
const firstPos = kmpSearchFirst(text, pattern);
console.log(firstPos); // 1

// Case-sensitive search
const text2 = "Hello World";
const pattern2 = "world";
console.log(kmpSearch(text2, pattern2)); // [] (no match due to case)

// For case-insensitive search, you'd need to convert both strings first
const text3 = "Hello World".toLowerCase();
const pattern3 = "world".toLowerCase();
console.log(kmpSearch(text3, pattern3)); // [6]
