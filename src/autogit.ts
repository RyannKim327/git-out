/**
 * Returns the first character that is repeated, or `undefined` if the string
 * contains no duplicates.
 */
function firstRepeated(s: string): string | undefined {
  const seen = new Set<string>();

  for (const ch of s) {
    if (seen.has(ch)) return ch;
    seen.add(ch);
  }
  return undefined;     // nothing repeated
}
console.log(firstRepeated("abca"));   // → 'a'
console.log(firstRepeated("abcdef")); // → undefined
console.log(firstRepeated("aabbc"));  // → 'a'
function firstRepeatedAscii(s: string): string | undefined {
  const seen = new Array(128).fill(false);

  for (const ch of s) {
    const code = ch.charCodeAt(0);
    if (seen[code]) return ch;
    seen[code] = true;
  }
  return undefined;
}
