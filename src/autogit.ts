/**
 * Returns the longest common substring of s and t.
 * If several substrings have the same maximum length, the first one
 * encountered in `s` is returned. Empty string if no match.
 */
export function longestCommonSubstring(s: string, t: string): string {
  if (!s || !t) return '';

  // Ensure |t| <= |s| to minimise memory
  if (t.length > s.length) [s, t] = [t, s];

  const m = s.length;
  const n = t.length;

  // Rolling two rows for DP: prev and curr
  const prev = new Uint16Array(n + 1);
  const curr = new Uint16Array(n + 1);

  let maxLen = 0;
  let endPos = 0; // exclusive index in s where best substring ends

  for (let i = 1; i <= m; ++i) {
    const chS = s[i - 1];
    for (let j = 1; j <= n; ++j) {
      if (chS === t[j - 1]) {
        curr[j] = prev[j - 1] + 1;
        if (curr[j] > maxLen) {
          maxLen = curr[j];
          endPos = i;
        }
      } else {
        curr[j] = 0;
      }
    }
    // Swap rows for next iteration
    [prev, curr] = [curr, prev];
    curr.fill(0); // clear reused row
  }

  return maxLen ? s.slice(endPos - maxLen, endPos) : '';
}

/* ---------- Quick sanity checks ---------- */
if (import.meta.vitest) {
  const { expect, test } = import.meta.vitest;
  test('longestCommonSubstring', () => {
    expect(longestCommonSubstring('ABABC', 'BABCA')).toBe('BABC');
    expect(longestCommonSubstring('abcdef', 'zcdemf')).toBe('cde');
    expect(longestCommonSubstring('abc', 'def')).toBe('');
    expect(longestCommonSubstring('', 'foo')).toBe('');
  });
}
