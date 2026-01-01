dp[i][j] = length of the longest suffix of
           s1[0..i-1] and s2[0..j-1] that are equal
if s1[i-1] === s2[j-1]   dp[i][j] = dp[i-1][j-1] + 1
else                     dp[i][j] = 0
s1.slice(endIdx - maxLen, endIdx)
/**
 * Returns the longest common substring of two strings.
 * If there are several substrings with the same maximal length,
 * the one that appears first in `s1` is returned.
 *
 * @param s1 - first string
 * @param s2 - second string
 * @returns the longest common substring (empty string if none)
 */
export function longestCommonSubstring(s1: string, s2: string): string {
  // Edge cases – empty input
  if (!s1.length || !s2.length) return "";

  // Ensure we iterate over the shorter string as the "columns"
  // to keep the auxiliary arrays as small as possible.
  const [short, long] = s1.length < s2.length ? [s1, s2] : [s2, s1];
  const shortLen = short.length;
  const longLen = long.length;

  // Two rows of DP values (Uint16Array is enough because length ≤ 65535,
  // otherwise use Uint32Array or plain number[]).
  let prev = new Uint16Array(shortLen + 1);
  let curr = new Uint16Array(shortLen + 1);

  let maxLen = 0;      // length of the best substring found so far
  let endIdxLong = 0;  // index *after* the substring in the longer string

  // Iterate over each character of the longer string (outer loop)
  for (let i = 1; i <= longLen; i++) {
    const chLong = long.charAt(i - 1);

    // Reset the first column (dp[i][0] = 0)
    curr[0] = 0;

    // Iterate over the shorter string (inner loop)
    for (let j = 1; j <= shortLen; j++) {
      if (chLong === short.charAt(j - 1)) {
        // Extend the previous diagonal value
        curr[j] = prev[j - 1] + 1;

        // Update global maximum if we found a longer match
        if (curr[j] > maxLen) {
          maxLen = curr[j];
          // `i` is the index *after* the matching character in `long`
          endIdxLong = i;
        }
      } else {
        // No match → reset length for this cell
        curr[j] = 0;
      }
    }

    // Swap rows for the next iteration (no need to copy)
    const tmp = prev;
    prev = curr;
    curr = tmp;
  }

  // If the longer string was originally `s2`, we need to map the slice back.
  // The slice works on the original string that contributed the characters.
  const source = s1.length >= s2.length ? s1 : s2; // the string that was used as `long`
  const start = endIdxLong - maxLen;
  return source.slice(start, endIdxLong);
}
import { longestCommonSubstring } from "./lcs";

const a = "abracadabra";
const b = "ecadadab";

const result = longestCommonSubstring(a, b);
console.log(result); // → "cadab"
// 1. Simple overlap
console.assert(longestCommonSubstring("hello", "yellow") === "ello");

// 2. No overlap
console.assert(longestCommonSubstring("abc", "def") === "");

// 3. Whole string matches
console.assert(longestCommonSubstring("same", "same") === "same");

// 4. Multiple equal‑length candidates – returns the first one in the longer string
console.assert(longestCommonSubstring("abXYZcdXYZef", "123XYZ456XYZ") === "XYZ");

// 5. Unicode (UTF‑16 surrogate pairs)
console.assert(longestCommonSubstring("😀😃😄😁", "😃😄") === "😃😄");
function longestCommonSubstringGrapheme(s1: string, s2: string): string {
  const arr1 = Array.from(s1); // splits into grapheme clusters
  const arr2 = Array.from(s2);
  // reuse the same DP logic, just with arrays instead of .charAt()
  // (the implementation is identical, just replace .charAt with arr[i-1])
  // ... (you can copy‑paste the function above and replace the accesses)
}
