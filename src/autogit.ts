/**
 * Boyer-Moore string search (TypeScript)
 * Returns the index of the first occurrence of `pat` in `txt`, or -1 if not found.
 */
export function boyerMoore(txt: string, pat: string): number {
  if (pat.length === 0) return 0;
  if (pat.length > txt.length) return -1;

  const m = pat.length;
  const n = txt.length;

  /* ---------- 1. Bad-character table ---------- */
  const delta1 = new Map<number, number>(); // codePoint -> shift
  for (let i = 0; i < m; ++i) {
    const cp = pat.codePointAt(i)!;
    delta1.set(cp, m - 1 - i);
  }

  /* ---------- 2. Good-suffix table (strong rule) ---------- */
  const delta2 = new Uint32Array(m);
  const suffix = new Uint32Array(m + 1); // suffix[i] = length of longest suffix of pat[0..i] that is also a suffix of pat
  suffix[m - 1] = m;
  let g = m - 1;
  for (let i = m - 2; i >= 0; --i) {
    if (i > g && suffix[i + m - 1 - f] < i - g) {
      suffix[i] = suffix[i + m - 1 - f];
    } else {
      g = i;
      f = i;
      while (g >= 0 && pat[g] === pat[g + m - 1 - f]) --g;
      suffix[i] = f - g;
    }
  }

  for (let i = 0; i < m; ++i) delta2[i] = m;
  let j = 0;
  for (let i = m - 1; i >= -1; --i) {
    if (i === -1 || suffix[i] === i + 1) {
      for (; j < m - 1 - i; ++j) delta2[j] = m - 1 - i;
    }
  }
  for (let i = 0; i < m - 1; ++i) {
    delta2[m - 1 - suffix[i]] = m - 1 - i;
  }

  /* ---------- 3. Scan ---------- */
  let pos = 0;
  while (pos <= n - m) {
    let i = m - 1;
    while (i >= 0 && pat[i] === txt[pos + i]) --i;
    if (i < 0) return pos; // match found
    const badCharShift = delta1.get(txt.codePointAt(pos + i)!) ?? m;
    const goodSuffixShift = delta2[i];
    pos += Math.max(badCharShift, goodSuffixShift);
  }
  return -1;
}

/* ---------- 4. Tiny demo ---------- */
if (import.meta.url.endsWith(process.argv[1])) {
  const txt = "abracadabra";
  const pat = "cad";
  console.log(boyerMoore(txt, pat)); // → 4
}
import { boyerMoore } from "./boyer-moore";

const idx = boyerMoore("the quick brown fox", "brown");
console.log(idx); // 10
