/**
 * Return the longest common substring of `a` and `b`.
 * If there are multiple substrings of the same maximum length,
 * the one that appears first in `a` is returned.
 */
export function longestCommonSubstring(a: string, b: string): string {
  if (!a || !b) return '';

  // Work with the shorter string in the second dimension
  const [s1, s2] = a.length < b.length ? [a, b] : [b, a];
  const len1 = s1.length;
  const len2 = s2.length;

  // dp[j] = longest suffix length ending at s1[i-1] and s2[j-1]
  let dp = new Array(len2 + 1).fill(0);
  let best = 0;
  let bestEndIdxS1 = 0; // end position (exclusive) in the longer string

  for (let i = 1; i <= len1; i++) {
    let prev = 0; // dp[j-1] from the previous row
    for (let j = 1; j <= len2; j++) {
      const temp = dp[j]; // value before updating; will become prev in next loop
      if (s1[i - 1] === s2[j - 1]) {
        // extend current matching suffix
        dp[j] = prev + 1;
        if (dp[j] > best) {
          best = dp[j];
          // bestEndIdxS1 refers to the longer/first string
          bestEndIdxS1 = i;
        }
      } else {
        dp[j] = 0;
      }
      prev = temp;
    }
  }

  // Extract the substring from the longer string
  if (best === 0) return '';
  const startIdx = bestEndIdxS1 - best;
  const longer = a.length >= b.length ? a : b;
  return longer.slice(startIdx, bestEndIdxS1);
}
console.log(longestCommonSubstring('abcdef', 'zabfxe')); // -> "abf"
console.log(longestCommonSubstring('aabcc', 'abc'));     // -> "abc"
console.log(longestCommonSubstring('xyz', 'abc'));      // -> ""
