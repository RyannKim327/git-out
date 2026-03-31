/**
 * Builds the LPS (Longest Proper Prefix which is also Suffix) table for `pattern`.
 * The table tells us how far to jump when a mismatch occurs.
 */
function buildLPS(pattern: string): number[] {
  const lps = new Array(pattern.length).fill(0);
  let length = 0;            // length of the previous longest prefix suffix
  let i = 1;                 // we start from the second character

  while (i < pattern.length) {
    if (pattern[i] === pattern[length]) {
      length++;
      lps[i] = length;
      i++;
    } else {
      if (length !== 0) {
        length = lps[length - 1];
        // we don't increment i here; we try the new length
      } else {
        lps[i] = 0;
        i++;
      }
    }
  }

  return lps;
}

/**
 * Returns an array of all start indices where `pattern` is found in `text`.
 * If the pattern has length 0, returns an empty array (no meaningful search).
 */
export function kmpSearch(text: string, pattern: string): number[] {
  if (pattern.length === 0) return [];

  const lps   = buildLPS(pattern);
  const indices: number[] = [];

  let i = 0; // index for text
  let j = 0; // index for pattern

  while (i < text.length) {
    if (text[i] === pattern[j]) {
      i++;
      j++;
    }

    if (j === pattern.length) {
      // full match found
      indices.push(i - j);
      j = lps[j - 1]; // continue searching for next possible match
    } else if (i < text.length && text[i] !== pattern[j]) {
      // mismatch after j matches
      if (j !== 0) {
        j = lps[j - 1];
      } else {
        i++;
      }
    }
  }

  return indices;
}
import { kmpSearch } from './kmp';

const text = 'ABABDABACDABABCABAB';
const pattern = 'ABCABAB';

const positions = kmpSearch(text, pattern);
console.log(positions);   // → [ 9 ]
export function kmpIndexOf(text: string, pattern: string): number {
  const matches = kmpSearch(text, pattern);
  return matches.length > 0 ? matches[0] : -1;
}
