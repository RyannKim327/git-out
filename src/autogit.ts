function areAnagrams(a: string, b: string): boolean {
  const normalize = (str: string) =>
    str
      .toLowerCase()
      .split('')
      .filter(ch => /[a-z]/.test(ch)) // keep only letters; drop spaces/punctuation
      .sort()
      .join('');

  return normalize(a) === normalize(b);
}

// --- usage ---
console.log(areAnagrams('listen', 'silent'));        // true
console.log(areAnagrams('Astronomer', 'Moon starer')); // true
console.log(areAnagrams('hello', 'world'));          // false
function areAnagramsLinear(a: string, b: string): boolean {
  const buildFreq = (str: string) => {
    const freq: Record<string, number> = {};
    for (const ch of str.toLowerCase().replace(/[^a-z]/g, '')) {
      freq[ch] = (freq[ch] || 0) + 1;
    }
    return freq;
  };

  const freqA = buildFreq(a);
  const freqB = buildFreq(b);

  const keys = new Set([...Object.keys(freqA), ...Object.keys(freqB)]);
  for (const k of keys) if (freqA[k] !== freqB[k]) return false;
  return true;
}
