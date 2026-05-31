/*  Boyer‑Moore string search
 *  ----------------------------------
 *  – pattern:  the string you’re looking for
 *  – text:     the larger string you scan
 *  Returns:    an array of the starting indices where pattern occurs
 */

type BMResult = number[];

function boyerMoore(text: string, pattern: string): BMResult {
  if (pattern.length === 0) return [];
  const badChar = buildBadCharShift(pattern);
  const goodSuffix = buildGoodSuffixShift(pattern);
  const m = pattern.length;
  const n = text.length;
  const result: number[] = [];

  let s = 0;                  // alignment of pattern with text
  while (s <= n - m) {        // slide pattern over text
    let j = m - 1;            // right‑most pattern position

    // compare from right to left
    while (j >= 0 && pattern[j] === text[s + j]) {
      j--;
    }

    if (j < 0) {                  // whole pattern matched
      result.push(s);
      s += goodSuffix[0];          // shift using good‑suffix
    } else {
      // bad‑character rule
      const badShift = j - badChar[text[s + j]] ?? j + 1;
      // good‑suffix rule
      const goodShift = goodSuffix[j + 1];
      s += Math.max(badShift, goodShift);
    }
  }
  return result;
}

/* -------------  Bad‑character table  ----------------- */
function buildBadCharShift(pattern: string): Record<string, number> {
  const lastPos: Record<string, number> = {};
  for (let i = 0; i < pattern.length; i++) {
    lastPos[pattern[i]] = i;          // last occurrence index
  }
  return lastPos;
}

/* -------------  Good‑suffix table  ------------------- */
function buildGoodSuffixShift(pattern: string): number[] {
  const m = pattern.length;
  const shift: number[] = new Array(m + 1).fill(m);
  const border = new Array(m + 1).fill(0);
  let i = m;
  let j = m + 1;
  border[i] = j;

  // 1. Calculate borders (prefixes that are also suffixes)
  while (i > 0) {
    while (j <= m && pattern[i - 1] !== pattern[j - 1]) {
      j = border[j];
    }
    i--; j--; border[i] = j;
  }

  // 2. Compute shift table from borders
  for (let k = 0; k < m; k++) {
    shift[k] = m; // default shift is pattern length
  }

  let iIdx = 0;
  while (iIdx < m) {
    const g = m - border[iIdx];
    shift[g] = Math.min(shift[g], border[iIdx] + 1);
    iIdx++;
  }

  // 3. Fill the remaining entries (when no suffix matches)
  let last = shift[1];
  for (let q = 2; q <= m; q++) {
    if (shift[q] === m) shift[q] = last;
    else last = shift[q];
  }

  return shift;
}

/* -------------  Example use ----- */
const haystack = "ABABACABABABCAB";
const needle = "ABABC";

console.log(boyerMoore(haystack, needle));  // => [5]
