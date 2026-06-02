/**
 * Returns the first character that occurs only once in `s`,
 * or `null` if every character repeats.
 * @param s The string to scan (case‑sensitive).
 */
function firstNonRepeating(s: string): string | null {
  // 1️⃣ Count every character.
  const freq = new Map<string, number>();
  for (const ch of s) {
    freq.set(ch, (freq.get(ch) ?? 0) + 1);
  }

  // 2️⃣ Find the first spot where the count is 1.
  for (const ch of s) {
    if (freq.get(ch) === 1) {
      return ch;
    }
  }

  return null; // All characters repeat.
}
console.log(firstNonRepeating("swiss")); // → "w"
console.log(firstNonRepeating("aabb"));  // → null
console.log(firstNonRepeating("hello world")); // → "h"
