function lengthByCodeUnits(str: string): number {
  let count = 0;
  // The loop works on the string as an array‑like object.
  // Each iteration reads one UTF‑16 code unit (the same thing .length does).
  for (let i = 0; ; i++) {
    // Accessing an out‑of‑range index returns undefined → stop.
    if (str[i] === undefined) break;
    count++;
  }
  return count;
}

// Example
console.log(lengthByCodeUnits('hello'));          // 5
console.log(lengthByCodeUnits('😀'));            // 2 (surrogate pair)
function lengthWithCharAt(str: string): number {
  let i = 0;
  while (str.charAt(i) !== '') {
    i++;
  }
  return i;
}
function lengthByCodePoints(str: string): number {
  let count = 0;
  for (const _ of str) {
    count++;
  }
  return count;
}

// Demo
console.log(lengthByCodePoints('hello')); // 5
console.log(lengthByCodePoints('😀'));   // 1
console.log(lengthByCodePoints('a\u0301')); // 1 (a + combining acute)
function lengthByGraphemes(str: string): number {
  // Intl.Segmenter is supported in modern browsers and Node ≥ 13.
  const segmenter = new Intl.Segmenter(undefined, { granularity: 'grapheme' });
  const iterator = segmenter.segment(str)[Symbol.iterator]();

  let count = 0;
  for (let result = iterator.next(); !result.done; result = iterator.next()) {
    count++;
  }
  return count;
}

// Demo
console.log(lengthByGraphemes('👩‍💻')); // 1 (woman technologist emoji is a single grapheme)
console.log(lengthByGraphemes('🇺🇸'));   // 1 (US flag emoji)
console.log(lengthByGraphemes('a\u0301')); // 1 (a + acute accent)
function lengthRecursive(str: string, idx = 0): number {
  // Base case: when we hit an undefined index we stop.
  return str[idx] === undefined ? idx : lengthRecursive(str, idx + 1);
}
function lengthViaArrayFrom(str: string): number {
  // Array.from respects the string iterator → code points.
  return Array.from(str).length; // <-- we are *not* using str.length, only the array's length
}
function lengthViaArrayFromNoLength(str: string): number {
  const arr = Array.from(str);
  let cnt = 0;
  for (const _ of arr) cnt++;
  return cnt;
}
function testAll() {
  const samples = [
    '',
    'a',
    'ab',
    '😀',               // surrogate pair
    '👩‍💻',            // ZWJ sequence
    '🇺🇸',              // flag emoji (two regional indicators)
    'a\u0301',          // a + combining acute
    '𝔘𝔫𝔦𝔠𝔬𝔡𝔢',          // mathematical bold letters (each 2 code units)
    '𐍈',               // a character outside BMP (2 code units)
    'Hello, 世界',      // mixed ASCII + CJK
  ];

  for (const s of samples) {
    console.log(`"${s}"`);
    console.log('  .length (code units)   =', s.length);
    console.log('  codeUnits()            =', lengthByCodeUnits(s));
    console.log('  codePoints()           =', lengthByCodePoints(s));
    console.log('  graphemes()            =', lengthByGraphemes(s));
    console.log('---');
  }
}
testAll();
/**
 * Returns the length of a string according to the requested granularity.
 *
 * @param str   The string to measure.
 * @param mode  'codeUnits' | 'codePoints' | 'graphemes'
 * @returns     Number of units in the chosen mode.
 */
export function stringLength(
  str: string,
  mode: 'codeUnits' | 'codePoints' | 'graphemes' = 'codeUnits'
): number {
  switch (mode) {
    case 'codeUnits':
      // Manual count of UTF‑16 code units.
      let cu = 0;
      while (str[cu] !== undefined) cu++;
      return cu;

    case 'codePoints':
      // `for…of` iterates over code points.
      let cp = 0;
      for (const _ of str) cp++;
      return cp;

    case 'graphemes':
      // Use Intl.Segmenter if available; fall back to code‑point count.
      if (typeof Intl !== 'undefined' && Intl.Segmenter) {
        const seg = new Intl.Segmenter(undefined, { granularity: 'grapheme' });
        let g = 0;
        for (const _ of seg.segment(str)) g++;
        return g;
      }
      // Fallback – best‑effort using code points.
      let fallback = 0;
      for (const _ of str) fallback++;
      return fallback;

    default:
      // Should never happen because of the union type.
      throw new Error(`Unsupported mode "${mode}"`);
  }
}
console.log(stringLength('👩‍💻', 'codeUnits'));   // 6
console.log(stringLength('👩‍💻', 'codePoints'));  // 3
console.log(stringLength('👩‍💻', 'graphemes'));   // 1
