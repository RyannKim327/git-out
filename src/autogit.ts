/**
 * Returns the index of the first occurrence of `pat` in `txt`,
 * or -1 if it does not exist.
 * Runs in O(n+m) time and O(1) extra space.
 */
export function indexOfTwoWay(txt: string, pat: string): number {
  const n = txt.length;
  const m = pat.length;
  if (m === 0) return 0;
  if (m === 1) return txt.indexOf(pat); // fast path for single char

  /* ---------- 1. pre-processing ---------- */
  let i = 0;                 // left half
  let j = m - 1;             // right half
  let period = m;

  // find the critical factorisation (maximal suffix)
  while (j > i && pat[j - 1] <= pat[j]) --j;
  if (j === 0) {             // pat is non-increasing → whole string is period
    period = 1;
  } else {
    let k = j - 1;
    while (k >= 0 && pat[k] <= pat[k + 1]) --k;
    if (k < 0) period = j;
  }

  // memory of the last mismatch on the right half
  let memory = 0;

  /* ---------- 2. searching ---------- */
  let pos = 0;
  while (pos <= n - m) {
    // compare right half first (allows to skip on mismatch)
    let cmp = m - 1;
    while (cmp >= j && txt[pos + cmp] === pat[cmp]) --cmp;
    if (cmp < j) {
      // right half matched, compare left half
      let left = j - 1;
      while (left >= memory && txt[pos + left] === pat[left]) --left;
      if (left < memory) return pos;        // full match
      // mismatch in left half → safe shift by j
      pos += j - left;
      memory = 0;
    } else {
      // mismatch in right half → shift by period
      pos += Math.max(period, cmp - j + 1);
      memory = 0;
    }
  }
  return -1;
}
/**
 * Boyer-Moore-Horspool, O(n·m) worst-case, but ~O(n/m) on average.
 * Uses a 256-entry table (works on UTF-16 code units).
 */
export function indexOfBMH(txt: string, pat: string): number {
  const n = txt.length;
  const m = pat.length;
  if (m === 0) return 0;
  if (m === 1) return txt.indexOf(pat);

  // 1. build bad-char shift table
  const skip = new Uint16Array(256);
  skip.fill(m);
  for (let i = 0; i < m - 1; ++i) skip[pat.charCodeAt(i) & 0xff] = m - 1 - i;

  // 2. search
  let pos = 0;
  while (pos <= n - m) {
    let j = m - 1;
    while (j >= 0 && txt[pos + j] === pat[j]) --j;
    if (j < 0) return pos;
    pos += skip[txt.charCodeAt(pos + m - 1) & 0xff];
  }
  return -1;
}
String.prototype.indexOf = (function (orig) {
  return function (this: string, search: string, pos?: number): number {
    const p = pos >>> 0;
    const s = String(search);
    const txt = this.slice(p);
    const idx = indexOfTwoWay(txt, s);   // or indexOfBMH
    return idx < 0 ? -1 : idx + p;
  };
})(String.prototype.indexOf);
