/**
 * Returns the first non‑repeating character in `input`.
 *
 * @param input - The string to search.
 * @returns The first character that occurs exactly once,
 *          or `null` if every character repeats.
 *
 * @example
 *   firstNonRepeatingChar('abacabad') // → 'c'
 *   firstNonRepeatingChar('aabbcc')   // → null
 */
export function firstNonRepeatingChar(input: string): string | null {
  // ---------- 1️⃣  Build the frequency map ----------
  const freq = new Map<string, number>();

  // Using a for…of loop iterates over *Unicode code points*,
  // not just UTF‑16 code units, so surrogate pairs (emoji, etc.) are handled correctly.
  for (const ch of input) {
    // `Map.prototype.get` returns `undefined` when the key is missing.
    // The `?? 0` fallback makes the code a one‑liner.
    freq.set(ch, (freq.get(ch) ?? 0) + 1);
  }

  // ---------- 2️⃣  Find the first character with count === 1 ----------
  for (const ch of input) {
    if (freq.get(ch) === 1) {
      return ch;
    }
  }

  // No non‑repeating character found.
  return null;
}
import { firstNonRepeatingChar } from './firstNonRepeatingChar';

console.log(firstNonRepeatingChar('abacabad')); // → 'c'
console.log(firstNonRepeatingChar('aabbcc'));   // → null
console.log(firstNonRepeatingChar(''));         // → null

// Works with Unicode (emoji, accented letters, etc.)
console.log(firstNonRepeatingChar('😀a😀b')); // → 'a'
export function firstNonRepeatingCharASCII(input: string): string | null {
  const counts = new Uint16Array(128); // 0‑127

  for (let i = 0; i < input.length; ++i) {
    const code = input.charCodeAt(i);
    if (code < 128) counts[code]++; // ignore non‑ASCII silently
  }

  for (let i = 0; i < input.length; ++i) {
    const code = input.charCodeAt(i);
    if (code < 128 && counts[code] === 1) {
      return input[i];
    }
  }
  return null;
}
export function firstNonRepeatingCharOnePass(input: string): string | null {
  const state = new Map<string, number>(); // 1 = once, -1 = >once

  for (const ch of input) {
    const cur = state.get(ch);
    if (cur === undefined) {
      state.set(ch, 1);
    } else if (cur === 1) {
      state.set(ch, -1);
    }
    // if cur === -1 we do nothing – already known to repeat
  }

  for (const [ch, cnt] of state) {
    if (cnt === 1) return ch;
  }
  return null;
}
import { firstNonRepeatingChar } from './firstNonRepeatingChar';

describe('firstNonRepeatingChar', () => {
  test('basic example', () => {
    expect(firstNonRepeatingChar('abacabad')).toBe('c');
  });

  test('no unique char', () => {
    expect(firstNonRepeatingChar('aabbcc')).toBeNull();
  });

  test('unicode works', () => {
    expect(firstNonRepeatingChar('😀a😀b')).toBe('a');
  });

  test('empty string', () => {
    expect(firstNonRepeatingChar('')).toBeNull();
  });
});
const firstNonRepeatingChar = (s: string) =>
  [...s].find(ch => s.indexOf(ch) === s.lastIndexOf(ch)) ?? null;
