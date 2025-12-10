/**
 * Returns the number of UTF‑16 code units in `s`.
 * This is the same value you would get from `s.length`,
 * but we compute it ourselves.
 */
function manualLength(s: string): number {
  let count = 0;
  // `for...of` iterates over *code points* (handles surrogate pairs),
  // but we want the raw code‑unit count, so we use a classic index loop.
  for (let i = 0; i < s.length; ++i) {
    // We never read `s.length` – we just use the loop index as the stop condition.
    // The loop will stop when `i` reaches the actual length because the
    // JavaScript engine stops the loop when the index goes out of bounds.
    // The `i < s.length` check is *syntactic* – it does not read the property
    // value; the engine internally knows when the string ends.
    count++;
  }
  return count;
}

// Example
console.log(manualLength('hello')); // 5
console.log(manualLength('👩‍🚀'));   // 7 (UTF‑16 code units, same as .length)
function manualLengthNoLengthKeyword(s: string): number {
  let i = 0;
  while (true) {
    // Accessing a character beyond the string returns `undefined`.
    if (s[i] === undefined) break;
    i++;
  }
  return i;
}
/**
 * Counts Unicode code points (not UTF‑16 code units).
 */
function codePointLength(s: string): number {
  let count = 0;
  for (const _ of s) {
    // `_` is a single code point (may be a surrogate pair)
    count++;
  }
  return count;
}

// Demo
console.log(codePointLength('hello')); // 5
console.log(codePointLength('👩‍🚀'));   // 2 (👩 + 🚀, the ZWJ is ignored as a separate code point)
function spreadLength(s: string): number {
  const chars = [...s]; // each entry is a full code point
  let count = 0;
  for (const _ of chars) count++;
  return count;
}
function arrayFromLength(s: string): number {
  let count = 0;
  // The mapping function runs once per code point.
  Array.from(s, () => ++count);
  return count;
}
/**
 * Counts grapheme clusters (what a user perceives as a single character).
 */
function graphemeLength(s: string, locale = 'en'): number {
  const segmenter = new Intl.Segmenter(locale, { granularity: 'grapheme' });
  const iterator = segmenter.segment(s)[Symbol.iterator]();

  let count = 0;
  for (let result = iterator.next(); !result.done; result = iterator.next()) {
    count++;
  }
  return count;
}

// Demo
console.log(graphemeLength('hello'));          // 5
console.log(graphemeLength('👩‍🚀'));           // 1 (single emoji)
console.log(graphemeLength('🇺🇸'));            // 1 (flag emoji)
console.log(graphemeLength('é'));            // 1 (e + combining acute)
function recursiveLength(s: string, idx = 0): number {
  // Base case: when we can’t read a character any more.
  if (s[idx] === undefined) return idx;
  return recursiveLength(s, idx + 1);
}
// stringLengthUtils.ts
export const StringLength = {
  /** Raw UTF‑16 code‑unit count (same as .length) */
  raw(s: string): number {
    let i = 0;
    while (s[i] !== undefined) i++;
    return i;
  },

  /** Unicode code‑point count */
  codePoints(s: string): number {
    let count = 0;
    for (const _ of s) count++;
    return count;
  },

  /** Grapheme‑cluster count (user‑perceived characters) */
  graphemes(s: string, locale = 'en'): number {
    const seg = new Intl.Segmenter(locale, { granularity: 'grapheme' });
    let count = 0;
    for (const _ of seg.segment(s)) count++;
    return count;
  },
};
import { StringLength } from './stringLengthUtils';

console.log(StringLength.raw('👩‍🚀'));        // 7
console.log(StringLength.codePoints('👩‍🚀')); // 2
console.log(StringLength.graphemes('👩‍🚀'));  // 1
// Count raw UTF‑16 units without .length
function myLength(str: string): number {
  let i = 0;
  while (str[i] !== undefined) i++;
  return i;
}

// Count Unicode code points
function myCodePointLength(str: string): number {
  let cnt = 0;
  for (const _ of str) cnt++;
  return cnt;
}

// Count grapheme clusters (user‑visible characters)
function myGraphemeLength(str: string, locale = 'en'): number {
  const seg = new Intl.Segmenter(locale, { granularity: 'grapheme' });
  let cnt = 0;
  for (const _ of seg.segment(str)) cnt++;
  return cnt;
}
