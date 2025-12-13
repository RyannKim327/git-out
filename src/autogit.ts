interface SearchResult {
    index: number;
    pattern: string;
}

class BoyerMooreHorspool {
    /**
     * Preprocesses the pattern to create the bad-character shift table
     * @param pattern The pattern to search for
     * @returns A map containing the shift values for each character
     */
    private static preprocessPattern(pattern: string): Map<string, number> {
        const patternLength = pattern.length;
        const shiftTable = new Map<string, number>();
        
        // For all characters except the last one, set shift = patternLength - index - 1
        for (let i = 0; i < patternLength - 1; i++) {
            const char = pattern[i];
            shiftTable.set(char, patternLength - i - 1);
        }
        
        return shiftTable;
    }

    /**
     * Searches for all occurrences of pattern in text using Boyer-Moore-Horspool algorithm
     * @param text The text to search in
     * @param pattern The pattern to search for
     * @returns Array of search results with indices and matched patterns
     */
    static search(text: string, pattern: string): SearchResult[] {
        const results: SearchResult[] = [];
        const textLength = text.length;
        const patternLength = pattern.length;
        
        if (patternLength === 0 || textLength === 0 || patternLength > textLength) {
            return results;
        }

        const shiftTable = this.preprocessPattern(pattern);
        const defaultShift = patternLength;

        let i = 0;
        while (i <= textLength - patternLength) {
            let j = patternLength - 1;

            // Compare pattern from right to left
            while (j >= 0 && pattern[j] === text[i + j]) {
                j--;
            }

            if (j < 0) {
                // Pattern found
                results.push({
                    index: i,
                    pattern: text.substring(i, i + patternLength)
                });
                i += defaultShift;
            } else {
                // Get shift value for the mismatched character
                const mismatchedChar = text[i + patternLength - 1];
                const shift = shiftTable.get(mismatchedChar) || defaultShift;
                i += shift;
            }
        }

        return results;
    }

    /**
     * Searches for the first occurrence of pattern in text
     * @param text The text to search in
     * @param pattern The pattern to search for
     * @returns The index of first occurrence or -1 if not found
     */
    static searchFirst(text: string, pattern: string): number {
        const results = this.search(text, pattern);
        return results.length > 0 ? results[0].index : -1;
    }

    /**
     * Checks if pattern exists in text
     * @param text The text to search in
     * @param pattern The pattern to search for
     * @returns Boolean indicating if pattern was found
     */
    static contains(text: string, pattern: string): boolean {
        return this.searchFirst(text, pattern) !== -1;
    }
}

// Example usage and test cases
function testBoyerMooreHorspool() {
    const testCases = [
        {
            text: "ABABDABACDABABCABAB",
            pattern: "ABABCABAB",
            expected: [10]
        },
        {
            text: "hello world hello there",
            pattern: "hello",
            expected: [0, 12]
        },
        {
            text: "abcdefghijk",
            pattern: "xyz",
            expected: []
        },
        {
            text: "mississippi",
            pattern: "iss",
            expected: [1, 4]
        },
        {
            text: "aaaaaa",
            pattern: "aa",
            expected: [0, 1, 2, 3, 4]
        }
    ];

    console.log("Testing Boyer-Moore-Horspool Algorithm:\n");

    testCases.forEach((testCase, index) => {
        const results = BoyerMooreHorspool.search(testCase.text, testCase.pattern);
        const foundIndices = results.map(r => r.index);
        
        console.log(`Test ${index + 1}:`);
        console.log(`Text: "${testCase.text}"`);
        console.log(`Pattern: "${testCase.pattern}"`);
        console.log(`Expected indices: [${testCase.expected.join(', ')}]`);
        console.log(`Found indices: [${foundIndices.join(', ')}]`);
        console.log(`Pass: ${JSON.stringify(foundIndices) === JSON.stringify(testCase.expected)}`);
        console.log("---");
    });

    // Additional usage examples
    console.log("Additional Examples:");
    
    const text = "The quick brown fox jumps over the lazy dog";
    const pattern = "fox";
    
    console.log(`\nText: "${text}"`);
    console.log(`Pattern: "${pattern}"`);
    console.log(`First occurrence: ${BoyerMooreHorspool.searchFirst(text, pattern)}`);
    console.log(`Contains pattern: ${BoyerMooreHorspool.contains(text, pattern)}`);
    console.log(`All occurrences:`, BoyerMooreHorspool.search(text, pattern));
}

// Run the tests
testBoyerMooreHorspool();

// Export for use in other modules
export { BoyerMooreHorspool, SearchResult };
// Basic usage
const text = "hello world hello there";
const pattern = "hello";

// Find all occurrences
const allResults = BoyerMooreHorspool.search(text, pattern);
console.log(allResults); // [{index: 0, pattern: "hello"}, {index: 12, pattern: "hello"}]

// Find first occurrence
const firstIndex = BoyerMooreHorspool.searchFirst(text, pattern);
console.log(firstIndex); // 0

// Check if pattern exists
const containsPattern = BoyerMooreHorspool.contains(text, pattern);
console.log(containsPattern); // true
