class KMP {
    /**
     * Builds the partial match table (also known as the failure function or LPS array)
     * for the KMP algorithm
     */
    private static buildPartialMatchTable(pattern: string): number[] {
        const table: number[] = new Array(pattern.length).fill(0);
        let length = 0; // length of the previous longest prefix suffix
        let i = 1;
        
        // table[0] is always 0
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
     * Finds all occurrences of pattern in text using KMP algorithm
     * @returns Array of starting indices where pattern is found
     */
    static search(text: string, pattern: string): number[] {
        if (pattern.length === 0) return [];
        if (text.length < pattern.length) return [];
        
        const table = this.buildPartialMatchTable(pattern);
        const indices: number[] = [];
        
        let i = 0; // index for text
        let j = 0; // index for pattern
        
        while (i < text.length) {
            if (pattern[j] === text[i]) {
                i++;
                j++;
            }
            
            if (j === pattern.length) {
                indices.push(i - j);
                j = table[j - 1];
            } else if (i < text.length && pattern[j] !== text[i]) {
                if (j !== 0) {
                    j = table[j - 1];
                } else {
                    i++;
                }
            }
        }
        
        return indices;
    }

    /**
     * Checks if pattern exists in text using KMP algorithm
     */
    static contains(text: string, pattern: string): boolean {
        return this.search(text, pattern).length > 0;
    }

    /**
     * Finds the first occurrence of pattern in text using KMP algorithm
     * @returns Starting index of first occurrence, or -1 if not found
     */
    static findFirst(text: string, pattern: string): number {
        const indices = this.search(text, pattern);
        return indices.length > 0 ? indices[0] : -1;
    }
}

// Alternative functional implementation
const kmpSearch = (text: string, pattern: string): number[] => {
    if (pattern.length === 0) return [];
    if (text.length < pattern.length) return [];
    
    const buildLPS = (pattern: string): number[] => {
        const lps: number[] = new Array(pattern.length).fill(0);
        let len = 0;
        let i = 1;
        
        while (i < pattern.length) {
            if (pattern[i] === pattern[len]) {
                len++;
                lps[i] = len;
                i++;
            } else {
                if (len !== 0) {
                    len = lps[len - 1];
                } else {
                    lps[i] = 0;
                    i++;
                }
            }
        }
        return lps;
    };
    
    const lps = buildLPS(pattern);
    const result: number[] = [];
    let i = 0, j = 0;
    
    while (i < text.length) {
        if (pattern[j] === text[i]) {
            i++;
            j++;
        }
        
        if (j === pattern.length) {
            result.push(i - j);
            j = lps[j - 1];
        } else if (i < text.length && pattern[j] !== text[i]) {
            if (j !== 0) {
                j = lps[j - 1];
            } else {
                i++;
            }
        }
    }
    
    return result;
};
// Example usage
const text = "ABABDABACDABABCABAB";
const pattern = "ABABCABAB";

// Using the class-based implementation
console.log("KMP.search:", KMP.search(text, pattern)); // [10]
console.log("KMP.contains:", KMP.contains(text, pattern)); // true
console.log("KMP.findFirst:", KMP.findFirst(text, pattern)); // 10

// Using the functional implementation
console.log("kmpSearch:", kmpSearch(text, pattern)); // [10]

// Multiple occurrences example
const multipleText = "AAAAA";
const multiplePattern = "AA";
console.log("Multiple occurrences:", KMP.search(multipleText, multiplePattern)); // [0, 1, 2, 3]

// Case where pattern is not found
const notFoundText = "ABCDEFG";
const notFoundPattern = "XYZ";
console.log("Not found:", KMP.search(notFoundText, notFoundPattern)); // []
// Performance comparison with naive string search
function naiveSearch(text: string, pattern: string): number[] {
    const indices: number[] = [];
    const n = text.length;
    const m = pattern.length;
    
    for (let i = 0; i <= n - m; i++) {
        let j: number;
        for (j = 0; j < m; j++) {
            if (text[i + j] !== pattern[j]) {
                break;
            }
        }
        if (j === m) {
            indices.push(i);
        }
    }
    return indices;
}

// Performance test
function testPerformance() {
    // Create a long text with repeated patterns
    const longText = "ABC".repeat(10000) + "XYZ" + "ABC".repeat(10000);
    const pattern = "XYZ";
    
    console.time("KMP Search");
    const kmpResult = KMP.search(longText, pattern);
    console.timeEnd("KMP Search");
    
    console.time("Naive Search");
    const naiveResult = naiveSearch(longText, pattern);
    console.timeEnd("Naive Search");
    
    console.log("Results match:", kmpResult.join() === naiveResult.join());
}

// testPerformance(); // Uncomment to run performance test
