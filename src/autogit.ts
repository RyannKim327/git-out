function areAnagrams(a: string, b: string): boolean {
  const normalise = (s: string) =>
    s
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '') // keep only letters and digits
      .split('')
      .sort()
      .join('');

  return normalise(a) === normalise(b);
}

/* ---------- usage ---------- */
console.log(areAnagrams('Listen', 'Silent'));        // true
console.log(areAnagrams('Astronomer', 'Moon starer')); // true
console.log(areAnagrams('Hello', 'Olelh'));          // true
console.log(areAnagrams('Hi', 'Bye'));               // false
function areAnagramsLinear(a: string, b: string): boolean {
  const clean = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, '');
  const s1 = clean(a);
  const s2 = clean(b);

  if (s1.length !== s2.length) return false;

  const freq = new Map<string, number>();

  for (const ch of s1) freq.set(ch, (freq.get(ch) || 0) + 1);

  for (const ch of s2) {
    if (!freq.has(ch)) return false;
    const c = freq.get(ch)! - 1;
    if (c === 0) freq.delete(ch);
    else freq.set(ch, c);
  }

  return freq.size === 0;
}
