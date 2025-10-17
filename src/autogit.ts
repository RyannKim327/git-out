function areAnagrams(a: string, b: string): boolean {
  const normalise = (s: string) =>
    s
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '')   // keep only alphanumerics (optional)
      .split('')
      .sort()
      .join('');

  return normalise(a) === normalise(b);
}

/* ---------- quick tests ---------- */
console.log(areAnagrams('listen', 'silent'));        // true
console.log(areAnagrams('Astronomer', 'Moon starer')); // true
console.log(areAnagrams('hello', 'world'));           // false
