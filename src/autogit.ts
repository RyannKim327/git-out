/**
 * Computes the LPS array for a given pattern.
 * For each index i, lps[i] is the length of the longest
 * proper prefix that is also a suffix for pattern[0..i].
 */
function buildLps(pattern: string): number[] {
    const lps = new Array(pattern.length).fill(0);
    let length = 0;          // length of previous longest prefix suffix
    let i = 1;

    while (i < pattern.length) {
        if (pattern[i] === pattern[length]) {
            length++;
            lps[i] = length;
            i++;
        } else {
            if (length !== 0) {
                // try the previous longest prefix suffix
                length = lps[length - 1];
            } else {
                lps[i] = 0;
                i++;
            }
        }
    }
    return lps;
}
/**
 * Returns the starting indices of all occurrences of `pattern`
 * inside `text`. If the pattern is empty, an empty array is returned.
 */
export function kmpSearch(text: string, pattern: string): number[] {
    if (pattern.length === 0) return [];

    const lps = buildLps(pattern);
    const result: number[] = [];

    let i = 0; // index for text
    let j = 0; // index for pattern

    while (i < text.length) {
        if (text[i] === pattern[j]) {
            i++; j++;
            if (j === pattern.length) {
                // match found; record start index
                result.push(i - j);
                // continue searching for next possible match
                j = lps[j - 1];
            }
        } else {
            if (j !== 0) {
                // fall back in pattern
                j = lps[j - 1];
            } else {
                i++;
            }
        }
    }
    return result;
}
const haystack = "ABABDABACDABABCABAB";
const needle  = "ABABCABAB";

console.log(kmpSearch(haystack, needle));
// → [10]
