/**
 * Returns the first non‑repeating character in `s`, or `null` if every
 * character repeats. The search respects Unicode code‑points, so it works
 * with emojis, accented letters, etc.
 *
 * @param s – input string
 * @returns the character or null
 */
function firstNonRepeatingChar(s: string): string | null {
  // Count every character in a single scan.
  const counter = new Map<string, number>();

  for (const ch of s) {
    counter.set(ch, (counter.get(ch) ?? 0) + 1);
  }

  // Find the first character whose count is 1.
  for (const ch of s) {
    if (counter.get(ch) === 1) {
      return ch;
    }
  }

  return null;          // all characters repeat
}
console.log(firstNonRepeatingChar("abacabad")); // "c"
console.log(firstNonRepeatingChar("swiss"));    // "w"
console.log(firstNonRepeatingChar("aabb"));     // null
console.log(firstNonRepeatingChar("😀😃😄😀")); // "😃" (emoji support)
