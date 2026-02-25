/**
 * Compare two strings for an anagram relationship.
 *
 * @param a – first string (the one you’re testing)
 * @param b – candidate anagram
 * @param ignoreCase – true will treat “A” and “a” the same
 * @param normalize   – if true, removes all non‑alphanumeric chars
 * @returns true if a and b are anagrams
 */
function isAnagram(
  a: string,
  b: string,
  ignoreCase = true,
  normalize = true
): boolean {
  if (normalize) {
    const regex = /[^a-z0-9]/gi;
    a = a.replace(regex, '');
    b = b.replace(regex, '');
  }

  if (ignoreCase) {
    a = a.toLowerCase();
    b = b.toLowerCase();
  }

  // Quick length‐check
  if (a.length !== b.length) return false;

  // Sort characters and compare
  const sortedA = a.split('').sort().join('');
  const sortedB = b.split('').sort().join('');

  return sortedA === sortedB;
}
console.log(isAnagram('Listen', 'Silent'));               // true
console.log(isAnagram('Astronomer', 'Moon starer'));      // true
console.log(isAnagram('Hello', 'World'));                  // false

// Custom options
console.log(isAnagram('Dormitory!', 'Dirtyroom', true, true)); // true
console.log(isAnagram('Dormitory!', 'Dirtyroom', false, true)); // false – case sensitive
function isAnagramFreq(a: string, b: string): boolean {
  const makeMap = (s: string) => {
    const map: Record<string, number> = {};
    for (const ch of s) map[ch] = (map[ch] ?? 0) + 1;
    return map;
  };

  const freqA = makeMap(a);
  const freqB = makeMap(b);

  // Compare two maps
  const keys = new Set([...Object.keys(freqA), ...Object.keys(freqB)]);
  for (const k of keys) {
    if (freqA[k] !== freqB[k]) return false;
  }
  return true;
}
