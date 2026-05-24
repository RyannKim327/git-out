/**
 * Returns true iff every character that appears in `a`
 * appears the same number of times in `b`.
 *
 * @param a – first string
 * @param b – second string
 * @param options – optional tweakers
 */
export function areAnagrams(
  a: string,
  b: string,
  options?: { ignoreCase?: boolean; ignoreSpaces?: boolean; ignorePunctuation?: boolean }
): boolean {
  const normalize = (str: string) => {
    let s = str;
    if (options?.ignoreCase) s = s.toLowerCase();
    if (options?.ignoreSpaces) s = s.replace(/\s+/g, '');
    if (options?.ignorePunctuation)
      s = s.replace(/[^\w]/g, ''); // keeps letters, digits, underscore

    // Quick length check after normalization
    return s;
  };

  const nsA = normalize(a);
  const nsB = normalize(b);

  if (nsA.length !== nsB.length) return false;

  // Count‑array approach – works for ASCII / extended‑Latin.
  const freq: Record<string, number> = {};

  for (const ch of nsA) freq[ch] = (freq[ch] ?? 0) + 1;
  for (const ch of nsB) {
    if (!freq[ch]) return false; // missing or too many
    freq[ch]! -= 1;
  }

  // All counts should be zero now
  return Object.values(freq).every(v => v === 0);
}
console.log(areAnagrams('Listen', 'Silent', { ignoreCase: true })); // true
console.log(areAnagrams('Dormitory', 'Dirty room', { ignoreCase: true, ignoreSpaces: true })); // true
console.log(areAnagrams('Hello', 'Olelh', { ignoreCase: false })); // false – case matters
console.log(areAnagrams('A!B@C', 'CBA', { ignoreCase: true, ignorePunctuation: true })); // true
