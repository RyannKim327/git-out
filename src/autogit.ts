/**
 * Normalises a string for anagram comparison:
 *  – removes whitespace
 *  – drops non‑alphanumeric chars
 *  – lower‑cases everything
 *  – sorts the remaining characters
 */
const normalise = (s: string): string =>
  s
    .replace(/[^a-z0-9]/gi, '')   // keep letters & digits only
    .toLowerCase()
    .split('')
    .sort()
    .join('');

export const areAnagrams = (a: string, b: string): boolean =>
  normalise(a) === normalise(b);
console.log(areAnagrams('listen', 'silent'));   // true
console.log(areAnagrams('Triangle', 'Integral')); // true
console.log(areAnagrams('hello', 'world'));    // false
export const areAnagramsMap = (a: string, b: string): boolean => {
  const buildFreq = (s: string) => {
    const freq: Record<string, number> = {};
    for (const ch of s.replace(/[^a-z0-9]/gi, '').toLowerCase()) {
      freq[ch] = (freq[ch] ?? 0) + 1;
    }
    return freq;
  };

  const freqA = buildFreq(a);
  const freqB = buildFreq(b);

  const keys = Object.keys(freqA);
  if (keys.length !== Object.keys(freqB).length) return false;

  return keys.every(k => freqA[k] === freqB[k]);
};
