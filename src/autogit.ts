class BoyerMooreHorspool {
    /**
     * Preprocesses the pattern to create a bad-character shift table
     * @param pattern - The pattern to search for
     * @returns A map containing the shift distances for each character
     */
    private static preprocessPattern(pattern: string): Map<string, number> {
        const patternLength = pattern.length;
        const table = new Map<string, number>();
        
        // For all characters except the last one, set shift = patternLength - index - 1
        for (let i = 0; i < patternLength - 1; i++) {
            const char = pattern[i];
            table.set(char, patternLength - i - 1);
        }
        
        return table;
    }

    /**
     * Searches for all occurrences of pattern in text using Boyer-Moore-Horspool algorithm
     * @param text - The text to search in
     * @param pattern - The pattern to search for
     * @returns Array of starting indices where pattern was found
     */
    static search(text: string, pattern: string): number[] {
        const textLength = text.length;
        const patternLength = pattern.length;
        
        // Handle edge cases
        if (patternLength === 0) return [0];
        if (patternLength > textLength) return [];
        
        const shiftTable = this.preprocessPattern(pattern);
        const results: number[] = [];
        let i = 0; // Current position in text
        
        while (i <= textLength - patternLength) {
            let j = patternLength - 1; // Compare from right to left
            
            // Compare pattern with text starting at position i
            while (j >= 0 && pattern[j] === text[i + j]) {
                j--;
            }
            
            if (j < 0) {
                // Pattern found
                results.push(i);
                i++; // Move to next position for next search
            } else {
                // Get shift distance from table or use pattern length as default
                const char = text[i + patternLength - 1];
                const shift = shiftTable.get(char) || patternLength;
                i += shift;
            }
        }
        
        return results;
    }

    /**
     * Searches for the first occurrence of pattern in text
     * @param text - The text to search in
     * @param pattern - The pattern to search for
     * @returns Starting index of first occurrence, or -1 if not found
     */
    static searchFirst(text: string, pattern: string): number {
        const indices = this.search(text, pattern);
        return indices.length > 0 ? indices[0] : -1;
    }
}

// Example usage and testing
function demonstrateAlgorithm() {
    const text = "ABAAABCDEFGHIJKLMNOPQRSTUVWXYZABCXYZ";
    const pattern = "ABC";
    
    console.log("Text:", text);
    console.log("Pattern:", pattern);
    
    // Find all occurrences
    const allOccurrences = BoyerMooreHorspool.search(text, pattern);
    console.log("All occurrences:", allOccurrences);
    
    // Find first occurrence
    const firstOccurrence = BoyerMooreHorspool.searchFirst(text, pattern);
    console.log("First occurrence:", firstOccurrence);
    
    // Test with different patterns
    console.log("\nAdditional tests:");
    
    // Empty pattern
    console.log("Empty pattern:", BoyerMooreHorspool.search(text, ""));
    
    // Pattern longer than text
    console.log("Long pattern:", BoyerMooreHorspool.search(text, "ABCDEFGHIJKLMNOPQRSTUVWXYZABCD"));
    
    // Pattern not found
    console.log("Non-existent pattern:", BoyerMooreHorspool.search(text, "XYZ123"));
}

// Run demonstration
demonstrateAlgorithm();
class OptimizedBoyerMooreHorspool {
    private static readonly ALPHABET_SIZE = 256; // ASCII range
    
    /**
     * Preprocesses pattern using array for faster lookup
     */
    private static preprocessPattern(pattern: string): number[] {
        const patternLength = pattern.length;
        const table = new Array<number>(this.ALPHABET_SIZE);
        
        // Initialize all characters with pattern length (default shift)
        for (let i = 0; i < this.ALPHABET_SIZE; i++) {
            table[i] = patternLength;
        }
        
        // Set specific shifts for characters in the pattern
        for (let i = 0; i < patternLength - 1; i++) {
            const charCode = pattern.charCodeAt(i);
            table[charCode] = patternLength - i - 1;
        }
        
        return table;
    }

    /**
     * Optimized search implementation
     */
    static search(text: string, pattern: string): number[] {
        const textLength = text.length;
        const patternLength = pattern.length;
        
        if (patternLength === 0) return [0];
        if (patternLength > textLength) return [];
        
        const shiftTable = this.preprocessPattern(pattern);
        const results: number[] = [];
        let i = 0;
        
        while (i <= textLength - patternLength) {
            const lastChar = text.charCodeAt(i + patternLength - 1);
            const shift = shiftTable[lastChar];
            
            if (shift === 0) {
                // Potential match, verify by comparing all characters
                let match = true;
                for (let j = 0; j < patternLength; j++) {
                    if (text[i + j] !== pattern[j]) {
                        match = false;
                        break;
                    }
                }
                
                if (match) {
                    results.push(i);
                }
                i++;
            } else {
                i += shift;
            }
        }
        
        return results;
    }
}
// Basic usage
const text = "This is a sample text for testing the Boyer-Moore-Horspool algorithm";
const pattern = "test";

const results = BoyerMooreHorspool.search(text, pattern);
console.log("Pattern found at positions:", results);

// Case-insensitive search (convert both to same case)
const caseInsensitiveResults = BoyerMooreHorspool.search(
    text.toLowerCase(), 
    pattern.toLowerCase()
);
console.log("Case-insensitive results:", caseInsensitiveResults);

// Performance comparison
function benchmark() {
    const longText = "A".repeat(1000000) + "TEST" + "B".repeat(1000000);
    const testPattern = "TEST";
    
    console.time("Boyer-Moore-Horspool");
    const results = BoyerMooreHorspool.search(longText, testPattern);
    console.timeEnd("Boyer-Moore-Horspool");
    console.log("Found at:", results);
}

benchmark();
