/**
 * Build the LPS (Longest Proper Prefix which is also a Suffix) array for a pattern.
 *
 * For each position i (0‑based) in the pattern, lps[i] stores the length of the
 * longest proper prefix of pattern[0..i] that is also a suffix of this substring.
 *
 * @param pattern The pattern string for which to compute the LPS table.
 * @returns An array of numbers with length = pattern.length.
 */
function buildLPS(pattern: string): number[] {
    const m = pattern.length;
    const lps = new Array<number>(m).fill(0);

    // length of the previous longest prefix‑suffix
    let len = 0;
    // i starts from 1 because lps[0] is always 0
    let i = 1;

    while (i < m) {
        if (pattern[i] === pattern[len]) {
            // we can extend the current prefix‑suffix
            len++;
            lps[i] = len;
            i++;
        } else {
            if (len !== 0) {
                // fall back to the previous longest prefix‑suffix
                len = lps[len - 1];
                // note: we do NOT increment i here
            } else {
                // no proper prefix‑suffix exists for this i
                lps[i] = 0;
                i++;
            }
        }
    }

    return lps;
}
/**
 * Perform KMP string search.
 *
 * @param text    The text (haystack) where we look for the pattern.
 * @param pattern The pattern (needle) we want to find.
 * @returns An array with all starting indices in `text` where `pattern` occurs.
 *          If the pattern is not found, the array is empty.
 */
export function kmpSearch(text: string, pattern: string): number[] {
    const n = text.length;
    const m = pattern.length;

    // Edge cases – treat empty pattern as matching at every position
    if (m === 0) {
        // By convention we return every possible start index
        return Array.from({ length: n + 1 }, (_, i) => i);
    }
    if (n === 0) return [];

    const lps = buildLPS(pattern);
    const result: number[] = [];

    let i = 0; // index for text
    let j = 0; // index for pattern

    while (i < n) {
        if (text[i] === pattern[j]) {
            i++;
            j++;

            // Full match of the pattern
            if (j === m) {
                result.push(i - j); // start index of the match
                // Continue searching for overlapping matches
                j = lps[j - 1];
            }
        } else {
            if (j !== 0) {
                // Mismatch after j matches – use LPS to skip comparisons
                j = lps[j - 1];
            } else {
                // No prefix matched, move to the next character in text
                i++;
            }
        }
    }

    return result;
}
import { kmpSearch } from "./kmp"; // adjust the import path as needed

const text = "ababcabcabababd";
const pattern = "ababd";

const matches = kmpSearch(text, pattern);
console.log(matches); // → [10]

// Demonstrating overlapping matches
console.log(kmpSearch("aaaaa", "aa")); // → [0, 1, 2, 3]

// Empty pattern (convention: matches at every position)
console.log(kmpSearch("hello", "")); // → [0,1,2,3,4,5]
export class KMP {
    private readonly pattern: string;
    private readonly lps: number[];

    constructor(pattern: string) {
        this.pattern = pattern;
        this.lps = buildLPS(pattern);
    }

    /** Returns all start indices of `pattern` inside `text`. */
    public search(text: string): number[] {
        const n = text.length;
        const m = this.pattern.length;
        const result: number[] = [];

        if (m === 0) {
            return Array.from({ length: n + 1 }, (_, i) => i);
        }
        if (n === 0) return [];

        let i = 0, j = 0;
        while (i < n) {
            if (text[i] === this.pattern[j]) {
                i++; j++;
                if (j === m) {
                    result.push(i - j);
                    j = this.lps[j - 1];
                }
            } else {
                if (j !== 0) j = this.lps[j - 1];
                else i++;
            }
        }
        return result;
    }
}
const kmp = new KMP("ababd");
console.log(kmp.search("ababcabcabababd")); // → [10]
