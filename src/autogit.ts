/**
 * Count occurrences of a single character.
 * Returns 0 if `char` is an empty string.
 */
export function countCharSplit(str: string, char: string): number {
  if (char.length !== 1) {
    throw new Error('`char` must be a single character');
  }
  // split returns an array with N+1 elements where N is the number of matches
  return str.split(char).length - 1;
}

/* Usage */
const text = "abracadabra";
console.log(countCharSplit(text, "a")); // 5
export function countCharLoop(str: string, char: string): number {
  if (char.length !== 1) {
    throw new Error('`char` must be a single character');
  }

  let count = 0;
  for (const c of str) {
    if (c === char) count++;
  }
  return count;
}

/* Usage */
console.log(countCharLoop("mississippi", "s")); // 4
export const countCharReduce = (str: string, char: string): number => {
  if (char.length !== 1) {
    throw new Error('`char` must be a single character');
  }

  return [...str].reduce((cnt, c) => (c === char ? cnt + 1 : cnt), 0);
};

/* Usage */
console.log(countCharReduce("hello world", "l")); // 3
export function countSubstringRegex(str: string, sub: string, caseSensitive = true): number {
  if (sub === "") return 0; // avoid infinite matches

  const flags = caseSensitive ? "g" : "gi";
  // Escape special regex characters in `sub`
  const escaped = sub.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(escaped, flags);

  const matches = str.match(regex);
  return matches ? matches.length : 0;
}

/* Usage */
console.log(countSubstringRegex("FooBarFoo", "foo", false)); // 2
export const countCharMatchAll = (str: string, char: string): number => {
  if (char.length !== 1) throw new Error('`char` must be a single character');
  const escaped = char.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(escaped, 'g');
  return [...str.matchAll(regex)].length;
};
import graphemeSplit from 'grapheme-splitter';

export function countGrapheme(str: string, target: string): number {
  const splitter = new graphemeSplit();
  const graphemes = splitter.splitGraphemes(str);
  return graphemes.filter(g => g === target).length;
}

/* Usage */
console.log(countGrapheme('👩‍💻👩‍💻', '👩‍💻')); // 2
// src/utils/stringCount.ts
export type CountOptions = {
  /** If true, the search is case‑insensitive (default: false) */
  caseInsensitive?: boolean;
  /** If true, treat `search` as a literal string, not a RegExp (default: true) */
  literal?: boolean;
};

/**
 * Count how many times `search` appears in `source`.
 *
 * Works for single characters *and* longer substrings.
 * Throws if `search` is empty.
 */
export function countOccurrences(
  source: string,
  search: string,
  opts: CountOptions = {}
): number {
  if (search === '') {
    throw new Error('`search` must not be empty');
  }

  const { caseInsensitive = false, literal = true } = opts;
  const flags = caseInsensitive ? 'gi' : 'g';

  const pattern = literal
    ? search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    : search; // caller supplied a safe regex pattern

  const regex = new RegExp(pattern, flags);
  const matches = source.match(regex);
  return matches ? matches.length : 0;
}

/* Example usage */
import { countOccurrences } from './utils/stringCount';

console.log(countOccurrences('Hello hello HELLO', 'hello', { caseInsensitive: true })); // 3
console.log(countOccurrences('abracadabra', 'a')); // 5
const count = (s: string, ch: string) => (ch.length === 1 ? s.split(ch).length - 1 : 0);
