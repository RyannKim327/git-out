/**
 * Returns the longest common *substring* of s and t.
 * If several substrings have the same maximum length the first one
 * encountered in `s` is returned.
 */
function longestCommonSubstring(s: string, t: string): string {
  if (s.length === 0 || t.length === 0) return '';

  // Ensure t is the shorter string to minimise memory
  if (t.length > s.length) [s, t] = [t, s];

  const m = t.length;
  // prev[j] = length of the longest suffix ending at s[i-1] and t[j-1]
  const prev: number[] = new Array(m + 1).fill(0);
  let maxLen = 0;
  let endPosS = 0; // 1-based index in s where the best substring ends

  for (let i = 1; i <= s.length; ++i) {
    const curr: number[] = new Array(m + 1).fill(0);
    for (let j = 1; j <= m; ++j) {
      if (s[i - 1] === t[j - 1]) {
        curr[j] = prev[j - 1] + 1;
        if (curr[j] > maxLen) {
          maxLen = curr[j];
          endPosS = i; // current char is at i-1, substring ends at i
        }
      }
      // else curr[j] stays 0
    }
    prev.splice(0, m + 1, ...curr); // copy curr into prev
  }
  return maxLen ? s.slice(endPosS - maxLen, endPosS) : '';
}

/* ---------- demo ---------- */
const a = 'ABABC';
const b = 'BABCA';
console.log(longestCommonSubstring(a, b)); // → "BABC"
