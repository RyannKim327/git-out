function firstRepeatedChar(str: string): string | undefined {
  const seen = new Set<string>();

  for (const ch of str) {
    if (seen.has(ch)) return ch;   // first duplicate found
    seen.add(ch);
  }
  return undefined;              // no duplicates
}

/* ---------- usage ---------- */
console.log(firstRepeatedChar('swiss'));      // "s"
console.log(firstRepeatedChar('abcdef'));     // undefined
