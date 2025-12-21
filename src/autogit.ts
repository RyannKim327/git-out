class BoyerMooreHorspool {
    private pattern: string;
    private patternLength: number;
    private badCharacterTable: Map<string, number>;

    constructor(pattern: string) {
        if (pattern.length === 0) {
            throw new Error("Pattern cannot be empty");
        }

        this.pattern = pattern;
        this.patternLength = pattern.length;
        this.badCharacterTable = this.buildBadCharacterTable();
    }

    /**
     * Builds the bad character table for the pattern
     * The table contains the distance from the end of the pattern for each character
     */
    private buildBadCharacterTable(): Map<string, number> {
        const table = new Map<string, number>();
        
        // For all characters except the last one
        for (let i = 0; i < this.patternLength - 1; i++) {
            const char = this.pattern[i];
            table.set(char, this.patternLength - 1 - i);
        }
        
        return table;
    }

    /**
     * Get the shift value for a given character
     * If character is not in the table, return the pattern length
     */
    private getShift(char: string): number {
        return this.badCharacterTable.get(char) || this.patternLength;
    }

    /**
     * Search for the pattern in the given text
     * Returns an array of starting indices where the pattern is found
     */
    search(text: string): number[] {
        if (text.length < this.patternLength) {
            return [];
        }

        const occurrences: number[] = [];
        const textLength = text.length;
        let i = 0; // Current position in text

        while (i <= textLength - this.patternLength) {
            let j = this.patternLength - 1; // Start from end of pattern

            // Compare from the end of the pattern
            while (j >= 0 && this.pattern[j] === text[i + j]) {
                j--;
            }

            if (j < 0) {
                // Pattern found
                occurrences.push(i);
                // Move by pattern length (for non-overlapping matches)
                i += this.patternLength;
            } else {
                // Character mismatch, calculate shift
                const mismatchChar = text[i + this.patternLength - 1];
                i += this.getShift(mismatchChar);
            }
        }

        return occurrences;
    }

    /**
     * Search for the first occurrence of the pattern in the text
     * Returns the starting index or -1 if not found
     */
    searchFirst(text: string): number {
        const result = this.search(text);
        return result.length > 0 ? result[0] : -1;
    }

    /**
     * Check if the pattern exists in the text
     */
    exists(text: string): boolean {
        return this.searchFirst(text) !== -1;
    }
}

// Example usage and tests
function demonstrateBoyerMooreHorspool() {
    console.log("Boyer-Moore-Horspool Algorithm Demo\n");

    // Test case 1: Basic search
    const searcher = new BoyerMooreHorspool("example");
    const text1 = "This is an example text with example pattern";
    
    console.log("Pattern: 'example'");
    console.log("Text: '" + text1 + "'");
    console.log("Occurrences at indices:", searcher.search(text1));
    console.log("First occurrence:", searcher.searchFirst(text1));
    console.log("Pattern exists:", searcher.exists(text1));
    console.log();

    // Test case 2: No match
    const text2 = "This text has no match";
    console.log("Text: '" + text2 + "'");
    console.log("Pattern exists:", searcher.exists(text2));
    console.log();

    // Test case 3: Multiple matches
    const searcher2 = new BoyerMooreHorspool("ab");
    const text3 = "ababababab";
    console.log("Pattern: 'ab'");
    console.log("Text: '" + text3 + "'");
    console.log("Occurrences at indices:", searcher2.search(text3));
    console.log();

    // Test case 4: Case sensitivity
    const searcher3 = new BoyerMooreHorspool("EXAMPLE");
    console.log("Pattern: 'EXAMPLE'");
    console.log("Text: '" + text1 + "'");
    console.log("Pattern exists:", searcher3.exists(text1));
    console.log();

    // Performance test with longer text
    const longPattern = "algorithm";
    const longText = "The Boyer-Moore-Horspool algorithm is a string searching algorithm that is particularly efficient for long patterns. This algorithm uses a bad-character heuristic to skip sections of the text, resulting in sublinear time complexity in many cases.";
    
    const longSearcher = new BoyerMooreHorspool(longPattern);
    console.log("Long pattern: '" + longPattern + "'");
    console.log("First occurrence in long text:", longSearcher.searchFirst(longText));
}

// Enhanced version with additional features
class AdvancedBoyerMooreHorspool extends BoyerMooreHorspool {
    private caseInsensitive: boolean;

    constructor(pattern: string, caseInsensitive: boolean = false) {
        const processedPattern = caseInsensitive ? pattern.toLowerCase() : pattern;
        super(processedPattern);
        this.caseInsensitive = caseInsensitive;
    }

    override search(text: string): number[] {
        const processedText = this.caseInsensitive ? text.toLowerCase() : text;
        return super.search(processedText);
    }

    /**
     * Search for all occurrences with case-insensitive option
     */
    searchAll(text: string, caseInsensitive: boolean = false): number[] {
        const processedText = caseInsensitive ? text.toLowerCase() : text;
        return super.search(processedText);
    }
}

// Run the demonstration
demonstrateBoyerMooreHorspool();

// Example of using the advanced version
console.log("\n=== Advanced Version Demo ===");
const advancedSearcher = new AdvancedBoyerMooreHorspool("EXAMPLE", true);
const text = "This is an example text";
console.log("Case-insensitive search for 'EXAMPLE' in:", text);
console.log("Occurrences:", advancedSearcher.search(text));
// Basic usage
const bmh = new BoyerMooreHorspool("needle");
const text = "This is a needle in a haystack";
const positions = bmh.search(text); // Returns [10]

// Case-insensitive search
const advanced = new AdvancedBoyerMooreHorspool("NEEDLE", true);
const positions = advanced.search("This is a Needle in a haystack"); // Returns [10]
