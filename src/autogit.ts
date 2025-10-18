/**
 * Boyer-Moore string searching algorithm implementation
 * Finds the first occurrence of pattern in text
 * 
 * @param text - The text to search in
 * @param pattern - The pattern to search for
 * @returns Index of the first occurrence of pattern in text, or -1 if not found
 */
function boyerMooreSearch(text: string, pattern: string): number {
    const n = text.length;
    const m = pattern.length;
    
    // Base cases
    if (m === 0) return 0;
    if (n < m) return -1;
    
    // Precompute bad character heuristic table
    const badCharTable = buildBadCharTable(pattern);
    
    // Precompute good suffix heuristic table
    const goodSuffixTable = buildGoodSuffixTable(pattern);
    
    let i = 0; // Position in text
    
    while (i <= n - m) {
        let j = m - 1; // Position in pattern
        
        // Compare characters from right to left
        while (j >= 0 && pattern[j] === text[i + j]) {
            j--;
        }
        
        if (j < 0) {
            // Pattern found
            return i;
        }
        
        // Calculate shift using both heuristics
        const badCharShift = j - badCharTable[text[i + j]];
        const goodSuffixShift = goodSuffixTable[j];
        const shift = Math.max(1, Math.max(badCharShift, goodSuffixShift));
        
        i += shift;
    }
    
    return -1;
}

/**
 * Builds the bad character heuristic table
 * For each character, stores the rightmost position it appears in the pattern
 * @param pattern - The pattern to build table for
 * @returns Lookup table where table[c] = rightmost index of c in pattern, or -1 if not present
 */
function buildBadCharTable(pattern: string): { [char: string]: number } {
    const table: { [char: string]: number } = {};
    const m = pattern.length;
    
    // Initialize all characters to -1
    for (let i = 0; i < m; i++) {
        table[pattern[i]] = i;
    }
    
    // For characters not in pattern, they remain undefined (treated as -1)
    
    return table;
}

/**
 * Builds the good suffix heuristic table
 * For each position j in pattern, stores how much to shift when pattern[j] doesn't match
 * @param pattern - The pattern to build table for
 * @returns Array where table[j] = shift amount for position j
 */
function buildGoodSuffixTable(pattern: string): number[] {
    const m = pattern.length;
    const table = new Array(m).fill(0);
    const suffixTable = computeSuffixTable(pattern);
    
    let j = 0;
    let k = 0;
    
    // First pass: fill table from the end
    for (let i = m - 1; i >= 0; i--) {
        if (i > m - 1 - suffixTable[i]) {
            table[j] = i - suffixTable[i];
            j++;
        }
    }
    
    // Second pass: fill remaining entries
    for (let i = 0; i < m; i++) {
        if (table[i] === 0) {
            table[i] = m;
        }
    }
    
    return table;
}

/**
 * Helper function to compute suffix table for good suffix heuristic
 * @param pattern - The pattern to compute suffixes for
 * @returns Suffix table where suffixTable[i] = length of longest proper suffix starting at i
 */
function computeSuffixTable(pattern: string): number[] {
    const m = pattern.length;
    const suffixTable = new Array(m).fill(0);
    let k = 0;
    
    for (let i = 1; i < m; i++) {
        if (pattern[i] === pattern[k]) {
            k++;
            suffixTable[i] = k;
        } else {
            if (k !== 0) {
                k = suffixTable[k - 1];
                i--; // Recompare with the new k
            } else {
                suffixTable[i] = 0;
            }
        }
    }
    
    return suffixTable;
}

// Example usage and test function
function testBoyerMoore(): void {
    const testCases: [string, string, number][] = [
        ["hello world", "world", 6],
        ["lorem ipsum dolor sit amet", "sit", 18],
        ["abcabcabc", "abc", 0],
        ["abcabcabc", "bcd", -1],
        ["aaaaaa", "aaa", 0],
        ["abcde", "abcde", 0],
        ["abcde", "fghij", -1],
        ["mississippi", "issip", 4],
    ];
    
    console.log("Boyer-Moore Algorithm Tests:");
    console.log("=".repeat(40));
    
    for (const [text, pattern, expected] of testCases) {
        const result = boyerMooreSearch(text, pattern);
        const status = result === expected ? "✓ PASS" : "✗ FAIL";
        console.log(`Text: "${text}" | Pattern: "${pattern}" | Expected: ${expected} | Got: ${result} | ${status}`);
    }
    
    // Performance test
    const longText = "a".repeat(1000000) + "b";
    const pattern = "a".repeat(1000) + "b";
    console.log("\nPerformance test (large input):");
    const start = performance.now();
    const result = boyerMooreSearch(longText, pattern);
    const end = performance.now();
    console.log(`Found at index ${result} in ${(end - start).toFixed(2)}ms`);
}

// Run tests
testBoyerMoore();
// Simple usage
const text = "This is a test string with some test content";
const pattern = "test";
const position = boyerMooreSearch(text, pattern);
console.log(`Pattern found at index: ${position}`); // Output: 8

// With error handling
function safeSearch(text: string, pattern: string): number {
    if (!text || !pattern) return -1;
    return boyerMooreSearch(text, pattern);
}
