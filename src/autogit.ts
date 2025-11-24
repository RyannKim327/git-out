interface HorspoolResult {
    index: number;
    found: boolean;
}

class BoyerMooreHorspool {
    /**
     * Preprocesses the pattern to create a bad character shift table
     */
    private static preprocessPattern(pattern: string): Map<string, number> {
        const table = new Map<string, number>();
        const patternLength = pattern.length;
        
        // For all characters except the last one, set shift = patternLength - index - 1
        for (let i = 0; i < patternLength - 1; i++) {
            table.set(pattern[i], patternLength - i - 1);
        }
        
        // For characters not in the pattern, set shift = patternLength
        // This is handled implicitly by checking the table
        
        return table;
    }

    /**
     * Searches for pattern in text using Boyer-Moore-Horspool algorithm
     */
    static search(text: string, pattern: string): HorspoolResult[] {
        const results: HorspoolResult[] = [];
        const textLength = text.length;
        const patternLength = pattern.length;
        
        if (patternLength === 0 || textLength < patternLength) {
            return results;
        }

        // Preprocess the pattern to create shift table
        const shiftTable = this.preprocessPattern(pattern);
        
        let i = 0;
        while (i <= textLength - patternLength) {
            let j = patternLength - 1;
            
            // Compare from right to left
            while (j >= 0 && pattern[j] === text[i + j]) {
                j--;
            }
            
            if (j < 0) {
                // Pattern found
                results.push({ index: i, found: true });
                i += patternLength; // Move to next possible position
            } else {
                // Use shift table to determine how far to shift
                const badChar = text[i + patternLength - 1];
                const shift = shiftTable.get(badChar) || patternLength;
                i += shift;
            }
        }
        
        return results;
    }

    /**
     * Finds all occurrences of pattern in text
     */
    static findAll(text: string, pattern: string): number[] {
        const results = this.search(text, pattern);
        return results.map(result => result.index);
    }

    /**
     * Checks if pattern exists in text
     */
    static contains(text: string, pattern: string): boolean {
        return this.search(text, pattern).length > 0;
    }

    /**
     * Finds first occurrence of pattern in text
     */
    static findFirst(text: string, pattern: string): number {
        const results = this.search(text, pattern);
        return results.length > 0 ? results[0].index : -1;
    }
}
// Example usage
const text = "ABABDABACDABABCABAB";
const pattern = "ABABCABAB";

// Find all occurrences
const allOccurrences = BoyerMooreHorspool.findAll(text, pattern);
console.log("All occurrences:", allOccurrences);

// Check if pattern exists
const exists = BoyerMooreHorspool.contains(text, pattern);
console.log("Pattern exists:", exists);

// Find first occurrence
const firstOccurrence = BoyerMooreHorspool.findFirst(text, pattern);
console.log("First occurrence:", firstOccurrence);

// Get detailed results
const detailedResults = BoyerMooreHorspool.search(text, pattern);
console.log("Detailed results:", detailedResults);
class OptimizedHorspool {
    private static buildShiftTable(pattern: string): number[] {
        const table: number[] = new Array(256).fill(pattern.length);
        const patternLength = pattern.length;
        
        for (let i = 0; i < patternLength - 1; i++) {
            const charCode = pattern.charCodeAt(i);
            table[charCode] = patternLength - i - 1;
        }
        
        return table;
    }

    static search(text: string, pattern: string): number[] {
        const results: number[] = [];
        const n = text.length;
        const m = pattern.length;
        
        if (m === 0 || n < m) return results;
        
        const shiftTable = this.buildShiftTable(pattern);
        
        let i = 0;
        while (i <= n - m) {
            let j = m - 1;
            
            while (j >= 0 && pattern[j] === text[i + j]) {
                j--;
            }
            
            if (j < 0) {
                results.push(i);
                i += m;
            } else {
                const charCode = text.charCodeAt(i + m - 1);
                i += shiftTable[charCode];
            }
        }
        
        return results;
    }
}

// Usage
const result = OptimizedHorspool.search("hello world hello", "hello");
console.log("Optimized search result:", result);
