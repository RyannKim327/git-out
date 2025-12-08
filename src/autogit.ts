interface BadCharTable {
    [key: string]: number;
}

class BoyerMooreHorspool {
    /**
     * Preprocesses the pattern to create the bad character shift table
     */
    private static preprocessBadCharTable(pattern: string): BadCharTable {
        const table: BadCharTable = {};
        const patternLength = pattern.length;
        
        // Default shift is the length of the pattern
        const defaultShift = patternLength;
        
        // For all characters except the last one, set the shift distance
        for (let i = 0; i < patternLength - 1; i++) {
            const char = pattern[i];
            table[char] = patternLength - 1 - i;
        }
        
        return table;
    }

    /**
     * Searches for all occurrences of pattern in text using Boyer-Moore-Horspool algorithm
     */
    static search(text: string, pattern: string): number[] {
        const results: number[] = [];
        
        if (pattern.length === 0 || text.length === 0 || pattern.length > text.length) {
            return results;
        }

        const patternLength = pattern.length;
        const textLength = text.length;
        const badCharTable = this.preprocessBadCharTable(pattern);

        let i = 0; // Current position in text
        
        while (i <= textLength - patternLength) {
            let j = patternLength - 1; // Compare from end of pattern
            
            // Compare pattern with text starting from the end
            while (j >= 0 && pattern[j] === text[i + j]) {
                j--;
            }
            
            if (j < 0) {
                // Pattern found
                results.push(i);
                // Shift by pattern length (or by 1 if we're at the end)
                i += patternLength;
            } else {
                // Get shift from bad character table or use default shift
                const badChar = text[i + patternLength - 1];
                const shift = badCharTable[badChar] || patternLength;
                i += shift;
            }
        }
        
        return results;
    }

    /**
     * Searches for the first occurrence of pattern in text
     */
    static searchFirst(text: string, pattern: string): number {
        if (pattern.length === 0 || text.length === 0 || pattern.length > text.length) {
            return -1;
        }

        const patternLength = pattern.length;
        const textLength = text.length;
        const badCharTable = this.preprocessBadCharTable(pattern);

        let i = 0;
        
        while (i <= textLength - patternLength) {
            let j = patternLength - 1;
            
            while (j >= 0 && pattern[j] === text[i + j]) {
                j--;
            }
            
            if (j < 0) {
                return i; // Found first occurrence
            } else {
                const badChar = text[i + patternLength - 1];
                const shift = badCharTable[badChar] || patternLength;
                i += shift;
            }
        }
        
        return -1;
    }

    /**
     * Checks if pattern exists in text
     */
    static contains(text: string, pattern: string): boolean {
        return this.searchFirst(text, pattern) !== -1;
    }
}

// Example usage and test cases
function testBoyerMooreHorspool() {
    // Test cases
    const testCases = [
        { text: "Hello World", pattern: "World", expected: [6] },
        { text: "abracadabra", pattern: "abra", expected: [0, 7] },
        { text: "mississippi", pattern: "issi", expected: [1, 4] },
        { text: "abcabcabc", pattern: "abc", expected: [0, 3, 6] },
        { text: "abcdef", pattern: "xyz", expected: [] },
        { text: "", pattern: "test", expected: [] },
        { text: "test", pattern: "", expected: [] }
    ];

    console.log("Testing Boyer-Moore-Horspool algorithm:");
    console.log("=".repeat(50));

    testCases.forEach((testCase, index) => {
        const result = BoyerMooreHorspool.search(testCase.text, testCase.pattern);
        const passed = JSON.stringify(result) === JSON.stringify(testCase.expected);
        
        console.log(`Test ${index + 1}: ${passed ? "PASS" : "FAIL"}`);
        console.log(`Text: "${testCase.text}"`);
        console.log(`Pattern: "${testCase.pattern}"`);
        console.log(`Expected: [${testCase.expected.join(", ")}]`);
        console.log(`Got: [${result.join(", ")}]`);
        console.log("-".repeat(30));
    });

    // Additional tests
    console.log("Additional functionality tests:");
    console.log(`First occurrence: ${BoyerMooreHorspool.searchFirst("abracadabra", "abra")}`); // Should be 0
    console.log(`Contains check: ${BoyerMooreHorspool.contains("Hello World", "World")}`); // Should be true
    console.log(`Contains check: ${BoyerMooreHorspool.contains("Hello World", "XYZ")}`); // Should be false
}

// Run the tests
testBoyerMooreHorspool();

// Export for use in other modules
export { BoyerMooreHorspool };
// Find all occurrences
const positions = BoyerMooreHorspool.search("abracadabra", "abra");
console.log(positions); // [0, 7]

// Find first occurrence
const firstPos = BoyerMooreHorspool.searchFirst("Hello World", "World");
console.log(firstPos); // 6

// Check if pattern exists
const exists = BoyerMooreHorspool.contains("Hello World", "World");
console.log(exists); // true
