/**
 * Returns true if `a` and `b` are anagrams of each other.
 * Comparison is case–insensitive and ignores non-alphanumeric chars.
 */
function areAnagrams(a: string, b: string): boolean {
  const clean = (s: string) =>
    s
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '')          // keep only letters & digits
      .split('')
      .sort()
      .join('');

  return clean(a) === clean(b);
}

/* ---------- usage ---------- */
console.log(areAnagrams('Listen', 'Silent'));        // true
console.log(areAnagrams('Astronomer', 'Moon starer')); // true
console.log(areAnagrams('Hello', 'Olelh'));         // true
console.log(areAnagrams('Hi', 'Bye'));               // false
function areAnagramsLinear(a: string, b: string): boolean {
  const buildFreq = (s: string) => {
    const freq: Record<string, number> = {};
    for (const ch of s.toLowerCase().replace(/[^a-z0-9]/g, '')) {
      freq[ch] = (freq[ch] || 0) + 1;
    }
    return freq;
  };

  const f1 = buildFreq(a);
  const f2 = buildFreq(b);

  const keys = new Set([...Object.keys(f1), ...Object.keys(f2)]);
  for (const k of keys) if (f1[k] !== f2[k]) return false;
  return true;
}
