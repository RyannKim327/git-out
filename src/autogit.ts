/**
 * Returns the first repeated character in `s`, or `undefined`
 * if nothing repeats.
 *
 * @param s string to inspect
 */
export function firstRepeatedChar(s: string): string | undefined {
  const seen = new Set<string>();

  for (const ch of s) {
    if (seen.has(ch)) {
      return ch;            // first repeat found
    }
    seen.add(ch);
  }

  return undefined;          // no repeats
}
console.log(firstRepeatedChar('abcda')); // 'a'
console.log(firstRepeatedChar('hello world')); // 'l'
console.log(firstRepeatedChar('abcdef')); // undefined
