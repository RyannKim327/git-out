class BoyerMooreHorspool {
    private pattern: string;
    private badCharTable: Map<string, number>;

    constructor(pattern: string) {
        this.pattern = pattern;
        this.badCharTable = this.buildBadCharTable();
    }

    /**
     * Builds the bad character table (skip table)
     * This table tells us how many characters we can skip when a mismatch occurs
     */
    private buildBadCharTable(): Map<string, number> {
        const table = new Map<string, number>();
        const patternLength = this.pattern.length;

        // For all characters except the last one
        for (let i = 0; i < patternLength - 1; i++) {
            const char = this.pattern[i];
            // The distance from the end of the pattern
            table.set(char, patternLength - 1 - i);
        }

        // If character is not in the table, we can skip the entire pattern length
        return table;
    }

    /**
     * Gets the skip value for a character
     * Defaults to pattern length if character is not in the table
     */
    private getSkipValue(char: string): number {
        return this.badCharTable.get(char) || this.pattern.length;
    }

    /**
     * Search for the pattern in the given text
     * Returns the starting index of the first occurrence, or -1 if not found
     */
    public search(text: string): number {
        const textLength = text.length;
        const patternLength = this.pattern.length;

        // If pattern is longer than text, it can't be found
        if (patternLength > textLength) {
            return -1;
        }

        // If pattern is empty, return 0 (matches at beginning)
        if (patternLength === 0) {
            return 0;
        }

        let i = 0; // Current position in text

        while (i <= textLength - patternLength) {
            let j = patternLength - 1; // Compare from end of pattern

            // Compare pattern with current window of text
            while (j >= 0 && this.pattern[j] === text[i + j]) {
                j--;
            }

            // If we found a match
            if (j < 0) {
                return i;
            }

            // Shift pattern based on bad character table
            const mismatchedChar = text[i + patternLength - 1];
            i += this.getSkipValue(mismatchedChar);
        }

        return -1; // Pattern not found
    }

    /**
     * Find all occurrences of the pattern in the text
     * Returns array of starting indices
     */
    public searchAll(text: string): number[] {
        const occurrences: number[] = [];
        let currentIndex = 0;
        const textLength = text.length;
        const patternLength = this.pattern.length;

        while (currentIndex <= textLength - patternLength) {
            const foundIndex = this.searchFromIndex(text, currentIndex);
            if (foundIndex === -1) break;
            
            occurrences.push(foundIndex);
            currentIndex = foundIndex + 1; // Move to next position
        }

        return occurrences;
    }

    /**
     * Search starting from a specific index
     */
    private searchFromIndex(text: string, startIndex: number): number {
        const textLength = text.length;
        const patternLength = this.pattern.length;

        if (startIndex > textLength - patternLength) {
            return -1;
        }

        let i = startIndex;

        while (i <= textLength - patternLength) {
            let j = patternLength - 1;

            while (j >= 0 && this.pattern[j] === text[i + j]) {
                j--;
            }

            if (j < 0) {
                return i;
            }

            const mismatchedChar = text[i + patternLength - 1];
            i += this.getSkipValue(mismatchedChar);
        }

        return -1;
    }

    /**
     * Display the bad character table for debugging
     */
    public printBadCharTable(): void {
        console.log('Bad Character Table:');
        this.badCharTable.forEach((value, key) => {
            console.log(`  '${key}' -> skip ${value}`);
        });
    }
}

// Example usage and testing
function testBoyerMooreHorspool() {
    // Test case 1: Simple search
    const searcher1 = new BoyerMooreHorspool("ABC");
    const text1 = "ABABCBABCABC";
    console.log(`Pattern: "ABC"`);
    console.log(`Text: "${text1}"`);
    console.log(`First occurrence at: ${searcher1.search(text1)}`); // Should return 2
    console.log(`All occurrences: [${searcher1.searchAll(text1)}]`); // Should return [2, 7, 9]
    
    console.log('\n' + '='.repeat(50) + '\n');

    // Test case 2: Pattern not found
    const searcher2 = new BoyerMooreHorspool("XYZ");
    const text2 = "ABABCBABCABC";
    console.log(`Pattern: "XYZ"`);
    console.log(`Text: "${text2}"`);
    console.log(`First occurrence at: ${searcher2.search(text2)}`); // Should return -1
    
    console.log('\n' + '='.repeat(50) + '\n');

    // Test case 3: Pattern at beginning
    const searcher3 = new BoyerMooreHorspool("AB");
    const text3 = "ABABCBABCABC";
    console.log(`Pattern: "AB"`);
    console.log(`Text: "${text3}"`);
    console.log(`First occurrence at: ${searcher3.search(text3)}`); // Should return 0
    console.log(`All occurrences: [${searcher3.searchAll(text3)}]`); // Should return [0, 2, 7, 9]
    
    console.log('\n' + '='.repeat(50) + '\n');

    // Test case 4: Empty pattern
    const searcher4 = new BoyerMooreHorspool("");
    const text4 = "Hello World";
    console.log(`Pattern: ""`);
    console.log(`Text: "${text4}"`);
    console.log(`First occurrence at: ${searcher4.search(text4)}`); // Should return 0
    
    console.log('\n' + '='.repeat(50) + '\n');

    // Show bad character table example
    const searcher5 = new BoyerMooreHorspool("EXAMPLE");
    console.log(`Bad Character Table for "EXAMPLE":`);
    searcher5.printBadCharTable();
}

// Run tests
testBoyerMooreHorspool();
