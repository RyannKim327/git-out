function isAnagramSort(a: string, b: string): boolean {
  // Normalize (optional – depends on your use‑case)
  const normalize = (s: string) =>
    s.replace(/\s+/g, '').toLowerCase(); // trim spaces, lower‑case

  const sa = normalize(a).split('').sort().join('');
  const sb = normalize(b).split('').sort().join('');

  return sa === sb;
}
function isAnagramMap(a: string, b: string): boolean {
  // Quick length check (no need to normalize again here)
  if (a.length !== b.length) return false;

  const count = new Map<string, number>();

  for (let i = 0; i < a.length; i++) {
    const ca = a[i];
    const cb = b[i];

    count.set(ca, (count.get(ca) || 0) + 1);
    count.set(cb, (count.get(cb) || 0) - 1);
  }

  // All counts must net to 0
  for (const val of count.values()) {
    if (val !== 0) return false;
  }
  return true;
}
const a = 'listen';
const b = 'silent';
console.log(isAnagramSort(a, b)); // true
console.log(isAnagramMap(a, b));  // true
