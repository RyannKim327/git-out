/**
 * Return the first character in `s` that occurs exactly once.
 * If every character repeats, return null.
 */
function firstNonRepeatingChar(s: string): string | null {
  // 1️⃣  Count how many times each char appears.
  const freq = new Map<string, number>();

  for (const ch of s) {
    freq.set(ch, (freq.get(ch) ?? 0) + 1);
  }

  // 2️⃣  Walk the string a second time, looking for a count of 1.
  for (const ch of s) {
    if (freq.get(ch) === 1) {
      return ch;          // first non‑repeating character found
    }
  }

  return null;              // no unique character
}
console.log(firstNonRepeatingChar('abacabad')); // "c"
console.log(firstNonRepeatingChar('aabbcc'));   // null
console.log(firstNonRepeatingChar('😀😃😀😄')); // "😃"
