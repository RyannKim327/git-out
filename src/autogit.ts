type AnagramOpts = {
  /** treat 'A' the same as 'a' */
  caseSensitive?: boolean;
  /** ignore all whitespace (spaces, tabs, newlines) */
  ignoreSpaces?: boolean;
};

function areAnagrams(a: string, b: string, opts?: AnagramOpts): boolean {
  const { caseSensitive = false, ignoreSpaces = false } = opts ?? {};

  // Helper to clean a string according to the options
  const clean = (s: string) =>
    (!caseSensitive ? s.toLowerCase() : s)
      .split('')
      .filter(ch => !(ignoreSpaces && /\s/.test(ch)))
      .sort()   // sort alphabetically
      .join('');

  return clean(a) === clean(b);
}
console.log(areAnagrams('Listen', 'Silent'));          // true (case‑insensitive)
console.log(areAnagrams('Listen', 'Silent', {caseSensitive: true})); // false
console.log(areAnagrams('conversation', 'voices rant on', {ignoreSpaces: true})); // true
function areAnagramsFast(a: string, b: string, opts?: AnagramOpts): boolean {
  const { caseSensitive = false, ignoreSpaces = false } = opts ?? {};

  const buildMap = (s: string) => {
    const map = new Map<string, number>();
    for (const ch of s) {
      const key = (!caseSensitive ? ch.toLowerCase() : ch);
      if (ignoreSpaces && /\s/.test(key)) continue;
      map.set(key, (map.get(key) || 0) + 1);
    }
    return map;
  };

  const mapA = buildMap(a);
  const mapB = buildMap(b);

  if (mapA.size !== mapB.size) return false;

  for (const [k, v] of mapA.entries()) {
    if (mapB.get(k) !== v) return false;
  }
  return true;
}
