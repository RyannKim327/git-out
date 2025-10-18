class KMP {
    /**
     * Preprocesses the pattern to create the longest prefix suffix (LPS) array
     * @param pattern - The pattern to preprocess
     * @returns The LPS array
     */
    private static buildLPS(pattern: string): number[] {
        const lps: number[] = new Array(pattern.length).fill(0);
        let length = 0; // Length of the previous longest prefix suffix
        let i = 1;
        
        while (i < pattern.length) {
            if (pattern[i] === pattern[length]) {
                length++;
                lps[i] = length;
                i++;
            } else {
                if (length !== 0) {
                    length = lps[length - 1];
                } else {
                    lps[i] = 0;
                    i++;
                }
            }
        }
        
        return lps;
    }

    /**
     * Searches for all occurrences of pattern in text using KMP algorithm
     * @param text - The text to search in
     * @param pattern - The pattern to search for
     * @returns Array of starting indices where pattern is found
     */
    static search(text: string, pattern: string): number[] {
        if (pattern.length === 0) return [];
        
        const lps = KMP.buildLPS(pattern);
        const result: number[] = [];
        let i = 0; // Index for text
        let j = 0; // Index for pattern
        
        while (i < text.length) {
            if (pattern[j] === text[i]) {
                i++;
                j++;
            }
            
            if (j === pattern.length) {
                result.push(i - j);
                j = lps[j - 1];
            } else if (i < text.length && pattern[j] !== text[i]) {
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
     * Checks if pattern exists in text using KMP algorithm
     * @param text - The text to search in
     * @param pattern - The pattern to search for
     * @returns True if pattern is found, false otherwise
     */
    static contains(text: string, pattern: string): boolean {
        return KMP.search(text, pattern).length > 0;
    }

    /**
     * Finds the first occurrence of pattern in text
     * @param text - The text to search in
     * @param pattern - The pattern to search for
     * @returns Starting index of first occurrence, or -1 if not found
     */
    static firstOccurrence(text: string, pattern: string): number {
        const result = KMP.search(text, pattern);
        return result.length > 0 ? result[0] : -1;
    }
}

// Example usage and test cases
function testKMP() {
    // Test cases
    const testCases = [
        { text: "ABABDABACDABABCABAB", pattern: "ABABCABAB", expected: [10] },
        { text: "hello world", pattern: "world", expected: [6] },
        { text: "aaaaaa", pattern: "aa", expected: [0, 1, 2, 3, 4] },
        { text: "abc", pattern: "d", expected: [] },
        { text: "", pattern: "test", expected: [] },
        { text: "test", pattern: "", expected: [] },
    ];

    // Run tests
    testCases.forEach(({ text, pattern, expected }, index) => {
        const result = KMP.search(text, pattern);
        const passed = JSON.stringify(result) === JSON.stringify(expected);
        
        console.log(`Test ${index + 1}: ${passed ? 'PASS' : 'FAIL'}`);
        console.log(`  Text: "${text}", Pattern: "${pattern}"`);
        console.log(`  Expected: [${expected.join(', ')}]`);
        console.log(`  Got: [${result.join(', ')}]`);
        console.log('---');
    });

    // Additional functionality examples
    console.log('Contains check:', KMP.contains("hello world", "world")); // true
    console.log('First occurrence:', KMP.firstOccurrence("hello world", "world")); // 6
}

// Run the tests
testKMP();
// Basic search
const positions = KMP.search("hello world", "world");
console.log(positions); // [6]

// Check if pattern exists
const exists = KMP.contains("hello world", "world"); // true

// Find first occurrence
const firstIndex = KMP.firstOccurrence("hello world", "world"); // 6
