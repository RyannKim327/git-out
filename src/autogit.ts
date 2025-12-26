function reverseWordsOneLiner(str: string): string {
  return str.trim().split(/\s+/).reverse().join(' ');
}
console.log(reverseWordsOneLiner('Hello   world!  How are you?'));
// → "you? are How world! Hello"
/**
 * Reverses the order of words in a string while preserving the original
 * whitespace (spaces, tabs, newlines) between them.
 *
 * @param input - The string to transform.
 * @returns A new string with the words reversed.
 *
 * @example
 *   reverseWordsPreserveSpacing('Hello   world!\nHow are   you?')
 *   // → "you?   are How\nworld!   Hello"
 */
function reverseWordsPreserveSpacing(input: string): string {
  // 1️⃣ Split the string into alternating "word" and "separator" tokens.
  //    The regex captures the separator (any whitespace) as a separate group.
  const tokens = input.split(/(\s+)/);

  // 2️⃣ Extract only the word tokens (even indices) and reverse them.
  const words = tokens.filter((_, i) => i % 2 === 0).reverse();

  // 3️⃣ Re‑assemble: walk through the original token list, replacing each word
  //    token with the next one from the reversed `words` array.
  let wordIdx = 0;
  const result = tokens
    .map((token, i) => (i % 2 === 0 ? words[wordIdx++] : token))
    .join('');

  return result;
}
const original = 'Hello   world!\nHow are   you?';
const reversed = reverseWordsPreserveSpacing(original);
console.log(reversed);
// → "you?   are How\nworld!   Hello"
// Paste the functions here, then run the examples below.

console.log(reverseWordsOneLiner('  The quick   brown   fox  '));
console.log(reverseWordsPreserveSpacing('  The quick   brown   fox  '));
fox fox  brown quick The
fox  brown   quick   The  
// Split on whitespace **or** punctuation, keeping delimiters:
const tokens = input.split(/([ \t\r\n.,;!?]+)/);
// utils/string.ts
export function reverseWords(str: string): string {
  return str.trim().split(/\s+/).reverse().join(' ');
}

/**
 * Preserves original whitespace while reversing word order.
 */
export function reverseWordsPreserveSpacing(str: string): string {
  const tokens = str.split(/(\s+)/);
  const words = tokens.filter((_, i) => i % 2 === 0).reverse();

  let idx = 0;
  return tokens
    .map((t, i) => (i % 2 === 0 ? words[idx++] : t))
    .join('');
}
import { reverseWords, reverseWordsPreserveSpacing } from './utils/string';

console.log(reverseWords('Hello   world!'));               // "world! Hello"
console.log(reverseWordsPreserveSpacing('Hello   world!')); // "world!   Hello"
