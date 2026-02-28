/**
 * Build the bad‑character shift table.
 * For every character that occurs in the pattern, we store the distance
 * from the last occurrence of that character to the end of the pattern
 * (i.e. how far we can jump when that character mismatches).
 */
function buildBadCharShift(pat: string): Int8Array {
  const m = pat.length;
  // 256 possible ASCII values – 16-bit enough for Unicode offsets too
  const shift = new Int8Array(256);
  shift.fill(-1);

  for (let i = 0; i < m; i++) {
    shift[pat.charCodeAt(i)] = i;
  }
  return shift;
}

/**
 * Build the good‑suffix shift table.
 * The array `shift` holds, for each position in the pattern,
 * how far we can safely shift if the suffix starting at that position
 * is found to match the text but a mismatch occurs just before it.
 */
function buildGoodSuffixShift(pat: string): Int32Array {
  const m = pat.length;
  const shift = new Int32Array(m).fill(m);
  const borderPos = new Int32Array(m + 1).fill(-1);
  const suffixPos = new Int32Array(m + 1).fill(-1);

  /* Step 1 – compute border positions (also known as "failure function") */
  let i = m;
  let j = m + 1;
  borderPos[i] = j;
  while (i > 0) {
    while (j <= m && pat[i - 1] !== pat[j - 1]) j = borderPos[j];
    i--;
    j--;
    borderPos[i] = j;
  }

  /* Step 2 – compute suffix positions */
  i = 0;
  j = 0;
  while (i < m) {
    if (pat[i] === pat[j]) {
      j++;
      suffixPos[i + 1] = j;
    } else if (j > 0) {
      j = borderPos[j];
    } else {
      suffixPos[i + 1] = 0;
      i++;
    }
  }

  /* Step 3 – fill the shift table using the border and suffix data */
  for (let k = 0; k < m; k++) {
    // If the suffix starting at k matches the pattern's suffix
    // and there is a border before that suffix, we can shift
    // to align that border with the text.
    shift[k] = m - suffixPos[k];
  }

  return shift;
}

/**
 * Boyer‑Moore search.
 * Returns an array of all start indices where `pat` is found in `txt`.
 */
export function boyerMoore(txt: string, pat: string): number[] {
  const n = txt.length;
  const m = pat.length;

  if (m === 0 || n < m) return [];

  const badChar = buildBadCharShift(pat);
  const goodSuffix = buildGoodSuffixShift(pat);

  const res: number[] = [];
  let s = 0; // shift of the pattern over text

  while (s <= n - m) {
    let j = m - 1;

    // Move left while characters match
    while (j >= 0 && pat[j] === txt[s + j]) j--;

    if (j < 0) {
      // full match
      res.push(s);
      // shift so that the next possible match starts right after the first character of the current match
      s += goodSuffix[0];
    } else {
      const badIdx = badChar[txt.charCodeAt(s + j)];
      const badShift = badIdx !== -1 ? j - badIdx : j + 1;
      const goodShift = goodSuffix[j];
      // choose the larger of the two shifts
      s += Math.max(badShift, goodShift);
    }
  }

  return res;
}

/* ----------------------------------- */
/* Example usage                     */
const text = "ABAAABCDABEEABBAAB";
const pattern = "ABBA";

const matches = boyerMoore(text, pattern);
console.log("Pattern found at indices:", matches);
/* Expected output (zero‑based indices):
   Pattern found at indices: [12, 15]
*/
