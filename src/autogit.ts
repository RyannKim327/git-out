class BoyerMoore {
    /**
     * Preprocess the pattern to create bad character table
     * The table contains the last occurrence of each character in the pattern
     */
    private static preprocessBadCharacter(pattern: string): Map<string, number> {
        const badCharTable = new Map<string, number>();
        
        for (let i = 0; i < pattern.length; i++) {
            badCharTable.set(pattern[i], i);
        }
        
        return badCharTable;
    }

    /**
     * Preprocess the pattern to create good suffix table
     * This helps determine how far we can shift when a suffix matches
     */
    private static preprocessGoodSuffix(pattern: string): number[] {
        const m = pattern.length;
        const goodSuffixTable = new Array(m).fill(0);
        const suffix = new Array(m).fill(0);
        
        // Case 1: Suffix exists elsewhere in pattern
        suffix[m - 1] = m;
        let g = m - 1;
        let f = 0;
        
        for (let i = m - 2; i >= 0; i--) {
            if (i > g && suffix[i + m - 1 - f] < i - g) {
                suffix[i] = suffix[i + m - 1 - f];
            } else {
                g = Math.min(g, i);
                f = i;
                
                while (g >= 0 && pattern[g] === pattern[g + m - 1 - f]) {
                    g--;
                }
                
                suffix[i] = f - g;
            }
        }
        
        for (let i = 0; i < m; i++) {
            goodSuffixTable[i] = m;
        }
        
        let j = 0;
        for (let i = m - 1; i >= 0; i--) {
            if (suffix[i] === i + 1) {
                for (; j < m - 1 - i; j++) {
                    if (goodSuffixTable[j] === m) {
                        goodSuffixTable[j] = m - 1 - i;
                    }
                }
            }
        }
        
        for (let i = 0; i <= m - 2; i++) {
            goodSuffixTable[m - 1 - suffix[i]] = m - 1 - i;
        }
        
        return goodSuffixTable;
    }

    /**
     * Find all occurrences of pattern in text using Boyer-Moore algorithm
     */
    public static search(text: string, pattern: string): number[] {
        const n = text.length;
        const m = pattern.length;
        const results: number[] = [];
        
        if (m === 0) return results;
        if (n < m) return results;
        
        const badCharTable = this.preprocessBadCharacter(pattern);
        const goodSuffixTable = this.preprocessGoodSuffix(pattern);
        
        let s = 0; // shift of pattern with respect to text
        
        while (s <= n - m) {
            let j = m - 1;
            
            // Compare pattern from right to left
            while (j >= 0 && pattern[j] === text[s + j]) {
                j--;
            }
            
            if (j < 0) {
                // Pattern found
                results.push(s);
                
                // Shift pattern by good suffix rule
                s += (s + m < n) ? goodSuffixTable[0] : 1;
            } else {
                // Use the maximum shift from bad character and good suffix rules
                const badCharShift = j - (badCharTable.get(text[s + j]) || -1);
                const goodSuffixShift = goodSuffixTable[j];
                
                s += Math.max(1, Math.max(badCharShift, goodSuffixShift));
            }
        }
        
        return results;
    }

    /**
     * Simplified version using only bad character rule
     * More efficient for most practical cases
     */
    public static searchSimple(text: string, pattern: string): number[] {
        const n = text.length;
        const m = pattern.length;
        const results: number[] = [];
        
        if (m === 0) return results;
        if (n < m) return results;
        
        const badCharTable = this.preprocessBadCharacter(pattern);
        
        let s = 0;
        
        while (s <= n - m) {
            let j = m - 1;
            
            while (j >= 0 && pattern[j] === text[s + j]) {
                j--;
            }
            
            if (j < 0) {
                results.push(s);
                s += 1; // Move to next position
            } else {
                const badCharShift = Math.max(1, j - (badCharTable.get(text[s + j]) || -1));
                s += badCharShift;
            }
        }
        
        return results;
    }
}

// Example usage and test cases
function testBoyerMoore() {
    const testCases = [
        { text: "ABAAABCD", pattern: "ABC", expected: [4] },
        { text: "hello world", pattern: "world", expected: [6] },
        { text: "abababab", pattern: "aba", expected: [0, 2, 4] },
        { text: "mississippi", pattern: "issi", expected: [1, 4] },
        { text: "abc", pattern: "d", expected: [] },
        { text: "", pattern: "abc", expected: [] },
        { text: "abc", pattern: "", expected: [] },
    ];

    console.log("Testing Boyer-Moore Algorithm:");
    console.log("==============================");

    for (const testCase of testCases) {
        const result = BoyerMoore.search(testCase.text, testCase.pattern);
        const simpleResult = BoyerMoore.searchSimple(testCase.text, testCase.pattern);
        
        console.log(`Text: "${testCase.text}"`);
        console.log(`Pattern: "${testCase.pattern}"`);
        console.log(`Full algorithm result: [${result.join(', ')}]`);
        console.log(`Simple algorithm result: [${simpleResult.join(', ')}]`);
        console.log(`Expected: [${testCase.expected.join(', ')}]`);
        console.log(`Full algorithm ${arraysEqual(result, testCase.expected) ? '✓' : '✗'}`);
        console.log(`Simple algorithm ${arraysEqual(simpleResult, testCase.expected) ? '✓' : '✗'}`);
        console.log("---");
    }
}

function arraysEqual(a: number[], b: number[]): boolean {
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; i++) {
        if (a[i] !== b[i]) return false;
    }
    return true;
}

// Run tests
testBoyerMoore();

// Export for use in other modules
export { BoyerMoore };
// Find all occurrences
const positions = BoyerMoore.search("hello world hello", "hello");
console.log(positions); // [0, 12]

// Or use the simple version
const simplePositions = BoyerMoore.searchSimple("hello world hello", "hello");
console.log(simplePositions); // [0, 12]
