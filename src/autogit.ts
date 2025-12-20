/**
 * Count occurrences of `word` using `String.prototype.split`.
 * This works for non‑overlapping matches only.
 *
 * @param source The text to search.
 * @param word   The word (or substring) you want to count.
 * @param caseSensitive  Optional – default true.
 * @returns Number of times `word` occurs.
 */
function countBySplit(
  source: string,
  word: string,
  caseSensitive = true
): number {
  if (!word) return 0;                     // avoid division‑by‑zero edge case
  const needle = caseSensitive ? word : word.toLowerCase();
  const haystack = caseSensitive ? source : source.toLowerCase();

  // `split` returns an array with N+1 elements where N = #matches
  return haystack.split(needle).length - 1;
}
/**
 * Count occurrences of `word` using a global RegExp.
 *
 * @param source The text to search.
 * @param word   The word (or pattern) you want to count.
 * @param caseSensitive  Optional – default true.
 * @param wholeWord      Optional – default false. If true, matches only whole words.
 * @returns Number of matches.
 */
function countByRegex(
  source: string,
  word: string,
  caseSensitive = true,
  wholeWord = false
): number {
  if (!word) return 0;

  // Escape any characters that have special meaning in a regex
  const escaped = word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

  // Add word‑boundary anchors if the caller wants whole‑word matches
  const pattern = wholeWord ? `\\b${escaped}\\b` : escaped;

  const flags = caseSensitive ? 'g' : 'gi';
  const regex = new RegExp(pattern, flags);

  // `match` returns null when there are no matches, otherwise an array.
  const matches = source.match(regex);
  return matches ? matches.length : 0;
}
/**
 * Count overlapping occurrences of `word` in `source`.
 *
 * @param source The text to search.
 * @param word   The substring to count.
 * @param caseSensitive  Optional – default true.
 * @returns Number of (possibly overlapping) matches.
 */
function countOverlapping(
  source: string,
  word: string,
  caseSensitive = true
): number {
  if (!word) return 0;

  const haystack = caseSensitive ? source : source.toLowerCase();
  const needle   = caseSensitive ? word   : word.toLowerCase();

  let count = 0;
  let pos = 0;

  while (true) {
    const idx = haystack.indexOf(needle, pos);
    if (idx === -1) break;
    count++;
    // Move only one character forward to allow overlap
    pos = idx + 1;
  }
  return count;
}
const occurrences = (str: string, word: string) =>
  (str.match(new RegExp(word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g')) ?? []).length;
// utils/stringCount.ts
export function countWord(
  source: string,
  word: string,
  options?: {
    caseSensitive?: boolean;
    wholeWord?: boolean;
    overlapping?: boolean;
  }
): number {
  const { caseSensitive = true, wholeWord = false, overlapping = false } = options ?? {};

  if (overlapping) {
    return countOverlapping(source, word, caseSensitive);
  }
  return countByRegex(source, word, caseSensitive, wholeWord);
}

// Re‑export the private helpers if you want them available elsewhere
export { countBySplit, countByRegex, countOverlapping };
import { countWord } from './utils/stringCount';

const text = "The quick brown fox jumps over the lazy dog. The fox was quick.";

console.log(countWord(text, "quick"));                     // 2 (case‑sensitive)
console.log(countWord(text, "the", { caseSensitive: false })); // 3
console.log(countWord(text, "fox", { wholeWord: true })); // 2
console.log(countWord("aaaa", "aa", { overlapping: true })); // 3
function countWords(source: string): number {
  // Trim to avoid counting leading/trailing whitespace as empty words
  const trimmed = source.trim();
  if (!trimmed) return 0;
  // Split on any sequence of whitespace characters
  return trimmed.split(/\s+/u).length;
}
