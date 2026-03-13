/**
 * Returns true if `a` and `b` are anagrams.
 * Works for any Unicode characters, but
 * it ignores case and whitespace by default.
 */
function areAnagrams(a: string, b: string, ignoreCase = true, ignoreWhitespace = true): boolean {
  // Normalise: trim, collapse spaces, lower‑case if requested
  const normalize = (s: string) =>
    s
      .replace(/\s+/g, "")        // delete spaces
      .toLowerCase();             // lower‑case

  if (ignoreCase && ignoreWhitespace) {
    a = normalize(a);
    b = normalize(b);
  } else if (ignoreCase) {
    a = a.toLowerCase();
    b = b.toLowerCase();
  } else if (ignoreWhitespace) {
    a = a.replace(/\s+/g, "");
    b = b.replace(/\s+/g, "");
  }

  // Quick length check
  if (a.length !== b.length) return false;

  // Count characters in the first string
  const counts: Record<string, number> = {};

  for (const ch of a) {
    counts[ch] = (counts[ch] ?? 0) + 1;
  }

  // Subtract counts using the second string
  for (const ch of b) {
    const current = counts[ch];
    if (!current) return false;          // character not seen before or already exhausted
    if (--current === 0) delete counts[ch];
  }

  // If everything matched, the object should be empty
  return Object.keys(counts).length === 0;
}
console.log(areAnagrams("listen", "silent"));           // true
console.log(areAnagrams("Hello, World!", "world!hello")); // true
console.log(areAnagrams("foo", "bar"));                 // false
