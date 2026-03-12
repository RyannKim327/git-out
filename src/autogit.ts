Let   S = s1 s2 … sn
      T = t1 t2 … tm

DP[i][j] = length of the longest common suffix that ends at S[i‑1] and T[j‑1]
DP[i][j] = DP[i-1][j-1] + 1
/**
 * Returns the longest common substring of `a` and `b`.
 * If there are multiple substrings of the same maximum length,
 * the first one found in `a` will be returned.
 */
export function longestCommonSubstring(a: string, b: string): string {
  const n = a.length, m = b.length;
  if (n === 0 || m === 0) return '';

  // `prev` holds DP values for row i-1
  const prev = new Array(m + 1).fill(0);
  // `curr` holds DP values for current row i
  const curr = new Array(m + 1).fill(0);

  let maxLen = 0;          // longest length so far
  let maxEndIndexA = 0;    // index in `a` where this substring ends

  for (let i = 1; i <= n; i++) {
    // Iterate columns
    for (let j = 1; j <= m; j++) {
      if (a[i - 1] === b[j - 1]) {
        curr[j] = prev[j - 1] + 1;
        if (curr[j] > maxLen) {
          maxLen = curr[j];
          maxEndIndexA = i - 1;   // keep the end idx in a
        }
      } else {
        curr[j] = 0;
      }
    }

    // Swap rows for next iteration
    //  curr becomes prev, prev becomes curr (reuse the same arrays)
    for (let j = 0; j <= m; j++) {
      prev[j] = curr[j];
      curr[j] = 0;   // reset current row for the next round
    }
  }

  return a.slice(maxEndIndexA - maxLen + 1, maxEndIndexA + 1);
}
import { longestCommonSubstring } from './common-substring';

const a = "ABABCDA";
const b = "CBADABABC";

console.log(longestCommonSubstring(a, b)); // → "ABC"
console.log(longestCommonSubstring('foo', ''));          // ''
console.log(longestCommonSubstring('abc', 'xyz'));       // ''
console.log(longestCommonSubstring('same', 'same'));     // 'same'
console.log(longestCommonSubstring('aaaaa', 'bbaaa'));   // 'aaa'
