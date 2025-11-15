class KMPAlgorithm {
    /**
     * Builds the prefix function (partial match table) for the pattern
     */
    private buildPrefixTable(pattern: string): number[] {
        const n = pattern.length;
        const prefixTable: number[] = new Array(n).fill(0);
        
        let length = 0; // Length of the previous longest prefix suffix
        let i = 1;

        while (i < n) {
            if (pattern[i] === pattern[length]) {
                length++;
                prefixTable[i] = length;
                i++;
            } else {
                if (length !== 0) {
                    length = prefixTable[length - 1];
                } else {
                    prefixTable[i] = 0;
                    i++;
                }
            }
        }

        return prefixTable;
    }

    /**
     * Finds all occurrences of pattern in text using KMP algorithm
     */
    search(text: string, pattern: string): number[] {
        if (pattern.length === 0) return [];
        
        const n = text.length;
        const m = pattern.length;
        const prefixTable = this.buildPrefixTable(pattern);
        const occurrences: number[] = [];
        
        let i = 0; // Index for text
        let j = 0; // Index for pattern

        while (i < n) {
            if (pattern[j] === text[i]) {
                i++;
                j++;
            }

            if (j === m) {
                occurrences.push(i - j);
                j = prefixTable[j - 1];
            } else if (i < n && pattern[j] !== text[i]) {
                if (j !== 0) {
                    j = prefixTable[j - 1];
                } else {
                    i++;
                }
            }
        }

        return occurrences;
    }

    /**
     * Finds the first occurrence of pattern in text
     */
    searchFirst(text: string, pattern: string): number {
        const result = this.search(text, pattern);
        return result.length > 0 ? result[0] : -1;
    }

    /**
     * Checks if pattern exists in text
     */
    contains(text: string, pattern: string): boolean {
        return this.searchFirst(text, pattern) !== -1;
    }
}
// Example usage
const kmp = new KMPAlgorithm();

// Search for all occurrences
const text = "ABABDABACDABABCABAB";
const pattern = "ABABCABAB";
const occurrences = kmp.search(text, pattern);
console.log("Occurrences at indices:", occurrences); // [10]

// Find first occurrence
const firstIndex = kmp.searchFirst("hello world", "world");
console.log("First occurrence:", firstIndex); // 6

// Check if pattern exists
const exists = kmp.contains("typescript is awesome", "awesome");
console.log("Pattern exists:", exists); // true
function kmpSearch(text: string, pattern: string): number[] {
    if (pattern.length === 0) return [];
    
    const buildPrefixTable = (pattern: string): number[] => {
        const table: number[] = new Array(pattern.length).fill(0);
        let len = 0;
        let i = 1;

        while (i < pattern.length) {
            if (pattern[i] === pattern[len]) {
                len++;
                table[i] = len;
                i++;
            } else {
                if (len !== 0) {
                    len = table[len - 1];
                } else {
                    table[i] = len;
                    i++;
                }
            }
        }
        return table;
    };

    const prefixTable = buildPrefixTable(pattern);
    const occurrences: number[] = [];
    let i = 0, j = 0;

    while (i < text.length) {
        if (pattern[j] === text[i]) {
            i++;
            j++;
        }

        if (j === pattern.length) {
            occurrences.push(i - j);
            j = prefixTable[j - 1];
        } else if (i < text.length && pattern[j] !== text[i]) {
            if (j !== 0) {
                j = prefixTable[j - 1];
            } else {
                i++;
            }
        }
    }

    return occurrences;
}
// Test cases
function testKMP() {
    const testCases = [
        { text: "abcabc", pattern: "abc", expected: [0, 3] },
        { text: "aaaa", pattern: "aa", expected: [0, 1, 2] },
        { text: "hello", pattern: "world", expected: [] },
        { text: "", pattern: "test", expected: [] },
        { text: "test", pattern: "", expected: [] }
    ];

    const kmp = new KMPAlgorithm();
    
    testCases.forEach(({ text, pattern, expected }, index) => {
        const result = kmp.search(text, pattern);
        console.log(`Test ${index + 1}:`, 
            result.join() === expected.join() ? "PASS" : "FAIL",
            `Expected: [${expected}], Got: [${result}]`
        );
    });
}

testKMP();
