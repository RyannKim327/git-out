class BoyerMooreHorspool {
    /**
     * Preprocesses the pattern to create a bad-character shift table
     */
    private static preprocessPattern(pattern: string): Map<string, number> {
        const table = new Map<string, number>();
        const patternLength = pattern.length;
        
        // For all characters except the last one, set shift distance
        for (let i = 0; i < patternLength - 1; i++) {
            const char = pattern[i];
            const shift = patternLength - i - 1;
            table.set(char, shift);
        }
        
        return table;
    }

    /**
     * Searches for pattern in text using Boyer-Moore-Horspool algorithm
     * @returns Array of indices where pattern starts in text
     */
    static search(text: string, pattern: string): number[] {
        if (pattern.length === 0 || text.length === 0 || pattern.length > text.length) {
            return [];
        }

        const patternLength = pattern.length;
        const textLength = text.length;
        const shiftTable = this.preprocessPattern(pattern);
        const results: number[] = [];

        let i = 0; // Current position in text

        while (i <= textLength - patternLength) {
            let j = patternLength - 1; // Compare from end of pattern

            // Compare pattern with text substring from right to left
            while (j >= 0 && pattern[j] === text[i + j]) {
                j--;
            }

            if (j < 0) {
                // Pattern found
                results.push(i);
                i++; // Move to next position
            } else {
                // Get shift distance from table or use pattern length
                const mismatchChar = text[i + patternLength - 1];
                const shift = shiftTable.get(mismatchChar) || patternLength;
                i += shift;
            }
        }

        return results;
    }

    /**
     * Case-insensitive version of the search
     */
    static searchCaseInsensitive(text: string, pattern: string): number[] {
        return this.search(text.toLowerCase(), pattern.toLowerCase());
    }
}

// Alternative implementation with optimizations
class OptimizedBoyerMooreHorspool {
    private shiftTable: number[];
    private pattern: string;

    constructor(pattern: string) {
        this.pattern = pattern;
        this.shiftTable = this.buildShiftTable(pattern);
    }

    /**
     * Builds shift table using ASCII optimization
     */
    private buildShiftTable(pattern: string): number[] {
        const patternLength = pattern.length;
        const table = new Array(256).fill(patternLength); // ASCII table
        
        for (let i = 0; i < patternLength - 1; i++) {
            const charCode = pattern.charCodeAt(i);
            table[charCode] = patternLength - i - 1;
        }
        
        return table;
    }

    /**
     * Search method using precomputed shift table
     */
    search(text: string): number[] {
        const patternLength = this.pattern.length;
        const textLength = text.length;
        const results: number[] = [];

        if (patternLength === 0 || textLength === 0 || patternLength > textLength) {
            return results;
        }

        let i = 0;

        while (i <= textLength - patternLength) {
            let j = patternLength - 1;

            while (j >= 0 && this.pattern[j] === text[i + j]) {
                j--;
            }

            if (j < 0) {
                results.push(i);
                i++; // Continue searching
            } else {
                const lastCharCode = text.charCodeAt(i + patternLength - 1);
                i += this.shiftTable[lastCharCode];
            }
        }

        return results;
    }
}
// Example usage
const text = "ABABDABACDABABCABAB";
const pattern = "ABABCABAB";

// Using the static method
console.log("Basic search:");
const results1 = BoyerMooreHorspool.search(text, pattern);
console.log("Pattern found at positions:", results1);

// Case insensitive search
console.log("\nCase insensitive search:");
const results2 = BoyerMooreHorspool.searchCaseInsensitive("Hello World", "world");
console.log("Pattern found at positions:", results2);

// Using optimized version for repeated searches
console.log("\nOptimized version:");
const searcher = new OptimizedBoyerMooreHorspool(pattern);
const results3 = searcher.search(text);
console.log("Pattern found at positions:", results3);

// Performance test
console.log("\nPerformance test:");
const longText = "A".repeat(1000000) + pattern + "B".repeat(1000000);
const startTime = performance.now();
const results4 = BoyerMooreHorspool.search(longText, pattern);
const endTime = performance.now();
console.log(`Found ${results4.length} matches in ${(endTime - startTime).toFixed(2)}ms`);
// Test function
function testBoyerMooreHorspool() {
    const testCases = [
        { text: "hello world", pattern: "world", expected: [6] },
        { text: "ababcababc", pattern: "abc", expected: [2, 7] },
        { text: "aaaaa", pattern: "aa", expected: [0, 1, 2, 3] },
        { text: "hello", pattern: "x", expected: [] },
        { text: "", pattern: "test", expected: [] },
        { text: "test", pattern: "", expected: [] },
    ];

    testCases.forEach((testCase, index) => {
        const result = BoyerMooreHorspool.search(testCase.text, testCase.pattern);
        const passed = JSON.stringify(result) === JSON.stringify(testCase.expected);
        
        console.log(`Test ${index + 1}: ${passed ? 'PASS' : 'FAIL'}`);
        if (!passed) {
            console.log(`  Expected: ${testCase.expected}`);
            console.log(`  Got: ${result}`);
        }
    });
}

// Run tests
testBoyerMooreHorspool();
