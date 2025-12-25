/**
 * Returns the first repeated character in `s`.
 * If there is no repetition, returns `null`.
 *
 * @param s - The input string (any Unicode characters are allowed)
 * @param caseSensitive - Set to `false` to treat 'A' and 'a' as the same character
 */
function firstRepeatedChar(
  s: string,
  caseSensitive: boolean = true
): string | null {
  // Optional normalisation for case‑insensitive mode
  const source = caseSensitive ? s : s.toLowerCase();

  const seen = new Set<string>();

  for (const ch of source) {
    if (seen.has(ch)) {
      // Return the character as it appears in the original string,
      // preserving the original case if we were case‑insensitive.
      return caseSensitive ? ch : s[source.indexOf(ch)];
    }
    seen.add(ch);
  }

  return null; // no repeated character
}

/* ------------------- Example usage ------------------- */
console.log(firstRepeatedChar("abca"));          // → "a"
console.log(firstRepeatedChar("abcdef"));       // → null
console.log(firstRepeatedChar("AaBbCcAa", false)); // → "a" (case‑insensitive)
console.log(firstRepeatedChar("😀🐶😀", true));   // → "😀"
const firstRepeated = (s: string) => {
  const seen = new Set<string>();
  for (const c of s) if (seen.has(c)) return c; else seen.add(c);
  return null;
};
