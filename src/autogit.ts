class BoyerMooreHorspool {
    private pattern: string;
    private badCharTable: Map<string, number>;
    
    constructor(pattern: string) {
        this.pattern = pattern;
        this.badCharTable = this.buildBadCharTable(pattern);
    }
    
    /**
     * Builds the bad character table (shift table)
     * The table stores how many positions we can skip when a mismatch occurs
     */
    private buildBadCharTable(pattern: string): Map<string, number> {
        const table = new Map<string, number>();
        const patternLength = pattern.length;
        
        // For all characters except the last one, store the distance from the end
        for (let i = 0; i < patternLength - 1; i++) {
            const char = pattern[i];
            const shift = patternLength - i - 1;
            table.set(char, shift);
        }
        
        return table;
    }
    
    /**
     * Search for the pattern in the given text
     * Returns the starting index of the first occurrence, or -1 if not found
     */
    search(text: string): number {
        const patternLength = this.pattern.length;
        const textLength = text.length;
        
        if (patternLength === 0 || textLength === 0 || patternLength > textLength) {
            return -1;
        }
        
        let i = 0; // Current position in text
        
        while (i <= textLength - patternLength) {
            let j = patternLength - 1; // Compare from right to left
            
            // Compare pattern with current window of text
            while (j >= 0 && this.pattern[j] === text[i + j]) {
                j--;
            }
            
            // If we matched all characters, pattern is found
            if (j < 0) {
                return i;
            }
            
            // Get the shift value for the mismatched character
            const mismatchedChar = text[i + patternLength - 1];
            const shift = this.badCharTable.get(mismatchedChar) || patternLength;
            
            i += shift;
        }
        
        return -1;
    }
    
    /**
     * Find all occurrences of the pattern in the text
     * Returns an array of starting indices
     */
    searchAll(text: string): number[] {
        const results: number[] = [];
        const patternLength = this.pattern.length;
        const textLength = text.length;
        
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
                i += 1; // Move one position for overlapping matches
            } else {
                const mismatchedChar = text[i + patternLength - 1];
                const shift = this.badCharTable.get(mismatchedChar) || patternLength;
                i += shift;
            }
        }
        
        return results;
    }
    
    /**
     * Returns the bad character table for inspection
     */
    getBadCharTable(): Map<string, number> {
        return new Map(this.badCharTable);
    }
}

// Example usage and testing
function demonstrateBoyerMooreHorspool() {
    // Example 1: Basic search
    const searcher1 = new BoyerMooreHorspool("abc");
    const text1 = "xyzabc123abc456";
    console.log("Search for 'abc' in:", text1);
    console.log("First occurrence at:", searcher1.search(text1)); // 3
    console.log("All occurrences:", searcher1.searchAll(text1)); // [3, 9]
    console.log("Bad char table:", Object.fromEntries(searcher1.getBadCharTable()));
    
    // Example 2: Pattern not found
    const searcher2 = new BoyerMooreHorspool("missing");
    const text2 = "this text doesn't contain the pattern";
    console.log("\nSearch for 'missing':", searcher2.search(text2)); // -1
    
    // Example 3: Single character pattern
    const searcher3 = new BoyerMooreHorspool("a");
    const text3 = "banana";
    console.log("\nSearch for 'a' in 'banana':", searcher3.searchAll(text3)); // [1, 3, 5]
    
    // Example 4: Performance comparison (informal)
    const longText = "x".repeat(1000000) + "needle" + "y".repeat(1000000);
    const pattern = "needle";
    
    console.time("Boyer-Moore-Horspool");
    const searcher4 = new BoyerMooreHorspool(pattern);
    const result = searcher4.search(longText);
    console.timeEnd("Boyer-Moore-Horspool");
    console.log("Found at position:", result);
}

// Alternative functional implementation (stateless)
function boyerMooreHorspoolSearch(text: string, pattern: string): number {
    if (pattern.length === 0 || text.length === 0 || pattern.length > text.length) {
        return -1;
    }
    
    // Build bad character table
    const badCharTable = new Map<string, number>();
    const patternLength = pattern.length;
    
    for (let i = 0; i < patternLength - 1; i++) {
        badCharTable.set(pattern[i], patternLength - i - 1);
    }
    
    // Search
    let i = 0;
    const textLength = text.length;
    
    while (i <= textLength - patternLength) {
        let j = patternLength - 1;
        
        while (j >= 0 && pattern[j] === text[i + j]) {
            j--;
        }
        
        if (j < 0) {
            return i;
        }
        
        const shift = badCharTable.get(text[i + patternLength - 1]) || patternLength;
        i += shift;
    }
    
    return -1;
}

// Run the demonstration
demonstrateBoyerMooreHorspool();
