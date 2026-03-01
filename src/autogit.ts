/**
 * Simple anagram checker.
 * @param a First string
 * @param b Second string
 * @returns true if a and b are anagrams, false otherwise
 */
function areAnagrams(a: string, b: string): boolean {
  // 1. Normalize: lower‑case, strip non‑alphanumerics, trim
  const normalize = (s: string) =>
    s
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "")
      .trim();

  const na = normalize(a);
  const nb = normalize(b);

  // Quick length check; if they differ early we’re done.
  if (na.length !== nb.length) return false;

  // 2. Build frequency maps
  const freq = new Map<string, number>();

  for (const ch of na) {
    freq.set(ch, (freq.get(ch) ?? 0) + 1);
  }

  for (const ch of nb) {
    const count = freq.get(ch);

    // If we see a character not in the first string, bail
    if (!count) return false;

    // Decrease the count and remove entry if it drops to zero
    if (count === 1) freq.delete(ch);
    else freq.set(ch, count - 1);
  }

  // 3. If all counts cleared, the strings are anagrams
  return freq.size === 0;
}
console.log(areAnagrams("listen", "silent"));   // → true
console.log(areAnagrams("evil", "vile"));       // → true
console.log(areAnagrams("hello", "billion"));   // → false
console.log(areAnagrams("Clint Eastwood", "Old West Action")); // true
function areAnagramsSort(a: string, b: string): boolean {
  const normalize = (s: string) =>
    s
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "")
      .trim()
      .split("")
      .sort()
      .join("");

  return normalize(a) === normalize(b);
}
