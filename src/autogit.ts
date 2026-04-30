/**
 * Return true iff `s` reads the same forwards and backwards.
 * The function runs in O(n) time and O(1) auxiliary space.
 * 
 * If you need a case–insensitive or “ignoring non‑alpha‑numeric”
 * version, simply adjust the comparison operations accordingly.
 */
function isPalindrome(s: string): boolean {
  const n = s.length;
  // Two‑pointer scan from the ends toward the centre.
  for (let i = 0, j = n - 1; i < j; i++, j--) {
    // Direct character comparison – no new arrays, no string slicing.
    if (s.charAt(i) !== s.charAt(j)) return false;
  }
  return true;
}
