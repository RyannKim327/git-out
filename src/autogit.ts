/**
 * Returns true if `a` and `b` are anagrams of each other.
 *
 * Rules applied:
 *  - Case‑insensitive
 *  - Only alphanumeric characters are considered
 *  - The order of characters doesn't matter – they’re sorted first
 *
 * @param a First string
 * @param b Second string
 */
function areAnagrams(a: string, b: string): boolean {
  // Helper to clean up and sort a string
  const clean = (s: string): string =>
    s
      .toLowerCase()        // ignore case
      .replace(/[^a-z0-9]/g, "") // keep letters/numbers only
      .split("")
      .sort()
      .join("");

  const cleanA = clean(a);
  const cleanB = clean(b);

  return cleanA === cleanB;
}

// Example usage
console.log(areAnagrams("Listen", "Silent"));      // true
console.log(areAnagrams("Hello", "Olelh"));         // true
console.log(areAnagrams("Hello", "World"));         // false
function areAnagramsFreq(a: string, b: string): boolean {
  const count = (s: string): Record<string, number> => {
    const obj: Record<string, number> = {};
    for (const ch of s.toLowerCase().replace(/[^a-z0-9]/g, "")) {
      obj[ch] = (obj[ch] ?? 0) + 1;
    }
    return obj;
  };

  const ca = count(a);
  const cb = count(b);

  const keys = new Set([...Object.keys(ca), ...Object.keys(cb)]);
  for (const k of keys) {
    if ((ca[k] ?? 0) !== (cb[k] ?? 0)) return false;
  }
  return true;
}
