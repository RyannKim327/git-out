/**
 * Returns the longest common substring of two strings.
 *
 * @param a - First string
 * @param b - Second string
 * @returns An object containing:
 *   - substring: the longest common substring (empty string if none)
 *   - length:    its length (0 if none)
 *   - indices:   { aStart, aEnd, bStart, bEnd } positions in the original strings
 */
export function longestCommonSubstring(
  a: string,
  b: string
): {
  substring: string;
  length: number;
  indices: { aStart: number; aEnd: number; bStart: number; bEnd: number };
} {
  // Edge cases – empty inputs
  if (!a.length || !b.length) {
    return {
      substring: '',
      length: 0,
      indices: { aStart: -1, aEnd: -1, bStart: -1, bEnd: -1 },
    };
  }

  // Ensure we allocate the smaller DP array (space O(min(n,m)))
  const [shorter, longer, swap] = a.length < b.length ? [a, b, false] : [b, a, true];
  const n = longer.length;
  const m = shorter.length;

  // DP rows: previous and current
  let prev = new Uint16Array(m + 1); // Uint16 is enough for lengths up to 65535; use Uint32Array for longer strings
  let curr = new Uint16Array(m + 1);

  let maxLen = 0;      // length of the best substring found so far
  let endIdxLong = 0;  // index *after* the substring in the longer string
  let endIdxShort = 0; // same for the shorter string (used only for indices)

  for (let i = 1; i <= n; i++) {
    const chLong = longer.charAt(i - 1);
    // Reset first column (j = 0) – it stays 0 automatically because Uint16Array is zero‑filled
    for (let j = 1; j <= m; j++) {
      if (chLong === shorter.charAt(j - 1)) {
        // Extend the previous diagonal value
        curr[j] = (prev[j - 1] + 1) as unknown as number;
        if (curr[j] > maxLen) {
          maxLen = curr[j];
          endIdxLong = i;          // i is 1‑based, so this is the index *after* the substring
          endIdxShort = j;
        }
      } else {
        curr[j] = 0;
      }
    }
    // Swap rows for next iteration
    const tmp = prev;
    prev = curr;
    curr = tmp;
  }

  // Recover the substring from the original strings (respect original order)
  const substring = longer.slice(endIdxLong - maxLen, endIdxLong);

  // Translate indices back to the original argument order
  const result = swap
    ? {
        // we swapped a ↔ b, so swap back the indices
        aStart: endIdxShort - maxLen,
        aEnd: endIdxShort,
        bStart: endIdxLong - maxLen,
        bEnd: endIdxLong,
      }
    : {
        aStart: endIdxLong - maxLen,
        aEnd: endIdxLong,
        bStart: endIdxShort - maxLen,
        bEnd: endIdxShort,
      };

  return {
    substring,
    length: maxLen,
    indices: result,
  };
}
import { longestCommonSubstring } from './lcs';

const s1 = 'abracadabra';
const s2 = 'ecadadabrc';

const result = longestCommonSubstring(s1, s2);

console.log('Longest common substring:', result.substring); // "cad"
console.log('Length:', result.length);                       // 3
console.log('Indices in s1:', result.indices.aStart, result.indices.aEnd); // 4 7
console.log('Indices in s2:', result.indices.bStart, result.indices.bEnd); // 2 5
// 1. Simple match
console.assert(longestCommonSubstring('hello', 'yellow').substring === 'ello');

// 2. No common substring
console.assert(longestCommonSubstring('abc', 'def').length === 0);

// 3. Whole string match
console.assert(longestCommonSubstring('same', 'same').substring === 'same');

// 4. Multiple equal‑length candidates – returns the first found
console.assert(
  longestCommonSubstring('abXYZcdXYZef', '12XYZ34XYZ56').substring === 'XYZ'
);
function lcs(a: string, b: string) {
  const n = a.length, m = b.length;
  const dp = new Uint16Array(m + 1);
  let max = 0, end = 0;
  for (let i = 1; i <= n; i++) {
    let prev = 0;
    for (let j = 1; j <= m; j++) {
      const cur = dp[j];
      dp[j] = a[i - 1] === b[j - 1] ? prev + 1 : 0;
      if (dp[j] > max) { max = dp[j]; end = i; }
      prev = cur;
    }
  }
  return a.slice(end - max, end);
}
