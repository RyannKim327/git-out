type AnagramOptions = {
  ignoreCase?: boolean;
  ignoreNonAlphanumeric?: boolean;
};

function areAnagramsSort(a: string, b: string, opts: AnagramOptions = {}): boolean {
  const normalize = (s: string) => {
    let t = s;
    if (opts.ignoreCase) t = t.toLowerCase();
    if (opts.ignoreNonAlphanumeric) t = t.replace(/[^a-z0-9]/gi, '');
    return t;
  };

  const s1 = normalize(a);
  const s2 = normalize(b);

  if (s1.length !== s2.length) return false;

  const sorted1 = [...s1].sort().join('');
  const sorted2 = [...s2].sort().join('');
  return sorted1 === sorted2;
}
areAnagramsSort('Listen', 'Silent', { ignoreCase: true }); // true
areAnagramsSort('rail', 'liar', { ignoreCase: true, ignoreNonAlphanumeric: true }); // true
type AnagramOptions = {
  ignoreCase?: boolean;
  ignoreNonAlphanumeric?: boolean;
};

function areAnagramsCount(a: string, b: string, opts: AnagramOptions = {}): boolean {
  const normalize = (s: string) => {
    let t = s;
    if (opts.ignoreCase) t = t.toLowerCase();
    if (opts.ignoreNonAlphanumeric) t = t.replace(/[^a-z0-9]/gi, '');
    return t;
  };

  const s1 = normalize(a);
  const s2 = normalize(b);

  if (s1.length !== s2.length) return false;

  const freq: Record<string, number> = {};

  for (const ch of s1) freq[ch] = (freq[ch] ?? 0) + 1;
  for (const ch of s2) {
    if (!freq[ch]) return false;
    freq[ch]--;
  }

  return true;
}
areAnagramsCount('Listen', 'Silent', { ignoreCase: true }); // true
areAnagramsCount('abc', 'abd', { ignoreCase: true }); // false
