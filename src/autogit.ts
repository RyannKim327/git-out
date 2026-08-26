/**
 * Returns `true` if `s1` and `s2` are anagrams (ignoring case, spaces and punctuation).
 */
function isAnagram(s1: string, s2: string): boolean {
  const normalize = (s: string) =>
    s.replace(/[^a-zA-Z]/g, '').toLowerCase().split('').sort().join('');
  return normalize(s1) === normalize(s2);
}
function isAnagramLetterCount(a: string, b: string): boolean {
  const clean = (s: string) => s.replace(/[^a-zA-Z]/g, '').toLowerCase();

  const freq = (s: string) => {
    const map = new Map<string, number>();
    for (const c of s) {
      map.set(c, (map.get(c) ?? 0) + 1);
    }
    return map;
  };

  if (clean(a).length !== clean(b).length) return false;

  const m1 = freq(clean(a));
  const m2 = freq(clean(b));

  for (const [ch, count] of m1) {
    if (m2.get(ch) !== count) return false;
  }
  return true;
}
function isAnagramFlexible(
  s1: string,
  s2: string,
  options?: { ignoreSpaces?: boolean; ignoreCase?: boolean; ignorePunct?: boolean }
): boolean {
  const { ignoreSpaces = true, ignoreCase = true, ignorePunct = true } = options || {};

  let pattern = '';
  if (ignoreSpaces) pattern += '\\s';
  if (ignorePunct) pattern += /[^\w\s]/g.source;

  const regex = new RegExp(pattern, 'g');
  const normalize = (s: string) =>
    s.replace(regex, '').toLowerCase().split('').sort().join('');

  return normalize(s1) === normalize(s2);
}
console.log(isAnagram('listen', 'silent'));          // true
console.log(isAnagram('A gentleman', 'Elegant man'));// true
console.log(isAnagram('Hello', 'World'));            // false

// Using the frequency‑count version
console.log(isAnagramLetterCount('abc', 'cab'));     // true

// Flexible options
console.log(isAnagramFlexible('hello world', 'dlrow olleh', { ignoreSpaces: false })); // false
