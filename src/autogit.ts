class HorspoolSearch {
    
    /**
     * Preprocess the pattern to create the bad character table
     * The table contains the shift distance for each character in the alphabet
     */
    private buildBadCharTable(pattern: string): Map<string, number> {
        const table = new Map<string, number>();
        const patternLength = pattern.length;
        
        // For characters not in the pattern, shift by pattern length
        // For characters in the pattern (except last), shift by distance from end
        for (let i = 0; i < patternLength - 1; i++) {
            const char = pattern[i];
            const shift = patternLength - i - 1;
            table.set(char, shift);
        }
        
        return table;
    }
    
    /**
     * Search for pattern in text using Boyer-Moore-Horspool algorithm
     * Returns an array of indices where the pattern is found
     */
    public search(text: string, pattern: string): number[] {
        const textLength = text.length;
        const patternLength = pattern.length;
        const results: number[] = [];
        
        // Edge cases
        if (patternLength === 0) {
            return results;
        }
        
        if (patternLength > textLength) {
            return results;
        }
        
        // Build the bad character table
        const badCharTable = this.buildBadCharTable(pattern);
        
        let i = 0; // Current position in text
        
        while (i <= textLength - patternLength) {
            let j = patternLength - 1; // Compare from end of pattern
            
            // Compare pattern with current text window from right to left
            while (j >= 0 && pattern[j] === text[i + j]) {
                j--;
            }
            
            if (j < 0) {
                // Pattern found
                results.push(i);
                i++; // Move to next position
            } else {
                // Mismatch found, calculate shift using bad character table
                const mismatchChar = text[i + patternLength - 1];
                const shift = badCharTable.get(mismatchChar) || patternLength;
                i += shift;
            }
        }
        
        return results;
    }
    
    /**
     * Search for all occurrences of pattern in text (case-insensitive)
     */
    public searchCaseInsensitive(text: string, pattern: string): number[] {
        return this.search(text.toLowerCase(), pattern.toLowerCase());
    }
    
    /**
     * Check if pattern exists in text
     */
    public contains(text: string, pattern: string): boolean {
        return this.search(text, pattern).length > 0;
    }
    
    /**
     * Find first occurrence of pattern in text
     */
    public findFirst(text: string, pattern: string): number {
        const result = this.search(text, pattern);
        return result.length > 0 ? result[0] : -1;
    }
}

// Usage examples and testing
function demonstrateHorspool() {
    const searcher = new HorspoolSearch();
    
    const text = "This is a sample text for testing the Horspool algorithm";
    const pattern = "test";
    
    console.log("Text:", text);
    console.log("Pattern:", pattern);
    
    // Basic search
    const indices = searcher.search(text, pattern);
    console.log("Found at indices:", indices);
    
    // Case insensitive search
    const caseInsensitiveIndices = searcher.searchCaseInsensitive(text, "HORSPOOL");
    console.log("Case insensitive search:", caseInsensitiveIndices);
    
    // Check if pattern exists
    const exists = searcher.contains(text, "algorithm");
    console.log("Pattern 'algorithm' exists:", exists);
    
    // Find first occurrence
    const firstIndex = searcher.findFirst(text, "is");
    console.log("First occurrence of 'is':", firstIndex);
    
    // Additional test cases
    console.log("\n--- Additional Test Cases ---");
    
    const testCases = [
        { text: "ABABABAB", pattern: "ABAB", expected: [0, 2, 4] },
        { text: "ABCDEFG", pattern: "XYZ", expected: [] },
        { text: "aaa", pattern: "a", expected: [0, 1, 2] },
        { text: "", pattern: "test", expected: [] },
        { text: "test", pattern: "", expected: [] }
    ];
    
    for (const testCase of testCases) {
        const result = searcher.search(testCase.text, testCase.pattern);
        console.log(`Text: "${testCase.text}", Pattern: "${testCase.pattern}"`);
        console.log(`Result: [${result}], Expected: [${testCase.expected}], Pass: ${JSON.stringify(result) === JSON.stringify(testCase.expected)}`);
    }
}

// Run demonstration
demonstrateHorspool();
/**
 * Functional implementation of Boyer-Moore-Horspool algorithm
 */
function horspoolSearch(text: string, pattern: string): number[] {
    const textLen = text.length;
    const patternLen = pattern.length;
    const results: number[] = [];
    
    if (patternLen === 0 || patternLen > textLen) {
        return results;
    }
    
    // Build bad character table
    const badCharTable: Record<string, number> = {};
    for (let i = 0; i < patternLen - 1; i++) {
        badCharTable[pattern[i]] = patternLen - i - 1;
    }
    
    let i = 0;
    while (i <= textLen - patternLen) {
        let j = patternLen - 1;
        
        while (j >= 0 && pattern[j] === text[i + j]) {
            j--;
        }
        
        if (j < 0) {
            results.push(i);
            i++;
        } else {
            const shift = badCharTable[text[i + patternLen - 1]] || patternLen;
            i += shift;
        }
    }
    
    return results;
}

// Example usage of functional version
const text = "hello world, welcome to typescript world";
const pattern = "world";
console.log("Functional version:");
console.log("Found at:", horspoolSearch(text, pattern));
