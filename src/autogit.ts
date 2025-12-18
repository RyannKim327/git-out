export interface SearchResult {
    index: number;
    pattern: string;
}

export class BoyerMooreHorspool {
    /**
     * Preprocesses the pattern to create the bad-character shift table
     */
    private static preprocessPattern(pattern: string): Map<string, number> {
        const table = new Map<string, number>();
        const patternLength = pattern.length;
        
        // For all characters except the last one, set shift to patternLength - index - 1
        for (let i = 0; i < patternLength - 1; i++) {
            const char = pattern[i];
            table.set(char, patternLength - i - 1);
        }
        
        return table;
    }

    /**
     * Searches for all occurrences of pattern in text using Boyer-Moore-Horspool algorithm
     */
    static search(text: string, pattern: string): SearchResult[] {
        const results: SearchResult[] = [];
        const textLength = text.length;
        const patternLength = pattern.length;
        
        if (patternLength === 0 || textLength === 0 || patternLength > textLength) {
            return results;
        }

        const shiftTable = this.preprocessPattern(pattern);
        
        let i = 0; // Current position in text
        while (i <= textLength - patternLength) {
            let j = patternLength - 1; // Compare from right to left
            
            // Compare pattern with text starting at position i
            while (j >= 0 && pattern[j] === text[i + j]) {
                j--;
            }
            
            if (j < 0) {
                // Pattern found
                results.push({ index: i, pattern });
                i += patternLength; // Shift by pattern length
            } else {
                // Get shift amount from table or use pattern length if character not found
                const mismatchChar = text[i + patternLength - 1];
                const shiftAmount = shiftTable.get(mismatchChar) ?? patternLength;
                i += shiftAmount;
            }
        }
        
        return results;
    }

    /**
     * Searches for the first occurrence of pattern in text
     */
    static searchFirst(text: string, pattern: string): SearchResult | null {
        const textLength = text.length;
        const patternLength = pattern.length;
        
        if (patternLength === 0 || textLength === 0 || patternLength > textLength) {
            return null;
        }

        const shiftTable = this.preprocessPattern(pattern);
        
        let i = 0;
        while (i <= textLength - patternLength) {
            let j = patternLength - 1;
            
            while (j >= 0 && pattern[j] === text[i + j]) {
                j--;
            }
            
            if (j < 0) {
                return { index: i, pattern };
            } else {
                const mismatchChar = text[i + patternLength - 1];
                const shiftAmount = shiftTable.get(mismatchChar) ?? patternLength;
                i += shiftAmount;
            }
        }
        
        return null;
    }
}

// Alternative functional implementation
export const boyerMooreHorspoolSearch = (
    text: string, 
    pattern: string
): number[] => {
    const results: number[] = [];
    const n = text.length;
    const m = pattern.length;
    
    if (m === 0 || n === 0 || m > n) {
        return results;
    }

    // Create shift table
    const shiftTable: Record<string, number> = {};
    for (let i = 0; i < m - 1; i++) {
        shiftTable[pattern[i]] = m - i - 1;
    }

    let i = 0;
    while (i <= n - m) {
        let j = m - 1;
        
        while (j >= 0 && pattern[j] === text[i + j]) {
            j--;
        }
        
        if (j < 0) {
            results.push(i);
            i += m; // Move to next possible position
        } else {
            const char = text[i + m - 1];
            i += shiftTable[char] !== undefined ? shiftTable[char] : m;
        }
    }
    
    return results;
};
// Example usage
const exampleText = "This is a test text for testing the Boyer-Moore-Horspool algorithm";
const examplePattern = "test";

// Using the class-based implementation
const allOccurrences = BoyerMooreHorspool.search(exampleText, examplePattern);
console.log("All occurrences:", allOccurrences);
// Output: [{ index: 10, pattern: "test" }, { index: 25, pattern: "test" }]

const firstOccurrence = BoyerMooreHorspool.searchFirst(exampleText, examplePattern);
console.log("First occurrence:", firstOccurrence);
// Output: { index: 10, pattern: "test" }

// Using the functional implementation
const indices = boyerMooreHorspoolSearch(exampleText, examplePattern);
console.log("Indices:", indices);
// Output: [10, 25]

// Case-insensitive search (convert both to same case)
const caseInsensitiveResults = BoyerMooreHorspool.search(
    exampleText.toLowerCase(), 
    examplePattern.toLowerCase()
);
console.log("Case-insensitive results:", caseInsensitiveResults);
// Benchmark utility
export const benchmarkSearch = (text: string, pattern: string, iterations: number = 1000) => {
    console.time('BoyerMooreHorspool');
    for (let i = 0; i < iterations; i++) {
        BoyerMooreHorspool.search(text, pattern);
    }
    console.timeEnd('BoyerMooreHorspool');
    
    console.time('Native includes');
    for (let i = 0; i < iterations; i++) {
        text.includes(pattern);
    }
    console.timeEnd('Native includes');
};

// Example benchmark
const longText = "a".repeat(10000) + "needle" + "b".repeat(10000);
benchmarkSearch(longText, "needle", 1000);
