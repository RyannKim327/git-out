/**
 * Return the first character that appears more than once in `s`.
 * If no character repeats, returns `undefined`.
 */
function firstRepeated<T extends string>(s: T): T | undefined {
  const seen = new Set<string>();

  for (const ch of s) {
    // if we've already seen this char, it's the first repeat
    if (seen.has(ch)) return ch as T;

    seen.add(ch);
  }

  return undefined;   // no repeats
}
console.log(firstRepeated('abcd'));        // undefined  (no repeat)
console.log(firstRepeated('abca'));        // 'a'        (first repeat)
console.log(firstRepeated('aabbcc'));      // 'a'        (even though 'b' repeats later, 'a' is first)
console.log(firstRepeated('noisy'));       // undefined
