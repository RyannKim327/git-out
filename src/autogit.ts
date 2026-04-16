function areAnagrams(a: string, b: string): boolean {
  // Remove whitespace & make everything lowercase (so “Dormitory”, “dirtyroom” work)
  const normalize = (s: string) =>
    s.replace(/\s+/g, '').toLowerCase();

  const normalizeA = normalize(a).split('').sort().join('');
  const normalizeB = normalize(b).split('').sort().join('');

  return normalizeA === normalizeB;
}
function areAnagrams(a: string, b: string): boolean {
  const buildMap = (s: string) => {
    const map: Record<string, number> = {};
    for (const ch of s.replace(/\s+/g, '').toLowerCase()) {
      map[ch] = (map[ch] ?? 0) + 1;
    }
    return map;
  };

  const aMap = buildMap(a);
  const bMap = buildMap(b);

  const keys = new Set([...Object.keys(aMap), ...Object.keys(bMap)]);
  for (const k of keys) {
    if (aMap[k] !== bMap[k]) return false;
  }
  return true;
}
const tests = [
  ['listen', 'silent'],
  ['hello', 'world'],
  ['Dormitory', 'Dirty room'],
  ['abc', 'abcd'],
];

for (const [a, b] of tests) {
  console.log(`${a} ↔ ${b} → ${areAnagrams(a, b)}`);
}
