function areAnagrams(a: string, b: string): boolean {
  if (a.length !== b.length) return false;

  // A little help‑trim: you can decide to ignore whitespace, case, etc.
  const normalize = (s: string) =>
    s.replace(/\s+/g, '').toLowerCase(); // removes spaces, lower‑cases

  const sortedA = normalize(a).split('').sort().join('');
  const sortedB = normalize(b).split('').sort().join('');

  return sortedA === sortedB;
}
function areAnagrams(a: string, b: string): boolean {
  if (a.length !== b.length) return false;

  const freq = new Map<string, number>();

  for (const ch of a) {
    freq.set(ch, (freq.get(ch) ?? 0) + 1);
  }

  for (const ch of b) {
    const count = freq.get(ch);
    if (!count) return false;          // either zero or undefined
    if (count === 1) freq.delete(ch);
    else freq.set(ch, count - 1);
  }

  return freq.size === 0;
}
function areAnagramsAscii(a: string, b: string): boolean {
  if (a.length !== b.length) return false;

  const counts = new Uint32Array(26);

  for (const ch of a) counts[ch.charCodeAt(0) - 97]++; // 'a' => 0
  for (const ch of b) counts[ch.charCodeAt(0) - 97]--;

  return counts.every(v => v === 0);
}
const compact = (s: string) =>
  s.replace(/[^a-z0-9]/gi, '').toLowerCase(); // strip punctuation

function areAnagramsClean(a: string, b: string): boolean {
  return areAnagrams(compact(a), compact(b));
}
