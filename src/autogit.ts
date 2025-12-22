class KMPAlgorithm {
    /**
     * Preprocesses the pattern to create the failure function (prefix table)
     * @param pattern - The pattern to search for
     * @returns The prefix table (failure function)
     */
    private buildFailureFunction(pattern: string): number[] {
        const m = pattern.length;
        const failure: number[] = new Array(m).fill(0);
        
        let length = 0; // length of the previous longest prefix suffix
        let i = 1;
        
        while (i < m) {
            if (pattern[i] === pattern[length]) {
                length++;
                failure[i] = length;
                i++;
            } else {
                if (length !== 0) {
                    length = failure[length - 1];
                } else {
                    failure[i] = 0;
                    i++;
                }
            }
        }
        
        return failure;
    }
    
    /**
     * Searches for all occurrences of pattern in text using KMP algorithm
     * @param text - The text to search in
     * @param pattern - The pattern to search for
     * @returns Array of starting indices where pattern is found
     */
    search(text: string, pattern: string): number[] {
        if (pattern.length === 0) return [];
        
        const n = text.length;
        const m = pattern.length;
        const failure = this.buildFailureFunction(pattern);
        const occurrences: number[] = [];
        
        let i = 0; // index for text
        let j = 0; // index for pattern
        
        while (i < n) {
            if (pattern[j] === text[i]) {
                i++;
                j++;
            }
            
            if (j === m) {
                occurrences.push(i - j);
                j = failure[j - 1];
            } else if (i < n && pattern[j] !== text[i]) {
                if (j !== 0) {
                    j = failure[j - 1];
                } else {
                    i++;
                }
            }
        }
        
        return occurrences;
    }
    
    /**
     * Searches for first occurrence only
     * @param text - The text to search in
     * @param pattern - The pattern to search for
     * @returns First occurrence index or -1 if not found
     */
    searchFirst(text: string, pattern: string): number {
        const occurrences = this.search(text, pattern);
        return occurrences.length > 0 ? occurrences[0] : -1;
    }
    
    /**
     * Checks if pattern exists in text
     * @param text - The text to search in
     * @param pattern - The pattern to search for
     * @returns Boolean indicating if pattern was found
     */
    contains(text: string, pattern: string): boolean {
        return this.searchFirst(text, pattern) !== -1;
    }
}
// Example usage
const kmp = new KMPAlgorithm();

const text = "ABABDABACDABABCABAB";
const pattern = "ABABCABAB";

console.log("Text:", text);
console.log("Pattern:", pattern);

// Find all occurrences
const occurrences = kmp.search(text, pattern);
console.log("Occurrences at indices:", occurrences); // [10]

// Find first occurrence
const firstOccurrence = kmp.searchFirst(text, pattern);
console.log("First occurrence at index:", firstOccurrence); // 10

// Check if pattern exists
const exists = kmp.contains(text, pattern);
console.log("Pattern exists in text:", exists); // true
function buildFailureFunction(pattern: string): number[] {
    const m = pattern.length;
    const failure: number[] = new Array(m).fill(0);
    
    let length = 0;
    let i = 1;
    
    while (i < m) {
        if (pattern[i] === pattern[length]) {
            length++;
            failure[i] = length;
            i++;
        } else {
            if (length !== 0) {
                length = failure[length - 1];
            } else {
                failure[i] = 0;
                i++;
            }
        }
    }
    
    return failure;
}

function kmpSearch(text: string, pattern: string): number[] {
    if (pattern.length === 0) return [];
    
    const failure = buildFailureFunction(pattern);
    const n = text.length;
    const m = pattern.length;
    const occurrences: number[] = [];
    
    let i = 0;
    let j = 0;
    
    while (i < n) {
        if (pattern[j] === text[i]) {
            i++;
            j++;
        }
        
        if (j === m) {
            occurrences.push(i - j);
            j = failure[j - 1];
        } else if (i < n && pattern[j] !== text[i]) {
            if (j !== 0) {
                j = failure[j - 1];
            } else {
                i++;
            }
        }
    }
    
    return occurrences;
}

// Usage
const result = kmpSearch("hello world", "world");
console.log(result); // [6]
function naiveSearch(text: string, pattern: string): number[] {
    const occurrences: number[] = [];
    const n = text.length;
    const m = pattern.length;
    
    for (let i = 0; i <= n - m; i++) {
        let j = 0;
        while (j < m && text[i + j] === pattern[j]) {
            j++;
        }
        if (j === m) {
            occurrences.push(i);
        }
    }
    
    return occurrences;
}

// Test performance
const longText = "a".repeat(10000) + "b" + "a".repeat(10000);
const longPattern = "a".repeat(1000) + "b";

console.time("Naive Search");
const naiveResult = naiveSearch(longText, longPattern);
console.timeEnd("Naive Search");

console.time("KMP Search");
const kmpResult = kmpSearch(longText, longPattern);
console.timeEnd("KMP Search");

console.log("Results match:", JSON.stringify(naiveResult) === JSON.stringify(kmpResult));
