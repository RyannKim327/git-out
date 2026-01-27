type BMIndices = { badChar: number[]; goodSuffix: number[] };

const CHAR_LIMIT = 256;          // size of ASCII table (adjust if you need Unicode)

// Allocate and initialise a lookup array, defaulting to -1
function initArray(size: number, init: number = -1): number[] {
  const arr = new Array<number>(size);
  for (let i = 0; i < size; i++) arr[i] = init;
  return arr;
}
function badCharTable(pattern: string): number[] {
  const table = initArray(CHAR_LIMIT, -1);

  for (let i = 0; i < pattern.length; i++) {
    table[pattern.charCodeAt(i)] = i;
  }

  return table;
}
function goodSuffixTable(pat: string): number[] {
  const m = pat.length;
  const suffix = initArray(m);
  const goodSuffix = initArray(m, 0);

  suffix[m - 1] = m;
  let g = m - 1;
  let f = 0;

  for (let i = m - 2; i >= 0; i--) {
    if (i > g && suffix[i + m - 1 - f] < i - g) {
      suffix[i] = suffix[i + m - 1 - f];
    } else {
      g = i;
      f = i;
      while (g >= 0 && pat[g] === pat[g + m - 1 - f]) {
        g--;
      }
      suffix[i] = f - g;
    }
  }

  // Build the goodSuffix shift table from suffix lengths
  for (let i = 0; i < m; i++) {
    goodSuffix[i] = m - suffix[i];
  }

  return goodSuffix;
}
function boyerMooreSearch(text: string, pattern: string): number[] {
  const n = text.length;
  const m = pattern.length;
  if (m === 0) return [];   // nothing to find

  const { badChar, goodSuffix } = preprocess(pattern);

  const matches: number[] = [];
  let s = 0;                // shift of the pattern wrt text

  while (s <= n - m) {
    let j = m - 1;

    // Keep moving left while the characters match
    while (j >= 0 && pattern[j] === text[s + j]) {
      j--;
    }

    if (j < 0) {
      // match found
      matches.push(s);
      // next shift: either the good suffix shift or 1
      s += goodSuffix[0] > 0 ? goodSuffix[0] : 1;
    } else {
      const badShift = j - badChar[text.charCodeAt(s + j)];
      const goodShift = goodSuffix[j];
      s += Math.max(badShift, goodShift);
    }
  }

  return matches;
}

function preprocess(pattern: string): BMIndices {
  return {
    badChar: badCharTable(pattern),
    goodSuffix: goodSuffixTable(pattern),
  };
}
const txt = "ABAAABCDABAAABCDAAAABCDABAAABCDAAAABCD";
const pat = "ABDAB";

console.log(boyerMooreSearch(txt, pat));  // → [0, 9, 19, 29]
