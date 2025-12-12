/**
 * Precomputes the bad-character shift table for Boyer-Moore-Horspool algorithm
 * @param pattern The pattern to search for
 * @returns A Map containing the shift distances for each character
 */
function preprocessBadCharTable(pattern: string): Map<string, number> {
    const table = new Map<string, number>();
    const patternLength = pattern.length;
    
    // For all characters except the last one, set the shift distance
    for (let i = 0; i < patternLength - 1; i++) {
        const char = pattern[i];
        // The shift is patternLength - i - 1
        table.set(char, patternLength - i - 1);
    }
    
    return table;
}

/**
 * Boyer-Moore-Horspool string search algorithm
 * @param text The text to search in
 * @param pattern The pattern to search for
 * @returns The index of the first occurrence of pattern in text, or -1 if not found
 */
function boyerMooreHorspool(text: string, pattern: string): number {
    const textLength = text.length;
    const patternLength = pattern.length;
    
    // Edge cases
    if (patternLength === 0) return 0;
    if (patternLength > textLength) return -1;
    
    // Precompute the bad character table
    const badCharTable = preprocessBadCharTable(pattern);
    const defaultShift = patternLength; // Default shift when character not in pattern
    
    let i = 0; // Current position in text
    
    while (i <= textLength - patternLength) {
        // Compare pattern with text starting at position i
        let j = patternLength - 1; // Compare from right to left
        
        while (j >= 0 && pattern[j] === text[i + j]) {
            j--;
        }
        
        // If pattern found
        if (j < 0) {
            return i;
        }
        
        // Calculate shift distance
        const currentChar = text[i + patternLength - 1];
        const shift = badCharTable.get(currentChar) || defaultShift;
        
        i += shift;
    }
    
    return -1;
}

/**
 * Enhanced version that finds all occurrences of the pattern
 * @param text The text to search in
 * @param pattern The pattern to search for
 * @returns Array of indices where pattern occurs in text
 */
function boyerMooreHorspoolAll(text: string, pattern: string): number[] {
    const indices: number[] = [];
    const textLength = text.length;
    const patternLength = pattern.length;
    
    if (patternLength === 0 || patternLength > textLength) {
        return indices;
    }
    
    const badCharTable = preprocessBadCharTable(pattern);
    const defaultShift = patternLength;
    
    let i = 0;
    
    while (i <= textLength - patternLength) {
        let j = patternLength - 1;
        
        while (j >= 0 && pattern[j] === text[i + j]) {
            j--;
        }
        
        if (j < 0) {
            indices.push(i);
            i += 1; // Move one position to find next occurrence
        } else {
            const currentChar = text[i + patternLength - 1];
            const shift = badCharTable.get(currentChar) || defaultShift;
            i += shift;
        }
    }
    
    return indices;
}

// Example usage and testing
function testBoyerMooreHorspool(): void {
    const testCases = [
        { text: "hello world", pattern: "world", expected: 6 },
        { text: "abracadabra", pattern: "cad", expected: 4 },
        { text: "mississippi", pattern: "iss", expected: 1 },
        { text: "abc", pattern: "d", expected: -1 },
        { text: "aaa", pattern: "aa", expected: 0 },
        { text: "", pattern: "test", expected: -1 },
        { text: "test", pattern: "", expected: 0 },
    ];
    
    console.log("Testing Boyer-Moore-Horspool algorithm:");
    console.log("=".repeat(50));
    
    for (const testCase of testCases) {
        const result = boyerMooreHorspool(testCase.text, testCase.pattern);
        const status = result === testCase.expected ? "✓ PASS" : "✗ FAIL";
        console.log(`${status}: "${testCase.pattern}" in "${testCase.text}" -> ${result} (expected ${testCase.expected})`);
    }
    
    // Test finding all occurrences
    console.log("\nTesting finding all occurrences:");
    const text = "abababab";
    const pattern = "aba";
    const allIndices = boyerMooreHorspoolAll(text, pattern);
    console.log(`Pattern "${pattern}" in "${text}" found at indices: [${allIndices.join(", ")}]`);
}

// Export the functions for use in other modules
export {
    boyerMooreHorspool,
    boyerMooreHorspoolAll,
    preprocessBadCharTable,
    testBoyerMooreHorspool
};

// Uncomment to run tests
// testBoyerMooreHorspool();
// Basic usage
const text = "This is a test string for testing the algorithm";
const pattern = "test";

// Find first occurrence
const firstIndex = boyerMooreHorspool(text, pattern);
console.log(`First occurrence at index: ${firstIndex}`);

// Find all occurrences
const allIndices = boyerMooreHorspoolAll(text, pattern);
console.log(`All occurrences: ${allIndices.join(", ")}`);

// Use the bad character table directly
const table = preprocessBadCharTable("example");
console.log("Bad character table:", Object.fromEntries(table));
