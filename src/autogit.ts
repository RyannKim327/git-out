/**
 * Counts occurrences of `word` in `text` using `String.split`.
 * This works for plain substrings (no regex needed) and is case‑sensitive.
 *
 * @param text  The source string.
 * @param word  The word/substring to count.
 * @returns     Number of non‑overlapping occurrences.
 */
export function countBySplit(text: string, word: string): number {
  if (word === '') return 0;               // avoid infinite split
  // split returns an array with N+1 elements where N = occurrences
  return text.split(word).length - 1;
}
/**
 * Counts occurrences of `word` using a global RegExp.
 *
 * @param text          The source string.
 * @param word          The word to count.
 * @param caseSensitive Whether the match should be case‑sensitive (default: true).
 * @returns             Number of matches (including overlapping if you use a look‑ahead).
 */
export function countByRegExp(
  text: string,
  word: string,
  caseSensitive = true
): number {
  if (word === '') return 0;

  // Escape any regex meta‑characters so the pattern matches the literal word.
  const escaped = word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

  // `\\b` ensures we match whole words only (optional – see note below).
  const pattern = `\\b${escaped}\\b`;
  const flags = caseSensitive ? 'g' : 'gi';
  const re = new RegExp(pattern, flags);

  let count = 0;
  while (re.exec(text) !== null) {
    count++;
  }
  return count;
}
export function countOverlapping(text: string, word: string, caseSensitive = true): number {
  if (word === '') return 0;
  const escaped = word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const flags = caseSensitive ? 'g' : 'gi';
  const re = new RegExp(`(?=${escaped})`, flags); // zero‑width look‑ahead
  let count = 0;
  while (re.exec(text) !== null) {
    count++;
    // Move the regex engine forward by one character to avoid infinite loop
    re.lastIndex = re.lastIndex + 1;
  }
  return count;
}
export function countByMatchAll(
  text: string,
  word: string,
  caseSensitive = true,
  wholeWord = false
): number {
  if (word === '') return 0;

  const escaped = word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const pattern = wholeWord ? `\\b${escaped}\\b` : escaped;
  const flags = caseSensitive ? 'g' : 'gi';
  const re = new RegExp(pattern, flags);

  // `matchAll` returns an iterator of all matches
  const matches = text.matchAll(re);
  let count = 0;
  for (const _ of matches) count++;
  return count;
}
const occurrences = (text: string, word: string) =>
  (text.match(new RegExp(word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g')) ?? []).length;
// utils/stringCount.ts
export interface CountOptions {
  /** If true, "Cat" and "cat" are considered the same. */
  caseSensitive?: boolean;
  /** If true, only whole‑word matches are counted (uses \\b). */
  wholeWord?: boolean;
  /** If true, overlapping matches are counted (e.g. "aa" in "aaaa" → 3). */
  overlapping?: boolean;
}

/**
 * Count how many times `word` appears in `text`.
 *
 * @param text   The source string.
 * @param word   The word/substring to count.
 * @param opts   Optional flags (default = { caseSensitive: true, wholeWord: false, overlapping: false })
 * @returns      Number of occurrences.
 */
export function countOccurrences(
  text: string,
  word: string,
  opts: CountOptions = {}
): number {
  const {
    caseSensitive = true,
    wholeWord = false,
    overlapping = false,
  } = opts;

  if (word === '') return 0;

  // Escape regex meta‑characters.
  const escaped = word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

  // Build the pattern.
  const pattern = wholeWord ? `\\b${escaped}\\b` : escaped;
  const flags = caseSensitive ? 'g' : 'gi';
  const re = overlapping
    ? new RegExp(`(?=${pattern})`, flags) // look‑ahead for overlapping
    : new RegExp(pattern, flags);

  // Count matches.
  let count = 0;
  if (overlapping) {
    // For look‑ahead we must manually advance `lastIndex` to avoid an infinite loop.
    while (re.exec(text) !== null) {
      count++;
      re.lastIndex = re.lastIndex + 1;
    }
  } else {
    // Normal global regex – `matchAll` is clean and fast.
    for (const _ of text.matchAll(re)) count++;
  }
  return count;
}
import { countOccurrences } from './utils/stringCount';

const txt = "The quick brown fox jumps over the lazy dog. The fox was quick.";

console.log(countOccurrences(txt, "fox"));                     // 2 (case‑sensitive)
console.log(countOccurrences(txt, "Fox", { caseSensitive: false })); // 2
console.log(countOccurrences(txt, "the", { caseSensitive: false, wholeWord: true })); // 2
console.log(countOccurrences("aaaa", "aa", { overlapping: true })); // 3
function test() {
  const cases: [string, string, number][] = [
    ["hello world hello", "hello", 2],
    ["Hello hello HELLO", "hello", 1],
    ["Hello hello HELLO", "hello", 3], // case‑insensitive
    ["aaaaa", "aa", 2],                // non‑overlapping
    ["aaaaa", "aa", 4],                // overlapping
    ["cat concatenate catty cat", "cat", 2], // whole‑word only
  ];

  console.log('--- split ---');
  console.log(countBySplit("hello world hello", "hello")); // 2

  console.log('--- regex (case‑insensitive) ---');
  console.log(countByRegExp("Hello hello HELLO", "hello", false)); // 3

  console.log('--- overlapping ---');
  console.log(countOverlapping("aaaaa", "aa")); // 4

  console.log('--- whole‑word ---');
  console.log(countByRegExp("cat concatenate catty cat", "cat")); // 2
}
test();
