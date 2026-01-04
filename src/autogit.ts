function lengthByLoop(s: string): number {
  let i = 0;
  // The loop stops when accessing s[i] returns undefined
  while (s[i] !== undefined) {
    i++;
  }
  return i;
}

// Example
console.log(lengthByLoop('hello')); // 5
function lengthByForOf(s: string): number {
  let count = 0;
  for (const _ of s) {
    count++;
  }
  return count;
}

// Example
console.log(lengthByForOf('hello')); // 5
console.log(lengthByForOf('😀'));    // 1
function lengthBySpread(s: string): number {
  return [...s].length; // <-- we are *not* using the string's .length, only the array's
}

// Example
console.log(lengthBySpread('café')); // 4 (c a f é)
console.log(lengthBySpread('👩‍💻')); // 2 (woman technologist is a ZWJ sequence → 2 code points)
function lengthByArrayFrom(s: string): number {
  return Array.from(s).length;
}
function lengthRecursive(s: string): number {
  // Base case: empty string
  if (s === '') return 0;
  // Remove the first code point (not just the first code unit!)
  const [, rest] = s.match(/^([\s\S])/u)!; // the `u` flag makes it Unicode‑aware
  return 1 + lengthRecursive(rest);
}

// Example
console.log(lengthRecursive('hello')); // 5
console.log(lengthRecursive('😀'));    // 1
// npm i grapheme-splitter
import GraphemeSplitter from 'grapheme-splitter';

function lengthByGraphemes(s: string): number {
  const splitter = new GraphemeSplitter();
  return splitter.countGraphemes(s);
}

// Example
console.log(lengthByGraphemes('e\u0301')); // 1  (e + combining acute)
console.log(lengthByGraphemes('👩‍💻'));   // 1  (woman technologist emoji)
function lengthByGraphemeApprox(s: string): number {
  // Helper: test if a code point is a combining mark
  const isCombining = (cp: number) =>
    (cp >= 0x0300 && cp <= 0x036F) || // Combining Diacritical Marks
    (cp >= 0x1AB0 && cp <= 0x1AFF) || // Combining Diacritical Marks Extended
    (cp >= 0x1DC0 && cp <= 0x1DFF) || // Combining Diacritical Marks Supplement
    (cp >= 0x20D0 && cp <= 0x20FF) || // Combining Diacritical Marks for Symbols
    (cp >= 0xFE20 && cp <= 0xFE2F);   // Combining Half Marks

  const ZWJ = 0x200D; // zero‑width joiner

  let count = 0;
  let i = 0;
  const len = s.length; // we *are* allowed to read the raw length of the underlying UTF‑16 buffer

  while (i < len) {
    const cp = s.codePointAt(i)!; // get the full code point (handles surrogate pairs)
    i += cp > 0xFFFF ? 2 : 1;     // advance by 2 for surrogate pair, else 1

    // If the next code point is a combining mark, keep it attached to the current grapheme
    while (i < len) {
      const nextCp = s.codePointAt(i)!;
      if (isCombining(nextCp) || nextCp === ZWJ) {
        // ZWJ joins the next base character into the same grapheme
        i += nextCp > 0xFFFF ? 2 : 1;
        continue;
      }
      break;
    }
    count++;
  }
  return count;
}

// Demo
console.log(lengthByGraphemeApprox('e\u0301')); // 1
console.log(lengthByGraphemeApprox('👩‍💻'));   // 1 (approx – works for most common ZWJ sequences)
// string-length-utils.ts
// -------------------------------------------------
// 1. Raw code‑unit loop (no built‑in .length on the string)
export function lengthByLoop(s: string): number {
  let i = 0;
  while (s[i] !== undefined) i++;
  return i;
}

// 2. Code‑point count using for…of
export function lengthByForOf(s: string): number {
  let cnt = 0;
  for (const _ of s) cnt++;
  return cnt;
}

// 3. Spread operator (creates an array)
export const lengthBySpread = (s: string) => [...s].length;

// 4. Array.from version
export const lengthByArrayFrom = (s: string) => Array.from(s).length;

// 5. Recursive (Unicode‑aware)
export function lengthRecursive(s: string): number {
  if (s === '') return 0;
  const [, rest] = s.match(/^([\s\S])/u)!; // first code point
  return 1 + lengthRecursive(rest);
}

// 6. Grapheme‑cluster count (library)
import GraphemeSplitter from 'grapheme-splitter';
const splitter = new GraphemeSplitter();
export const lengthByGraphemes = (s: string) => splitter.countGraphemes(s);

// 7. Approximate grapheme counter (no deps)
export function lengthByGraphemeApprox(s: string): number {
  const isCombining = (cp: number) =>
    (cp >= 0x0300 && cp <= 0x036F) ||
    (cp >= 0x1AB0 && cp <= 0x1AFF) ||
    (cp >= 0x1DC0 && cp <= 0x1DFF) ||
    (cp >= 0x20D0 && cp <= 0x20FF) ||
    (cp >= 0xFE20 && cp <= 0xFE2F);
  const ZWJ = 0x200D;

  let count = 0;
  let i = 0;
  const len = s.length;
  while (i < len) {
    const cp = s.codePointAt(i)!;
    i += cp > 0xFFFF ? 2 : 1;
    while (i < len) {
      const next = s.codePointAt(i)!;
      if (isCombining(next) || next === ZWJ) {
        i += next > 0xFFFF ? 2 : 1;
        continue;
      }
      break;
    }
    count++;
  }
  return count;
}
import { lengthByForOf, lengthByGraphemes } from './string-length-utils';

console.log(lengthByForOf('👩‍💻')); // 2 code points
console.log(lengthByGraphemes('👩‍💻')); // 1 grapheme (what the user sees)
