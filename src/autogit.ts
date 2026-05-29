/**
 * Returns true if `a` and `b` are anagrams of each other
 * (ignoring case, whitespace and all non‑letters).
 */
function isAnagram(a: string, b: string): boolean {
  const clean = (s: string) =>
    s
      .toLowerCase()
      .replace(/[^a-z]/g, '')          // keep only letters
      .split('')
      .sort()
      .join('');

  return clean(a) === clean(b);
}
export function areAnagrams(a: string, b: string): boolean {
  const normalize = (str: string) =>
    str
      .toLowerCase()
      .replace(/[^a-z]/g, '') // drop everything except letters
      .split('')
      .sort()
      .join('');

  return normalize(a) === normalize(b);
}
export function areAnagramsLinear(a: string, b: string): boolean {
  const normalize = (str: string) => str.toLowerCase().replace(/[^a-z]/g, '');

  const na = normalize(a);
  const nb = normalize(b);

  if (na.length !== nb.length) return false;

  const freq: Record<string, number> = {};

  for (const ch of na) {
    freq[ch] = (freq[ch] ?? 0) + 1;
  }

  for (const ch of nb) {
    if (!freq[ch]) return false;
    freq[ch]!--;
  }

  return true;
}
export function areAnagramsWithMap(a: string, b: string): boolean {
  const clean = (s: string) =>
    s.replace(/[^a-z]/gi, '').toLowerCase();

  if (clean(a).length !== clean(b).length) return false;

  const map = new Map<string, number>();

  for (const ch of clean(a)) {
    map.set(ch, (map.get(ch) ?? 0) + 1);
  }

  for (const ch of clean(b)) {
    const cur = map.get(ch);
    if (!cur) return false;
    if (cur === 1) map.delete(ch);
    else map.set(ch, cur - 1);
  }

  return map.size === 0;
}
console.log(isAnagram('listen', 'silent'));   // true
console.log(isAnagram('Hello', 'O hell'));    // true (ignores spaces & case)
console.log(isAnagram('hello', 'world'));     // false
