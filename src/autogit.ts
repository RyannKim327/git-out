// kmp.ts
export interface MatchResult {
  start: number;      // index of first character of the match
  end: number;        // index *after* last character of the match
  length: number;     // pattern.length
}

/**
 * Pre-compute the KMP "longest-prefix-suffix" (lps) table.
 * Time  : O(m)
 * Memory: O(m)
 */
function buildLpsTable(pattern: string): Uint32Array {
  const m = pattern.length;
  const lps = new Uint32Array(m);
  let len = 0;          // length of the previous longest prefix suffix

  for (let i = 1; i < m; ) {
    if (pattern[i] === pattern[len]) {
      lps[i++] = ++len;
    } else if (len !== 0) {
      len = lps[len - 1]; // fallback in the prefix
    } else {
      lps[i++] = 0;
    }
  }
  return lps;
}

/**
 * Return *all* non-overlapping occurrences of `pattern` in `text`.
 * If you want overlapping matches, change the `pos` update rule (see comment).
 *
 * Time  : O(n + m)
 * Memory: O(m)  (only the lps table)
 */
export function findAll(
  text: string,
  pattern: string,
  caseInsensitive = false
): MatchResult[] {
  if (pattern.length === 0) return [];

  const src = caseInsensitive ? text.toLowerCase() : text;
  const pat = caseInsensitive ? pattern.toLowerCase() : pattern;

  const lps = buildLpsTable(pat);
  const matches: MatchResult[] = [];

  let i = 0; // index for text
  let j = 0; // index for pattern

  while (i < src.length) {
    if (src[i] === pat[j]) {
      i++;
      j++;
    }

    if (j === pat.length) {
      // match found at [i-j, i)
      matches.push({ start: i - j, end: i, length: pat.length });

      // --- non-overlapping: skip ahead ------------------------------
      j = 0;
      // --- overlapping: use  j = lps[j - 1];  instead ---------------
    } else if (i < src.length && src[i] !== pat[j]) {
      if (j !== 0) {
        j = lps[j - 1];
      } else {
        i++;
      }
    }
  }
  return matches;
}

/**
 * Convenience wrapper when you only care about the first match.
 * Returns `null` if not found.
 */
export function findFirst(
  text: string,
  pattern: string,
  caseInsensitive = false
): MatchResult | null {
  const m = findAll(text, pattern, caseInsensitive);
  return m.length ? m[0] : null;
}

/**
 * Count matches without allocating result objects.
 */
export function count(text: string, pattern: string, caseInsensitive = false): number {
  if (pattern.length === 0) return 0;
  const src = caseInsensitive ? text.toLowerCase() : text;
  const pat = caseInsensitive ? pattern.toLowerCase() : pattern;
  const lps = buildLpsTable(pat);

  let i = 0;
  let j = 0;
  let c = 0;

  while (i < src.length) {
    if (src[i] === pat[j]) {
      i++;
      j++;
    }
    if (j === pat.length) {
      c++;
      j = 0;            // non-overlapping
    } else if (i < src.length && src[i] !== pat[j]) {
      j = j !== 0 ? lps[j - 1] : 0;
      if (j === 0) i++;
    }
  }
  return c;
}
import { findAll, findFirst, count } from './kmp';

const text = 'abracadabra';
const pattern = 'abra';

console.log(findAll(text, pattern));
// → [ { start: 0, end: 4, length: 4 }, { start: 7, end: 11, length: 4 } ]

console.log(findFirst(text, 'CAD', true));
// → { start: 4, end: 7, length: 3 }

console.log(count('aaaa', 'aa', false)); // non-overlapping → 2
