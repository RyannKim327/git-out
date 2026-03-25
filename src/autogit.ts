/**
 * Return true if `a` and `b` are anagrams.
 *
 * @param a      First string
 * @param b      Second string
 * @param options  Optional settings – case sensitivity & ignoring non‑letters
 */
function areAnagrams(
  a: string,
  b: string,
  options?: {
    caseSensitive?: boolean;
    ignoreNonAlpha?: boolean;
  }
): boolean {
  const { caseSensitive = false, ignoreNonAlpha = false } = options || {};

  // Helper to canonicalise a string
  const canon = (s: string) =>
    s
      .split('')
      .filter((ch) => !ignoreNonAlpha || /[a-zA-Z]/.test(ch))
      .map((ch) => (caseSensitive ? ch : ch.toLowerCase()))
      .sort(); // array of chars, sorted

  const aChars = canon(a);
  const bChars = canon(b);

  if (aChars.length !== bChars.length) return false;

  for (let i = 0; i < aChars.length; i++) {
    if (aChars[i] !== bChars[i]) return false;
  }

  return true;
}
areAnagrams('Listen', 'Silent');           // true
areAnagrams('Hello', 'Ollhe', { caseSensitive: true }); // false
areAnagrams('Dormitory', 'Dirty room', { ignoreNonAlpha: true }); // true
