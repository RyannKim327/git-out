/**
 * Return the first non‑repeating character, or `null` if every character repeats.
 *
 * @example
 * firstNonRepeating('abacabad') // => 'c'
 */
export function firstNonRepeating(str: string): string | null {
  // 1️⃣ Pass: count each character
  const freq = new Map<string, number>();
  for (const ch of str) {
    freq.set(ch, (freq.get(ch) ?? 0) + 1);
  }

  // 2️⃣ Pass: find the first character that appears only once
  for (const ch of str) {
    if (freq.get(ch) === 1) {
      return ch;
    }
  }

  return null; // all characters repeat
}
export function firstNonRepeatingAscii(str: string): string | null {
  const count = new Int32Array(128); // index 0–127

  for (const ch of str) {
    count[ch.charCodeAt(0)]++;
  }

  for (const ch of str) {
    if (count[ch.charCodeAt(0)] === 1) {
      return ch;
    }
  }

  return null;
}
export const firstNonRepeatingFunctional = (str: string): string | null =>
  [...str]
    .reduce((acc, ch) => {
      if (!acc.count.has(ch)) acc.count.set(ch, 0);
      acc.count.set(ch, acc.count.get(ch)! + 1);
      return acc;
    }, { count: new Map<string, number>() })
    // Rest of the string is still needed to find the first unique
    ?.count
    ?.entries()
    ?.find(([, cnt]) => cnt === 1)?.[0] ?? null;
import { firstNonRepeating } from './your-file';

console.assert(firstNonRepeating('abacabad') === 'c');
console.assert(firstNonRepeating('aabbcc') === null);
console.assert(firstNonRepeating('') === null);
console.assert(firstNonRepeating('😀😃😃😀😄') === '😄'); // emoji demo
