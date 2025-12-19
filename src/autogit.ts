function firstNonRepeatingChar(str: string): string | null {
  // 1. Count occurrences
  const freq = new Map<string, number>();

  for (const ch of str) {
    freq.set(ch, (freq.get(ch) ?? 0) + 1);
  }

  // 2. Find the first char whose count is 1
  for (const ch of str) {
    if (freq.get(ch) === 1) return ch;
  }

  return null; // or '' if you prefer
}

/* ---------- Usage ---------- */
console.log(firstNonRepeatingChar("swiss"));     // "w"
console.log(firstNonRepeatingChar("aabbcc"));   // null
console.log(firstNonRepeatingChar(""));         // null
