/**
 * Boyer-Moore-Horspool string search algorithm implementation
 */
class BoyerMooreHorspool {
    /**
     * Preprocesses the pattern to create a bad character shift table
     */
    private static preprocessPattern(pattern: string): Map<string, number> {
        const patternLength = pattern.length;
        const table = new Map<string, number>();
        
        // Set shift values for all characters in the pattern except the last
        for (let i = 0; i < patternLength - 1; i++) {
            const char = pattern[i];
            const shift = patternLength - i - 1;
            table.set(char, shift);
        }
        
        return table;
    }

    /**
     * Searches for pattern in text using Boyer-Moore-Horspool algorithm
     * Returns the starting index of the first occurrence or -1 if not found
     */
    static search(text: string, pattern: string): number {
        const textLength = text.length;
        const patternLength = pattern.length;
        
        // Handle edge cases
        if (patternLength === 0) return 0;
        if (patternLength > textLength) return -1;
        
        // Preprocess pattern to create shift table
        const shiftTable = this.preprocessPattern(pattern);
        
        let i = 0; // Current position in text
        
        while (i <= textLength - patternLength) {
            // Compare pattern with text from right to left
            let j = patternLength - 1;
            
            while (j >= 0 && text[i + j] === pattern[j]) {
                j--;
            }
            
            if (j < 0) {
                // Pattern found
                return i;
            } else {
                // Calculate shift using bad character rule
                const char = text[i + patternLength - 1];
                const shift = shiftTable.get(char) || patternLength;
                i += shift;
            }
        }
        
        return -1; // Pattern not found
    }

    /**
     * Finds all occurrences of pattern in text
     */
    static searchAll(text: string, pattern: string): number[] {
        const results: number[] = [];
        const textLength = text.length;
        const patternLength = pattern.length;
        
        if (patternLength === 0 || patternLength > textLength) {
            return results;
        }
        
        const shiftTable = this.preprocessPattern(pattern);
        let i = 0;
        
        while (i <= textLength - patternLength) {
            let j = patternLength - 1;
            
            while (j >= 0 && text[i + j] === pattern[j]) {
                j--;
            }
            
            if (j < 0) {
                results.push(i);
                i += 1; // Move one position to find next occurrence
            } else {
                const char = text[i + patternLength - 1];
                const shift = shiftTable.get(char) || patternLength;
                i += shift;
            }
        }
        
        return results;
    }
}

// Alternative functional implementation
const boyerMooreHorspool = {
    /**
     * Functional implementation of BMH search
     */
    search: (text: string, pattern: string): number => {
        const n = text.length;
        const m = pattern.length;
        
        if (m === 0) return 0;
        if (m > n) return -1;
        
        // Create shift table
        const shiftTable: Record<string, number> = {};
        for (let i = 0; i < m - 1; i++) {
            shiftTable[pattern[i]] = m - i - 1;
        }
        
        let i = 0;
        while (i <= n - m) {
            // Check for match
            let match = true;
            for (let j = m - 1; j >= 0; j--) {
                if (text[i + j] !== pattern[j]) {
                    match = false;
                    break;
                }
            }
            
            if (match) {
                return i;
            }
            
            // Calculate shift
            const nextChar = text[i + m - 1];
            i += shiftTable[nextChar] || m;
        }
        
        return -1;
    }
};
// Test the implementation
const testCases = [
    { text: "hello world", pattern: "world", expected: 6 },
    { text: "abcdefgh", pattern: "def", expected: 3 },
    { text: "abcabc", pattern: "abc", expected: 0 },
    { text: "mississippi", pattern: "iss", expected: 1 },
    { text: "hello", pattern: "x", expected: -1 },
    { text: "short", pattern: "longerpattern", expected: -1 },
    { text: "abc", pattern: "", expected: 0 }
];

console.log("Testing BoyerMooreHorspool.search():");
testCases.forEach(({ text, pattern, expected }) => {
    const result = BoyerMooreHorspool.search(text, pattern);
    console.log(`Search "${pattern}" in "${text}": ${result} (expected: ${expected})`);
});

console.log("\nTesting searchAll():");
const text = "abracadabra";
const pattern = "abra";
const allOccurrences = BoyerMooreHorspool.searchAll(text, pattern);
console.log(`Pattern "${pattern}" found in "${text}" at positions:`, allOccurrences);

console.log("\nTesting functional implementation:");
testCases.forEach(({ text, pattern, expected }) => {
    const result = boyerMooreHorspool.search(text, pattern);
    console.log(`Search "${pattern}" in "${text}": ${result} (expected: ${expected})`);
});

// Performance comparison
console.log("\nPerformance test:");
const longText = "a".repeat(1000000) + "needle" + "a".repeat(1000000);
const longPattern = "needle";

console.time("BMH Class");
const result1 = BoyerMooreHorspool.search(longText, longPattern);
console.timeEnd("BMH Class");

console.time("BMH Functional");
const result2 = boyerMooreHorspool.search(longText, longPattern);
console.timeEnd("BMH Functional");

console.log("Results:", result1, result2);
class OptimizedBoyerMooreHorspool {
    /**
     * Optimized implementation using a fixed array for ASCII characters
     */
    static search(text: string, pattern: string): number {
        const n = text.length;
        const m = pattern.length;
        
        if (m === 0) return 0;
        if (m > n) return -1;
        
        // Create shift table optimized for ASCII (0-255)
        const shiftTable: number[] = new Array(256).fill(m);
        
        // Set shift values for characters in the pattern
        for (let i = 0; i < m - 1; i++) {
            const charCode = pattern.charCodeAt(i);
            shiftTable[charCode] = m - i - 1;
        }
        
        let i = 0;
        while (i <= n - m) {
            // Quick check of last character first
            if (text[i + m - 1] !== pattern[m - 1]) {
                i += shiftTable[text.charCodeAt(i + m - 1)];
                continue;
            }
            
            // Compare remaining characters
            let match = true;
            for (let j = m - 2; j >= 0; j--) {
                if (text[i + j] !== pattern[j]) {
                    match = false;
                    break;
                }
            }
            
            if (match) return i;
            
            i += shiftTable[text.charCodeAt(i + m - 1)];
        }
        
        return -1;
    }
}
