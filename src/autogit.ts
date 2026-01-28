/**
 * Returns the first non‑repeating character in `str`.
 * If every character repeats, returns `undefined`.
 *
 * @param str – the string to check
 */
function firstNonRepeating(str: string): string | undefined {
  // 1️⃣ Count how many times every character shows up
  const freq = new Map<string, number>();
  for (const ch of str) {
    freq.set(ch, (freq.get(ch) ?? 0) + 1);
  }

  // 2️⃣ Scan again, looking for the first character whose count is 1
  for (const ch of str) {
    if (freq.get(ch) === 1) {
      return ch;          // found it!
    }
  }

  return undefined;       // nothing unique found
}

// Demo
console.log(firstNonRepeating("swiss"));   // → "w"
console.log(firstNonRepeating("aabb"));    // → undefined
