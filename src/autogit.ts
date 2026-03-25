/**
 * Returns the longest common contiguous substring of two strings.
 * If there are multiple with the same length, the first one found
 * (by scanning from the top‑left of the DP table) is returned.
 *
 * @param s1 First string
 * @param s2 Second string
 * @returns The longest common substring
 */
export function longestCommonSubstring(s1: string, s2: string): string {
  const m = s1.length;
  const n = s2.length;

  // Early exit for empty input
  if (m === 0 || n === 0) return '';

  // dp[i][j] holds length of longest common suffix of s1[0..i-1] and s2[0..j-1]
  const dp: number[][] = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));

  let maxLen = 0;
  let endPosInS1 = 0; // index where the best substring ends in s1

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (s1[i - 1] === s2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
        if (dp[i][j] > maxLen) {
          maxLen = dp[i][j];
          endPosInS1 = i; // i is exclusive, so substring ends at i-1
        }
      } else {
        dp[i][j] = 0;
      }
    }
  }

  if (maxLen === 0) return ''; // no common substring

  // Slice out the substring from the first string
  return s1.slice(endPosInS1 - maxLen, endPosInS1);
}
const a = 'ababc';
const b = 'babca';

console.log(longestCommonSubstring(a, b)); // outputs: 'abc'
export function longestCommonSubstringLength(s1: string, s2: string): number {
  const [a, b] = s1.length >= s2.length ? [s1, s2] : [s2, s1]; // make b the shorter string
  const m = a.length, n = b.length;
  const prev = new Uint32Array(n + 1);
  let maxLen = 0;

  for (let i = 1; i <= m; i++) {
    const cur = new Uint32Array(n + 1);
    const ca = a.charCodeAt(i - 1);

    for (let j = 1; j <= n; j++) {
      if (ca === b.charCodeAt(j - 1)) {
        cur[j] = prev[j - 1] + 1;
        if (cur[j] > maxLen) maxLen = cur[j];
      }
    }
    prev.set(cur);
  }
  return maxLen;
}
