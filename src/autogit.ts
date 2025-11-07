/**
 * Boyer-Moore-Horspool string search.
 * @param text    The string to be searched.
 * @param pattern The non-empty substring to look for.
 * @returns The zero-based index of the first occurrence of `pattern` in `text`,
 *          or -1 if not found.
 */
export function horspool(text: string, pattern: string): number {
  if (pattern.length === 0) throw new Error('Pattern must be non-empty');

  /* ---------- 1. Pre-processing: build bad-character table ---------- */
  const badChar = new Map<number, number>(); // code-point -> right-most position in pattern
  const m = pattern.length;

  // All but the last character
  for (let i = 0; i < m - 1; ++i) {
    badChar.set(pattern.codePointAt(i)!, i);
  }

  /* ---------- 2. Searching ---------- */
  const n = text.length;
  let pos = 0; // current alignment of pattern with text

  while (pos <= n - m) {
    let i = m - 1; // scan from right to left
    while (i >= 0 && pattern.codePointAt(i) === text.codePointAt(pos + i)) {
      --i;
    }
    if (i < 0) return pos; // whole pattern matched
    // shift by max(1, m-1 - badChar[text[pos+i]])
    const bcShift = i - (badChar.get(text.codePointAt(pos + i)!) ?? -1);
    pos += Math.max(1, bcShift);
  }
  return -1;
}

/* ---------------------- quick sanity check ---------------------- */
if (import.meta.url === `file://${process.argv[1]}`) {
  const txt = 'abracadabra';
  const pat = 'cad';
  console.log(`${pat} found in "${txt}" at index`, horspool(txt, pat)); // → 4
}
