/**
 * Boyer-Moore-Horspool string search algorithm
 * Finds all occurrences of pattern in text using a bad character heuristic
 * 
 * @param text The text to search in
 * @param pattern The pattern to search for
 * @returns Array of starting indices where pattern is found
 */
function boyerMooreHorspool(text: string, pattern: string): number[] {
    const results: number[] = [];
    const n = text.length;
    const m = pattern.length;
    
    // Handle edge cases
    if (m === 0) return [];
    if (n < m) return [];
    
    // Build bad character table
    const badCharTable: { [key: string]: number } = {};
    
    // Initialize all characters to -1 (not found)
    // For simplicity, we'll use a Map or handle common characters
    // In practice, you might want to limit to ASCII or specific charset
    for (let i = 0; i < m - 1; i++) {
        badCharTable[pattern[i]] = i;
    }
    
    // Search
    let i = 0;
    while (i <= n - m) {
        let j = m - 1;
        
        // Compare characters from right to left
        while (j >= 0 && pattern[j] === text[i + j]) {
            j--;
        }
        
        if (j < 0) {
            // Match found
            results.push(i);
            // Move past the pattern (no good suffix heuristic in basic BMH)
            i += m;
        } else {
            // Mismatch - use bad character rule
            const char = text[i + j];
            const lastOccurrence = badCharTable[char] || -1;
            const shift = Math.max(1, j - lastOccurrence);
            i += shift;
        }
    }
    
    return results;
}

/**
 * Alternative implementation with more explicit bad character handling
 * This version handles any character set more explicitly
 */
function boyerMooreHorspoolExtended(text: string, pattern: string): number[] {
    const results: number[] = [];
    const n = text.length;
    const m = pattern.length;
    
    if (m === 0) return [];
    if (n < m) return [];
    
    // Create bad character table with maximum shift
    const badCharTable = new Map<string, number>();
    const maxChar = Math.max(...Array.from(new Set([...text, ...pattern])).map(c => c.charCodeAt(0)));
    
    // Initialize all possible shifts to m (skip entire pattern)
    for (let i = 0; i <= maxChar; i++) {
        badCharTable.set(String.fromCharCode(i), m);
    }
    
    // Set actual positions for pattern characters
    for (let i = 0; i < m - 1; i++) {
        badCharTable.set(pattern[i], m - 1 - i);
    }
    
    let i = 0;
    while (i <= n - m) {
        let j = m - 1;
        
        // Compare from right to left
        while (j >= 0 && pattern[j] === text[i + j]) {
            j--;
        }
        
        if (j < 0) {
            results.push(i);
            i += badCharTable.get(pattern[m - 1]) || m;
        } else {
            const shift = badCharTable.get(text[i + j]) || m;
            i += shift;
        }
    }
    
    return results;
}

// Usage example and tests
function demonstrateBoyerMooreHorspool() {
    const text = "Here is a sample text containing the word pattern multiple times in this sample text.";
    const pattern = "sample";
    
    console.log("Text:", text);
    console.log("Pattern:", pattern);
    
    const positions = boyerMooreHorspool(text, pattern);
    console.log("Found at positions:", positions);
    
    // Verify results
    positions.forEach(pos => {
        console.log(`Match at ${pos}: "${text.substring(pos, pos + pattern.length)}"`);
    });
    
    // Test edge cases
    console.log("\nEdge cases:");
    console.log("Empty pattern:", boyerMooreHorspool("test", ""));
    console.log("Pattern longer than text:", boyerMooreHorspool("short", "longerpattern"));
    console.log("No matches:", boyerMooreHorspool("abcde", "xyz"));
    console.log("Exact match:", boyerMooreHorspool("hello", "hello"));
    console.log("Multiple overlapping matches:", boyerMooreHorspool("aaa", "aa"));
}

// TypeScript interface for a more robust implementation
interface StringSearchResult {
    position: number;
    match: string;
}

class BoyerMooreHorspoolSearcher {
    private badCharTable: Map<string, number>;
    private patternLength: number;
    private pattern: string;
    
    constructor(pattern: string) {
        this.pattern = pattern;
        this.patternLength = pattern.length;
        this.badCharTable = this.buildBadCharTable();
    }
    
    private buildBadCharTable(): Map<string, number> {
        const table = new Map<string, number>();
        const m = this.patternLength;
        
        // Default shift is pattern length
        // For simplicity, we'll only track pattern characters
        for (let i = 0; i < m - 1; i++) {
            table.set(this.pattern[i], m - 1 - i);
        }
        
        return table;
    }
    
    search(text: string): StringSearchResult[] {
        const results: StringSearchResult[] = [];
        const n = text.length;
        const m = this.patternLength;
        
        if (m === 0 || n < m) return results;
        
        let i = 0;
        while (i <= n - m) {
            let j = m - 1;
            
            // Compare from right to left
            while (j >= 0 && this.pattern[j] === text[i + j]) {
                j--;
            }
            
            if (j < 0) {
                results.push({
                    position: i,
                    match: text.substring(i, i + m)
                });
                // For basic BMH, shift by 1 or use table value for last char
                const shift = this.badCharTable.get(this.pattern[m - 1]) || 1;
                i += Math.max(1, shift);
            } else {
                const shift = this.badCharTable.get(text[i + j]) || m;
                i += Math.max(1, shift);
            }
        }
        
        return results;
    }
    
    // Get all occurrences as array of positions
    getPositions(text: string): number[] {
        return this.search(text).map(result => result.position);
    }
}

// Example usage of the class
function demonstrateClassUsage() {
    const searcher = new BoyerMooreHorspoolSearcher("pattern");
    const text = "This text has a pattern and another pattern here.";
    
    const results = searcher.search(text);
    console.log("Class-based search results:");
    results.forEach(result => {
        console.log(`Found "${result.match}" at position ${result.position}`);
    });
}

// Performance comparison
function performanceTest() {
    const longText = "a".repeat(1000000) + "pattern" + "a".repeat(500000) + "pattern";
    const pattern = "pattern";
    
    console.time("Boyer-Moore-Horspool");
    const positions1 = boyerMooreHorspool(longText, pattern);
    console.timeEnd("Boyer-Moore-Horspool");
    
    console.time("Native indexOf");
    const positions2 = [];
    let index = -1;
    while ((index = longText.indexOf(pattern, index + 1)) !== -1) {
        positions2.push(index);
    }
    console.timeEnd("Native indexOf");
    
    console.log("BMH found:", positions1.length, "matches");
    console.log("indexOf found:", positions2.length, "matches");
    console.log("Results match:", JSON.stringify(positions1) === JSON.stringify(positions2));
}

// Run demonstrations
if (require.main === module) {
    demonstrateBoyerMooreHorspool();
    demonstrateClassUsage();
    performanceTest();
}

export { boyerMooreHorspool, boyerMooreHorspoolExtended, BoyerMooreHorspoolSearcher };
// Simple usage
const positions = boyerMooreHorspool("hello world hello", "hello");
console.log(positions); // [0, 11]

// Using the class
const searcher = new BoyerMooreHorspoolSearcher("pattern");
const results = searcher.search("text with pattern here");
results.forEach(r => console.log(`${r.position}: ${r.match}`));
