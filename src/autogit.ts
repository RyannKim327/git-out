class KMP {
    /**
     * Build the partial match table (failure function) for the pattern
     */
    private static buildPartialMatchTable(pattern: string): number[] {
        const table: number[] = new Array(pattern.length).fill(0);
        let j = 0; // length of previous longest prefix suffix
        
        // table[0] is always 0
        for (let i = 1; i < pattern.length; i++) {
            while (j > 0 && pattern[i] !== pattern[j]) {
                j = table[j - 1];
            }
            
            if (pattern[i] === pattern[j]) {
                j++;
            }
            
            table[i] = j;
        }
        
        return table;
    }
    
    /**
     * Search for pattern in text using KMP algorithm
     * Returns the index of the first occurrence, or -1 if not found
     */
    static search(text: string, pattern: string): number {
        if (pattern.length === 0) return 0;
        if (text.length === 0 || pattern.length > text.length) return -1;
        
        const lps = this.buildPartialMatchTable(pattern);
        let i = 0; // index for text
        let j = 0; // index for pattern
        
        while (i < text.length) {
            if (pattern[j] === text[i]) {
                i++;
                j++;
            }
            
            if (j === pattern.length) {
                return i - j; // Pattern found
            } else if (i < text.length && pattern[j] !== text[i]) {
                if (j !== 0) {
                    j = lps[j - 1];
                } else {
                    i++;
                }
            }
        }
        
        return -1;
    }
    
    /**
     * Find all occurrences of pattern in text
     */
    static searchAll(text: string, pattern: string): number[] {
        if (pattern.length === 0) return [0];
        if (text.length === 0 || pattern.length > text.length) return [];
        
        const lps = this.buildPartialMatchTable(pattern);
        const occurrences: number[] = [];
        let i = 0; // index for text
        let j = 0; // index for pattern
        
        while (i < text.length) {
            if (pattern[j] === text[i]) {
                i++;
                j++;
            }
            
            if (j === pattern.length) {
                occurrences.push(i - j);
                j = lps[j - 1];
            } else if (i < text.length && pattern[j] !== text[i]) {
                if (j !== 0) {
                    j = lps[j - 1];
                } else {
                    i++;
                }
            }
        }
        
        return occurrences;
    }
}
interface KMPSearchOptions {
    caseSensitive?: boolean;
    findAll?: boolean;
}

class KMPAlgorithm {
    private pattern: string;
    private lps: number[];
    
    constructor(pattern: string, options: { caseSensitive?: boolean } = {}) {
        const { caseSensitive = true } = options;
        this.pattern = caseSensitive ? pattern : pattern.toLowerCase();
        this.lps = this.buildPartialMatchTable(this.pattern);
    }
    
    private buildPartialMatchTable(pattern: string): number[] {
        const table: number[] = new Array(pattern.length).fill(0);
        let length = 0; // length of the previous longest prefix suffix
        let i = 1;
        
        while (i < pattern.length) {
            if (pattern[i] === pattern[length]) {
                length++;
                table[i] = length;
                i++;
            } else {
                if (length !== 0) {
                    length = table[length - 1];
                } else {
                    table[i] = 0;
                    i++;
                }
            }
        }
        
        return table;
    }
    
    /**
     * Search for the pattern in the given text
     */
    search(text: string, options: KMPSearchOptions = {}): number | number[] {
        const { caseSensitive = true, findAll = false } = options;
        const searchText = caseSensitive ? text : text.toLowerCase();
        
        if (this.pattern.length === 0) return findAll ? [0] : 0;
        if (searchText.length === 0 || this.pattern.length > searchText.length) {
            return findAll ? [] : -1;
        }
        
        const occurrences: number[] = [];
        let i = 0; // index for searchText
        let j = 0; // index for pattern
        
        while (i < searchText.length) {
            if (this.pattern[j] === searchText[i]) {
                i++;
                j++;
            }
            
            if (j === this.pattern.length) {
                if (findAll) {
                    occurrences.push(i - j);
                    j = this.lps[j - 1];
                } else {
                    return i - j;
                }
            } else if (i < searchText.length && this.pattern[j] !== searchText[i]) {
                if (j !== 0) {
                    j = this.lps[j - 1];
                } else {
                    i++;
                }
            }
        }
        
        return findAll ? occurrences : -1;
    }
    
    /**
     * Get the partial match table for debugging purposes
     */
    getPartialMatchTable(): number[] {
        return [...this.lps];
    }
}
// Using the static implementation
console.log(KMP.search("hello world", "world")); // 6
console.log(KMP.search("hello world", "xyz"));   // -1
console.log(KMP.searchAll("ababab", "ab"));      // [0, 2, 4]

// Using the class-based implementation
const kmp = new KMPAlgorithm("world");
console.log(kmp.search("hello world")); // 6

const kmpMultiple = new KMPAlgorithm("ab");
console.log(kmpMultiple.search("ababab", { findAll: true })); // [0, 2, 4]

// Case-insensitive search
const kmpCaseInsensitive = new KMPAlgorithm("WORLD", { caseSensitive: false });
console.log(kmpCaseInsensitive.search("hello world")); // 6

// Get partial match table for debugging
console.log(kmp.getPartialMatchTable()); // [0, 0, 0, 0, 0]
function testKMP(): void {
    // Test cases
    const testCases = [
        { text: "hello world", pattern: "world", expected: 6 },
        { text: "hello world", pattern: "hello", expected: 0 },
        { text: "hello world", pattern: "xyz", expected: -1 },
        { text: "ababab", pattern: "ab", findAll: true, expected: [0, 2, 4] },
        { text: "mississippi", pattern: "issi", findAll: true, expected: [1, 4] },
        { text: "aaa", pattern: "aa", findAll: true, expected: [0, 1] },
        { text: "", pattern: "test", expected: -1 },
        { text: "test", pattern: "", expected: 0 },
    ];
    
    for (const testCase of testCases) {
        if ('findAll' in testCase) {
            const result = KMP.searchAll(testCase.text, testCase.pattern);
            console.assert(
                JSON.stringify(result) === JSON.stringify(testCase.expected),
                `Failed: searchAll("${testCase.text}", "${testCase.pattern}")`
            );
        } else {
            const result = KMP.search(testCase.text, testCase.pattern);
            console.assert(
                result === testCase.expected,
                `Failed: search("${testCase.text}", "${testCase.pattern}")`
            );
        }
    }
    
    console.log("All tests passed!");
}

// Run tests
testKMP();
