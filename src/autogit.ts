/**
 * Boyer-Moore string searching algorithm implementation
 * Finds the first occurrence of pattern in text
 * 
 * @param text - The text to search in
 * @param pattern - The pattern to search for
 * @returns Index of the first occurrence or -1 if not found
 */
function boyerMoore(text: string, pattern: string): number {
    const n = text.length;
    const m = pattern.length;
    
    // Handle edge cases
    if (m === 0) return 0;
    if (n < m) return -1;
    
    // Preprocess: Build bad character heuristic table
    const badCharTable = buildBadCharTable(pattern);
    
    // Preprocess: Build good suffix table (simplified version)
    const goodSuffixTable = buildGoodSuffixTable(pattern);
    
    let s = 0; // Starting position in text
    
    while (s <= n - m) {
        let j = m - 1; // Position in pattern (start from end)
        
        // Compare from end of pattern
        while (j >= 0 && pattern[j] === text[s + j]) {
            j--;
        }
        
        // If we found a match
        if (j < 0) {
            return s; // Pattern found at position s
        }
        
        // Calculate shift using both heuristics
        const badCharShift = j >= 0 ? Math.max(1, j - badCharTable[text.charCodeAt(s + j)]) : 1;
        const goodSuffixShift = goodSuffixTable[j + 1];
        s += Math.max(badCharShift, goodSuffixShift);
    }
    
    return -1; // Pattern not found
}

/**
 * Builds the bad character heuristic table
 * For each character in pattern, stores the rightmost occurrence
 * 
 * @param pattern - The pattern to preprocess
 * @returns Table where table[c] = rightmost position of character c in pattern, or -1
 */
function buildBadCharTable(pattern: string): number[] {
    const m = pattern.length;
    const table: number[] = new Array(256).fill(-1); // ASCII table
    
    // Fill table with rightmost occurrences
    for (let i = 0; i < m; i++) {
        table[pattern.charCodeAt(i)] = i;
    }
    
    return table;
}

/**
 * Builds the good suffix heuristic table (simplified version)
 * For each suffix, stores how far to shift when it matches
 * 
 * @param pattern - The pattern to preprocess
 * @returns Table where table[i] = shift distance for suffix starting at i
 */
function buildGoodSuffixTable(pattern: string): number[] {
    const m = pattern.length;
    const table = new Array(m).fill(0);
    const border = new Array(m).fill(-1);
    
    // Find the longest proper prefix that is also a suffix
    let k = 0;
    for (let j = 1; j < m; j++) {
        if (pattern[j] === pattern[k]) {
            border[j] = k;
            k++;
        } else {
            if (k > 0) {
                k = border[k - 1] + 1;
                j--; // Retry this position
            } else {
                border[j] = -1;
            }
        }
    }
    
    // Build the good suffix table
    for (let i = 0; i < m; i++) {
        table[i] = m;
    }
    
    // Set shifts for proper suffixes
    k = m - 1;
    for (let j = m - 1; j >= 0; j--) {
        if (border[j] === -1) {
            k = j;
        }
        if (j === k) {
            table[j] = m - 1 - k;
            k = border[k];
        }
    }
    
    return table;
}

/**
 * Find all occurrences of pattern in text using Boyer-Moore
 * 
 * @param text - The text to search in
 * @param pattern - The pattern to search for
 * @returns Array of indices where pattern occurs
 */
function boyerMooreAll(text: string, pattern: string): number[] {
    const n = text.length;
    const m = pattern.length;
    const results: number[] = [];
    
    if (m === 0 || n < m) return results;
    
    const badCharTable = buildBadCharTable(pattern);
    const goodSuffixTable = buildGoodSuffixTable(pattern);
    
    let s = 0;
    
    while (s <= n - m) {
        let j = m - 1;
        
        while (j >= 0 && pattern[j] === text[s + j]) {
            j--;
        }
        
        if (j < 0) {
            results.push(s);
            // Continue searching after the match
            s += Math.max(1, goodSuffixTable[0]);
        } else {
            const badCharShift = j >= 0 ? Math.max(1, j - badCharTable[text.charCodeAt(s + j)]) : 1;
            const goodSuffixShift = goodSuffixTable[j + 1];
            s += Math.max(badCharShift, goodSuffixShift);
        }
    }
    
    return results;
}

// Example usage and tests
function demonstrateBoyerMoore(): void {
    const text = "Here is a simple example of string searching with the Boyer-Moore algorithm";
    const pattern = "Boyer-Moore";
    
    console.log(`Text: ${text}`);
    console.log(`Pattern: ${pattern}`);
    
    // Find first occurrence
    const firstMatch = boyerMoore(text, pattern);
    console.log(`First match at index: ${firstMatch}`);
    
    // Find all occurrences
    const allMatches = boyerMooreAll(text, pattern);
    console.log(`All matches at indices: ${allMatches}`);
    
    // Test with non-existent pattern
    const noMatch = boyerMoore(text, "nonexistentpattern");
    console.log(`Non-existent pattern at: ${noMatch}`);
    
    // Performance test with large text
    const largeText = "a".repeat(1000000) + "pattern" + "a".repeat(1000000);
    const largePattern = "pattern";
    console.time("Boyer-Moore large text");
    const largeResult = boyerMoore(largeText, largePattern);
    console.timeEnd("Boyer-Moore large text");
    console.log(`Large text result: ${largeResult}`);
}

// Utility class for easier usage
class BoyerMooreSearcher {
    private badCharTable: number[];
    private goodSuffixTable: number[];
    private pattern: string;
    
    constructor(pattern: string) {
        this.pattern = pattern;
        this.badCharTable = buildBadCharTable(pattern);
        this.goodSuffixTable = buildGoodSuffixTable(pattern);
    }
    
    /**
     * Search for the pattern in text
     */
    search(text: string): number {
        return this._search(text, false);
    }
    
    /**
     * Find all occurrences of the pattern in text
     */
    searchAll(text: string): number[] {
        return this._search(text, true);
    }
    
    private _search(text: string, all: boolean = false): number | number[] {
        const n = text.length;
        const m = this.pattern.length;
        const results: number[] = [];
        
        if (m === 0) return all ? results : 0;
        if (n < m) return all ? results : -1;
        
        let s = 0;
        
        while (s <= n - m) {
            let j = m - 1;
            
            while (j >= 0 && this.pattern[j] === text[s + j]) {
                j--;
            }
            
            if (j < 0) {
                results.push(s);
                if (!all) return s;
                s += Math.max(1, this.goodSuffixTable[0]);
            } else {
                const badCharShift = j >= 0 ? 
                    Math.max(1, j - this.badCharTable[text.charCodeAt(s + j)]) : 1;
                const goodSuffixShift = this.goodSuffixTable[j + 1];
                s += Math.max(badCharShift, goodSuffixShift);
            }
        }
        
        return all ? results : -1;
    }
}

// Usage example with the class
function demonstrateClassUsage(): void {
    const searcher = new BoyerMooreSearcher("algorithm");
    const text = "This is an algorithm implementation using the Boyer-Moore algorithm";
    
    console.log(`Class search result: ${searcher.search(text)}`);
    console.log(`Class search all results: ${searcher.searchAll(text)}`);
}

// Run demonstrations
if (require.main === module) {
    demonstrateBoyerMoore();
    demonstrateClassUsage();
}

export { boyerMoore, boyerMooreAll, BoyerMooreSearcher, buildBadCharTable, buildGoodSuffixTable };
const text = "This algorithm is great for string searching";
const pattern = "algorithm";

// Basic usage
const position = boyerMoore(text, pattern);
console.log(`Found at: ${position}`); // Output: 5

// Find all occurrences
const allPositions = boyerMooreAll(text, pattern);
console.log(`All positions: ${allPositions}`); // Output: [5]

// Using the class for multiple searches
const searcher = new BoyerMooreSearcher(pattern);
const result1 = searcher.search(text);
const result2 = searcher.search("Another algorithm example");
