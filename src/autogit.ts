/**
 * Return true if `a` and `b` are anagrams.
 *
 *   * Ignore whitespace and punctuation.
 *   * Ignore case.
 */
function areAnagramsSorting(a: string, b: string): boolean {
  const clean = (s: string) =>
    s.toLowerCase().replace(/\W/g, '').split('').sort().join('');

  return clean(a) === clean(b);
}

// Example
console.log(areAnagramsSorting('Listen', 'Silent')); // → true
/**
 * Count characters and compare the two maps.
 * Complexity: O(n), with `n` = max(a.length, b.length).
 */
function areAnagramsCounting(a: string, b: string): boolean {
  const normalize = (s: string) =>
    s.toLowerCase().replace(/\W/g, '');

  const strA = normalize(a);
  const strB = normalize(b);

  if (strA.length !== strB.length) return false;

  const freq: Record<string, number> = {};

  for (const ch of strA) {
    freq[ch] = (freq[ch] ?? 0) + 1;
  }

  for (const ch of strB) {
    if (!freq[ch]) return false; // missing or too many
    freq[ch]! -= 1;
  }

  return true;
}

// Example
console.log(areAnagramsCounting('Software', 'Oxfartswe')); // → true
const anagrams = (a: string, b: string) =>
  a.toLowerCase().replace(/\W/g, '').split('').sort().join('') ===
  b.toLowerCase().replace(/\W/g, '').split('').sort().join('');
