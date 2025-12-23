/**
 * Return the 0-based index of the first occurrence of `pat` in `txt`,
 * or `-1` if not found.
 */
export function indexOf(txt: string, pat: string): number {
  if (pat.length === 0) return 0;
  const lps = buildLps(pat);
  let i = 0; // txt pointer
  let j = 0; // pat pointer
  while (i < txt.length) {
    if (txt[i] === pat[j]) {
      i++;
      j++;
      if (j === pat.length) return i - j; // full match
    } else if (j > 0) {
      j = lps[j - 1]; // fallback in pat
    } else {
      i++; // pat[0] failed, shift txt
    }
  }
  return -1;
}
function buildLps(pat: string): number[] {
  const lps = new Array<number>(pat.length).fill(0);
  let len = 0; // length of the previous longest prefix suffix
  for (let i = 1; i < pat.length; ) {
    if (pat[i] === pat[len]) {
      lps[i++] = ++len;
    } else if (len > 0) {
      len = lps[len - 1];
    } else {
      lps[i++] = 0;
    }
  }
  return lps;
}
/** Count how many times `pat` appears in `txt`. */
export function countOccurrences(txt: string, pat: string): number {
  if (pat.length === 0) return 0;
  const lps = buildLps(pat);
  let i = 0, j = 0, cnt = 0;
  while (i < txt.length) {
    if (txt[i] === pat[j]) {
      i++; j++;
      if (j === pat.length) { cnt++; j = lps[j - 1]; }
    } else if (j > 0) j = lps[j - 1];
    else i++;
  }
  return cnt;
}

/** Return every starting index of `pat` in `txt`. */
export function findAll(txt: string, pat: string): number[] {
  const res: number[] = [];
  if (pat.length === 0) return res;
  const lps = buildLps(pat);
  let i = 0, j = 0;
  while (i < txt.length) {
    if (txt[i] === pat[j]) {
      i++; j++;
      if (j === pat.length) { res.push(i - j); j = lps[j - 1]; }
    } else if (j > 0) j = lps[j - 1];
    else i++;
  }
  return res;
}
import { indexOf, countOccurrences, findAll } from './kmp';

console.log(indexOf('ababcababa', 'aba'));      // → 0
console.log(countOccurrences('ababcababa', 'aba')); // → 2
console.log(findAll('ababcababa', 'aba'));       // → [0, 5]
