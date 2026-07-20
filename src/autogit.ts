/**
 * Boyer‑Moore pattern search
 * ---------------------------------
 * Returns the start indices of every exact match of `pattern`
 * inside `text`.  If no match, returns an empty array.
 *
 * Complexity:
 *   O(n + m) average,  O(n · m) worst‑case (in practice the heuristics keep it linear)
 *
 * @param text    The haystack string
 * @param pattern The needle string
 */
export function boyerMooreSearch(text: string, pattern: string): number[] {
  const n = text.length;
  const m = pattern.length;
  if (m === 0) return [];          // empty pattern → nothing to find

  // Preprocessing -------------------------------------------------------------
  const badChar = buildBadCharacterTable(pattern);
  const goodSuf  = buildGoodSuffixTable(pattern);

  // Searching ---------------------------------------------------------------
  const results: number[] = [];
  let s = 0;                        // shift of the pattern with respect to text

  while (s <= n - m) {
    let j = m - 1;                  // right‑to‑left comparison

    while (j >= 0 && pattern[j] === text[s + j]) {
      j--;
    }

    if (j < 0) {
      // Match found at position s
      results.push(s);

      // Shift the pattern so that the next character in text aligns with
      // the last occurrence of that character in the pattern (if any)
      // or skip to the end of the pattern if none.
      // This is the "good suffix" rule for a complete match.
      s += goodSuf[0];
    } else {
      // Mismatch: use the bad‑character rule.
      const badShift = j - badChar[text[s + j]];
      // Use the good‑suffix shift as well (max of the two)
      const goodShift = goodSuf[j + 1];

      s += Math.max(badShift, goodShift);
    }
  }

  return results;
}

// ---------------------------------------------------------------------------
// Helper functions
// ---------------------------------------------------------------------------

/**
 * Builds a map from character to its right‑most index in the pattern.
 * Character not present → -1.
 */
function buildBadCharacterTable(pattern: string): { [k: string]: number } {
  const table: { [k: string]: number } = {};

  for (let i = 0; i < pattern.length; i++) {
    table[pattern[i]] = i;           // right‑most position
  }

  return table;
}

/**
 * Good‑suffix table.  For each position i (0‑based, left‑to‑right)
 *   goodSuf[i] = number of positions pattern needs to shift so that
 *                the right i characters of pattern align with a previous
 *                occurrence of this suffix.  If no such occurrence,
 *                the shift corresponds to aligning the next character after
 *                the suffix that matches in the pattern.
 *
 * The table length is m+1; goodSuf[0] is the shift after a full match.
 */
function buildGoodSuffixTable(pattern: string): number[] {
  const m = pattern.length;
  const goodSuf = new Array(m + 1).fill(0);
  const suffix = new Array(m + 1).fill(0);
  const prefix = new Array(m + 1).fill(false);

  // Step 1: compute suffixes
  for (let i = 0; i < m; i++) {
    let len = 0;
    while (
      i - len - 1 >= 0 &&
      pattern[i - len - 1] === pattern[m - len - 1]
    ) {
      len++;
      suffix[i - len + 1] = len;
      if (i - len + 1 === 0) {
        prefix[i - len + 1] = true;            // entire suffix is prefix
      }
    }
  }

  // Step 2: fill goodSuf table
  for (let i = 0; i <= m; i++) {
    goodSuf[i] = m;                              // default shift
  }

  for (let i = 0; i < m; i++) {
    const len = suffix[i];
    if (len > 0) {
      goodSuf[m - len] = Math.min(goodSuf[m - len], i - len + 1);
    }
  }

  // Step 3: handle prefixes
  for (let i = m; i >= 1; i--) {
    if (prefix[i]) {
      for (let j = 0; j < m - i; j++) {
        if (goodSuf[j] === m) {
          goodSuf[j] = m - i;
        }
      }
    }
  }

  return goodSuf;
}
const text = "ABABCABABCDABABCDCDABABCABABCD";
const pattern = "ABABCABAB";

const matches = boyerMooreSearch(text, pattern);

console.log(`Pattern found at indices: ${matches}`);
// → Pattern found at indices: 0,9,15
