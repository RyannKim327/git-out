/**
 * Build the LPS (Longest Proper Prefix which is also a Suffix) array for a pattern.
 *
 * @param pattern - The pattern we are searching for.
 * @returns An array where lps[i] is the length of the longest proper prefix of pattern[0..i]
 *          that is also a suffix of pattern[0..i].
 */
function buildLPS(pattern: string): number[] {
    const m = pattern.length;
    const lps = new Array<number>(m).fill(0);

    // length of the previous longest prefix suffix
    let len = 0;
    // i starts from 1 because lps[0] is always 0
    let i = 1;

    while (i < m) {
        if (pattern[i] === pattern[len]) {
            // we can extend the current prefix
            len++;
            lps[i] = len;
            i++;
        } else {
            if (len !== 0) {
                // fall back to the previous longest prefix suffix
                len = lps[len - 1];
                // note: we do NOT increment i here
            } else {
                // no proper prefix suffix exists for this i
                lps[i] = 0;
                i++;
            }
        }
    }

    return lps;
}
pattern = "ABABCABAB"
index   =  0 1 2 3 4 5 6 7 8
lps     =  0 0 1 2 0 1 2 3 4
/**
 * Perform KMP string search.
 *
 * @param text    - The text (haystack) where we look for the pattern.
 * @param pattern - The pattern (needle) we want to find.
 * @returns An array of zero‑based indices in `text` where `pattern` starts.
 *
 * Example:
 *   kmpSearch("ababcababc", "ababc")  // → [0, 5]
 */
export function kmpSearch(text: string, pattern: string): number[] {
    const n = text.length;
    const m = pattern.length;

    if (m === 0) {
        // By convention, an empty pattern matches at every position.
        // Return all possible start indices (including the position after the last char).
        return Array.from({ length: n + 1 }, (_, i) => i);
    }

    const lps = buildLPS(pattern);
    const matches: number[] = [];

    let i = 0; // index for text
    let j = 0; // index for pattern

    while (i < n) {
        if (text[i] === pattern[j]) {
            i++;
            j++;

            if (j === m) {
                // Full pattern matched – record the start index
                matches.push(i - j);
                // Continue searching for overlapping matches
                j = lps[j - 1];
            }
        } else {
            if (j !== 0) {
                // Mismatch after j matches: fall back using LPS
                j = lps[j - 1];
            } else {
                // No prefix matched, move to next character in text
                i++;
            }
        }
    }

    return matches;
}
import { kmpSearch } from "./kmp";   // adjust the import path as needed

const text = "ababcababcababc";
const pattern = "ababc";

const positions = kmpSearch(text, pattern);
console.log(positions); // → [0, 5, 10]

// Demonstrating overlapping matches
console.log(kmpSearch("aaaaa", "aaa")); // → [0, 1, 2]
// kmp.ts
/**
 * KMP (Knuth‑Morris‑Pratt) string searching implementation.
 *
 * Exported functions:
 *   - buildLPS(pattern: string): number[]
 *   - kmpSearch(text: string, pattern: string): number[]
 *
 * Both functions are pure and have O(n + m) time complexity.
 */

function buildLPS(pattern: string): number[] {
    const m = pattern.length;
    const lps = new Array<number>(m).fill(0);
    let len = 0;
    let i = 1;

    while (i < m) {
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
}

/**
 * Returns all start indices where `pattern` occurs in `text`.
 *
 * @param text    The haystack.
 * @param pattern The needle.
 */
export function kmpSearch(text: string, pattern: string): number[] {
    const n = text.length;
    const m = pattern.length;

    if (m === 0) {
        return Array.from({ length: n + 1 }, (_, i) => i);
    }

    const lps = buildLPS(pattern);
    const matches: number[] = [];

    let i = 0; // text index
    let j = 0; // pattern index

    while (i < n) {
        if (text[i] === pattern[j]) {
            i++;
            j++;

            if (j === m) {
                matches.push(i - j);
                j = lps[j - 1]; // allow overlapping matches
            }
        } else {
            if (j !== 0) {
                j = lps[j - 1];
            } else {
                i++;
            }
        }
    }

    return matches;
}
