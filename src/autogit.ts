function firstRepeatedChar(str: string): string | null {
  const seen = new Set<string>();

  for (const ch of str) {
    if (seen.has(ch)) return ch; // first repetition found
    seen.add(ch);
  }
  return null; // no repeats
}

/* ---------- usage ---------- */
console.log(firstRepeatedChar("abca"));      // "a"
console.log(firstRepeatedChar("abcdef"));     // null
console.log(firstRepeatedChar(""));         // null
function firstRepeatedCharCI(str: string): string | null {
  const seen = new Set<string>();

  for (const ch of str) {
    const key = ch.toLowerCase();
    if (seen.has(key)) return ch;
    seen.add(key);
  }
  return null;
}
