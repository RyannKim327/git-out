/**
 * Count occurrences of a single character.
 *
 * @param source   The string to search.
 * @param char     The character to count (must be a single‑character string).
 * @returns        Number of times `char` appears in `source`.
 */
export function countCharSplit(source: string, char: string): number {
  if (char.length !== 1) {
    throw new Error('`char` must be a single character');
  }
  // Splitting on the character creates N+1 pieces, where N is the count.
  return source.split(char).length - 1;
}
/**
 * Count occurrences of a single character using a simple loop.
 *
 * This version works on raw UTF‑16 code units, which is what JavaScript strings are.
 * If you need true Unicode code‑point counting (e.g., for emojis that are
 * represented by surrogate pairs), see the “code‑point version” later.
 */
export function countCharLoop(source: string, char: string): number {
  if (char.length !== 1) {
    throw new Error('`char` must be a single character');
  }

  let count = 0;
  for (let i = 0; i < source.length; i++) {
    if (source[i] === char) count++;
  }
  return count;
}
export const countCharReduce = (source: string, char: string): number => {
  if (char.length !== 1) {
    throw new Error('`char` must be a single character');
  }

  return [...source].reduce((acc, cur) => (cur === char ? acc + 1 : acc), 0);
};
/**
 * Count occurrences of a Unicode character (code point) in a string.
 *
 * @param source   The string to search.
 * @param char     The character to count – can be any length (emoji, etc.).
 * @returns        Number of times `char` appears.
 */
export function countUnicodeChar(source: string, char: string): number {
  if (char.length === 0) {
    throw new Error('`char` must not be empty');
  }

  // Turn the source into an array of code points.
  const sourcePoints = Array.from(source); // or [...source]

  // For a multi‑code‑point search (e.g., "👩‍💻") we need a sliding window.
  const targetPoints = Array.from(char);
  const targetLen = targetPoints.length;

  let count = 0;
  for (let i = 0; i <= sourcePoints.length - targetLen; i++) {
    // Compare slices of the same length.
    let match = true;
    for (let j = 0; j < targetLen; j++) {
      if (sourcePoints[i + j] !== targetPoints[j]) {
        match = false;
        break;
      }
    }
    if (match) count++;
  }
  return count;
}
export const countCharRegex = (source: string, char: string): number => {
  if (char.length !== 1) {
    throw new Error('`char` must be a single character');
  }
  // Escape characters that have special meaning in regex (e.g., . * + ? ^ $ \)
  const escaped = char.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const matches = source.match(new RegExp(escaped, 'g'));
  return matches ? matches.length : 0;
};
// utils/stringCount.ts
export function countChar(source: string, char: string): number {
  // Choose the implementation you prefer.
  // Here we default to the fast loop version.
  return countCharLoop(source, char);
}

/* ---- implementations (exported for testing) ---- */
export { countCharSplit, countCharLoop, countCharReduce, countUnicodeChar, countCharRegex };
import { countChar } from './utils/stringCount';

const text = 'abracadabra';
console.log(countChar(text, 'a')); // 5
const occurrences = (s: string, c: string) => s.split(c).length - 1;
