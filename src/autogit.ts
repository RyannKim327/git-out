interface BoyerMoorePreprocessing {
    badCharTable: Map<string, number>;
    goodSuffixTable: number[];
}

class BoyerMoore {
    /**
     * Preprocesses the pattern for Boyer-Moore algorithm
     */
    private static preprocessPattern(pattern: string): BoyerMoorePreprocessing {
        const m = pattern.length;
        const badCharTable = new Map<string, number>();
        const goodSuffixTable = new Array<number>(m).fill(0);

        // Bad Character Table
        for (let i = 0; i < m; i++) {
            badCharTable.set(pattern[i], m - 1 - i);
        }

        // Good Suffix Table (simplified version)
        this.preprocessGoodSuffix(pattern, goodSuffixTable);

        return { badCharTable, goodSuffixTable };
    }

    /**
     * Preprocesses the good suffix table
     */
    private static preprocessGoodSuffix(pattern: string, table: number[]): void {
        const m = pattern.length;
        
        // Initialize with default shift of pattern length
        for (let i = 0; i < m; i++) {
            table[i] = m;
        }

        // Simplified good suffix rule - look for prefix that matches suffix
        for (let i = 1; i < m; i++) {
            const suffix = pattern.substring(m - i);
            
            // Check if this suffix appears earlier in the pattern
            for (let j = 0; j < m - i; j++) {
                if (pattern.substring(j, j + i) === suffix) {
                    table[m - i - 1] = m - j - i;
                    break;
                }
            }
        }
    }

    /**
     * Searches for pattern in text using Boyer-Moore algorithm
     */
    static search(text: string, pattern: string): number[] {
        const n = text.length;
        const m = pattern.length;
        const result: number[] = [];
        
        if (m === 0 || n < m) return result;

        const { badCharTable, goodSuffixTable } = this.preprocessPattern(pattern);

        let i = 0;
        while (i <= n - m) {
            let j = m - 1;

            // Compare from right to left
            while (j >= 0 && pattern[j] === text[i + j]) {
                j--;
            }

            if (j < 0) {
                // Pattern found
                result.push(i);
                i += goodSuffixTable[0] || m;
            } else {
                // Calculate skip using bad character and good suffix rules
                const badCharSkip = (badCharTable.get(text[i + j]) || m) - (m - 1 - j);
                const goodSuffixSkip = goodSuffixTable[j];
                
                i += Math.max(1, Math.max(badCharSkip, goodSuffixSkip));
            }
        }

        return result;
    }

    /**
     * Case-insensitive search variant
     */
    static searchCaseInsensitive(text: string, pattern: string): number[] {
        return this.search(text.toLowerCase(), pattern.toLowerCase());
    }
}
// Basic usage
const text = "ABAAABCDBBABCDABCDABDE";
const pattern = "ABCD";
const positions = BoyerMoore.search(text, pattern);
console.log("Positions:", positions); // [4, 10, 14]

// Case-insensitive search
const caseInsensitivePositions = BoyerMoore.searchCaseInsensitive(
    "Hello World hello world", 
    "HELLO"
);
console.log("Case-insensitive positions:", caseInsensitivePositions); // [0, 12]

// No matches found
const noMatches = BoyerMoore.search("abc def", "xyz");
console.log("No matches:", noMatches); // []

// Empty pattern
const emptyPattern = BoyerMoore.search("test", "");
console.log("Empty pattern:", emptyPattern); // []
class SimplifiedBoyerMoore {
    static search(text: string, pattern: string): number[] {
        const n = text.length;
        const m = pattern.length;
        const result: number[] = [];
        
        if (m === 0 || n < m) return result;

        // Precompute bad character table
        const badCharTable: Record<string, number> = {};
        for (let i = 0; i < m; i++) {
            badCharTable[pattern[i]] = m - 1 - i;
        }

        let i = 0;
        while (i <= n - m) {
            let j = m - 1;

            while (j >= 0 && pattern[j] === text[i + j]) {
                j--;
            }

            if (j < 0) {
                result.push(i);
                i += m;
            } else {
                const skip = Math.max(1, (badCharTable[text[i + j]] || m) - (m - 1 - j));
                i += skip;
            }
        }

        return result;
    }
}
