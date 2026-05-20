/**
 * Returns the first non‑repeating character of `s`, or `null` if every character repeats.
 *
 * @param s - Input string (may contain any Unicode characters)
 * @returns  The first unique character, or `null`
 */
export function firstNonRepeating(s: string): string | null {
  // Map keeps the order in which characters appear
  const freq = new Map<string, number>();

  for (const ch of s) {
    freq.set(ch, (freq.get(ch) ?? 0) + 1);
  }

  for (const ch of s) {
    if (freq.get(ch) === 1) {
      return ch;
    }
  }

  return null; // no unique character
}
console.log(firstNonRepeating("swiss"));       // "w"
console.log(firstNonRepeating("aabbcc"));      // null
console.log(firstNonRepeating("hello world")); // "h"
