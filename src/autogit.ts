function removeVowels(str: string): string {
  //  [aeiou]  – the vowel characters
  //  i        – case‑insensitive
  //  g        – replace *all* occurrences
  return str.replace(/[aeiou]/gi, '');
}
console.log(removeVowels('Hello, World!'));   // "Hll, Wrld!"
console.log(removeVowels('Typescript'));     // "Typscrpt"
console.log(removeVowels('AEIOU aeiou'));    // "  "
/**
 * Removes every vowel from the given string.
 *
 * @param input - The string (or null/undefined) to process.
 * @returns The input without vowels, or `null`/`undefined` unchanged.
 */
export function stripVowels<T extends string | null | undefined>(input: T): T {
  if (input == null) return input;               // keep null/undefined as‑is
  return input.replace(/[aeiou]/gi, '') as T;
}
const raw = 'Functional Programming';
const cleaned = stripVowels(raw);   // "Fnctnl Prgrmmng"

const maybe: string | undefined = undefined;
const still = stripVowels(maybe);   // still undefined
function removeVowelsIterative(str: string): string {
  const vowels = new Set(['a','e','i','o','u','A','E','I','O','U']);
  let result = '';

  for (const ch of str) {
    if (!vowels.has(ch)) result += ch;
  }
  return result;
}
// utils.ts
/**
 * Strip all vowels from a string.
 *
 * @param str - Input string.
 * @returns New string without vowels.
 */
export const stripVowels = (str: string): string => str.replace(/[aeiou]/gi, '');
// demo.ts
import { stripVowels } from './utils';

const sentences = [
  'The quick brown fox jumps over the lazy dog.',
  'TypeScript is awesome!',
  'AEIOU aeiou',
];

sentences.forEach(s => {
  console.log(`Original: ${s}`);
  console.log(`No vowels: ${stripVowels(s)}`);
  console.log('---');
});
Original: The quick brown fox jumps over the lazy dog.
No vowels: Th qck brwn fx jmps vr th lzy dg.
---
Original: TypeScript is awesome!
No vowels: TypScrpt s wsm!
---
Original: AEIOU aeiou
No vowels:  
---
const noVowels = (s: string) => s.replace(/[aeiou]/gi, '');
