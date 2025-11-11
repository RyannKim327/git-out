class BoyerMoore {
    private pattern: string;
    private badCharTable: Map<string, number>;
    private goodSuffixTable: number[];
    private suffixTable: number[];

    constructor(pattern: string) {
        this.pattern = pattern;
        this.badCharTable = new Map();
        this.goodSuffixTable = [];
        this.suffixTable = [];
        this.precomputeBadCharTable();
        this.precomputeGoodSuffixTable();
    }

    /**
     * Precomputes the bad character table
     * This table helps determine how far we can shift when a mismatch occurs
     */
    private precomputeBadCharTable(): void {
        const patternLength = this.pattern.length;
        
        for (let i = 0; i < patternLength - 1; i++) {
            this.badCharTable.set(this.pattern[i], patternLength - 1 - i);
        }
        
        // For characters not in pattern, shift the full pattern length
        // This is handled in the search logic
    }

    /**
     * Precomputes the good suffix table
     * This helps when we have a partial match at the end of the pattern
     */
    private precomputeGoodSuffixTable(): void {
        const patternLength = this.pattern.length;
        this.goodSuffixTable = new Array(patternLength).fill(0);
        this.suffixTable = new Array(patternLength).fill(0);
        
        this.buildSuffixTable();
        this.buildGoodSuffixShift();
    }

    private buildSuffixTable(): void {
        const patternLength = this.pattern.length;
        
        for (let i = patternLength - 1; i >= 0; i--) {
            let len = 0;
            while (
                i - len >= 0 && 
                this.pattern[patternLength - 1 - len] === this.pattern[i - len]
            ) {
                len++;
            }
            this.suffixTable[i] = len;
        }
    }

    private buildGoodSuffixShift(): void {
        const patternLength = this.pattern.length;
        
        // Case 1: The matching suffix occurs somewhere else in the pattern
        for (let i = 0; i < patternLength; i++) {
            this.goodSuffixTable[i] = patternLength;
        }
        
        // Case 2: Only a part of the matching suffix occurs at the beginning
        for (let i = patternLength - 1; i >= 0; i--) {
            if (this.suffixTable[i] === i + 1) {
                for (let j = 0; j < patternLength - 1 - i; j++) {
                    if (this.goodSuffixTable[j] === patternLength) {
                        this.goodSuffixTable[j] = patternLength - 1 - i;
                    }
                }
            }
        }
        
        // Case 1 (continued): Use the suffix table for shifts
        for (let i = 0; i <= patternLength - 2; i++) {
            this.goodSuffixTable[patternLength - 1 - this.suffixTable[i]] = patternLength - 1 - i;
        }
    }

    /**
     * Searches for the pattern in the given text
     * @param text The text to search in
     * @returns Array of starting indices where pattern is found
     */
    search(text: string): number[] {
        const results: number[] = [];
        const patternLength = this.pattern.length;
        const textLength = text.length;
        
        if (patternLength === 0 || textLength === 0 || patternLength > textLength) {
            return results;
        }

        let i = 0; // Current position in text
        while (i <= textLength - patternLength) {
            let j = patternLength - 1; // Current position in pattern
            
            // Compare from right to left
            while (j >= 0 && this.pattern[j] === text[i + j]) {
                j--;
            }
            
            if (j < 0) {
                // Pattern found
                results.push(i);
                i += this.goodSuffixTable[0] || 1;
            } else {
                // Mismatch occurred, calculate the shift
                const badCharShift = this.badCharTable.get(text[i + j]) || patternLength;
                const goodSuffixShift = this.goodSuffixTable[j];
                
                // Use the maximum shift from both heuristics
                i += Math.max(badCharShift, goodSuffixShift);
            }
        }
        
        return results;
    }

    /**
     * Simple search method that returns the first occurrence
     * @param text The text to search in
     * @returns The first index where pattern is found, or -1 if not found
     */
    searchFirst(text: string): number {
        const results = this.search(text);
        return results.length > 0 ? results[0] : -1;
    }

    /**
     * Checks if the pattern exists in the text
     * @param text The text to search in
     * @returns True if pattern is found, false otherwise
     */
    contains(text: string): boolean {
        return this.searchFirst(text) !== -1;
    }
}

// Usage examples and tests
function demonstrateBoyerMoore(): void {
    console.log("Boyer-Moore Algorithm Demo");
    console.log("==========================");
    
    // Test 1: Basic search
    const pattern1 = "EXAMPLE";
    const text1 = "THIS IS A SIMPLE EXAMPLE TEXT WITH EXAMPLE PATTERN";
    const bm1 = new BoyerMoore(pattern1);
    console.log(`Pattern: "${pattern1}"`);
    console.log(`Text: "${text1}"`);
    console.log(`Results: [${bm1.search(text1)}]`); // [17, 29]
    console.log(`First occurrence: ${bm1.searchFirst(text1)}`); // 17
    console.log(`Contains pattern: ${bm1.contains(text1)}`); // true
    console.log();
    
    // Test 2: Pattern not found
    const pattern2 = "NOPE";
    const bm2 = new BoyerMoore(pattern2);
    console.log(`Pattern: "${pattern2}"`);
    console.log(`Text: "${text1}"`);
    console.log(`Results: [${bm2.search(text1)}]`); // []
    console.log(`Contains pattern: ${bm2.contains(text1)}`); // false
    console.log();
    
    // Test 3: Multiple occurrences
    const pattern3 = "ab";
    const text3 = "ababababab";
    const bm3 = new BoyerMoore(pattern3);
    console.log(`Pattern: "${pattern3}"`);
    console.log(`Text: "${text3}"`);
    console.log(`Results: [${bm3.search(text3)}]`); // [0, 2, 4, 6, 8]
    console.log();
    
    // Test 4: Single character pattern
    const pattern4 = "a";
    const text4 = "banana";
    const bm4 = new BoyerMoore(pattern4);
    console.log(`Pattern: "${pattern4}"`);
    console.log(`Text: "${text4}"`);
    console.log(`Results: [${bm4.search(text4)}]`); // [1, 3, 5]
    console.log();
    
    // Performance test
    console.log("Performance comparison with naive search:");
    const longText = "A".repeat(1000000) + "NEEDLE" + "B".repeat(1000000);
    const needle = "NEEDLE";
    
    // Boyer-Moore
    const bm5 = new BoyerMoore(needle);
    const startBM = performance.now();
    const bmResult = bm5.searchFirst(longText);
    const endBM = performance.now();
    
    // Naive search for comparison
    const startNaive = performance.now();
    const naiveResult = naiveSearch(longText, needle);
    const endNaive = performance.now();
    
    console.log(`Boyer-Moore: ${(endBM - startBM).toFixed(2)}ms, found at: ${bmResult}`);
    console.log(`Naive search: ${(endNaive - startNaive).toFixed(2)}ms, found at: ${naiveResult}`);
}

// Helper function for naive search comparison
function naiveSearch(text: string, pattern: string): number {
    const textLength = text.length;
    const patternLength = pattern.length;
    
    for (let i = 0; i <= textLength - patternLength; i++) {
        let j = 0;
        while (j < patternLength && text[i + j] === pattern[j]) {
            j++;
        }
        if (j === patternLength) {
            return i;
        }
    }
    return -1;
}

// Additional utility class for convenience
class StringSearcher {
    static search(text: string, pattern: string): number[] {
        const bm = new BoyerMoore(pattern);
        return bm.search(text);
    }
    
    static searchFirst(text: string, pattern: string): number {
        const bm = new BoyerMoore(pattern);
        return bm.searchFirst(text);
    }
    
    static contains(text: string, pattern: string): boolean {
        const bm = new BoyerMoore(pattern);
        return bm.contains(text);
    }
}

// Run the demonstration
demonstrateBoyerMoore();

// Export the classes
export { BoyerMoore, StringSearcher };
// Method 1: Create instance
const searcher = new BoyerMoore("pattern");
const results = searcher.search("text containing pattern");

// Method 2: Use static utility
const positions = StringSearcher.search("hello world", "world");

// Check if pattern exists
if (StringSearcher.contains("some text", "pattern")) {
    console.log("Pattern found!");
}
