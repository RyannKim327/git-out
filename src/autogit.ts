/**
 * Returns the first character that appears only once in `s`.
 * If every character repeats (or the string is empty), returns `null`.
 */
function firstNonRepeating(s: string): string | null {
  // 1. Scan the string once to build a frequency map
  const freq = new Map<string, number>();

  for (const ch of s) {
    // increment the count for this character
    freq.set(ch, (freq.get(ch) ?? 0) + 1);
  }

  // 2. Scan again in original order and return the first with count 1
  for (const ch of s) {
    if (freq.get(ch) === 1) {
      return ch;
    }
  }

  return null;          // nothing found
}
console.log(firstNonRepeating("SWISS")); // 'W'
console.log(firstNonRepeating("SWISS".toLowerCase())); // 'w'
console.log(firstNonRepeating("aabbcc")); // null
