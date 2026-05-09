function areAnagrams(a: string, b: string): boolean {
  const normalize = (s: string) =>
    s
      .replace(/[^a-zA-Z0-9]/g, "") // strip non‑alphanumerics
      .toLowerCase();               // ignore case

  const na = normalize(a);
  const nb = normalize(b);
  if (na.length !== nb.length) return false;

  // Count frequencies
  const freq = new Map<string, number>();
  for (const ch of na) {
    freq.set(ch, (freq.get(ch) ?? 0) + 1);
  }

  for (const ch of nb) {
    const count = (freq.get(ch) ?? 0) - 1;
    if (count < 0) return false;   // more of ch in nb than in a
    if (count === 0) freq.delete(ch);
    else freq.set(ch, count);
  }

  return freq.size === 0;
}
function areAnagramsSort(a: string, b: string): boolean {
  const normalize = (s: string) =>
    s.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();

  const na = normalize(a).split("").sort().join("");
  const nb = normalize(b).split("").sort().join("");

  return na === nb;
}
console.assert(areAnagrams("Dormitory", "dirty room") === true);
console.assert(areAnagrams("Hello", "Olelh") === true);
console.assert(areAnagrams("Cats", "Acting") === false);
function containsAnagram(s: string, minLength = 2): boolean {
  const chars = s.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
  const seen = new Set<string>();

  for (let i = 0; i < chars.length; i++) {
    for (let j = i + minLength; j <= chars.length; j++) {
      const sub = chars.slice(i, j);
      const key = sub.split("").sort().join("");
      if (seen.has(key)) return true;
      seen.add(key);
    }
  }
  return false;
}
