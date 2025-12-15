// boyer-moore.ts
export function boyerMoore(haystack: string, needle: string): number {
  if (needle.length === 0) return 0;
  if (needle.length > haystack.length) return -1;

  // --- 1. Bad-character table ---
  const badChar = new Map<string, number>();
  for (let i = 0; i < needle.length; i++) {
    badChar.set(needle[i], i);          // last pos of each char
  }

  // --- 2. Good-suffix tables ---
  const m = needle.length;
  const border: number[] = new Array(m + 1).fill(0);
  const suffix: number[] = new Array(m + 1).fill(0);

  // prefix-function-like scan to fill suffix & border
  let i = m;
  let j = m + 1;
  border[i] = j;
  while (i > 0) {
    while (j <= m && needle[i - 1] !== needle[j - 1]) {
      if (suffix[j] === 0) suffix[j] = j - i;
      j = border[j];
    }
    i--; j--;
    border[i] = j;
  }

  // second pass
  let a = border[0];
  for (let k = 0; k <= m; k++) {
    if (suffix[k] === 0) suffix[k] = a;
    if (k === a) a = border[a];
  }

  // --- 3. Search ---
  let pos = 0;
  while (pos <= haystack.length - m) {
    let idx = m - 1;
    while (idx >= 0 && needle[idx] === haystack[pos + idx]) idx--;

    if (idx < 0) return pos;                       // match found
    // shift by max of bad-character and good-suffix
    const bcShift = idx - (badChar.get(haystack[pos + idx]) ?? -1);
    const gsShift = suffix[idx + 1];
    pos += Math.max(bcShift, gsShift);
  }
  return -1;
}

/* quick sanity check */
if (require.main === module) {
  console.log(boyerMoore("abacaabadcabacabaabb", "abacab")); // -> 10
}
import { boyerMoore } from './boyer-moore';

const idx = boyerMoore("the quick brown fox", "brown");
console.log(idx); // 10
