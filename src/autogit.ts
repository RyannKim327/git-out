class KMP {
    /**
     * Builds the partial match table (also known as failure function or LPS array)
     * for the given pattern
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
     * Searches for all occurrences of pattern in text using KMP algorithm
     * @returns Array of indices where pattern starts in text
     */
    static search(text: string, pattern: string): number[] {
        if (pattern.length === 0) return [];
        if (text.length < pattern.length) return [];

        const indices: number[] = [];
        const table = this.buildPartialMatchTable(pattern);
        
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
     * @returns Boolean indicating if pattern was found
     */
    static contains(text: string, pattern: string): boolean {
        return this.search(text, pattern).length > 0;
    }

    /**
     * Finds the first occurrence of pattern in text
     * @returns Index of first occurrence, or -1 if not found
     */
    static findFirst(text: string, pattern: string): number {
        const result = this.search(text, pattern);
        return result.length > 0 ? result[0] : -1;
    }
}
// Example usage
const text = "ABABDABACDABABCABAB";
const pattern = "ABABCABAB";

console.log("Text:", text);
console.log("Pattern:", pattern);

// Find all occurrences
const occurrences = KMP.search(text, pattern);
console.log("All occurrences:", occurrences); // [10]

// Check if pattern exists
const exists = KMP.contains(text, pattern);
console.log("Pattern exists:", exists); // true

// Find first occurrence
const firstIndex = KMP.findFirst(text, pattern);
console.log("First occurrence at:", firstIndex); // 10

// Edge cases
console.log("Empty pattern:", KMP.search("hello", "")); // []
console.log("Pattern longer than text:", KMP.search("hi", "hello")); // []
console.log("No match:", KMP.search("hello world", "xyz")); // []
console.log("Multiple matches:", KMP.search("abababab", "ab")); // [0, 2, 4, 6]
class KMPStringMatcher {
    private pattern: string;
    private table: number[];

    constructor(pattern: string) {
        this.pattern = pattern;
        this.table = this.buildPartialMatchTable(pattern);
    }

    private buildPartialMatchTable(pattern: string): number[] {
        const table: number[] = new Array(pattern.length).fill(0);
        let length = 0;
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

    search(text: string): number[] {
        if (this.pattern.length === 0) return [];
        if (text.length < this.pattern.length) return [];

        const indices: number[] = [];
        let i = 0;
        let j = 0;

        while (i < text.length) {
            if (this.pattern[j] === text[i]) {
                i++;
                j++;
            }

            if (j === this.pattern.length) {
                indices.push(i - j);
                j = this.table[j - 1];
            } else if (i < text.length && this.pattern[j] !== text[i]) {
                if (j !== 0) {
                    j = this.table[j - 1];
                } else {
                    i++;
                }
            }
        }

        return indices;
    }

    contains(text: string): boolean {
        return this.search(text).length > 0;
    }

    findFirst(text: string): number {
        const result = this.search(text);
        return result.length > 0 ? result[0] : -1;
    }
}

// Usage
const matcher = new KMPStringMatcher("ABABCABAB");
const text = "ABABDABACDABABCABAB";
console.log("Occurrences:", matcher.search(text)); // [10]
console.log("Contains:", matcher.contains(text)); // true
