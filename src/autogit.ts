/**
 * Returns the first character that occurs only once in `s`.
 * If every character repeats, returns null.
 */
function firstNonRepeatingChar(s: string): string | null {
  // 1️⃣ Count how many times each char appears
  const freq = new Map<string, number>();

  for (const ch of s) {
    freq.set(ch, (freq.get(ch) ?? 0) + 1);
  }

  // 2️⃣ Scan the string again and pick the first char with count 1
  for (const ch of s) {
    if (freq.get(ch) === 1) {
      return ch;
    }
  }

  return null; // nothing unique
}
console.log(firstNonRepeatingChar("abacbc")); // -> "b"
console.log(firstNonRepeatingChar("aabbcc")); // -> null
console.log(firstNonRepeatingChar("abcde"));  // -> "a"
function firstNonRepeatingCharOptimized(s: string): string | null {
  const freq = new Map<string, number>();
  const order: string[] = [];

  for (const ch of s) {
    const newCount = (freq.get(ch) ?? 0) + 1;
    freq.set(ch, newCount);

    if (newCount === 1) {
      order.push(ch);          // first appearance
    } else {
      // remove all occurrences of `ch` from the queue
      const idx = order.indexOf(ch);
      if (idx !== -1) order.splice(idx, 1);
    }
  }

  return order.length ? order[0] : null;
}
