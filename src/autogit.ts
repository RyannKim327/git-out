/**
 * Returns true if `a` and `b` contain exactly the same letters,
 * disregarding order.
 *
 * @param a – first string
 * @param b – second string
 * @param options – optional flags
 *   - ignoreSpaces: treat spaces as insignificant
 *   - ignorePunctuation: strip punctuation marks
 *   - ignoreCase: treat uppercase and lowercase as the same
 */
export function areAnagrams(
  a: string,
  b: string,
  options: { ignoreSpaces?: boolean; ignorePunctuation?: boolean; ignoreCase?: boolean } = {}
): boolean {
  const { ignoreSpaces = false, ignorePunctuation = false, ignoreCase = false } = options;

  const sanitize = (s: string) => {
    if (ignoreCase) s = s.toLowerCase();
    if (ignoreSpaces) s = s.replace(/\s+/g, '');
    if (ignorePunctuation) s = s.replace(/[^\w]/g, ''); // keep letters & digits
    return s;
  };

  const sa = sanitize(a).split('').sort().join('');
  const sb = sanitize(b).split('').sort().join('');

  return sa === sb;
}
/**
 * Frequency‑count version – O(n) time, O(σ) space  
 * (σ = size of alphabet, constant for ASCII/Unicode)
 */
export function areAnagramsFast(
  a: string,
  b: string,
  options: { ignoreSpaces?: boolean; ignorePunctuation?: boolean; ignoreCase?: boolean } = {}
): boolean {
  const { ignoreSpaces = false, ignorePunctuation = false, ignoreCase = false } = options;

  const count = (s: string) => {
    const map = new Map<string, number>();
    for (const ch of s) {
      const key = ignoreCase ? ch.toLowerCase() : ch;
      if (ignoreSpaces && key === ' ') continue;
      if (ignorePunctuation && !/[A-Za-z0-9]/.test(key)) continue;
      map.set(key, (map.get(key) ?? 0) + 1);
    }
    return map;
  };

  const aMap = count(a);
  const bMap = count(b);

  if (aMap.size !== bMap.size) return false; // quick early exit

  for (const [char, aCount] of aMap.entries()) {
    if (bMap.get(char) !== aCount) return false;
  }

  return true;
}
// Basic usage
areAnagrams('Listen', 'Silent'); // true

// Ignoring case & spaces
areAnagrams('Dormitory', 'Dirty room', { ignoreSpaces: true, ignoreCase: true }); // true

// Fast version with punctuation handling
areAnagramsFast("A!b@c#d", "c b a d", { ignorePunctuation: true, ignoreCase: true }); // true
