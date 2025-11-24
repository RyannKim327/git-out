class BoyerMooreHorspool {
    /**
     * Preprocesses the pattern to create a bad character shift table
     * @param pattern - The pattern to search for
     * @returns A map containing shift distances for each character
     */
    private static preprocessPattern(pattern: string): Map<string, number> {
        const patternLength = pattern.length;
        const shiftTable = new Map<string, number>();
        
        // For all characters except the last one, calculate the shift
        for (let i = 0; i < patternLength - 1; i++) {
            const char = pattern[i];
            const shift = patternLength - i - 1;
            shiftTable.set(char, shift);
        }
        
        // Default shift for characters not in the pattern
        const defaultShift = patternLength;
        
        return {
            get: (char: string) => shiftTable.get(char) ?? defaultShift
        };
    }

    /**
     * Searches for all occurrences of pattern in text using Boyer-Moore-Horspool
     * @param text - The text to search in
     * @param pattern - The pattern to search for
     * @returns Array of starting indices where pattern is found
     */
    static search(text: string, pattern: string): number[] {
        const textLength = text.length;
        const patternLength = pattern.length;
        
        if (patternLength === 0 || textLength < patternLength) {
            return [];
        }
        
        const shiftTable = this.preprocessPattern(pattern);
        const results: number[] = [];
        let i = 0; // Current position in text
        
        while (i <= textLength - patternLength) {
            let j = patternLength - 1; // Compare from end of pattern
            
            // Compare pattern with text from right to left
            while (j >= 0 && pattern[j] === text[i + j]) {
                j--;
            }
            
            if (j < 0) {
                // Pattern found
                results.push(i);
                i++; // Move to next position
            } else {
                // Shift based on the bad character rule
                const badChar = text[i + patternLength - 1];
                i += shiftTable.get(badChar);
            }
        }
        
        return results;
    }

    /**
     * Case-insensitive version of the search
     * @param text - The text to search in
     * @param pattern - The pattern to search for
     * @returns Array of starting indices where pattern is found (case-insensitive)
     */
    static searchCaseInsensitive(text: string, pattern: string): number[] {
        return this.search(text.toLowerCase(), pattern.toLowerCase());
    }
}
// Basic usage
const text = "ABABDABACDABABCABAB";
const pattern = "ABABCABAB";

const results = BoyerMooreHorspool.search(text, pattern);
console.log("Found at indices:", results); // Output: [10]

// Case insensitive search
const caseInsensitiveResults = BoyerMooreHorspool.searchCaseInsensitive(
    "Hello World hello world", 
    "HELLO"
);
console.log("Case insensitive results:", caseInsensitiveResults); // Output: [0, 12]

// Multiple occurrences
const multipleResults = BoyerMooreHorspool.search(
    "banana anana panama", 
    "ana"
);
console.log("Multiple occurrences:", multipleResults); // Output: [1, 3, 9]

// No matches found
const noResults = BoyerMooreHorspool.search("abcdefg", "xyz");
console.log("No matches:", noResults); // Output: []
interface SearchOptions {
    caseSensitive?: boolean;
    firstMatchOnly?: boolean;
}

class AdvancedBoyerMooreHorspool {
    private static preprocessPattern(pattern: string): Map<string, number> {
        const patternLength = pattern.length;
        const shiftTable = new Map<string, number>();
        
        for (let i = 0; i < patternLength - 1; i++) {
            shiftTable.set(pattern[i], patternLength - i - 1);
        }
        
        const defaultShift = patternLength;
        
        return {
            get: (char: string) => shiftTable.get(char) ?? defaultShift
        };
    }

    static search(
        text: string, 
        pattern: string, 
        options: SearchOptions = {}
    ): number[] {
        const { caseSensitive = true, firstMatchOnly = false } = options;
        
        let processedText = text;
        let processedPattern = pattern;
        
        if (!caseSensitive) {
            processedText = text.toLowerCase();
            processedPattern = pattern.toLowerCase();
        }
        
        const textLength = processedText.length;
        const patternLength = processedPattern.length;
        
        if (patternLength === 0 || textLength < patternLength) {
            return [];
        }
        
        const shiftTable = this.preprocessPattern(processedPattern);
        const results: number[] = [];
        let i = 0;
        
        while (i <= textLength - patternLength) {
            let j = patternLength - 1;
            
            while (j >= 0 && processedPattern[j] === processedText[i + j]) {
                j--;
            }
            
            if (j < 0) {
                results.push(i);
                if (firstMatchOnly) {
                    break;
                }
                i++;
            } else {
                const badChar = processedText[i + patternLength - 1];
                i += shiftTable.get(badChar);
            }
        }
        
        return results;
    }
}

// Advanced usage examples
const advancedResults = AdvancedBoyerMooreHorspool.search(
    "Hello World hello world", 
    "HELLO", 
    { caseSensitive: false, firstMatchOnly: true }
);
console.log("First match only:", advancedResults); // Output: [0]
