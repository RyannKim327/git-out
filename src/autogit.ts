/**
 * Return true if `left` and `right` contain exactly the same character counts.
 *
 * @param left   – first string
 * @param right  – second string
 * @param options – tweak the comparison:
 *   - `caseSensitive`: default `false` – treats 'A' and 'a' as equal
 *   - `ignoreNonAlpha`: default `false` – strips out everything other than a‑z/A‑Z
 */
function areAnagrams(
  left: string,
  right: string,
  options?: { caseSensitive?: boolean; ignoreNonAlpha?: boolean }
): boolean {
  const { caseSensitive = false, ignoreNonAlpha = false } = options ?? {};

  const normalize = (s: string) =>
    s
      .split('')
      .filter((c) => (!ignoreNonAlpha || /[a-zA-Z]/.test(c)))   // drop non‑letters if asked
      .map((c) => (caseSensitive ? c : c.toLowerCase()))        // case folding
      .sort()
      .join('');

  return normalize(left) === normalize(right);
}
console.log(areAnagrams('listen', 'silent'));            // true
console.log(areAnagrams('Tinsel', 'Listen'));            // true
console.log(areAnagrams('hello', 'world'));              // false
console.log(areAnagrams('William Shakespeare', 'I am a weakish speller', {
  ignoreNonAlpha: true,
}));                                                   // true
function areAnagramsFast(a: string, b: string): boolean {
  if (a.length !== b.length) return false;

  const count: Record<string, number> = {};

  for (const char of a) count[char] = (count[char] ?? 0) + 1;
  for (const char of b) {
    if (!count[char]) return false; // missing or too many of this char
    count[char]!--;
  }

  return true;
}
