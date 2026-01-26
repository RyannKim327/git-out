/**
 * Returns true if `a` and `b` contain exactly the same characters
 * (ignoring whitespace, punctuation, and case).
 */
export function isAnagram(a: string, b: string): boolean {
  // 1. Strip anything that isn’t a letter or a digit, and
  //    normalize the case to lower‑case.
  const norm = (s: string) =>
    s.replace(/\W+/g, "") // removes non‑alphanumeric characters
      .toLowerCase();

  const cleanA = norm(a);
  const cleanB = norm(b);

  // 2. Quick length check – if lengths differ, they can’t be anagrams.
  if (cleanA.length !== cleanB.length) return false;

  // 3. Count each character in a Map.
  const counter = new Map<string, number>();

  for (const ch of cleanA) {
    counter.set(ch, (counter.get(ch) ?? 0) + 1);
  }

  // 4. Decrement counts with characters from the second string.
  for (const ch of cleanB) {
    const cur = counter.get(ch);
    if (!cur) return false;            // missing or too many of 'ch'
    if (cur === 1) counter.delete(ch); // tidy up to keep map small
    else counter.set(ch, cur - 1);
  }

  // 5. If the map is empty, the two strings were perfect anagrams.
  return counter.size === 0;
}
console.log(isAnagram("Listen", "Silent"));   // true
console.log(isAnagram("Hello!", "Oleh!"));    // true
console.log(isAnagram("Hello", "World"));     // false
