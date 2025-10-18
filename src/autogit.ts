/**
 * Boyer-Moore-Horspool string search.
 * @param text  The text to be searched.
 * @param pat   The pattern to look for.
 * @returns The zero-based index of the first match, or -1 if not found.
 */
export function horspool(text: string, pat: string): number {
  if (pat.length === 0) return 0;                    // empty pattern matches at start
  if (pat.length > text.length) return -1;         // impossible to match

  /* ---------- 1. Build bad-character skip table ---------- */
  const skip: number[] = new Array(256).fill(pat.length); // 256 ASCII for speed
  for (let i = 0; i < pat.length - 1; ++i) {
    skip[pat.charCodeAt(i)] = pat.length - 1 - i;
  }

  /* ---------- 2. Search ---------- */
  let pos = 0;                                       // start of current window
  const last = pat.length - 1;

  while (pos + last < text.length) {
    let i = last;                                    // compare from right
    while (text[pos + i] === pat[i]) {
      if (i === 0) return pos;                       // full match
      --i;
    }
    pos += skip[text.charCodeAt(pos + last)];        // shift window
  }
  return -1;                                         // no match
}

/* ---------- 3. Quick demo ---------- */
if (import.meta.url.endsWith(process.argv[1])) {
  const txt = "abracadabra";
  const pat = "cad";
  console.log(`"${pat}" found in "${txt}" at index`, horspool(txt, pat)); // → 4
}
function* horspoolAll(text: string, pat: string): Generator<number> {
  if (!pat) { yield 0; return; }
  let from = 0;
  while (from <= text.length - pat.length) {
    const idx = horspool(text.slice(from), pat);
    if (idx < 0) break;
    yield from + idx;
    from += idx + 1;          // allow overlapping matches
  }
}
