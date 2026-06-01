function firstRepeatedChar(str: string): string | null {
  // Use a Set because it gives O(1) insertion & lookup
  const seen = new Set<string>();

  for (const ch of str) {
    if (seen.has(ch)) {
      return ch;      // first repeated character
    }
    seen.add(ch);
  }
  return null;          // no repetition
}

// Example
const txt = "ualtrascolar";
console.log(firstRepeatedChar(txt)); // → "a"   (the first character that appears twice)
function firstRepeatedCharObj(str: string): string | null {
  const seen: Record<string, boolean> = {};

  for (const ch of str) {
    if (seen[ch]) return ch;
    seen[ch] = true;
  }
  return null;
}
