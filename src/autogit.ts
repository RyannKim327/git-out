// kmp.ts
/**
 * Builds the LPS (Longest Prefix Suffix) array for a pattern.
 * lps[i] = length of the longest proper prefix of pattern[0..i]
 * that is also a suffix of pattern[0..i].
 */
export function buildLPS(pattern: string): number[] {
    const lps = new Array(pattern.length).fill(0);
    let length = 0;               // length of the previous longest prefix suffix
    let i = 1;                    // lps[0] is always 0, so start from 1

    while (i < pattern.length) {
        if (pattern[i] === pattern[length]) {
            length++;
            lps[i] = length;
            i++;
        } else {
            if (length !== 0) {
                // Fall back to the previous longest prefix
                length = lps[length - 1];
                // No i++ here – we try the same i again with the new length
            } else {
                lps[i] = 0;
                i++;
            }
        }
    }
    return lps;
}

/**
 * KMP search for all occurrences of pattern inside text.
 * Returns an array of 0‑based starting indices.
 */
export function kmpSearch(text: string, pattern: string): number[] {
    if (pattern.length === 0) return [];

    const lps = buildLPS(pattern);
    const result: number[] = [];
    let i = 0; // index for text
    let j = 0; // index for pattern

    while (i < text.length) {
        if (text[i] === pattern[j]) {
            i++;
            j++;

            if (j === pattern.length) {
                // pattern found – push starting index
                result.push(i - j);
                // continue searching for next possible match
                j = lps[j - 1];
            }
        } else if (j !== 0) {
            // Fallback on pattern using LPS table
            j = lps[j - 1];
        } else {
            // No match at the current position of `text`
            i++;
        }
    }

    return result;
}
import { kmpSearch } from "./kmp";

const txt = "ABABDABACDABABCABAB";
const pat = "ABABCABAB";

const matches = kmpSearch(txt, pat);
console.log(matches); // → [ 10 ]
