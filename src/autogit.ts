function buildBadCharTable(pattern: string): Map<string, number> {
  const table = new Map<string, number>();
  // Initialise all characters to -1 (implicitly)
  for (let i = 0; i < pattern.length; i++) {
    table.set(pattern[i], i); // right‑most occurrence so far
  }
  return table;
}
function buildGoodSuffixTable(pattern: string): { shift: number[]; suffix: number[] } {
  const m = pattern.length;
  const shift = new Array<number>(m + 1).fill(m); // default shift = pattern length
  const suffix = new Array<number>(m).fill(0);

  // 1️⃣ Build suffix[]: longest suffix of pattern[0..i] that matches a suffix of pattern
  for (let i = 0; i < m - 1; i++) {
    let j = i;
    let k = 0; // length of current matching suffix
    while (j >= 0 && pattern[j] === pattern[m - 1 - k]) {
      j--;
      k++;
      suffix[k] = j + 1; // start index of the matching suffix
    }
  }

  // 2️⃣ Build shift[] using suffix[]
  // First, handle the case where the good suffix is also a prefix
  for (let i = 0; i <= m; i++) {
    shift[i] = m; // initialise to full length
  }

  // For each suffix length k, set shift for the position where that suffix occurs
  for (let k = 1; k < m; k++) {
    const j = m - 1 - suffix[k];
    if (shift[j] === m) {
      shift[j] = k;
    }
  }

  // Finally, for any position that still has shift == m, use the longest prefix that matches a suffix
  let longestPrefix = 0;
  for (let i = 0; i < m; i++) {
    if (suffix[m - i] === i + 1) {
      longestPrefix = i + 1;
    }
    if (shift[i] === m) {
      shift[i] = longestPrefix;
    }
  }

  return { shift, suffix };
}
/**
 * Boyer‑Moore substring search.
 *
 * @param text    The text to search inside.
 * @param pattern The pattern to look for.
 * @returns Array of start indices where pattern occurs in text.
 */
export function boyerMooreSearch(text: string, pattern: string): number[] {
  const n = text.length;
  const m = pattern.length;
  if (m === 0) return []; // empty pattern → no matches (or you could return all positions)

  // 1️⃣ Pre‑process
  const badChar = buildBadCharTable(pattern);
  const { shift: goodSuffixShift } = buildGoodSuffixTable(pattern);

  const matches: number[] = [];

  // 2️⃣ Search
  let s = 0; // current shift of the pattern with respect to text
  while (s <= n - m) {
    let j = m - 1; // start comparing from the rightmost character

    // Compare pattern[j] with text[s + j] moving leftwards
    while (j >= 0 && pattern[j] === text[s + j]) {
      j--;
    }

    if (j < 0) {
      // ----> Full match!
      matches.push(s);
      // Shift pattern to the next possible match (use good‑suffix shift for j = -1)
      s += goodSuffixShift[0];
    } else {
      // ----> Mismatch at position j
      const badCharShift = (() => {
        const bcIdx = badChar.get(text[s + j]);
        // If character never appears in pattern, bcIdx = undefined → treat as -1
        const lastPos = bcIdx !== undefined ? bcIdx : -1;
        return j - lastPos;
      })();

      const gsShift = goodSuffixShift[j + 1]; // shift for the suffix that matched (length = m - j - 1)

      // Take the larger shift (cannot move left)
      s += Math.max(badCharShift, gsShift);
    }
  }

  return matches;
}
import { boyerMooreSearch } from "./boyerMoore";

const text = "abracadabra abracadabra";
const pattern = "abra";

const positions = boyerMooreSearch(text, pattern);
console.log(positions); // → [0, 7, 11, 18]

// Verify:
positions.forEach(pos => console.log(text.substr(pos, pattern.length)));
// boyerMoore.ts --------------------------------------------------------------

/**
 * Build the Bad‑Character table.
 * Maps each character to its right‑most index in the pattern.
 */
function buildBadCharTable(pattern: string): Map<string, number> {
  const table = new Map<string, number>();
  for (let i = 0; i < pattern.length; i++) {
    table.set(pattern[i], i);
  }
  return table;
}

/**
 * Build the Good‑Suffix shift table.
 * Returns an object containing:
 *   - shift[i] : how far to shift when a mismatch occurs at pattern index i‑1
 *   - suffix   : auxiliary array (not needed outside)
 */
function buildGoodSuffixTable(pattern: string): { shift: number[]; suffix: number[] } {
  const m = pattern.length;
  const shift = new Array<number>(m + 1).fill(m);
  const suffix = new Array<number>(m).fill(0);

  // ---- suffix[] ----
  for (let i = 0; i < m - 1; i++) {
    let j = i;
    let k = 0;
    while (j >= 0 && pattern[j] === pattern[m - 1 - k]) {
      j--;
      k++;
      suffix[k] = j + 1;
    }
  }

  // ---- shift[] ----
  for (let i = 0; i <= m; i++) shift[i] = m;

  // case 1: suffix of pattern matches a suffix elsewhere
  for (let k = 1; k < m; k++) {
    const j = m - 1 - suffix[k];
    if (shift[j] === m) {
      shift[j] = k;
    }
  }

  // case 2: suffix is also a prefix
  let longestPrefix = 0;
  for (let i = 0; i < m; i++) {
    if (suffix[m - i] === i + 1) {
      longestPrefix = i + 1;
    }
    if (shift[i] === m) {
      shift[i] = longestPrefix;
    }
  }

  return { shift, suffix };
}

/**
 * Boyer‑Moore substring search.
 *
 * @param text    Text to search.
 * @param pattern Pattern to find.
 * @returns Array of start indices where pattern occurs.
 */
export function boyerMooreSearch(text: string, pattern: string): number[] {
  const n = text.length;
  const m = pattern.length;
  if (m === 0) return [];

  const badChar = buildBadCharTable(pattern);
  const { shift: goodSuffixShift } = buildGoodSuffixTable(pattern);

  const result: number[] = [];

  let s = 0; // current alignment of pattern with text
  while (s <= n - m) {
    let j = m - 1;

    // compare from right to left
    while (j >= 0 && pattern[j] === text[s + j]) {
      j--;
    }

    if (j < 0) {
      // match found
      result.push(s);
      s += goodSuffixShift[0]; // shift by the whole pattern or by border length
    } else {
      // mismatch handling
      const bcIdx = badChar.get(text[s + j]);
      const lastPos = bcIdx !== undefined ? bcIdx : -1;
      const badCharShift = j - lastPos;
      const goodSuffixShiftAmt = goodSuffixShift[j + 1];
      s += Math.max(badCharShift, goodSuffixShiftAmt);
    }
  }

  return result;
}

// ---------------------------------------------------------------------------

// Example usage (you can delete this part when you import the function elsewhere)
if (require.main === module) {
  const txt = "abracadabra abracadabra";
  const pat = "abra";
  console.log(`Searching "${pat}" in "${txt}"`);
  console.log(boyerMooreSearch(txt, pat)); // → [0, 7, 11, 18]
}
export function boyerMooreSearch(text: string, pattern: string): number[] {
  const n = text.length, m = pattern.length;
  if (!m) return [];

  // Bad‑character table
  const bc = new Map<string, number>();
  for (let i = 0; i < m; i++) bc.set(pattern[i], i);

  // Good‑suffix table
  const shift = new Array<number>(m + 1).fill(m);
  const suffix = new Array<number>(m).fill(0);
  for (let i = 0; i < m - 1; i++) {
    let j = i, k = 0;
    while (j >= 0 && pattern[j] === pattern[m - 1 - k]) {
      j--; k++; suffix[k] = j + 1;
    }
  }
  for (let k = 1; k < m; k++) {
    const j = m - 1 - suffix[k];
    if (shift[j] === m) shift[j] = k;
  }
  let longest = 0;
  for (let i = 0; i < m; i++) {
    if (suffix[m - i] === i + 1) longest = i + 1;
    if (shift[i] === m) shift[i] = longest;
  }

  const res: number[] = [];
  let s = 0;
  while (s <= n - m) {
    let j = m - 1;
    while (j >= 0 && pattern[j] === text[s + j]) j--;
    if (j < 0) {
      res.push(s);
      s += shift[0];
    } else {
      const bcIdx = bc.get(text[s + j]);
      const bad = j - (bcIdx ?? -1);
      const good = shift[j + 1];
      s += Math.max(bad, good);
    }
  }
  return res;
}
