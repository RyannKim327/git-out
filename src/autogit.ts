/**
 * Does `a` consist of exactly the same letters as `b`, in any order?
 * The comparison is case‑insensitive and ignores whitespace.
 *
 * @param a – first candidate
 * @param b – second candidate
 * @returns true if the strings are anagrams, otherwise false
 */
export function isAnagram(a: string, b: string): boolean {
  // Normalise the strings: lowercase, trim, remove spaces.
  const normalize = (s: string) => s.toLowerCase().replace(/\s+/g, '');
  const strA = normalize(a);
  const strB = normalize(b);

  // Quick rejection: different length → impossible to be an anagram.
  if (strA.length !== strB.length) return false;

  // === Approach 1: sorting ===
  // const sortedA = strA.split('').sort().join('');
  // const sortedB = strB.split('').sort().join('');
  // return sortedA === sortedB;

  // === Approach 2: frequency counting ===
  const freq: Record<string, number> = {};

  // Count characters of the first string.
  for (const ch of strA) {
    freq[ch] = (freq[ch] ?? 0) + 1;
  }

  // Subtract counts using characters from the second string.
  for (const ch of strB) {
    if (!freq[ch]) {
      // Either the character never appeared in `a`
      // or its count has already been zeroed out.
      return false;
    }
    freq[ch]!--;          // `!` tells the compiler this is defined.
    if (freq[ch] === 0) delete freq[ch]; // keep the map small.
  }

  // If all counts have cancelled out, the map should be empty.
  return Object.keys(freq).length === 0;
}
console.log(isAnagram('Listen', 'Silent'));   // true
console.log(isAnagram('Triangle', 'Integral')); // true
console.log(isAnagram('Apple', 'Pabble'));      // false
