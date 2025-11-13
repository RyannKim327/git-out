function firstRepeatedChar(str: string): string | undefined {
  const seen = new Set<string>();

  for (const ch of str) {
    if (seen.has(ch)) return ch;   // found the first duplicate
    seen.add(ch);
  }
  return undefined;                // no duplicates
}

/* ---------- usage ---------- */
console.log(firstRepeatedChar("abca"));     // "a"
console.log(firstRepeatedChar("abcdef"));   // undefined
