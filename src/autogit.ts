export class BoyerMoore {
    private pattern: string;
    private m: number; // Length of pattern

    // Bad Character Rule: Stores the last occurrence index of each character in the pattern
    private badCharShift: Map<string, number>;

    // Good Suffix Rule: Stores the shift values for different matched suffixes
    // goodSuffixShifts[i] is the shift when the mismatch occurs at pattern[i-1],
    // meaning pattern[i...m-1] is the matched suffix.
    private goodSuffixShifts: number[];

    constructor(pattern: string) {
        this.pattern = pattern;
        this.m = pattern.length;

        if (this.m === 0) {
            throw new Error("Pattern cannot be empty.");
        }

        this.badCharShift = this.preprocessBadCharacters(pattern);
        this.goodSuffixShifts = this.preprocessGoodSuffix(pattern);
    }

    /**
     * Preprocesses the pattern to create the Bad Character Shift table.
     * For each character in the pattern, stores the index of its rightmost occurrence.
     * @param pattern The pattern string.
     * @returns A Map where keys are characters and values are their rightmost indices.
     */
    private preprocessBadCharacters(pattern: string): Map<string, number> {
        const lastOccurrence = new Map<string, number>();
        for (let i = 0; i < this.m; i++) {
            lastOccurrence.set(pattern[i], i);
        }
        return lastOccurrence;
    }

    /**
     * Preprocesses the pattern to create the Good Suffix Shift table.
     * This is the more complex part of Boyer-Moore. It involves two main cases:
     * 1. The matched suffix appears elsewhere in the pattern (and has a different preceding char).
     * 2. A suffix of the matched suffix is a prefix of the pattern.
     *
     * @param pattern The pattern string.
     * @returns An array where goodSuffixShifts[i] is the shift for a mismatch at pattern[i-1].
     */
    private preprocessGoodSuffix(pattern: string): number[] {
        const m = this.m;
        const shift = new Array<number>(m + 1).fill(0); // Shift values for each suffix length
        const borderArray = new Array<number>(m + 1).fill(0); // KMP-like border array for reversed pattern

        // Phase 1: Compute borderArray (similar to KMP's LPS array, but for suffixes)
        // borderArray[i] stores the length of the longest suffix of pattern[0...i-1] that is also a prefix of pattern.
        // This is done by comparing pattern from right-to-left.
        let i = m, j = m + 1;
        borderArray[i] = j; // Sentinel
        while (i > 0) {
            // While characters don't match, or we've reached the start of the pattern
            while (j <= m && pattern[i - 1] !== pattern[j - 1]) {
                // If a shift hasn't been defined for this suffix length, define it.
                // The shift is the difference between the current length (j) and the border's start (i).
                if (shift[j] === 0) {
                    shift[j] = j - i;
                }
                // Fallback to a shorter border (similar to KMP's prefix function)
                j = borderArray[j];
            }
            i--;
            j--;
            borderArray[i] = j; // Store the current border length
        }

        // Phase 2: Fill in remaining shifts based on borders of the entire pattern
        // This handles cases where no matching suffix is found elsewhere,
        // but a prefix of the pattern matches a suffix of the currently aligned text.
        let k = borderArray[0]; // Length of the longest border of the entire pattern
        for (i = 0; i <= m; i++) {
            if (shift[i] === 0) { // If no specific shift was found in Phase 1 for this suffix length
                shift[i] = k; // Use the length of the current longest border
            }
            if (i === k) { // If we've processed all suffixes up to this border length
                k = borderArray[k]; // Move to the next shorter border
            }
        }
        return shift;
    }

    /**
     * Searches for all occurrences of the pattern in the given text using the Boyer-Moore algorithm.
     * @param text The text to search within.
     * @returns An array of starting indices where the pattern is found.
     */
    public search(text: string): number[] {
        const n = text.length; // Length of text
        const m = this.m;

        if (m === 0) {
            // An empty pattern matches at every position including after the last character
            return Array.from({ length: n + 1 }, (_, i) => i);
        }
        if (n === 0 || m > n) {
            return []; // No text, or pattern longer than text, no matches possible
        }

        const matches: number[] = [];
        let s = 0; // s is the shift of the pattern with respect to the text

        while (s <= n - m) {
            let j = m - 1; // Start comparing from the end of the pattern

            // Keep comparing pattern and text from right to left
            while (j >= 0 && this.pattern[j] === text[s + j]) {
                j--;
            }

            // If pattern found (j < 0 means all characters matched)
            if (j < 0) {
                matches.push(s);
                // Shift the pattern using the Good Suffix Rule for a full match.
                // goodSuffixShifts[0] gives the shift for an empty matched suffix (full pattern match).
                s += this.goodSuffixShifts[0];
            } else {
                // Mismatch occurred at pattern[j]
                // Calculate shift using Bad Character Rule
                const charInText = text[s + j];
                const lastOcc = this.badCharShift.get(charInText) ?? -1; // If char not in pattern, treat as -1
                const bcShift = Math.max(1, j - lastOcc); // Shift must be at least 1

                // Calculate shift using Good Suffix Rule
                // If mismatch at pattern[j], the matched suffix is pattern[j+1...m-1].
                // The length of this matched suffix is m - (j + 1).
                // goodSuffixShifts[k] is for a suffix of length k, so we use j+1.
                const gsShift = this.goodSuffixShifts[j + 1];

                // Apply the maximum of the two shifts
                s += Math.max(bcShift, gsShift);
            }
        }

        return matches;
    }
}

// --- Example Usage ---

// 1. Basic search
const bm1 = new BoyerMoore("EXAMPLE");
console.log("Basic search 'EXAMPLE' in 'THIS IS A SIMPLE EXAMPLE TEXT':", bm1.search("THIS IS A SIMPLE EXAMPLE TEXT")); // Expected: [19]

// 2. Multiple occurrences
const bm2 = new BoyerMoore("ABA");
console.log("Multiple occurrences 'ABA' in 'ABAAABA':", bm2.search("ABAAABA")); // Expected: [0, 4]

// 3. No occurrence
const bm3 = new BoyerMoore("XYZ");
console.log("No occurrence 'XYZ' in 'ABCDEFG':", bm3.search("ABCDEFG")); // Expected: []

// 4. Pattern longer than text
const bm4 = new BoyerMoore("LONGER");
console.log("Pattern longer 'LONGER' than text 'SHORT':", bm4.search("SHORT")); // Expected: []

// 5. Pattern at start and end
const bm5 = new BoyerMoore("TEST");
console.log("Pattern at start/end 'TEST' in 'TESTING A TEST STRING':", bm5.search("TESTING A TEST STRING")); // Expected: [0, 10]

// 6. Overlapping matches (Boyer-Moore finds non-overlapping matches effectively, but reports all starting positions)
const bm6 = new BoyerMoore("AAAA");
console.log("Overlapping 'AAAA' in 'AAAAAAAAA':", bm6.search("AAAAAAAAA")); // Expected: [0, 1, 2, 3, 4, 5]

// 7. Empty text (handled in search method)
const bm7 = new BoyerMoore("ABC");
console.log("Empty text 'ABC' in '':", bm7.search("")); // Expected: []

// 8. Empty pattern (handled in constructor or search method)
try {
    new BoyerMoore("");
} catch (e: any) {
    console.log("Empty pattern error:", e.message); // Expected: Pattern cannot be empty.
}

// 9. Edge case with single character pattern
const bm8 = new BoyerMoore("A");
console.log("Single char pattern 'A' in 'BANANA':", bm8.search("BANANA")); // Expected: [1, 3, 5]

// 10. Complex case
const bm9 = new BoyerMoore("GEEKSFORGEEKS");
console.log("Complex 'GEEKSFORGEEKS' in 'GEEKSFORGEEKS A COMPUTER SCIENCE PORTAL GEEKSFORGEEKS':",
    bm9.search("GEEKSFORGEEKS A COMPUTER SCIENCE PORTAL GEEKSFORGEEKS")); // Expected: [0, 37]

// 11. Pattern contains characters not in text (or vice versa)
const bm10 = new BoyerMoore("ABC");
console.log("Pattern with unique chars 'ABC' in 'DEF':", bm10.search("DEF")); // Expected: []
