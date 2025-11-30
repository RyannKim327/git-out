function areAnagrams(a: string, b: string): boolean {
  const normalize = (s: string) =>
    s
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '') // keep only alphanumerics
      .split('')
      .sort()
      .join('');
  return normalize(a) === normalize(b);
}

/* ---- usage ---- */
console.log(areAnagrams('listen', 'silent'));     // true
console.log(areAnagrams('Astronomer', 'Moon starer')); // true
console.log(areAnagrams('hello', 'world'));     // false
