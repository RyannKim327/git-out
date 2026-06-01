/**
 * Build the longest‑prefix‑suffix (LPS) table for a pattern.
 * lps[i] = length of the longest proper prefix of pattern[0…i]
 * that is also a suffix of this substring.
 *
 * @param pattern – string to preprocess
 * @returns array of LPS values
 */
function buildLps(pattern: string): number[] {
  const lps = new Array(pattern.length).fill(0);
  let len = 0;                     // length of the previous longest prefix‑suffix
  let i = 1;

  while (i < pattern.length) {
    if (pattern[i] === pattern[len]) {
      len++;
      lps[i] = len;
      i++;
    } else {
      if (len !== 0) {
        // fall back to the previous longest prefix‑suffix
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
 * Classic KMP string search.
 *
 * @param text    – the text to search in
 * @param pattern – the pattern to find
 * @returns all starting indices where pattern occurs in text
 */
export function kmpSearch(text: string, pattern: string): number[] {
  if (pattern.length === 0) return [];

  const lps = buildLps(pattern);
  const result: number[] = [];

  let i = 0; // index for text
  let j = 0; // index for pattern

  while (i < text.length) {
    if (text[i] === pattern[j]) {
      i++;
      j++;
    }

    if (j === pattern.length) {
      // match found at i - j
      result.push(i - j);
      // continue searching for the next match
      j = lps[j - 1];
    } else if (i < text.length && text[i] !== pattern[j]) {
      if (j !== 0) {
        j = lps[j - 1];
      } else {
        i++;
      }
    }
  }

  return result;
}
import { kmpSearch } from "./kmp";

const text = "abxabcabcaby";
const pattern = "abcaby";

const matches = kmpSearch(text, pattern);
console.log(matches); // [6]
