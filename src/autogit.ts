/**
 * Return the first non‑repeating character in a string.
 * If every character repeats, return `null`.
 */
function firstNonRepeating(str: string): string | null {
  const counts: Record<string, number> = {};

  // 1️⃣ Count each character
  for (const ch of str) {
    counts[ch] = (counts[ch] ?? 0) + 1;
  }

  // 2️⃣ Scan once more to find the first with count 1
  for (const ch of str) {
    if (counts[ch] === 1) {
      return ch;
    }
  }

  return null;
}

// quick examples
console.log(firstNonRepeating('abacabad')); // "b"
console.log(firstNonRepeating('aabbcc'));   // null
function firstNonRepeatingMap(str: string): string | null {
  const freq = new Map<string, number>();

  for (const ch of str) freq.set(ch, (freq.get(ch) ?? 0) + 1);

  for (const ch of str) if (freq.get(ch) === 1) return ch;
  return null;
}
function allNonRepeating(str: string): string[] {
  const freq = new Map<string, number>();
  for (const ch of str) freq.set(ch, (freq.get(ch) ?? 0) + 1);
  return [...str].filter(ch => freq.get(ch) === 1);
}
