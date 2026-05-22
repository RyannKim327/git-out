/**
 * Returns the longest common substring between `a` and `b`.
 * If there are several with the same length, the one that appears first in `a` is returned.
 */
export function longestCommonSubstring(a: string, b: string): string {
  if (!a || !b) return '';

  const rows = a.length + 1;
  const cols = b.length + 1;
  // 2‑D array of zeros
  const table = Array.from({ length: rows }, () => Array(cols).fill(0));

  let maxLen = 0;
  let maxEndIdxA = 0;

  for (let i = 1; i < rows; i++) {
    for (let j = 1; j < cols; j++) {
      if (a[i - 1] === b[j - 1]) {
        table[i][j] = table[i - 1][j - 1] + 1;
        if (table[i][j] > maxLen) {
          maxLen = table[i][j];
          maxEndIdxA = i;          // the end index (exclusive) in `a`
        }
      }
    }
  }

  return maxLen === 0 ? '' : a.slice(maxEndIdxA - maxLen, maxEndIdxA);
}
console.log(longestCommonSubstring('ABABC', 'BABCA')); // → "ABC"
console.log(longestCommonSubstring('kitten', 'sitting')); // → "itt"
console.log(longestCommonSubstring('foo', 'bar')); // → ""
